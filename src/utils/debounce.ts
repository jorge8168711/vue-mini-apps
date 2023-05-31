export function debounce<T, CallbackReturn>(
  callback: (...args: T[]) => CallbackReturn,
  wait: number
) {
  let timerId: null | ReturnType<typeof setTimeout> = null

  return (...args: T[]) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      callback(...args)
    }, wait)
  }
}
