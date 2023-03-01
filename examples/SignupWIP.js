import { useState, useEffect } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mask, setMask] = useState('')
    const [hide, setHide] = useState(true)
    const {signup, error, isLoading} = useSignup()

    useEffect(() => {
        console.log(password)
    }, [password])

    // attempt to signup based on user inputs
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    const handlePassword = (e) => { //talk about how as unicode character can be two bytes, its length the emoji is counted as two so have to do this to get the "real" length
        console.log([...e.target.value].length)
        for(let i = 0; i < e.target.value.length; i++){
            console.log(e.target.value[i])
        }
        if(e.target.value.length === 0){//if you ctrl-a
            setPassword("")
            setMask("")
        }else{ 
            let inpLength; // "real" length
            if(hide){ //if using hide symbols
                if(e.target.value.length%2 === 0){ //if even (i.e. pressed backspace as each hide symbol takes length 2)
                    inpLength = e.target.value.length/2 //set length ("real" length) to be half (as hide = 2*normal)
                }else{ //if odd (i.e. a character has been pressed)
                    inpLength = ((e.target.value.length-1)/2)+1 //set ("real") length to be length-1/2
                }
            }else{
                inpLength = e.target.value.length
            }
            if(password.length > inpLength){ //this would mean that a backspace has been pressed
                setPassword(password.substring(0,password.length-1)) //set n length password to be the first n characters of the password
            }else{ //a character has been pressed
                setPassword(password + e.target.value.substring(e.target.value.length-1)) //make password = password + character
            }
            setMask("㊙️".repeat(inpLength))
        }
        
        //notes: this method basically works
        //if you try to do backspace, no matter where your cursor is, it will remove the most recently typed character
        //if you delete certain characters when hidden, it only deletes the most recent
        //issue is if you paste an input, it only adds the very last one. this might have to do with the hacky method. 


        ///https://stackoverflow.com/questions/53071774/reactjs-delay-onchange-while-typing

        //maybe have a a timer, so you only execute handlePassword after a timer (e.g. 10ms). this is so low, so that if you paste two
        //characters hopefully it will be fine, but if you do one it will also be fine
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => handlePassword(e)}
                value={hide ? mask : password}
                
            />
            <label>Hide:</label>
            <input 
                type="checkbox"
                onChange={(e) => setHide(!hide)}
                value={hide}
                defaultChecked
            />
            <label>Username:</label>

            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup