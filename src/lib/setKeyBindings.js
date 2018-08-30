import { handleKeyEventsAction } from './GameActions'

export default function setKeyBindings(document) {
  document.removeEventListener('keydown', handleKeyEventsAction)
  document.removeEventListener('keyup', handleKeyEventsAction)
  document.addEventListener('keydown', handleKeyEventsAction)
  document.addEventListener('keyup', handleKeyEventsAction)
}
