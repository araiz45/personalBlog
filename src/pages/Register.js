import React, { useRef, useState } from 'react'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const model = useRef(null)
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        console.log(username, password)
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        const obtainMessage = await response.json();
        setData(obtainMessage)
        model.current.click();
    }


    return (
        <div><>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden ref={model}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data.message}
                        </div>
                    </div>
                </div>
            </div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputusername1" className="form-label">Username</label>
                    <input type="username" className="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form></></div>
    )
}

export default Register