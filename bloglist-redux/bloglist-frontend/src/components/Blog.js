import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className='blog' style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>&nbsp;
        </div>
    )
}

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)
    return(
        <>
            <h2>Blogs</h2>
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        </>
    )
}

export default Blogs