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
      .required('Exercise name is required'),
    measurement: Yup.string()
      .required('Measurement is required'),
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus, resetForm }) => {
    props.dispatch(createExercise(values))
      .then(() => {
        resetForm()
        setStatus({ openDialog: true, message: 'New exercise successfully created!' })
        setTimeout(() => setStatus({ openDialog: false }), 6000)
        setSubmitting(false)
      })
      .catch(() => {
        setStatus({ openDialog: true })
        setTimeout(() => setStatus({ openDialog: false }), 6000)
        setSubmitting(false)
      })
  },
  displayName: 'CreateExercise',
})

export default formik
