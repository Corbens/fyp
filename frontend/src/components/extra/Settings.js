import { useState, useEffect } from 'react'
import axios from 'axios'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { useAuthContext } from '../../hooks/useAuthContext'

const Settings = () => {
    const { user } = useAuthContext()

    const [ruby, setRuby] = useState(null)
    const [japanese, setJapanese] = useState(null)
    useEffect(() => {
        if(ruby === null){
            setRuby(user.ruby)
        }
        if(japanese === null){
            setJapanese(user.japanese)
        }
    }, [ruby, user.ruby, japanese, user.japanese])

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

    // first make work without connecting to database. then use routes as route+2. then can work on making work with database. then change name of routes.

    const handleToggleJapanese = () => {
        axios.post("user/togglejapanese", {
            email: user.email,
        }).then((response) => {
            const tempUser = user
            tempUser.japanese = !japanese
            localStorage.setItem('user', JSON.stringify(tempUser))
            setJapanese(!japanese)
        })
    }

    return(
        <div>
            <h1>Settings</h1>
            <FormControlLabel control={<Checkbox checked={ruby} onChange={() => handleToggleRuby()}/>} label="Enable Ruby (Furigana) Where Supported" />
            <br/>
            <FormControlLabel control={<Checkbox checked={japanese} onChange={() => handleToggleJapanese()}/>} label="Enable Japanese Navigation" />
        </div>
    )
}

export default Settings