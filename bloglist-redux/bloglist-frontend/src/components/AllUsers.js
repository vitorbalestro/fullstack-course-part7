import { useSelector } from 'react-redux'

const User = ({ user }) => {
    return(
        <div>
            {user.name}
        </div>
    )
}

const AllUsers = () => {

    const allUsers = useSelector(state => state.allUsers)
    return (
        <div>
            {allUsers.map(user => <User key={user.id} user={user} />)}
        </div>

    )
}

export default AllUsers