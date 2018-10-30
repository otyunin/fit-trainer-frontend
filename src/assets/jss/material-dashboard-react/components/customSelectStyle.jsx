import dropdownStyle from 'assets/jss/material-dashboard-react/dropdownStyle.jsx'
import customInputStyle from './customInputStyle'

const customSelectStyle = theme => ({
  ...dropdownStyle(theme),
  ...customInputStyle,
})

export default customSelectStyle
