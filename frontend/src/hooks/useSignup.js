import { useState } from 'react'
import axios from 'axios'

import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, username) => {
        setIsLoading(true)
        setError(null)

        axios.post("user/signup", { 
            email: email,
            password: password,
            username: username
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload: response.data}) // saves the user object to local storage
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setError(error.response.data.error)
        })
    }

    return { signup, isLoading, error }
}

