import { withFormik } from 'formik'
import * as Yup from 'yup'
import { createExercise } from '../../redux/actions/exercises.action'

const formik = withFormik({
  mapPropsToValues: () => ({
    name: '',
    measurement: '',
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    measurement: Yup.string()
      .required('Measurement is required'),
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, resetForm }) => {
    props.dispatch(createExercise(values))
      .then(() => {
        resetForm()
        setStatus({ open: true, message: 'New exercise successfully created!' })
        setTimeout(() => setStatus({ open: false }), 6000)
        setSubmitting(false)
      })
      .catch(() => {
        setStatus({ open: true })
        setTimeout(() => setStatus({ open: false }), 6000)
        setSubmitting(false)
      })
  },
  displayName: 'CreateExercise',
})

export default formik
