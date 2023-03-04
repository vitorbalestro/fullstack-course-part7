// IMPORTANT: configure "type":"module" in package.json before running any test.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import blogModel from './Blog'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import getLoggedUserId from '../utils/user'
import CreateNewBlogForm from '../components/Create'


const blog = {
    title: 'Testing blog',
    author: 'Some author',
    url: 'http://someurl.com',
    likes: 0,
    user: {
        id: getLoggedUserId()
    }
}


function setRefreshBlogList(bool) {
    return true
}

describe('renders blog content', () => {


    test('visible title at start', () => {

        render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList}/>)

        const title = screen.getByText('Testing blog')
        expect(title).toBeDefined()

    })

    test('non-visible author at start', () => {

        render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList}/>)

        const author = screen.queryByText('Some author')
        expect(author).toBeNull()
    })

    test('non-visible url at start', () => {

        render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList}/>)

        const url = screen.queryByText('http://someurl.com')
        expect(url).toBeNull()
    })

    test('get element by className', () => {

        const { container } = render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList}/>)
        const div = container.querySelector('.viewButton')
        expect(div).toHaveTextContent('view')
    })
})

describe('clicking buttons', () => {

    test('view button click calls handler once', async () => {

        const user = userEvent.default.setup()

        const mockHandler = jest.fn()
        const { container } = render(<blogModel.ViewButton setView={mockHandler}/>)
        const viewButton = container.querySelector('.viewButton')
        await user.click(viewButton)
        expect(mockHandler).toBeCalled()



    })

    test('author visible when button clicked', async () => {
        const user = userEvent.default.setup()

        const { container } = render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList} />)
        const viewButton = container.querySelector('.viewButton')
        await user.click(viewButton)

        screen.getByText('Some author')
    })

    test('url visible when button clicked', async () => {
        const user = userEvent.default.setup()
        const { container } = render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList} />)
        const viewButton = container.querySelector('.viewButton')
        await user.click(viewButton)

        screen.getByText('http://someurl.com')

    })

    test('likes visible when button clicked', async () => {
        const user = userEvent.default.setup()
        const { container } = render(<blogModel.Blog blog={blog} setRefreshBlogList={setRefreshBlogList} />)
        const viewButton = container.querySelector('.viewButton')
        await user.click(viewButton)

        screen.getByText('likes 0')

    })

    test('event handler called twice if like button clicked twice', async () => {

        const user = userEvent.default.setup()
        const mockHandler = jest.fn()
        const { container } = render(<blogModel.LikeButton blog={blog} setRefreshBlogList={setRefreshBlogList}
            handleClick={mockHandler} />)
        const likeButton = container.querySelector('.likeButton')

        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })
})

test('<CreateNewBlogFor calls onSubmit and pass correct typed info /> ', async () => {
    const createBlog = jest.fn()
    const user = userEvent.default.setup()

    const { container } = render(<CreateNewBlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('blog title')
    const inputAuthor = screen.getByPlaceholderText('blog author')
    const inputUrl = screen.getByPlaceholderText('blog url')

    await user.type(inputTitle, 'testing blog title')
    await user.type(inputAuthor, 'testing blog author')
    await user.type(inputUrl, 'testing blog url')

    const createButton = container.querySelector('.createButton')
    expect(createButton).toHaveTextContent('create')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing blog url')

})
