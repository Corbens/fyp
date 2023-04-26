import { useState } from 'react'
import axios from 'axios'

import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        axios.post("user/login", { 
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload: response.data}) // saves the user object to local storage
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setError(error.response.data.error)
        })
    }

    return { login, isLoading, error }
}

