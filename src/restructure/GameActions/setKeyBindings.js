import { handleKeyEvents } from './'

export default function setKeyBindings(document) {
  document.removeEventListener('keydown', handleKeyEvents)
  document.removeEventListener('keyup', handleKeyEvents)
  document.addEventListener('keydown', handleKeyEvents)
  document.addEventListener('keyup', handleKeyEvents)
}
