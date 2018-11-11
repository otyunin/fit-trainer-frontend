export const measurements = [
  {
    type: 'centimeters',
    abbreviation: 'cm',
  },
  {
    type: 'metres',
    abbreviation: 'm',
  },
  {
    type: 'kilometres',
    abbreviation: 'km',
  },
  {
    type: 'milligrams',
    abbreviation: 'mg',
  },
  {
    type: 'grams',
    abbreviation: 'g',
  },
  {
    type: 'kilograms',
    abbreviation: 'kg',
  },
  {
    type: 'seconds',
    abbreviation: 'sec',
  },
  {
    type: 'minutes',
    abbreviation: 'min',
  },
  {
    type: 'hours',
    abbreviation: 'h',
  },
]

export const getAbbreviation = type => {
  if (type) {
    const result = measurements.find(measurement => measurement.type === type)
    if (!result) return ''
    return result.abbreviation
  }
  return ''
}
