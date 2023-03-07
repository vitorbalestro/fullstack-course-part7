
const DisplayComments = ({ blog }) => {

    return (
        <ul>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>
    )
}

export default DisplayComments