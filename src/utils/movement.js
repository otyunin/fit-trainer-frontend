export function handleClickUp(target) {
  const { workoutExercises, exercises } = this.state
  const array = workoutExercises || exercises

  if (target !== 0) {
    const newWorkout = array.map((item, index) => {
      if (index === target - 1) {
        item.order += 1
      }
      if (index === target) {
        item.order -= 1
      }
      return item
    })
    if (workoutExercises) this.setState({ workoutExercises: newWorkout })
    else this.setState({ exercises: newWorkout })
  } else {
    const newWorkout = array.map((item, index) => {
      if (index > target) {
        item.order -= 1
      }
      if (index === target) {
        item.order = array.length - 1
      }
      return item
    })
    if (workoutExercises) this.setState({ workoutExercises: newWorkout })
    else this.setState({ exercises: newWorkout })
  }
}

export function handleClickDown(target) {
  const { workoutExercises, exercises } = this.state
  const array = workoutExercises || exercises

  if (target !== array.length - 1) {
    const newWorkout = array.map((item, index) => {
      if (index === target + 1) {
        item.order -= 1
      }
      if (index === target) {
        item.order += 1
      }
      return item
    })
    if (workoutExercises) this.setState({ workoutExercises: newWorkout })
    else this.setState({ exercises: newWorkout })
  } else {
    const newWorkout = array.map((item, index) => {
      if (index < target) {
        item.order += 1
      }
      if (index === target) {
        item.order = 0
      }
      return item
    })
    if (workoutExercises) this.setState({ workoutExercises: newWorkout })
    else this.setState({ exercises: newWorkout })
  }
}

export function addExercises() {
  const { workoutExercises } = this.state
  const body = { exercise: {}, repeats: 0, measurement: 0, order: workoutExercises.length }
  workoutExercises.push(body)
  this.setState({ workoutExercises })
}
