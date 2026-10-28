import { Suspense, lazy } from 'react'
import App from './App.jsx'

// Admin is a separate chunk so visitors never download it.
const Admin = lazy(() => import('./admin/Admin.jsx'))

const Root = () => {
  const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'
  if (!isAdmin) return <App />
  return (
    <Suspense fallback={null}>
      <Admin />
    </Suspense>
  )
}

export default Root
