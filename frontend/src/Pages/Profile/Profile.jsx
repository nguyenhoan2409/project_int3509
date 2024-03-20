import React from 'react'
import { useParams } from 'react-router-dom'
import { UserSidebar } from '~/Components/UserProfile/UserSidebar'
import './Profile.css'
import { AccountSetting } from '~/Components/UserProfile/AccountSettings'
import { ChangePassword } from '~/Components/UserProfile/ChangePassword'
import { YourOrders } from '~/Components/UserProfile/YourOrders'
import AvatarEditor from 'react-avatar-editor'

export const Profile = () => {

    const {activepage} = useParams()
   
  return (
    <div className='userprofile'>
        <div className='userprofilein'>
            <div className='left'>
              <AvatarEditor
                 image="https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200008.jpg"
                 width={250}
                 height={250}
                 color={[255, 255, 255, 0.6]} // RGBA
                 scale={1}
                 rotate={0}
              />
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              <div>
                {activepage === 'accountsettings' && <AccountSetting/>}
                {activepage === 'changepassword' && <ChangePassword/>}
                {activepage === 'yourorders' && <YourOrders/>}
              </div>
              
            </div>
        </div>
    </div>
    
  )
}