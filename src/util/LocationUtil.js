export function splitLastWordFromLocation (location) {
  const arr = location.pathname.split('/')
  return arr[arr.length - 1]
}
