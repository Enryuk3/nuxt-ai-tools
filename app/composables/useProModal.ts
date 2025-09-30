export default () => {
  const isOpen = ref(false)

  const toggleModalState = (modalState: boolean) => {
    isOpen.value = modalState
  }

  return {
    isOpen,
    toggleModalState,
  }
}
