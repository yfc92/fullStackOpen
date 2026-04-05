const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User 1',
        username: 'testUser1',
        password: 'testUser1Password'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Test User 2',
        username: 'testUser2',
        password: 'testUser2Password'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    // ... log in to the application to be visible
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () =>{
      test('succeeds with correct credentials', async ({page}) =>{
        await loginWith(page, 'testUser1', 'testUser1Password')
        
        await expect(page.getByText('Test User 1 logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({page}) =>{
        await loginWith(page, 'testUser1', 'wrong')
      })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser1', 'testUser1Password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, { 
        title:'new test blog', 
        author: 'Test User 1', 
        url: 'testUser1Url'
      })
      await expect(page.getByText('new test blog Test User 1')).toBeVisible()
    })

    describe('when there is a blog', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, { 
          title:'new test blog', 
          author: 'Test User 1', 
          url: 'testUser1Url'
        })
      })

      test('a blog can be liked', async ({ page }) => {
        
        //press view on the blog
        const likeButton = await page.getByText('new test blog Test User 1')
        await likeButton.getByRole('button', {name:'view'}).click()
        // const likeButtonRow = likeButton.locator('..')

        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', {name:'like'}).click()
        // await likeButtonRow.waitFor()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog gets removed by the blog\'s creator', async ({ page }) => {
        
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`); // "Press a button!"
            expect(dialog.type()).toBe('confirm');              // Verify it's a confirm dialog
            
            await dialog.accept(); 
        })

        //press view on the blog
        const likeButton = await page.getByText('new test blog Test User 1')
        await likeButton.getByRole('button', {name:'view'}).click()
        await page.getByRole('button', {name:'remove'}).click()

        const blogTitle = 'new test blog'
        const blogAuthor = 'Test User 1'
        await expect(page.locator('.statusUpdate')).toContainText(`Blog ${blogTitle} by ${blogAuthor} has been deleted`)
      })
      
      test('remove button is not visible when a blog is not created by the user', async ({ page }) => {
        
        //log out
        await page.getByRole('button', {name:'log out'}).click()

        //log in as 2nd user
        await loginWith(page, 'testUser2', 'testUser2Password')

        //press view on the existing blog
        const likeButton = await page.getByText('new test blog Test User 1')
        await likeButton.getByRole('button', {name:'view'}).click()

        //ensure that user does not see remove button on the blog created by 1st user
        await expect(page.getByRole('button', {name:'remove'})).not.toBeVisible()
      })
    })

    describe('When there are multiple blogs', () => {
      let numBlogs = 5
      beforeEach(async ({ page }) => {
        for(let i=0; i<numBlogs;i++){
          await createBlog(page, { 
            title:`test blog ${i}`, 
            author: 'Test User 1', 
            url: `testUserUrl${i}`,
          })
        }
      })

      test('blogs are sorted based on likes. most likes first', async({page}) => {
        
        const viewButtonLocator = await page.getByRole('button', { name: 'view' })

        // Verify the count
        await expect(viewButtonLocator).toHaveCount(numBlogs)

        ///NOTE: a view button disappears after clicking it.
        //therefore, we cannot use indexes, but instead click the first view button found until there's none left          
        for(let i=0;i<numBlogs;++i){
          const viewButton = await viewButtonLocator.first()
          const txt = await viewButton.locator('..').textContent()
          await viewButton.click()
          console.log(`view button clicked ${i}: ${txt}`)
        }

        ///add likes to blogs. testblog0 will have most likes, and testblog4 will have the least likes
        for(let i=numBlogs;i > 0;--i)
        {
          for(let j=0;j<i;++j){
            const currentLikeRow = await page.getByText(`likes ${j}`).first()
            const currentLikeButton = await currentLikeRow.getByRole('button', { name: 'like' })
            await currentLikeButton.click()
            await page.getByText(`likes ${j+1}`).waitFor()
            //console.log(`Like button finished waiting: i-${i},j-${j}`)
          }
        }

        const likeTexts = await page.getByText(/likes \d+/i).allTextContents();
        const actualLikes = likeTexts.map(text => parseInt(text.match(/\d+/)[0], 10));
        const sortedLikes = [...actualLikes].sort((a, b) => b - a);
        await expect(actualLikes).toEqual(sortedLikes);

        // // //get all the like rows
        // const likeLocators = await page.getByText(/likes: \d+/i).all()

        // // //retrieve number array for likes
        // let allLikes = []
        // for(const likeLocator of likeLocators){
        //   const text = await likeLocator.textContent()
        //   const match = text.match(/\d+/);
        //   const parsedInt = match ? parseInt(match[0], 10): null

        //   await expect(parsedInt).toBeTruthy()
        //   allLikes.push(parsedInt)
        // }
        
        // //make sure that the order of these like rows matches the intended order (most likes first)
        // const isDescending = allLikes.every((currentLikes, i) =>{
        //   if(i === allLikes.length - 1) return true
        //   return currentLikes >= allLikes[i + 1]
        // })

        // awaitexpect(isDescending).toBe(true)
      })
    })
  })
})