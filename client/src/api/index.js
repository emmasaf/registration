export const getUsers = async () => {
  const request = await fetch(`http://localhost:5000/api/auth/users`)
  return await request.json()
}

export const postUser = async userData => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error posting user data:', error)
    throw error
  }
}

export const loginUser = async userData => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    localStorage.setItem('token', data.token)
    return data
  } catch (error) {
    console.error('Can not login:', error)
    localStorage.removeItem('token')
    throw error
  }
}

export const getUser = async data => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/user', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Can not find user:', error)
    throw error
  }
}

export const putUserData = async userData => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error posting user data:', error)
    throw error
  }
}
