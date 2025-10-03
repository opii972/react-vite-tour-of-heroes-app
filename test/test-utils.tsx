import '@testing-library/jest-dom'

import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import { PointerEventsCheckLevel, userEvent } from '@testing-library/user-event'
import type { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router'

import InMemoryDataContextProvider from '../src/contexts/InMemoryDataContext/InMemoryDataContextProvider.tsx'
import MessageContextProvider from '../src/contexts/MessageContext/MessageContextProvider.tsx'

type UserType = ReturnType<typeof userEvent.setup>

type RenderFunc = (
  ui: ReactElement,
  options?: RenderOptions,
  wrapper?: JSXElementConstructor<{ children: ReactNode }>
) => RenderResult & { user: UserType }

const customRender: RenderFunc = (ui, options) => ({
  user: userEvent.setup({
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  }),
  ...render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <MessageContextProvider>
          <InMemoryDataContextProvider>{children}</InMemoryDataContextProvider>
        </MessageContextProvider>
      </MemoryRouter>
    ),
    ...options,
  }),
})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export { customRender as render }
