import 'bootstrap/dist/css/bootstrap.min.css'
import MainForm from './components/pages/MainForm'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './components/pages/Profile'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserData } from './redux/actions/actionCreator'
function App() {
  const dispatch = useDispatch()
  const nav = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUserData())
      nav("/profile")
    }else{
      nav("/?tab=login")
    } //eslint-disable-next-line
  }, [localStorage.getItem('token')])
  return (
      <Routes>
        <Route key={1} path="/" element={<MainForm />} />
        <Route key={2} path="/profile" element={<Profile />} />
      </Routes>
  )
}

export default App
