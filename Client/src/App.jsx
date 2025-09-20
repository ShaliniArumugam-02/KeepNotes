import {Routes,Route} from 'react-router-dom'
import Home from '../src/pages/Home';
import CreateNote from './pages/CreateNote';
import NoteDetail from './pages/NoteDetail';

function App() {
 

  return (
    <>
 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createnote' element= {<CreateNote/>}/>
        <Route path='/note/:id' element={<NoteDetail/>} />
      </Routes>
    </>
  )
}

export default App
