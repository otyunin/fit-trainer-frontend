import dropdownStyle from 'assets/jss/material-dashboard-react/dropdownStyle.jsx'

const createExerciseStyle = theme => ({
  ...dropdownStyle(theme),
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

export default createExerciseStyle
