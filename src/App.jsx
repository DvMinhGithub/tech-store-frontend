// src/App.js
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout/Index'
import CustomerLayout from './layouts/CustomerLayout/Index'
import ProtectedRoute from './routes/ProtectedRoute'
import { routes } from './routes/routes'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const LoginPage = React.lazy(() => import('./pages/LoginPage/Index'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/Index'))
const CustomerHomePage = React.lazy(() => import('./pages/HomePage/Customer/Homepage'))
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'))
const ProductDetail = React.lazy(() => import('./pages/Product/ProductDetail'))

const adminRoutes = [
  { path: routes.auth.homeAdmin, element: React.lazy(() => import('./pages/HomePage/Manage/Homepage')) },
  { path: routes.brand.list, element: React.lazy(() => import('./pages/Brand')) },
  { path: routes.category.list, element: React.lazy(() => import('./pages/Category')) },
  { path: routes.supplier.list, element: React.lazy(() => import('./pages/Supplier')) },
  { path: routes.product.add, element: React.lazy(() => import('./pages/Product/AddEditProduct')) },
  { path: routes.product.list, element: React.lazy(() => import('./pages/Product')) },
  { path: routes.product.edit, element: React.lazy(() => import('./pages/Product/AddEditProduct')) },
  { path: routes.voucher.list, element: React.lazy(() => import('./pages/Voucher')) },
  { path: routes.employee.list, element: React.lazy(() => import('./pages/Employee')) },
  { path: routes.employee.add, element: React.lazy(() => import('./pages/Employee/AddEditEmployee')) },
  { path: routes.employee.edit, element: React.lazy(() => import('./pages/Employee/AddEditEmployee')) }
]

const customerRoutes = [
  { path: routes.user.profile, element: React.lazy(() => import('./pages/Profile')) },
  { path: routes.cart.list, element: React.lazy(() => import('./pages/Cart')) }
]

const loadingIndicator = <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} fullscreen />

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={loadingIndicator}>
        <Routes>
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<RegisterPage />} />
          <Route element={<CustomerLayout />}>
            <Route path={routes.auth.home} element={<CustomerHomePage />} />
            <Route path={routes.product.detail} element={<ProductDetail />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              {adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>
            <Route element={<CustomerLayout />}>
              {customerRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default App
