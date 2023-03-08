
const DisplayComments = ({ blog }) => {

    return (
        <div className='mt-3'>
            <ul>
                {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default DisplayComments