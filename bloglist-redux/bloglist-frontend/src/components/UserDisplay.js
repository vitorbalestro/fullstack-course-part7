const BlogDisplay = ({ blog }) => {
    return (
        <li>
            {blog.title}
        </li>
    )
}

const UserDisplay = ({ user }) => {

    if(!user) return null

    const blogs = user.blogs
    return (
        <div>
            <div className='mt-5'>
                <h1>{user.name}</h1>
            </div>
            <div className='mt-5'>
                <h2>added blogs</h2>
            </div>
            <div className='mt-5'>
                <ul>
                    {blogs.map(blog => <BlogDisplay blog={blog} key={blog.id} />)}
                </ul>
            </div>
        </div>
    )

}

export default UserDisplay