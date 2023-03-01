import Footer from './components/Footer'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification />
      <Router>
        <Menu />
      </Router>
      <Footer />
    </div>
  )
}

export default App
