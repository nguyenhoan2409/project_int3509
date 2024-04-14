import React from 'react'

export const ChangePassword = () => {
  return (
    <div className="accountsettings">
      <h1>Đổi mật khẩu</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="password">Mật khẩu cũ<span>*</span></label>
          <input type="password" name='password'/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu mới<span>*</span></label>
          <input type="password" name='newPassword' />
        </div>
        <div className="form-group">
          <label htmlFor="password">Nhập lại mật khẩu<span>*</span></label>
          <input type="password" name='cfPassword'/>
        </div>
        
      
      </div>
      <button className='mainbutton1'>Cập nhật</button>
    </div>
  )
}