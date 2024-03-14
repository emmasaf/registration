import MainForm from '../components/MainForm'
import Profile from '../components/Profile'

const routesArr = [
  { id: 1, name: 'form', component: <MainForm />, path: '/' },
  {
    id: 2,
    name: 'Profile',
    component: <Profile />,
    path: '/profile',
  },
]
