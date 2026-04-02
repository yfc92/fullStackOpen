import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  screen.debug()
  // const element = screen.getByText(
  //   'Component testing is done with react-testing-library',
  //   { exact:false })

  // await screen.findByText(
  //   'Component testing is done with react-testing-library')

  // const element = screen.queryByText('do not want this thing to be rendered')
  // expect(element).toBeNull()

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})