import { createContext } from 'react'

import type { MessageAPI } from '../../types/MessageAPI.tsx'

const MessageContext = createContext<MessageAPI | undefined>(undefined)

export default MessageContext
