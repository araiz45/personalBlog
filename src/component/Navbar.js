import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Navbar() {
  const {info, setInfo} = useContext(UserContext)
  useEffect(() => {


    const profile = async () =>{
      const response = await fetch ('http://localhost:4000/profile', {
        credentials: 'include',
        headers: {'Content-Type':'appliation/json'}
      })
      const data = await response.json();
      console.log(data)
      if(response.ok){
        setInfo(data)
      }

    }
    profile();
  }, [])
  const handleLogout = () =>{
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setInfo(null)
  }
  return (
    <div><nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Personal Blog</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item" hidden>
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" href="#">Link</a> */}
          </li>
        </ul>
        <div className="d-flex align-items-center">
          {info === null?<>
            <Link className="btn btn-primary mx-1" to={'/login'}>Login</Link>
            <Link className="btn btn-primary mx-1" to={'/register'}>Register</Link>
          </>:<>
          <p className='text-white h4 my-0 mx-2'>Hi! {info.username}</p>
          <Link className='btn btn-primary mx-1' to={'/create'}>Create Post</Link>
          <button className="btn btn-outline-primary mx-1" onClick={handleLogout}>Logout</button>
          </>}
          
        
        </div>
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar