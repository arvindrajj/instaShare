import {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/userProfile'
import ProtectedRoute from './components/ProtectedRoute'
import BadPath from './components/BadPath'
import UserPostsContext from './context/UserPostsContext'

const App = () => {
  const [userPosts, setUserPosts] = useState([])

  return (
    <UserPostsContext.Provider
      value={{
        userPosts,
        setUserPosts,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route exact path="/bad-path" component={BadPath} />
        <Redirect to="/bad-path" />
      </Switch>
    </UserPostsContext.Provider>
  )
}

export default App
