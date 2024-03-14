import React  from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const withErrorAlert = WrappedComponent => {
  const ErrorAlert = () => {
    const { error } = useSelector(state => state.auth)

    return (
      <>
        {error?.type && (
          <Alert
            variant={error?.type === 'error' ? 'danger' : 'success'}
            className="mt-3"
          >
            {error?.message}
          </Alert>
        )}
        <WrappedComponent />
      </>
    )
  }

  return ErrorAlert
}

export default withErrorAlert
