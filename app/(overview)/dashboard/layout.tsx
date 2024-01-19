
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Header</header>
      <main>
        {children}
      </main>
      <footer>Footer</footer>
    </div>
  )

}
