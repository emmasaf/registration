import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login, setLoginUser } from '../../redux/actions/actionCreator'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function LogInForm() {
  const dispatch = useDispatch()
  const { logedUser, regUser } = useSelector(state => state.auth)
  const nav = useNavigate()

  const handleSubmit = values => {
    dispatch(login(values))
  }

  useEffect(() => {
    if (logedUser?.id && localStorage.getItem('token')) {
      nav('/profile')
    }

    return () => dispatch(setLoginUser(null))
  }, [logedUser, nav, dispatch])

  useEffect(() => {
    if (regUser?.id) {
      // dispatch(someError({ message: 'User was registered', type: 'success' }))
    }
  }, [regUser,dispatch])

  const validationSchema = Yup.object().shape({
    email:Yup.string()
    .required('Email is required')
    .matches( // eslint-disable-next-line 
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/,
      'email is invalid',
    ),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#.$%-^&*])(?=.{8,})/,
        'Password must contain at least one uppercase letter, one special character, and be at least 8 characters long',
      ),
  })

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
