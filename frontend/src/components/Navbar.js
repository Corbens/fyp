import { NavLink } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    return(
        <header>
            <div className="container">
                <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} exact to="/">
                    <h1>Learn Japanese</h1>
                </NavLink>
                <nav>
                    {user && (
                        <div>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} to="/dragdrop">Drag & Drop</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} to="/placeholder">Flashcards</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} to="/placeholder">Kanji</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} to="/placeholder">Forums</NavLink>
                            <span> | {user.username} </span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <NavLink style={({ isActive }) =>({color: isActive ? '#5e89b5' : '#333'})} to="/login">Login</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#5e89b5' : '#333'})} to="/signup">Signup</NavLink>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar