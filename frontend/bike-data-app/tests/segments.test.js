import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SegmentsPage from '../pages/segments'
import { segmentSearchJSON } from './fixtures/segments'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { page: '0' },
      asPath: '',
    }
  },
}))

// http://localhost:8080/db/container/@search?type_name=Segment&b_size=100&b_start=0&_sort_asc=title
const server = setupServer(
  rest.get(
    'http://localhost:8080/db/container/@search?type_name=Segment&b_size=100&b_start=0&_sort_asc=title',
    (req, res, ctx) => {
      return res(ctx.json(segmentSearchJSON))
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays segments', async () => {
  render(<SegmentsPage />)
  expect(await screen.findByText('First Segment')).toBeInTheDocument()
})
