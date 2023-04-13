import { useState, useEffect } from 'react'
import axios from 'axios'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { useAuthContext } from '../../hooks/useAuthContext'



const Settings = () => {
    const { user } = useAuthContext()

    const [ruby, setRuby] = useState(null)
    useEffect(() => {
        if(ruby === null){
            setRuby(user.ruby)
        }
    }, [ruby, user.ruby])

    const handleToggleRuby = () => {
        axios.post("user/toggleruby", { 
            email: user.email,
        }).then((response) => {
            const tempUser = user
            tempUser.ruby = !ruby
            localStorage.setItem('user', JSON.stringify(tempUser))
            setRuby(!ruby)
        })
    }

    return(
        <div>
            <h1>Settings</h1>
            <FormControlLabel control={<Checkbox checked={ruby} onChange={() => handleToggleRuby()}/>} label="Enable Furigana/Ruby Where Supported" />
        </div>
    )
}

export default Settings