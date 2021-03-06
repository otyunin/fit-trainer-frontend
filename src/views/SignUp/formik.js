import { withFormik } from 'formik'
import * as Yup from 'yup'
import { signUp } from '../../redux/actions/auth.action'

const formik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    repeatPassword: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid... example@example.com'),
    password: Yup.string()
      .min(6, 'The minimum password length is 6')
      .matches(/^[a-zA-Z0-9]{6,30}$/, 'Password contains invalid characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, resetForm }) => {
    props.dispatch(signUp(values))
      .then(() => {
        resetForm()
        setStatus({ open: true, message: 'Confirm email address to complete registration' })
        setSubmitting(false)
      })
      .catch(() => {
        setStatus({ open: true })
        setTimeout(() => setStatus({ open: false }), 6000)
        setSubmitting(false)
      })
  },
  displayName: 'SignUp',
})

export default formik
