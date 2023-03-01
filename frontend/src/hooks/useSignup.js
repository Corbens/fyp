import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, username) => {
        setIsLoading(true)
        setError(null)

        axios.post("user/signup", { // sends signup post request to the backend
            email: email,
            password: password,
            username: username
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload: response.data}) // updates the auth context, should now have a non-null user as we are logging in
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setError(error.response.data.error)
        })
    }

    return { signup, isLoading, error }
}

