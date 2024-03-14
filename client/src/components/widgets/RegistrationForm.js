import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, setRegUser } from '../../redux/actions/actionCreator'
import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

export default function RegistrationForm() {
  const dispatch = useDispatch()
  const { regUser, error } = useSelector(s => s.auth)

  const [sp, setSP] = useSearchParams()
  const tab = sp.get('tab')

  const handleSubmit = values => {
    dispatch(registerUser(values))
  }

  useEffect(() => {
    if (regUser) {
      // dispatch(someError({type:'success',message:'Successfully registered'}))
      setSP({ tab: 'login' })
    }
    return () => dispatch(setRegUser(null))
  }, [regUser, setSP, error, tab, dispatch])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[A-Za-z]{2,}$/,"Name must start with uppercase letter,and contain more than 1 symbol"),
    surname: Yup.string().required('Surname is required').matches(/^[A-Za-z]{2,}$/,"Surname must start with uppercase letter,and contain more than 1 symbol"),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/,
        'email is invalid',
      ),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#.$%-^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one special character, and be at least 8 characters long',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    birthday: Yup.date().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
  })

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            birthday: '',
            gender: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  className={`form-control ${
                    errors.name && touched.name ? 'is-invalid' : ''
                  }`}
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  autoComplete="current-name"
                  required
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <Field
                  type="text"
                  className={`form-control ${
                    errors.surname && touched.surname ? 'is-invalid' : ''
                  }`}
                  id="surname"
                  name="surname"
                  placeholder="Enter surname"
                  autoComplete="current-surname"
                  required
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <Field
                  type="email"
                  className={`form-control ${
                    errors.email && touched.email ? 'is-invalid' : ''
                  }`}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="current-email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    errors.password && touched.password ? 'is-invalid' : ''
                  }`}
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Current Password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'is-invalid'
                      : ''
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  required
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  Birthday
                </label>
                <Field
                  type="date"
                  className={`form-control ${
                    errors.birthday && touched.birthday ? 'is-invalid' : ''
                  }`}
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
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <Field
                  as="select"
                  className={`form-select ${
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
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="invalid-feedback"
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
