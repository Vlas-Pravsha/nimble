import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import SingleContact from './components/SingleContact'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="contacts/:id" element={<SingleContact />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
