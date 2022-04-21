// get date as 21 Apr 2022
export function getDate(date: Date) {
  new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }).format(date)
}

// get time as 09:12
export function getTime(date: Date) {
  new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }).format(date)
}
