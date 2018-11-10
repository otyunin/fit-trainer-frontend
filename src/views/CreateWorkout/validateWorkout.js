import Joi from 'joi'

const workoutSchema = Joi.object().keys({
  exercise: Joi.string().required().label('Field'),
  repeats: Joi.number().min(0).required().label('Field'),
  measurement: Joi.number().min(0).required().label('Field'),
})

const workoutsSchema = Joi.array().items(workoutSchema)

const validateWorkout = (workouts) => {
  const { error } = Joi.validate(workouts, workoutsSchema, { abortEarly: false, allowUnknown: true })
  let result = []
  if (error) {
    result = error.details.map(errorDetail => ({
      path: errorDetail.path,
      message: errorDetail.message.replace(/"/g, '').replace('Field', ''),
    }))
  }
  return result
}

export default validateWorkout
