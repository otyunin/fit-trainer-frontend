/* eslint-disable no-nested-ternary */
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
// core components
import customSelectStyle from 'assets/jss/material-dashboard-react/components/customSelectStyle.jsx'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.4 + ITEM_PADDING_TOP,
    },
  },
}

class CustomSelect extends React.Component {
  state = {
    selectedOption: '',
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
      showKey,
      returnKey,
      helperText,
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
          MenuProps={MenuProps}
        >
          {selectData.length > 0 ? (
            selectData.map((option, key) => [
              <MenuItem
                key={key}
                className={classes.dropdownItem}
                value={returnKey ? option[returnKey] : option}
              >
                {showKey ? option[showKey] : option}
              </MenuItem>,
            ])
          ) : (
            <MenuItem
              className={classes.dropdownItem}
              value={selectedOption}
              disabled
            >
              None
            </MenuItem>
          )}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
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
  showKey: PropTypes.string,
  returnKey: PropTypes.string,
  helperText: PropTypes.string,
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
  showKey: '',
  returnKey: '',
  helperText: '',
}

export default withStyles(customSelectStyle)(CustomSelect)
