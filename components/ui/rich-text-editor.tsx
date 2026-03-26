'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils/helpers'

// Icons inline pour éviter des imports lourds
function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick() }}
      disabled={disabled}
      title={title}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded text-sm transition-colors',
        active
          ? 'bg-[#722F37]/15 text-[#722F37]'
          : 'text-[#4A4540] hover:bg-[#F3EDE5] hover:text-[#1F1A17]',
        disabled && 'opacity-30 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <div className="w-px h-5 bg-[#E0D6C8] mx-1" />
}

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Rédigez votre lettre ici...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[600px] text-[#1F1A17] text-[11pt] leading-[1.8] font-serif',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="border border-[#E0D6C8] rounded-xl overflow-hidden bg-[#F8F4EF]">
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-white border-b border-[#E0D6C8]">

        {/* Styles de paragraphe */}
        <select
          value={
            editor.isActive('heading', { level: 1 }) ? 'h1'
            : editor.isActive('heading', { level: 2 }) ? 'h2'
            : editor.isActive('heading', { level: 3 }) ? 'h3'
            : 'p'
          }
          onChange={e => {
            const val = e.target.value
            if (val === 'p') editor.chain().focus().setParagraph().run()
            else editor.chain().focus().toggleHeading({ level: parseInt(val[1]!) as 1|2|3 }).run()
          }}
          className="h-8 text-xs border border-[#E0D6C8] rounded px-1.5 bg-white text-[#4A4540] focus:outline-none focus:ring-1 focus:ring-[#722F37]/30 cursor-pointer"
        >
          <option value="p">Normal</option>
          <option value="h1">Titre 1</option>
          <option value="h2">Titre 2</option>
          <option value="h3">Titre 3</option>
        </select>

        <Separator />

        {/* Gras */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Gras (Ctrl+B)"
        >
          <strong>G</strong>
        </ToolbarButton>

        {/* Italique */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italique (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarButton>

        {/* Souligné */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Souligné (Ctrl+U)"
        >
          <span className="underline">S</span>
        </ToolbarButton>

        {/* Barré */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Barré"
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <Separator />

        {/* Alignements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="Aligner à gauche"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="0" y="1" width="14" height="2" rx="1"/>
            <rect x="0" y="5" width="10" height="2" rx="1"/>
            <rect x="0" y="9" width="14" height="2" rx="1"/>
            <rect x="0" y="13" width="8" height="1" rx="0.5"/>
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="Centrer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="0" y="1" width="14" height="2" rx="1"/>
            <rect x="2" y="5" width="10" height="2" rx="1"/>
            <rect x="0" y="9" width="14" height="2" rx="1"/>
            <rect x="3" y="13" width="8" height="1" rx="0.5"/>
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="Aligner à droite"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="0" y="1" width="14" height="2" rx="1"/>
            <rect x="4" y="5" width="10" height="2" rx="1"/>
            <rect x="0" y="9" width="14" height="2" rx="1"/>
            <rect x="6" y="13" width="8" height="1" rx="0.5"/>
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          title="Justifier"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="0" y="1" width="14" height="2" rx="1"/>
            <rect x="0" y="5" width="14" height="2" rx="1"/>
            <rect x="0" y="9" width="14" height="2" rx="1"/>
            <rect x="0" y="13" width="14" height="1" rx="0.5"/>
          </svg>
        </ToolbarButton>

        <Separator />

        {/* Listes */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Liste à puces"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="1.5" cy="3" r="1.5"/>
            <rect x="4" y="2" width="10" height="2" rx="1"/>
            <circle cx="1.5" cy="7" r="1.5"/>
            <rect x="4" y="6" width="10" height="2" rx="1"/>
            <circle cx="1.5" cy="11" r="1.5"/>
            <rect x="4" y="10" width="10" height="2" rx="1"/>
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Liste numérotée"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <text x="0" y="4" fontSize="4" fontFamily="serif">1.</text>
            <rect x="5" y="2" width="9" height="2" rx="1"/>
            <text x="0" y="8.5" fontSize="4" fontFamily="serif">2.</text>
            <rect x="5" y="6.5" width="9" height="2" rx="1"/>
            <text x="0" y="13" fontSize="4" fontFamily="serif">3.</text>
            <rect x="5" y="11" width="9" height="2" rx="1"/>
          </svg>
        </ToolbarButton>

        <Separator />

        {/* Annuler / Rétablir */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Annuler (Ctrl+Z)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 7v6h6"/><path d="M3 13C5 8 9 5 14 5c5 0 9 4 9 9s-4 9-9 9a9 9 0 0 1-6-2.3"/>
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Rétablir (Ctrl+Y)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 7v6h-6"/><path d="M21 13C19 8 15 5 10 5c-5 0-9 4-9 9s4 9 9 9a9 9 0 0 0 6-2.3"/>
          </svg>
        </ToolbarButton>
      </div>

      {/* Zone de la page */}
      <div className="p-6 overflow-y-auto" style={{ minHeight: '680px' }}>
        <div className="max-w-[680px] mx-auto bg-white shadow-[0_2px_16px_rgba(0,0,0,0.10)] rounded-sm">
          <div className="px-14 py-12">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <style>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9B9590;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .tiptap h1 { font-size: 1.6em; font-weight: bold; margin-bottom: 0.5em; }
        .tiptap h2 { font-size: 1.3em; font-weight: bold; margin-bottom: 0.4em; }
        .tiptap h3 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.3em; }
        .tiptap p { margin-bottom: 0.75em; }
        .tiptap ul { list-style: disc; padding-left: 1.5em; margin-bottom: 0.75em; }
        .tiptap ol { list-style: decimal; padding-left: 1.5em; margin-bottom: 0.75em; }
        .tiptap li { margin-bottom: 0.25em; }
      `}</style>
    </div>
  )
}
