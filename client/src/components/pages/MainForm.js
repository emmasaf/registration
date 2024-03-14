import { useEffect } from 'react'
import LogInForm from '../widgets/LogInForm'
import RegistrationForm from '../widgets/RegistrationForm'
import { useSearchParams } from 'react-router-dom'
import withErrorAlert from '../hoc/ErrorWrapper'
import { useDispatch } from 'react-redux'
// import { someError } from '../redux/actions/actionCreator'

function MainForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const dispatch = useDispatch()

  const handleTabChange = tab => {
    setSearchParams({ tab })
  }

  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: 'login' })
    }
    // dispatch(someError(null))
  }, [setSearchParams, tab,dispatch])

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs ">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </li>
      </ul>
      <div className="tab-content mt-2">
        {tab === 'login' && <LogInForm />}
        {tab === 'register' && <RegistrationForm />}
      </div>
    </div>
  )
}

export default withErrorAlert(MainForm)
