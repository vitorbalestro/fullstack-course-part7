import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setCreateNewNotification, clearNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = () => {

    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const payload = {
        content: content.value,
        author: author.value,
        info: info.value,
        id: Math.round(Math.random() * 10000),
        votes: 0
      }

      dispatch(createNew(payload))
      dispatch(setCreateNewNotification(payload.content))
      setTimeout(() => {dispatch(clearNotification())}, 5000)
      navigate('/')

    }
    
    const handleReset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form>
          <div>
            content
            <input {...content.inputParameters} />
          </div>
          <div>
            author
            <input {...author.inputParameters} />
          </div>
          <div>
            url for more info
            <input {...info.inputParameters} />
          </div>
          <button type='submit' onClick={handleSubmit}>create</button>
          <button type='submit' onClick={handleReset}>reset</button>
        </form>
        
        <div>&nbsp;</div>
      </div>
    )
  
  }

export default CreateNew