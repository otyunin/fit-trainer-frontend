export const handleClickUp = (target, array) => {
  let newArray = []
  if (target !== 0) {
    newArray = array.map((item, index) => {
      if (index === target - 1) {
        item.order += 1
      }
      if (index === target) {
        item.order -= 1
      }
      return item
    })
    return newArray
  }
  newArray = array.map((item, index) => {
    if (index > target) {
      item.order -= 1
    }
    if (index === target) {
      item.order = array.length - 1
    }
    return item
  })
  return newArray
}

export const handleClickDown = (target, array) => {
  let newArray = []
  if (target !== array.length - 1) {
    newArray = array.map((item, index) => {
      if (index === target + 1) {
        item.order -= 1
      }
      if (index === target) {
        item.order += 1
      }
      return item
    })
    return newArray
  }
  newArray = array.map((item, index) => {
    if (index < target) {
      item.order += 1
    }
    if (index === target) {
      item.order = 0
    }
    return item
  })
  return newArray
}
