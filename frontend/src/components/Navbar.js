import { useState, useRef } from 'react'
import { NavLink } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import LogoutIcon from '@mui/icons-material/Logout';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const spanRef = useRef()
    const [open, setOpen] = useState(false)
    const expandMenu = () => {
        setOpen(true)
    }
    const closeMenu = () => {
        setOpen(false)
    }
    const userLogout = () => {
        setOpen(false)
        logout()
    }


    
    return(
        <header>
            <div className="container">
                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} exact to="/">
                    <h1>Learn Japanese</h1>
                </NavLink>
                <nav>
                    {user && (
                        <div>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/dragdrop">Drag & Drop</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/flashcards">Flashcards</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/placeholder">Kanji</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/placeholder">Forums</NavLink>
                            <span> | {user.username} </span>
                            <IconButton variant="contained" onClick={expandMenu} ref={spanRef}><ExpandCircleDownIcon/></IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={spanRef.current}
                                open={open}
                                onClose={closeMenu}
                            >
                                <MenuItem onClick={userLogout}><LogoutIcon/>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <NavLink style={({ isActive }) =>({color: isActive ? '#efede5' : '#2d564e'})} to="/login">Login</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/signup">Signup</NavLink>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar