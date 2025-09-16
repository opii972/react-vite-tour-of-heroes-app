export type MessageAPI = {
  messages: string[]
  add: (message: string) => void
  clear: VoidFunction
}
