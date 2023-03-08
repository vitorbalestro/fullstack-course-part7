import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
    return(
        <tr>
            <td><Link class="link" to={`/users/${user.id}`}>{user.name}</Link>&nbsp;</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const AllUsers = () => {

    const allUsers = useSelector(state => state.allUsers)
    return (
        <div>
            <h2 className="mt-5">Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                    {allUsers.map(user => <User key={user.id} user={user} />)}
                </tbody>
            </Table>
        </div>

    )
}

export default AllUsers