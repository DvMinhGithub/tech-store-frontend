import { Navigate, Outlet } from 'react-router-dom'

import CustomerBenefits from '@/components/Layout/Footer/CustomerBenefits '
import CustomerFooter from '@/components/Layout/Footer/CustomerFooter'
import CustomerHeader from '@/components/Layout/Header/CustomerHeadrer'
import { tokenOperations, userRoles } from '@/utils'

const CustomerLayout = () => {
  if (userRoles.isManage()) {
    tokenOperations.remove()
    return <Navigate to="/login" />
  }
  return (
    <>
      <CustomerHeader />
      <Outlet />
      <CustomerBenefits />
      <CustomerFooter />
    </>
  )
}

export default CustomerLayout
