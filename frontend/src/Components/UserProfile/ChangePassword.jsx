import React from 'react'

export const ChangePassword = () => {
  return (
    <div className="accountsettings">
      <h1>Change Password</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Old Password<span>*</span></label>
          <input type="text" name='name' id='name' />
        </div>

        <div className="form-group">
          <label htmlFor="name">New Password<span>*</span></label>
          <input type="text" name='name' id='name' />
        </div>

        
      
      </div>
      <button className='mainbutton1'>Save Changes</button>
    </div>
  )
}