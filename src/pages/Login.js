import React, { useContext, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext';

function Login() {
  const {setInfo} = useContext(UserContext)
  const model = useRef(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [obtainData, setObtainData] = useState(null)
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(username, password)
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    const data = await response.json();
    setObtainData(data)
    if (response.status === 200) {
      setRedirect(true)
      setInfo(data)

    }else{
      model.current.click();

    }
  }


  if (redirect) {
    return <Navigate to='/' replace={true} />
  }
  return (
    <div><>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={model} hidden>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Message</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {obtainData !== null?obtainData.message : ''}
            </div>
          </div>
        </div>
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form></></div>
  )
}

export default Login