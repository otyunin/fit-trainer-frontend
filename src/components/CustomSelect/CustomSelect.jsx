import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
// core components
import customSelectStyle from 'assets/jss/material-dashboard-react/components/customSelectStyle.jsx'

class CustomSelect extends React.Component {
  state = {
    selectedOption: '',
  }

  componentDidMount() {
    const { selectData } = this.props

    if (selectData.length > 0) {
      this.setState({ selectedOption: selectData[0] })
    }
  }

  handleChange = event => {
    this.setState({ selectedOption: event.target.value })
  }

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success,
      selectData,
      value,
    } = this.props

    const { selectedOption } = this.state

    const labelClasses = classNames({
      [` ${classes.labelRootError}`]: error,
      [` ${classes.labelRootSuccess}`]: success && !error,
    })
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true,
    })
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined,
    })
    return (
      <FormControl
        {...formControlProps}
        className={`${formControlProps.className} ${classes.formControl}`}
      >
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Select
          onChange={this.handleChange}
          value={value || selectedOption}
          classes={{
            root: marginTop,
            disabled: classes.disabled,
          }}
          className={underlineClasses}
          id={id}
          {...inputProps}
        >
          {selectData.length > 0 ? (
            selectData.map((option, key) => [
              <MenuItem
                key={key}
                className={classes.dropdownItem}
                value={option}
              >
                {option}
              </MenuItem>,
            ])
          ) : (
            <MenuItem
              className={classes.dropdownItem}
              value={selectedOption}
            >
              None
            </MenuItem>
          )}
        </Select>
        {error ? (
          <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
        ) : success ? (
          <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
        ) : null}
      </FormControl>
    )
  }
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  selectData: PropTypes.array,
  value: PropTypes.string,
}

CustomSelect.defaultProps = {
  labelText: '',
  labelProps: {},
  id: '',
  inputProps: {},
  formControlProps: {},
  error: false,
  success: false,
  selectData: [],
  value: undefined,
}

export default withStyles(customSelectStyle)(CustomSelect)
