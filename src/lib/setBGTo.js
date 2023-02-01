export let setBGTo = (target, setTo) => {
  target?.classList?.forEach((value) => {
    if (value.indexOf('bg-') === 0) {
      target.classList.remove(value)
    }
  })
  if (setTo) {
    target?.classList?.add(setTo)
  }
}
