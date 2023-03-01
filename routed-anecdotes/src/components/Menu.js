import {
    Routes, Route, Link, useMatch
  } from 'react-router-dom'
import Home from './Home'
import About from './About'
import CreateNew from './CreateNew'
import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'


const Menu = () => {

    const anecdotes = useSelector( state => state.anecdotes )
    const match = useMatch('/anecdotes/:id')
    const anecdote = match 
      ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
      : null

    const padding = {
      paddingRight: 5
    }

    return (
      <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/new">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        
        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreateNew />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    )
  }

export default Menu