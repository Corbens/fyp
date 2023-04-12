import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'


const Settings = () => {

    return(
        <div>
            <h1>Settings</h1>
            <FormControlLabel control={<Checkbox/>} label="Enable Furigana/Ruby Where Supported" />
        </div>
    )
}

export default Settings