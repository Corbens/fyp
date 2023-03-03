import { useState, useRef } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hiddenPassword, setHiddenPassword] = useState('')
    const [hide, setHide] = useState(true)
    const [username, setUsername] = useState('')
    const passwordRef = useRef('password')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, username)
    }

    const updatePasswords = (e) => {
        setPassword(e.target.value)
        setHiddenPassword("㊙️".repeat(e.target.value.length))
    }

    const setFocus = () => {
        passwordRef.current.focus()
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
                type="text"
                style={hide ? {
                    clip:"rect(0 0 0 0)",
                    clippath:"inset(50%)",
                    height:"1px",
                    overflow:"hidden",
                    position:"absolute",
                    width:"1px"
                } : {
                    height:"auto"
                }}
                onChange={(e) => updatePasswords(e)}
                value={password} 
                ref={passwordRef}
            />
            <input
                type="text"
                style={!hide ? {
                    clip:"rect(0 0 0 0)",
                    clippath:"inset(50%)",
                    height:"1px",
                    overflow:"hidden",
                    position:"absolute",
                    width:"1px"
                } : {
                    height:"auto"
                }}
                value={hiddenPassword} 
                onFocus={setFocus}
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