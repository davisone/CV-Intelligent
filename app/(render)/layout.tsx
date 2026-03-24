export default function RenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style>{`
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0; padding: 0; background: white; width: 21cm; }
          * { box-shadow: none !important; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
