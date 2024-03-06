import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Register() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone_number, setPhonenumber] = useState('')
    const [address, setAdress] = useState('')
    const Register = () => {
        axios.post('http://localhost:8080/register', { fullname, email, password, phone_number, address })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='p-5 bg-white w-25'>
                <form>
                    <div className='mb-3'>
                        <label className=''>Họ và Tên </label>
                        <input type='text'
                            placeholder='Nguyễn Thị A'
                            value={fullname}
                            className='form-control'
                            onChange={e => setFullname(e.target.value)}
                                />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className=''>Email </label>
                        <input type='email'
                            placeholder='vv:email@gmai.com'
                            className='form-control'
                            onChange={e => setEmail(e.target.value)} 
                             />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'>Mật khẩu </label>
                        <input type='password'
                            placeholder=''
                            className='form-control'
                            onChange={e => setPassword(e.target.value)}
                             />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'>Nhập lại mật khẩu </label>
                        <input type='password'
                            placeholder=''
                            className='form-control'
                            onChange={e => setConfirmPassword(e.target.value)}
                             />
                    </div>

                    <div className='mb-3'>
                        <label className=''>SĐT </label>
                        <input type=''
                            placeholder=''
                            className='form-control'
                            onChange={e => setPhonenumber(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className=''>Trường/Địa chỉ </label>
                        <input type=''
                            placeholder=''
                            className='form-control'
                            onChange={e => setAdress(e.target.value)} />
                    </div>
                    <button className='btn btn-success' onClick={Register}> Đăng ký </button>
                </form>
            </div>
        </div>
    )
}

export default Register
