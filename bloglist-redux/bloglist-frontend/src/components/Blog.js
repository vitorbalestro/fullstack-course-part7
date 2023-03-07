import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blog }) => {

    return (
        <tr>
            <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>&nbsp;
            </td><td>
                {blog.author}
            </td>
        </tr>
    )
}

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)
    return(
        <>
            <h2 className="mt-5">Blogs</h2>
            <div>
                <Table striped>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Blogs