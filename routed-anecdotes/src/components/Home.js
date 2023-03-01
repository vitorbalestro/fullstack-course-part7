import AnecdoteList from './AnecdoteList'
import { useSelector } from 'react-redux'

const Home = () => {


    const anecdotes = useSelector( state => state.anecdotes )
    return <AnecdoteList anecdotes={anecdotes} />
    
}

export default Home