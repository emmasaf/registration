import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { editUser, getUserData } from '../../redux/actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

function PasswordChangeModal({ show, onClose }) {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const onEdit = data => {
    data = {
      ...user,
      password: data.newPassword,
    }
    dispatch(editUser(data))
    dispatch(getUserData())
    onClose()
  }
  const validationSchema = Yup.object().shape({
    actualPassword: Yup.string()
      .oneOf([user.password, null], 'Password is wrong')
      .required('Confirm Password is required'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#.$%-^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one special character, and be at least 8 characters long',
      ),
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            actualPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          }}
          onSubmit={onEdit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Actual Password
                  </label>
                  <Field
                    type="password"
                    className={`form-control ${
                      errors.actualPassword && touched.actualPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="actualPassword"
                    name="actualPassword"
                    placeholder="Actual Password"
                    autoComplete="current-password"
                    required
                  />
                  <ErrorMessage
                    name="actualPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <Field
                    type="password"
                    className={`form-control ${
                      errors.newPassword && touched.newPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                    autoComplete="current-password"
                    required
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Repeat New Password
                  </label>
                  <Field
                    type="password"
                    className={`form-control ${
                      errors.repeatNewPassword && touched.repeatNewPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                  />
                  <ErrorMessage
                    name="repeatNewPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <Button variant="primary" className="mt-2" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default PasswordChangeModal
