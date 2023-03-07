import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return(
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link>&nbsp;</td>
            <td align="right">{user.blogs.length}</td>
        </tr>
    )
}

const AllUsers = () => {

    const allUsers = useSelector(state => state.allUsers)
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {allUsers.map(user => <User key={user.id} user={user} />)}
                </tbody>
            </table>
        </div>

    )
}

export default AllUsers