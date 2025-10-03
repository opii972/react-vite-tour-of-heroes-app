import { type FC, type ReactNode, useState } from 'react'

import MessageContext from './MessageContext.tsx'

type MessageContextProviderProps = {
  children: ReactNode
}

const MessageContextProvider: FC<MessageContextProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<string[]>([])

  const add = (message: string) => setMessages([...messages, message])

  const clear = () => setMessages([])

  return (
    <MessageContext
      value={{
        messages,
        add,
        clear,
      }}
    >
      {children}
    </MessageContext>
  )
}

export default MessageContextProvider
