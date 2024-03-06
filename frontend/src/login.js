import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function handleSubmit(event) {
            event.preventDefault()
            axios.post('http://localhost:8080/login', {email,password})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='p-5 bg-white w-25'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email' className=''>Email: </label>
                    <input type= 'email' placeholder='vv:email@gmai.com' className='form-control' onChange={e =>setEmail(e.target.value)}/>
                </div>

                <div className='mb-3'>
                <label htmlFor='password'>Mật Khẩu </label>
                    <input type= 'password' placeholder='Enter your password' className='form-control' onChange={e =>setPassword(e.target.value)}/>
                </div>

                <button className='btn btn-success'> Đăng Nhập </button>
            </form>
      </div>
    </div>
  )
}

export default Login
