import Blogs from './Blog'
import ToggableCreateNewBlogForm from './ToggableCreateForm'

const BlogsPage = () => {

    return (
        <div>
            <div>
                <ToggableCreateNewBlogForm />
            </div>
            <div>
                <Blogs />
            </div>
        </div>
    )
}

export default BlogsPage