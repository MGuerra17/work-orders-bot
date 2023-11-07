export function createDateTimeObject(date, time) {
  const dateParts = date.split('/')
  const day = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1
  const year = parseInt(dateParts[2])

  const timeParts = time.split(':')
  const hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])

  const dateTime = new Date(year, month, day, hours, minutes)

  return dateTime
}

export function getDateTimeInMilitaryFormat(dateTime) {
  if (dateTime == '') return ['', '']
  const day = dateTime.getDate().toString().padStart(2, '0')
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
  const year = dateTime.getFullYear()

  const hours = dateTime.getHours().toString().padStart(2, '0')
  const minutes = dateTime.getMinutes().toString().padStart(2, '0')

  return [`${day}/${month}/${year}`, `${hours}:${minutes}`]
}

export function adjustDateRange({ currentDateTime, initialDateTime, finalDateTime }) {
  const initialClone = new Date(initialDateTime)
  const finalClone = new Date(finalDateTime)

  if (initialDateTime > finalDateTime) {
    finalClone.setDate(finalClone.getDate() + 1)

    if (initialDateTime > finalClone) {
      return {
        initialDateTimeAdjusted: '',
        finalDateTimeAdjusted: '',
        error: 'Las fechas de la orden no son válidas. Por favor ingresarlas manualmente en la hoja de cálculo.'
      }
    }

    if (finalClone > currentDateTime) {
      finalClone.setDate(finalClone.getDate() - 1)
      initialClone.setDate(initialClone.getDate() - 1)

      if (finalClone > currentDateTime || initialClone > currentDateTime) {
        return {
          initialDateTimeAdjusted: '',
          finalDateTimeAdjusted: '',
          error: 'Las fechas de la orden no son válidas. Por favor ingresarlas manualmente en la hoja de cálculo.'
        }
      }
    }

    return {
      initialDateTimeAdjusted: initialClone,
      finalDateTimeAdjusted: finalClone,
      error: null
    }
  }

  if (finalDateTime > currentDateTime || initialDateTime > currentDateTime) {
    return {
      initialDateTimeAdjusted: '',
      finalDateTimeAdjusted: '',
      error:
        'Las fechas de la orden no son válidas debido a que son fechas futuras. Por favor ingresarlas manualmente en la hoja de cálculo.'
    }
  }

  return {
    initialDateTimeAdjusted: initialClone,
    finalDateTimeAdjusted: finalClone,
    error: null
  }
}

// Can add 1 day to finalDateTime
// const currentDateTime = new Date('2021-10-14T03:00:00.000Z')
// const initialDateTime = new Date('2021-10-13T23:00:00.000Z')
// const finalDateTime = new Date('2021-10-13T01:00:00.000Z')

// Can remove 1 day to initialDateTime
// const currentDateTime = new Date('2021-10-14T03:00:00.000Z')
// const initialDateTime = new Date('2021-10-14T23:00:00.000Z')
// const finalDateTime = new Date('2021-10-14T01:00:00.000Z')

// Can add 1 day to finalDateTime because both dates are in the past
// const currentDateTime = new Date('2021-10-14T03:00:00.000Z')
// const initialDateTime = new Date('2021-10-12T23:00:00.000Z')
// const finalDateTime = new Date('2021-10-12T01:00:00.000Z')

// Error because final date is before initial date and both dates are in the future
// const currentDateTime = new Date('2021-10-14T03:00:00.000Z')
// const initialDateTime = new Date('2021-10-15T23:00:00.000Z')
// const finalDateTime = new Date('2021-10-15T01:00:00.000Z')

// Error because both dates are in the future
// const currentDateTime = new Date('2021-10-14T03:00:00.000Z')
// const initialDateTime = new Date('2021-10-15T23:00:00.000Z')
// const finalDateTime = new Date('2021-10-16T01:00:00.000Z')

// Do nothing because final date is after initial date and both dates are in the past
// const currentDateTime = new Date('2021-10-13T23:00:00.000Z')
// const initialDateTime = new Date('2021-10-13T14:00:00.000Z')
// const finalDateTime = new Date('2021-10-13T16:00:00.000Z')

// const currentDateTime = new Date('2023-11-01T02:22:00.000Z')
// const initialDateTime = new Date('2023-11-01T11:00:00.000Z')
// const finalDateTime = new Date('2023-11-01T01:00:00.000Z')

// console.log(adjustDateRange({ currentDateTime, initialDateTime, finalDateTime }))
