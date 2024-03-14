import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/actionCreator'
import { useNavigate } from 'react-router-dom'

import withErrorAlert from '../hoc/ErrorWrapper'
import EditModal from '../features/EditModal'
import PasswordChangeModal from '../features/PasswordChangeModal'

function Profile() {
  const { user } = useSelector(state => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [passwordEditMode, setPasswordEditMode] = useState(false)

  const dispatch = useDispatch()
  const nav = useNavigate()

  const initials =
    user?.name?.charAt(0).toUpperCase() + user?.surname?.charAt(0).toUpperCase()

  const onLogout = () => {
    dispatch(logout())
    nav('/')
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }
  const togglePasswordEditMode = () => {
    setPasswordEditMode(!passwordEditMode)
  }
  return (
    <div>
      <div className="bg-primary p-3 text-white d-flex justify-content-between align-items-centermb-4">
        <h2>User Profile</h2>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center ">
        <div
          className="rounded-circle d-flex flex-column align-items-center justify-content-center bg-primary text-white p-3 mb-3"
          style={{ fontSize: '24px', width: '100px', height: '100px' }}
        >
          {initials || 'NS'}
        </div>
        <div className="d-flex align-items-center gap-3 justify-content-center ">
          <h4>
            {user?.name} {user?.surname}
          </h4>
          <button
            className="btn btn-dark mr-2"
            onClick={togglePasswordEditMode}
          >
            Change Password
          </button>
        </div>
        <p>Email: {user?.email}</p>
        <p>Birthday: {user?.birthday}</p>
        <p>Gender: {user?.gender}</p>

        <button className="btn btn-secondary mr-2" onClick={toggleEditMode}>
          Edit
        </button>
      </div>
      <EditModal show={editMode} onClose={toggleEditMode} />
      <PasswordChangeModal
        show={passwordEditMode}
        onClose={togglePasswordEditMode}
      />
    </div>
  )
}

export default withErrorAlert(Profile)
