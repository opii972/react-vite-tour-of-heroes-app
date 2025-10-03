import { vi } from 'vitest'

import { act, render, screen, within } from '../../../test/test-utils.tsx'
import HeroSearch from './HeroSearch.tsx'

describe('HeroSearch', () => {
  beforeAll(() => {
    // https://vitest.dev/api/vi.html#vi-stubglobal
    vi.stubGlobal('jest', {
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    })
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Ensures all pending timers are flushed before switching to real timers
    // Reference: https://testing-library.com/docs/using-fake-timers/
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it("should display a search input and a list of the heroes' results", () => {
    // GIVEN
    // WHEN
    render(<HeroSearch heroes={[{ id: 1, name: 'lorem ipsum' }]} />)
    // THEN
    expect(screen.getByLabelText(/Hero Search/i)).toBeInTheDocument()

    const resultsList = screen.getByRole('list')
    expect(resultsList).toBeInTheDocument()

    const listItems = within(resultsList).getAllByRole('listitem')
    expect(listItems).toHaveLength(1)

    const [firstHero] = listItems
    const firstHeroLink = within(firstHero).getByRole('link', {
      name: /lorem ipsum/i,
    })
    expect(firstHeroLink).toBeInTheDocument()
    expect(firstHeroLink).toHaveAttribute('href', '/detail/1')
  })

  it('should only emit an onChange callback only if the input value is distinct from the last emitted onChange value', async () => {
    // GIVEN
    const onChangeSpy = vi.fn()
    // WHEN
    const { user: globalUser } = render(
      <HeroSearch
        heroes={[{ id: 1, name: 'lorem ipsum' }]}
        onChange={onChangeSpy}
      />
    )

    const user = globalUser.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    })

    // THEN
    const searchInput = screen.getByLabelText(/Hero Search/i)

    await user.type(searchInput, 'a')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    await user.type(searchInput, 'aa')

    act(() => {
      vi.advanceTimersByTime(10)
    })

    await user.type(searchInput, 'a')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'a')
  })
})
