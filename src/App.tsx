import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import SingleContact from './components/SingleContact'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="contacts/:id" element={<SingleContact />}></Route>
      </Routes>
    </>
  )
}

export default App
