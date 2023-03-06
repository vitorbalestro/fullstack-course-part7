import { Link } from 'react-router-dom'
import DisplayUser from './User'
import ToggableCreateNewBlogForm from './ToggableCreateForm'


const Menu = ({ dispatch }) => {

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <div>
                <Link style={padding} to="/blogs">blogs</Link>
                <Link style={padding} to="/users">users</Link>
                <DisplayUser dispatch={dispatch} />
            </div>
            <div>
                <ToggableCreateNewBlogForm />
            </div>
        </div>
    )
}

export default Menu