import { createSlice } from '@reduxjs/toolkit'

function compareAnecdoteVotes(anec1, anec2) {
    if(anec1.votes < anec2.votes) return 1
    if(anec1.votes > anec2.votes) return -1
    if(anec1.votes === anec2.votes) return 0
}

const initialState = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
]

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: initialState,
    reducers: {
        createNew(state,action) {
            return [...state, action.payload].sort(compareAnecdoteVotes)
        }
    }
})

export const { createNew } = anecdoteSlice.actions 
  
export default anecdoteSlice.reducer