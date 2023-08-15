'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box } from '@/components'

export default function MenuLink({ href, children }: { href: string; children: string }) {
  const pathname = usePathname()
  const isActive =
    // home
    children === 'Home'
      ? pathname === href
      : // dashboard
      children === 'Dashboard'
      ? pathname.startsWith('/login') || pathname.startsWith(href)
      : // admin
        pathname.startsWith(href)
  return (
    <Box
      position="relative"
      top="-2px"
      pb="8px"
      borderBottom={isActive ? 4 : undefined}
      borderColor={isActive ? 'secondary.main' : undefined}
      color={isActive ? 'text.primary' : 'grey.600'}
    >
      <Link href={href}>{children}</Link>
    </Box>
  )
}
