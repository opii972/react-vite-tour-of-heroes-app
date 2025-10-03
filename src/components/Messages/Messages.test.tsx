import { describe, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils.tsx'
import Messages from './Messages.tsx'

describe('Messages', () => {
  it('should display a title and a disabled clear button', () => {
    // GIVEN
    // WHEN
    render(<Messages messages={[]} />)
    // THEN
    expect(
      screen.getByRole('heading', { level: 2, name: /messages/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Clear messages/i })
    ).toBeDisabled()
  })

  it('should display one message and an enabled clean button', async () => {
    // GIVEN
    const onClearSpy = vi.fn()
    // WHEN
    const { user } = render(
      <Messages messages={['lorem ipsum']} onClear={onClearSpy} />
    )
    // THEN
    const clearButton = screen.getByRole('button', { name: /Clear messages/i })

    expect(clearButton).toBeInTheDocument()
    expect(clearButton).not.toBeDisabled()

    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument()

    await user.click(clearButton)

    expect(onClearSpy).toHaveBeenCalledTimes(1)
  })
})
