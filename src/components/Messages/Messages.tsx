import { useMessage } from '../../hooks/useMessage.ts'
import styles from './Messages.module.css'

const Messages = () => {
  const { messages, clear } = useMessage()

  const handleClear = () => clear()

  return (
    <div>
      <h2 className={styles.title}>Messages</h2>

      <button
        disabled={!messages?.length}
        className={styles.clearButton}
        onClick={handleClear}
      >
        Clear messages
      </button>

      {messages?.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  )
}

export default Messages
