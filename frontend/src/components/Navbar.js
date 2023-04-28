import { useState, useRef } from 'react'
import { NavLink } from "react-router-dom"

import LogoutIcon from '@mui/icons-material/Logout'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    // retrieve from user context. store in user context.

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
    const getColour = (active) => { //this function is required as navLink usually only highlights plain text, not a jsx (e.g. h1) element inside of navLink.
        if(active){
            setHome(true)
            return '#efede5'
        }else{
            setHome(false)
            return 'black'
        }
    }
    
    return(
        <header>
            <div className="container">
                <NavLink style={({ isActive }) => ({color: isActive ? getColour(true) : getColour(false)})} exact to="/">
                    <div className="title">
                    <h1 class="stroke-shadow">コーベンの日本語</h1>
                    <h4 style={{color: home ? '#efede5' : 'black'}}>Learn Japanese</h4> 
                    </div>
                </NavLink>
                <nav>
                    {user && ( 
                        <div>
                            {!user.japanese ?
                            <div>
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/lessons">Lessons</NavLink>
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/dragdrop">Drag & Drop</NavLink>
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/flashcards">Flashcards</NavLink>
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/kanji">Kanji</NavLink>  
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
                            :
                            <div className="spaceDivs">
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/習い事">習い事</NavLink>
                                 ・
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/ドラッグ＆ドロップ">ドラッグ＆ドロップ</NavLink>
                                 ・
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/フラッシュカード">フラッシュカード</NavLink>
                                 ・
                                <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/漢字のゲーム">漢字のゲーム</NavLink>     
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
                            }
                        </div>
                    )}
                    {!user && (
                        <div>
                            <NavLink style={({ isActive }) =>({color: isActive ? '#efede5' : 'black'})} to="/login">Login</NavLink>
                            <NavLink style={({ isActive }) => ({color: isActive ? '#efede5' : 'black'})} to="/signup">Signup</NavLink>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar