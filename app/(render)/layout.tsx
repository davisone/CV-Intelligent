export default function RenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style>{`
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
          * { box-shadow: none !important; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
