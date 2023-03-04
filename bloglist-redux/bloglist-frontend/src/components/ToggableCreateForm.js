import Toggable from './Toggable'
import CreateNewBlogForm from './Create'
import { useRef } from 'react'

const ToggableCreateNewBlogForm = () => {

    const createNewBlogFormRef = useRef()

    return (
        <Toggable buttonLabel="create new blog" id='createNewButton' ref={createNewBlogFormRef}>
            <CreateNewBlogForm createNewBlogFormRef={createNewBlogFormRef}/>
        </Toggable>
    )
}

export default ToggableCreateNewBlogForm