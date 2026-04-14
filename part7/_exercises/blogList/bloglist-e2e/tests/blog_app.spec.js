const { test, expect, beforeEach, describe } = require('@playwright/test')
const { 
  loginWith, 
  createBlog, 
  getBlogLink
} = require('./helper')
const { title } = require('node:process')

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

  describe('Login', () =>{
    test('succeeds with correct username/password', async ({page}) =>{
      await loginWith(page, 'testUser1', 'testUser1Password')
      await expect(page.getByRole('button',{ name:'new blog'})).toBeVisible()
      await expect(page.getByRole('button',{ name:'log out'})).toBeVisible()
    })

    test('fails with incorrect username/password', async ({page}) =>{
      await loginWith(page, 'testUser1', 'wrong')
      await expect(page.locator('.error')).toContainText(`Wrong username or password`)
    })
  })

  describe('when logged in', () =>{
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser1', 'testUser1Password')
      await expect(page.getByRole('button',{ name:'new blog'})).toBeVisible()
    })

    test('can create a blog', async ({page}) =>{
      //navigate to create blog
      //fill out blog form
      //submit form
      const testBlog = {
        title:'new test blog', 
        author: 'Test User 1', 
        url: 'testUser1Url'
      }
      await createBlog(page, testBlog)
      await expect(getBlogLink(page, testBlog.title, testBlog.author)).toBeVisible()
    })

    describe('When there are existing blogs', () =>{
      let numTestBlogs = 2
      beforeEach(async ({ page }) => {
        for(let i=0; i<numTestBlogs;i++){
          const newBlog ={ 
            title:`existing test blog ${i}`, 
            author: 'Test User 1', 
            url: `existingBlogUrl${i}`,
          }
          await createBlog(page, newBlog)
        }
      })

      test('can like multiple blogs', async ({page}) =>{
        //click on an existing blog
        
        const verifyLike = async () => {
          await expect(page.getByText('0 likes')).toBeVisible()
          await page.getByRole('button', {name:'like'}).click()
          // await likeButtonRow.waitFor()
          await expect(page.getByText('1 likes')).toBeVisible()
        }

        await getBlogLink(page, 'existing test blog 0', 'Test User 1').click()

        //click on an existing blog
        await verifyLike()

        await page.getByRole('button', { name: `blogs` }).click()
        await expect(getBlogLink(page, 'existing test blog 1', 'Test User 1')).toBeVisible()
        
        //click on another existing blog
        await getBlogLink(page, 'existing test blog 1', 'Test User 1').click()
        await verifyLike()
      })

      test('can delete a blog', async ({page}) =>{
        page.once('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`); // "Press a button!"
          expect(dialog.type()).toBe('confirm');              // Verify it's a confirm dialog
          
          await dialog.accept(); 
        })

        const blogTitle = 'existing test blog 0'
        const blogAuthor = 'Test User 1'

        await getBlogLink(page, blogTitle, blogAuthor).click()
        await page.getByRole('button', {name:'remove'}).click()
        await expect(page.locator('.statusUpdate')).toContainText(`Blog ${blogTitle} by ${blogAuthor} has been deleted`)
        await expect(getBlogLink(page, blogTitle, blogAuthor)).not.toBeVisible()
      })
    })
  })
})