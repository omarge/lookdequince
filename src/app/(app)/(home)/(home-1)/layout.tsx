import { ApplicationLayout } from '@/app/(app)/application-layout'
import { type ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationLayout headerStyle="header-1" showBanner={true} headerHasBorder>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
