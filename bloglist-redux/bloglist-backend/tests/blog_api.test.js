const { application } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

async function getStandardAuthToken() {

    const usersAtStart = await helper.usersInDb()
    const standardUser = usersAtStart[0]

    const userForToken = {
        username: standardUser.username,
        id: standardUser.id
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
}

beforeEach(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})

    const newUser = {
        username: 'vitorbalestro',
        name: 'Vitor Balestro',
        password: '123456'
    }

    await api 
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const newBlog = {
        title: 'test blog',
        author: 'someauthor',
        url: 'someurl',
        likes: 10
    }

    const token = await getStandardAuthToken()

    await api 
        .post('/api/blogs')
        .set({ authorization: `Bearer ${token}` })
        .send(newBlog)
        .expect(201)

})

describe('when there is initially one saved blog', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(1)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const blogTitles = response.body.map(blog => blog.title)
        expect(blogTitles).toContain('test blog')
    })
})

describe('viewing a specific blog', () => {

    test('a blog is correctly found by id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeFound = blogsAtStart[0]
        const result = await api.get(`/api/blogs/${blogToBeFound.id}`)
        expect(result.body.title).toBe(blogToBeFound.title)
        expect(result.body.url).toBe(blogToBeFound.url)
    })

    test('status 404 if the blog does not exist', async () =>{
        const missingId = await helper.nonExistingId()
        await api
            .get(`/api/blogs/${missingId}`)
            .expect(404)
    })

    test('status 400 if the id is invalid', async () => {
        const invalidId = 'invalidId'
        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('deletion of a blog', () => {

    test('status 200 if the id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        const token = await getStandardAuthToken()
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ authorization: `Bearer ${token}` })
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const blogTitles = blogsAtEnd.map(blog => blog.title)
        expect(blogTitles).not.toContain(blogToDelete.title)
    })

    test('status 200 if the id is invalid', async () =>{
        const invalidId = await helper.nonExistingId()
        const token = await getStandardAuthToken()
        await api
            .delete(`/api/blogs/${invalidId}`)
            .set({ authorization: `Bearer ${token}` })
            .expect(404)
    })
})

describe('updating a blog', () => {

    test('status 200 if the new info is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeUpdated = blogsAtStart[0]
        
        const token = await getStandardAuthToken()

        const updatedBlog = {
            title: 'Updated blog title',
            author: 'Updated blog author',
            url: 'Updated blog url',
            likes: 0
        }
        await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .set({ authorization: `Bearer ${token}` })
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].title).toBe('Updated blog title')
    })

    test('title is maintained if no new title is informed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeUpdated = blogsAtStart[0]

        const updatedBlog = {
            author: 'Updated blog author',
            url: 'Updated blog url',
            likes: 0
        }

        const token = await getStandardAuthToken()

        await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .set({ authorization: `Bearer ${token}` })
            .send(updatedBlog)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        const blogTitles = blogsAtEnd.map(blog => blog.title)
        expect(blogTitles).toContain(blogToBeUpdated.title)

    })

    test('url is maintained if no new url is informed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeUpdated = blogsAtStart[0]

        const updatedBlog = {
            title: 'Updated blog title',
            author: 'Updated blog author',
            likes: 0
        }

        const token = await getStandardAuthToken()

        await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .set({ authorization: `Bearer ${token}` })
            .send(updatedBlog)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        const blogUrls = blogsAtEnd.map(blog => blog.url)
        expect(blogUrls).toContain(blogToBeUpdated.url)


    })
})


describe('adding a new blog', () => {

    test('a valid blog can be added', async () => {
        const blogsAtStart = await helper.blogsInDb()
        
        const token = await getStandardAuthToken()

        const body = {
                title: 'Posting a new blog',
                author: 'some author',
                url: 'some url',
                likes: 0,
        }
        
        await api 
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(body)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

        const contents = blogsAtEnd.map(blog => blog.title)
        expect(contents).toContain('Posting a new blog')
    },1000000)

    test('not informed likes defaults to 0 likes', async () => {
        const newBlog = {
            title: 'some title',
            author: 'some author',
            url: 'some url'
        }

        const token = await getStandardAuthToken()

        const response = await api
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
        
        expect(response.body.likes).toBe(0)
    })

    test('not informed title returns status 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        
        const newBlog = {
            author: 'some author',
            url: 'some url'
        }

        const token = await getStandardAuthToken()

        await api
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('not informed url returns status 400', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const newBlog = {
            title: 'some title',
            author: 'some author',
        }

        const token = await getStandardAuthToken()

        await api
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
            .expect(400)
           
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('status 401 if the informed token is invalid', async () => {
        const newBlog = {
            title: 'some title',
            author: 'some author',
            url: 'some url'
        }

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpdG9yYmFsZXN0cm8iLCJpZCI6IjYzZjNhMTUwNzg5ZGZkNzZjZmZiNzNlMyIsImlhdCI6MTY3NjkyNTM1OX0.svTWkaUWGVJeLDOmjcgWhcLrH3gV_LPzzVdGL9-UWy0'
        

        await api
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
            .expect(401)
    })
})

describe('consistency of unique identifier', () => {
   
    test('id unique identifier', async () => {
        const newBlog = {
            title: 'some title',
            author: 'some author',
            url: 'some url',
            likes: 0
        }

        const token = await getStandardAuthToken()

        const response = await api
            .post('/api/blogs')
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
        
        expect(response.body.id).toBeDefined()

        const blogs = await helper.blogsInDb()
        const blogToCheck = blogs[0]

        expect(blogToCheck.id).toBeDefined()
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})