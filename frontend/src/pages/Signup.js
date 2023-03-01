import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    const [username, setUsername] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, username)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type={hide ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
            />
            <label>Hide:</label>
            <input 
                type="checkbox"
                onChange={(e) => setHide(!hide)}
                value={hide}
                defaultChecked
            />
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup