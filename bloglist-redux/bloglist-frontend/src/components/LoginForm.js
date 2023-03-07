import { useState } from 'react'
import { logInUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

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
            <h2 className="mt-5">Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Label className="mt-2">password:</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm