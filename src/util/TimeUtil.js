export function timestampToTime (times) {
  times = times.toLocaleString('en-US', { hour12: false }).split(' ')
  const time = times[1]
  let mdy = times[0]
  mdy = mdy.split('/')
  const month = parseInt(mdy[0])
  const day = parseInt(mdy[1])
  const year = parseInt(mdy[2])
  return year + '-' + month + '-' + day + ' ' + time
}
