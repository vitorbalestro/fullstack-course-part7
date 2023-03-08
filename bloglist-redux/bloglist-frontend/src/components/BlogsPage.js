import Blogs from './Blog'
import ToggableCreateNewBlogForm from './ToggableCreateForm'

const BlogsPage = () => {

    return (
        <div>
            <div className="mt-3">
                <ToggableCreateNewBlogForm />
            </div>
            <div>
                <Blogs />
            </div>
        </div>
    )
}

export default BlogsPage