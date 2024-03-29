import React, { useState } from 'react'

export const AuthPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Cut the Link</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input className='yellow-input' type='text' name='email' id='email' placeholder='Enter email' onChange={changeHandler} />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input className='yellow-input' type='password' name='password' id='password' placeholder='Enter the password' onChange={changeHandler} />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <div className='card-action'>
              <button className='btn yellow darken-4' style={{ marginRight: 10 }}>Sign In</button>
              <button className='btn grey lighten-1' black-text>Registration</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
