import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'}) // returns the user (should now be null as logging out)
    }

    return {logout}
}