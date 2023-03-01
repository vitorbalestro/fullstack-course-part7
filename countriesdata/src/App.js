import { useState } from 'react'
import DisplayCountries from './components/display.js'
import { useCountry } from './hooks'

const App = () => {

  const [filter, setFilter] = useState(null)

  const hook = useCountry(filter)

  const handleFilter = (event) => setFilter(event.target.value)
  
  
  return( 
    <div>
      <form> 
        find countries: &nbsp;
        <input onChange = {handleFilter} value={filter ? filter : ''} />
      </form>
      <DisplayCountries countries={hook.countries} filter={filter} notFound={hook.notFound} />
    </div>
  )
}

export default App;