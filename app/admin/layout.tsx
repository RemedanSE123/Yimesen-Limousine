export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-vh-100 bg-light">
      {children}
    </div>
  )
}

