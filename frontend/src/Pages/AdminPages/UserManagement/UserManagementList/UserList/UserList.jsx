import React from 'react'
import './UserList.css'
import Layout from '~/Pages/Layout/Layout'
import { UserLayout } from '../../UserManagementLayout/UserLayout'

export const UserList = () => {
  return (
    <Layout>
      <UserLayout/>
      <div>User List</div>
    </Layout>
  )
}
