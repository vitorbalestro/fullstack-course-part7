/* this module contains the event handlers of routes.
roughly speaking, this configures what the server does 
when there is a requisition to a certain route.

The root of the route is informed by the importing module. This is
the reason why 'api/blogs' is omitted from the parameters.*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
/*const User = require('../models/user')
const jwt = require('jsonwebtoken')*/


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => { 
    const blog = await Blog.findById(request.params.id)
    if(blog){
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

   /* const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })

    } 
    
    const user = await User.findById(decodedToken.id)*/

    const user = request.user

    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,  
        likes: body.likes,
        user: user._id
    })
    

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    /*const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken) {
        return response.status(401).json({ error: 'invalid token' })
    }*/
    /*const requestingUser = await User.findById(decodedToken.id)
    const requestingUserId = requestingUser.id*/

    /*if(!requestingUser) {
        return response.status(401).json({ error: 'user not found' })
    }*/

    const requestingUserId = request.user.id

    const blogToRemove = await Blog.findById(request.params.id)
    if(!blogToRemove) {
        response.status(404).json({ error: 'blog not found'})
    }

    const blogUser = blogToRemove.user
    const blogUserId = blogUser._id.toString()

    if(requestingUserId !== blogUserId) {
        return response.status(401).json({ error: 'unauthorized user' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).end()
})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const userId = request.user.id

    const blogToUpdate = await Blog.findById(request.params.id)
    if(!blogToUpdate) {
        return response.status(404).json({ error: 'blog not found' })
    }

    const blogUserId = blogToUpdate.user._id.toString()

    if(blogUserId !== userId) {
        return response.status(401).json({ error: 'unauthorized user' })
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog= await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter