import React from 'react'
import './AdminList.css'
import Layout from '~/Pages/Layout/Layout'
import { UserLayout } from '../../UserManagementLayout/UserLayout'

export const AdminList = () => {
  return (
    <Layout>
      <UserLayout/>
      <div>Amin List</div>
    </Layout>
  )
}
