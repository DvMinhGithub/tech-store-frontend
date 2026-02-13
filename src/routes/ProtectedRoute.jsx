import { Navigate, Outlet } from 'react-router-dom'

import { tokenOperations } from '@/utils'

const ProtectedRoute = () => {
  const token = tokenOperations.get()
  
  if (token) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

export default ProtectedRoute
