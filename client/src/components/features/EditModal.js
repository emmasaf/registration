import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { editUser, getUserData } from '../../redux/actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

function EditModal({ show, onClose }) {
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const onEdit = data => {
    data.email = user.email
    data.id = user.id
    dispatch(editUser(data))
    dispatch(getUserData())
    onClose()
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[A-Za-z]{2,}$/,"Name must start with uppercase letter,and contain more than 1 symbol"),
    surname: Yup.string().required('Surname is required').matches(/^[A-Za-z]{2,}$/,"Surname must start with uppercase letter,and contain more than 1 symbol"),
    birthday: Yup.date().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
  })
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: user.name,
            surname: user.surname,
            email: user.email,
            birthday: user.birthday,
            gender: user.gender,
          }}
          onSubmit={onEdit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <Field
                  className={`form-control ${
                    errors.name && touched.name ? 'is-invalid' : ''
                  }`}
                  type="text"
                  id="name"
                  name="name"
                  required
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname:</label>
                <Field
                  className={`form-control ${
                    errors.surname && touched.surname ? 'is-invalid' : ''
                  }`}
                  type="text"
                  id="surname"
                  name="surname"
                  required
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div
                className="form-group"
                title="email is not allowed to be changed"
              >
                <label htmlFor="email">Email:</label>
                <Field
                  disabled
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Birthday:</label>
                <Field
                  className={`form-control ${
                    errors.birthday && touched.birthday ? 'is-invalid' : ''
                  }`}
                  type="date"
                  id="birthday"
                  name="birthday"
                  required
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <Field
                  as="select"
                  className={`form-control ${
                    errors.gender && touched.gender ? 'is-invalid' : ''
                  }`}
                  id="gender"
                  name="gender"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="invalid-feedback"
                />
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

export default EditModal
