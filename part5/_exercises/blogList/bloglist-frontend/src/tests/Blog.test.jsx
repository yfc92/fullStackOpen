import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const testBlogData = {
  title:'testTitle',
  author:'testAuthor',
  url:'testUrl',
  likes:2,
  user: {
    username: 'testUser1'
  }
}

const testUser = {
  username: 'testUser1'
}

test('Unauthenticated users see blog info but no buttons', () => {
  render(<Blog blog={testBlogData} />)
  //header
  screen.getByText(`${testBlogData.author}: ${testBlogData.title}`)
  //url
  screen.getByText(testBlogData.url)
  //likes
  screen.getByText(`likes ${testBlogData.likes}`)

  //like button is absent
  const likeButton = screen.queryByRole('button', { name:/like/i })
  expect(likeButton).toBeNull()

  //remove button is absent
  const removeButton = screen.queryByRole('button', { name:/remove/i })
  expect(removeButton).toBeNull()
})


test(`Authenticated users who are not the blog's creator 
  are shown only the like button`, () => {
  const nonCreatorUser = {
    username: 'testUser2'
  }

  render(<Blog blog={testBlogData}
    user={nonCreatorUser}
  />)

  //like button is present
  screen.getByRole('button', { name:/like/i })

  //remove button is absent
  const removeButton = screen.queryByRole('button', { name:/remove/i })
  expect(removeButton).toBeNull()
})

test('Blog\'s creator is shown the remove button', () => {
  render(<Blog blog={testBlogData}
    user={testUser}
  />)

  //like button is present
  screen.getByRole('button', { name:/like/i })

  //remove button is present
  screen.getByRole('button', { name:/remove/i })
})


// test('Render title/author but not url/likes', () => {

//   const { container } = render(<Blog blog={testBlogData}/>)

//   //screen.debug()

//   //confirm testTitle
//   screen.getByText(`${testBlogData.title} ${testBlogData.author}`)

//   //   //confirm testAuthor
//   //   await screen.findByText('testAuthor')

//   //confirm likes doesn't exist
//   const likesElement = container.querySelector('#blog-likes')
//   expect(likesElement).toBeNull()

//   //confirm testUrl doesn't exist
//   const urlElement = container.querySelector('#blog-url')
//   expect(urlElement).toBeNull()
// })

// test('URL and likes are shown when view button is clicked',
//   async() => {
//     const { container } = render(<Blog blog={testBlogData}/>)
//     const user = userEvent.setup()

//     const viewButton = screen.getByText('view')
//     await user.click(viewButton)
//     //screen.debug()

//     const likesElement = container.querySelector('#blog-likes')
//     expect(likesElement).toBeVisible()

//     //confirm testUrl doesn't exist
//     const urlElement = container.querySelector('#blog-url')
//     expect(urlElement).toBeVisible()
//   })

// test('like button is clicked twice', async () => {

//   const addLikeMockHandler = vi.fn()

//   render(<Blog blog={testBlogData} addLike={addLikeMockHandler}/>)
//   const user = userEvent.setup()

//   const viewButton = screen.getByText('view')
//   await user.click(viewButton)

//   //screen.debug()

//   const likeButton = screen.getByText('like')
//   await user.click(likeButton)
//   await user.click(likeButton)

//   expect(addLikeMockHandler.mock.calls).toHaveLength(2)
//})