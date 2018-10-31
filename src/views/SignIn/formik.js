import { withFormik } from 'formik'
import * as Yup from 'yup'
import { push } from 'connected-react-router'
import { signIn } from '../../redux/actions/auth.action'

const formik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid... example@example.com'),
    password: Yup.string()
      .min(6, 'The minimum password length is 6')
      .matches(/^[a-zA-Z0-9]{6,30}$/, 'Password contains invalid characters')
      .required('Password is required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(signIn(values))
      .then(() => {
        setSubmitting(false)
        props.dispatch(push('/'))
      })
      .catch(() => setSubmitting(false))
  },
  displayName: 'SignIn',
})

export default formik
