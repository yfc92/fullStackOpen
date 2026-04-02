import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const testBlogData = {
  title:'testTitle',
  author:'testAuthor',
  url:'testUrl',
  likes:0
}

test('Render title/author but not url/likes', () => {

  const { container } = render(<Blog blog={testBlogData}/>)

  //screen.debug()

  //confirm testTitle
  screen.getByText(`${testBlogData.title} ${testBlogData.author}`)

  //   //confirm testAuthor
  //   await screen.findByText('testAuthor')

  //confirm likes doesn't exist
  const likesElement = container.querySelector('#blog-likes')
  expect(likesElement).toBeNull()

  //confirm testUrl doesn't exist
  const urlElement = container.querySelector('#blog-url')
  expect(urlElement).toBeNull()
})

test('URL and likes are shown when view button is clicked',
  async() => {
    const { container } = render(<Blog blog={testBlogData}/>)
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    //screen.debug()

    const likesElement = container.querySelector('#blog-likes')
    expect(likesElement).toBeVisible()

    //confirm testUrl doesn't exist
    const urlElement = container.querySelector('#blog-url')
    expect(urlElement).toBeVisible()
  })

test('like button is clicked twice', async () => {

  const addLikeMockHandler = vi.fn()

  render(<Blog blog={testBlogData} addLike={addLikeMockHandler}/>)
  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  //screen.debug()

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLikeMockHandler.mock.calls).toHaveLength(2)
})