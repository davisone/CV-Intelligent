export default function RenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style>{`@page { margin: 0; } body { margin: 0; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
