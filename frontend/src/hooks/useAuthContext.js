import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => { // used to determine if there is a user logged in or not. returns the result as context
    const context = useContext(AuthContext)

    if (!context) { // checks that the context is being used in the correct place
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}