import {createContext, useContext} from 'react'

const UserPostsContext = createContext({
  userPosts: [],
  setUserPosts: () => {},
})

export const useDetails = () => useContext(UserPostsContext)
export default UserPostsContext
