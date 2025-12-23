import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { id: 1, path: "/admin/dashboard", title: "Upload" },
  { id: 2, path: "/admin/dashboard/projects", title: "Projects" },
  { id: 3, path: "/admin/dashboard/message", title: "Messages" },
]

export default function Nav({ vertical, setIsOpen }: { vertical?: boolean, setIsOpen?: any }) {
  const pathname = usePathname();

  return (
    <nav className={`flex ${vertical ? 'flex-col gap-6' : 'items-center gap-8'}`}>
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            onClick={() => setIsOpen && setIsOpen(false)}
            className={`text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-500' : 'text-gray-400'
              }`}
            href={link.path}
            key={link.id}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}
