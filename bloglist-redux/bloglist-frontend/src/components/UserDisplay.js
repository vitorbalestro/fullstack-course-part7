const BlogDisplay = ({ blog }) => {
    return (
        <li>
            {blog.title}
        </li>
    )
}

const UserDisplay = ({ user }) => {

    const blogs = user.blogs
    return (
        <>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {blogs.map(blog => <BlogDisplay blog={blog} key={blog.id} />)}
            </ul>
        </>
    )

}

export default UserDisplay