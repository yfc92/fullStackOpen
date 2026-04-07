const { test, expect, beforeEach, describe } = require('@playwright/test')
const { 
  loginWith, 
  createBlog, 
  openBlogFromList,
  openBlogLink
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
      await page.getByRole('link', { name: `login` }).click()
      await loginWith(page, 'testUser1', 'testUser1Password')
      await expect(page.getByRole('link',{ name:'new blog'})).toBeVisible()
      await expect(page.getByRole('button',{ name:'log out'})).toBeVisible()
    })

    test('fails with incorrect username/password', async ({page}) =>{
      await page.getByRole('link', { name: `login` }).click()
      await loginWith(page, 'testUser1', 'wrong')
      await expect(page.locator('.error')).toContainText(`Wrong username or password`)
      await expect(page.getByRole('link',{ name:'login'})).toBeVisible()
      //verify wrong password
    })
  })

  describe('when logged in', () =>{
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: `login` }).click()
      await loginWith(page, 'testUser1', 'testUser1Password')
      await expect(page.getByRole('link',{ name:'new blog'})).toBeVisible()
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
      await expect(page.getByRole('link', {name:`${testBlog.title} by ${testBlog.author}`})).toBeVisible()
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
          await expect(page.getByText('likes 0')).toBeVisible()
          await page.getByRole('button', {name:'like'}).click()
          // await likeButtonRow.waitFor()
          await expect(page.getByText('likes 1')).toBeVisible()
        }

        await openBlogLink(page, 'existing test blog 0', 'Test User 1')

        //click on an existing blog
        await verifyLike()

        await page.getByRole('link', { name: `blogs` }).click()
        await expect(page.getByRole('link', {name:'existing test blog 1 by Test User 1'})).toBeVisible()
        
        //click on another existing blog
        await openBlogLink(page, 'existing test blog 1', 'Test User 1')
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

        await openBlogLink(page, blogTitle, blogAuthor)
        await page.getByRole('button', {name:'remove'}).click()
        await expect(page.locator('.statusUpdate')).toContainText(`Blog ${blogTitle} by ${blogAuthor} has been deleted`)
        await expect(page.getByRole('link', {name:`${blogTitle} by ${blogAuthor}`})).not.toBeVisible()
      })
    })
  })
})