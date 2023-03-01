import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        axios.post("user/login", { // sends login post request to the backend
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload: response.data}) // updates the auth context, should now have a non-null user as we are logging in
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setError(error.response.data.error)
        })
    }

    return { login, isLoading, error }
}

