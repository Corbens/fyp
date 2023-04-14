import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'}) // removes the user object from local storage 
    }

    return {logout}
}