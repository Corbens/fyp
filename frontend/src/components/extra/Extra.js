import { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PropTypes from 'prop-types'

import Settings from './Settings'
import FAQs from './FAQs'
import Resources from './Resources'

// following from https://mui.com/material-ui/react-tabs/
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <div>
                {children}
            </div>
            )}
        </div>
    )
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}
// end 

const Extra = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    return(
        <div className="extraDiv">
            <div>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Settings" {...a11yProps(0)} />
                    <Tab label="FAQs" {...a11yProps(1)} />
                    <Tab label="Resources" {...a11yProps(2)} />
                </Tabs>
            </div>
            <div>
                <TabPanel value={value} index={0}>
                    <Settings/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FAQs/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Resources/>
                </TabPanel>
            </div>
        </div>
    )
}

export default Extra