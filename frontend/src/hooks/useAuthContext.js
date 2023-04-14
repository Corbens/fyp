import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => { // hook to retrieve the user object stored in local storage by the context
    const context = useContext(AuthContext)

    if (!context) { // checks that user was retrieved (has to be within authContextProvider)
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}