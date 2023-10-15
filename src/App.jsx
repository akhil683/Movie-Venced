import { Route, Routes } from 'react-router-dom'

import Header from './components/header'
import Cards from './components/Cards'
import AddMovie from './components/AddMovie'
import Details from './components/Details'

const App = () => {
  return (
      <div className='relative'>
        <Header/>
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='addmovie' element={<AddMovie />} />
          <Route path='/details/:id' element={<Details />} />
        </Routes>
      </div>
  )
}
export default App
