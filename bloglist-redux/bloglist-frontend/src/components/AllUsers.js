import { useSelector } from 'react-redux'

const User = ({ user }) => {
    return(
        <tr>
            <td>{user.name}</td>
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
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {allUsers.map(user => <User key={user.id} user={user} />)}
            </table>
        </div>

    )
}

export default AllUsers