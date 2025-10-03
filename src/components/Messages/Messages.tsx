import type { FC } from 'react'

import styles from './Messages.module.css'

type MessagesProps = {
  messages: string[]
  onClear?: VoidFunction
}

const Messages: FC<MessagesProps> = ({ messages, onClear }) => (
  <div>
    <h2 className={styles.title}>Messages</h2>

    <button
      disabled={!messages.length}
      className={styles.clearButton}
      onClick={() => onClear?.()}
    >
      Clear messages
    </button>

    {messages.map((message, index) => (
      <div key={index}>{message}</div>
    ))}
  </div>
)

export default Messages
