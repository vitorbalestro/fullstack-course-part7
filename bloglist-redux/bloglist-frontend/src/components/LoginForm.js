import { useState } from 'react'
import { logInUser } from '../reducers/userReducer'

const LoginForm = ({ dispatch }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(logInUser(username, password))
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
            username&nbsp;
                    <input type="text" value={username} id='username'
                        name="Username" onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
            password&nbsp;
                    <input type="password" value={password} id='password'
                        name="Password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm