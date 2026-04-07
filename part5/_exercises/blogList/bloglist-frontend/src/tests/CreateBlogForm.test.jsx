import { render, screen } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm'
import { assert, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const testBlogData = {
  title:'testTitle',
  author:'testAuthor',
  url:'testUrl',
  likes:0
}

test('Create blog event is called with the right blog details',
  async () => {

    const createBlogMockHandler = vi.fn()
    render(<CreateBlogForm createBlog={createBlogMockHandler}/>)

    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('title:')
    await user.type(titleInput, testBlogData.title)
    const authorInput = screen.getByLabelText('author:')
    await user.type(authorInput, testBlogData.author)
    const urlInput = screen.getByLabelText('url:')
    await user.type(urlInput, testBlogData.url)

    screen.debug()
    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    // eslint-disable-next-line no-unused-vars
    const { likes, ...blogDataWithNoLikes } = testBlogData
    console.log(createBlogMockHandler.mock.calls)
    assert.deepStrictEqual(
      createBlogMockHandler.mock.calls[0][0],
      blogDataWithNoLikes)
  })