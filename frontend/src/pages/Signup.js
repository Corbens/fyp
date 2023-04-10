import { useState, useRef } from 'react'
import { useSignup } from '../hooks/useSignup'

import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { getStreetview } from '../utilities/Streetview';

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

    const [streetviewObj] = useState(getStreetview())

    

    return (
        <div className='loginDiv'>
            <div className='streetview'>
                <iframe title="LandmarkStreetview" src={streetviewObj.url} width="100%" height="100%" style={{"border" :0}} allowfullscreen="true" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <div className="formTitle">
                    <h2>Signup</h2>
                </div>
                <div className="formContents">
                    <TextField 
                        label="Username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        sx={{ width: 1, pb: 2 }}
                    />
                    <TextField 
                        label="Email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        sx={{ width: 1, pb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="text"
                        onChange={(e) => updatePasswords(e)}
                        value={password} 
                        inputRef={passwordRef}
                        sx={{ width: 1, pb: 2 }}
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
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={(e) => setHide(!hide)}>
                                        {hide ? <Visibility/> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <TextField
                        label="Password"
                        type="text"
                        value={hiddenPassword} 
                        onFocus={setFocus}
                        sx={{ width: 1, pb: 2 }}
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
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={(e) => setHide(!hide)}>
                                        {hide ? <Visibility/> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <Button variant='outlined' disabled={isLoading} sx={{ width: 1}} type="submit">Signup</Button>
                    <Tooltip title={streetviewObj.info}><Button sx={{ width: 1, mt: 2 }}>Where Am I?</Button></Tooltip>
                    {error && <div className="error">{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default Signup