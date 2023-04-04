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

    const [home, setHome] = useState(true)
    const getColour = (active) => { //this function is required as navlink only highlights plain text, not a jsx (e.g. h1) element inside of navlink.
        if(active){
            setHome(true)
            return '#efede5'
        }else{
            setHome(false)
            return '#2d564e'
        }
    }
    //https://stackoverflow.com/questions/65356812/blazor-navlink-style-stops-working-when-included-as-component
    //similar issue, could try this way if can make it neater and easier to understand. 
    
    return(
        <header>
            <div className="container">
                <NavLink style={({ isActive }) => ({color: isActive ? getColour(true) : getColour(false)})} exact to="/">
                    <h1 style={{color: home ? '#efede5' : '#2d564e'}}>Learn Japanese</h1> 
                </NavLink>
                <nav>
                    {user && ( 
                        <div>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/dragdrop">Drag & Drop</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/flashcards">Flashcards</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : '#2d564e'})} to="/kanji">Kanji</NavLink>
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