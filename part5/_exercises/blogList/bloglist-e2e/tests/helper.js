const loginWith = async (page, username, password) =>{
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, { title, author, url }) =>{
  // await page.getByRole('button', {name: 'create new blog'}).click()
  await page.getByRole('link', {name: 'new blog'}).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByRole('button', {name: 'create'}).click()
  //await page.getByText(`${title} ${author}`).waitFor()
  // await page.(`${title} by ${author}`).waitFor()
  await page.locator('.statusUpdate', {hasText: `A new blog ${title} by ${author} added`}).waitFor()
  await page.getByRole('link', {name:`${title} by ${author}`}).waitFor()
}

const openBlogFromList = async (page, index=0) => {
  // /^.+ by .+ \(.*?\)$/
  const links = page.getByRole('link', { name: /^.+ by .+ \(.*?\)$/ })

  const count = await links.count()
  console.log('Number of blog links found', count)

  const targetLink = links.nth(index)
  await targetLink.click()
}

const openBlogLink = async (page, blogTitle, blogAuthor) => {
  const link = page.getByRole('link', { name: `${blogTitle} by ${blogAuthor}` })
  await link.click()
}

module.exports = {
  loginWith, 
  createBlog,
  openBlogFromList,
  openBlogLink
}