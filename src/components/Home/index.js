/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useReducer} from 'react'
import Header from '../Header'
import UserStories from '../UsersStories'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import PostItem from '../PostItem'
import apiRequestPromise from '../apiRequest'
import {useDetails} from '../../context/UserPostsContext'

import {
  LoaderContainer,
  BodyContainer,
  HomeRoute,
  UserPostsListEl,
} from './styledComponents'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const initialState = {
  usersStoriesList: [],
  usersStoriesApiStatus: apiStatus.initial,
  userPostsList: [],
  userPostsApiStatus: apiStatus.initial,
  searchInput: '',
}

const userStoriesReducer = (state, action) => {
  switch (action.type) {
    case apiStatus.loading:
      return {...state, usersStoriesApiStatus: apiStatus.loading}
    case apiStatus.success:
      return {
        ...state,
        usersStoriesList: action.payload,
        usersStoriesApiStatus: apiStatus.success,
      }
    case apiStatus.failure:
      return {...state, usersStoriesApiStatus: apiStatus.failure}
    default:
      return state
  }
}

const userPostsReducer = (state, action) => {
  switch (action.type) {
    case apiStatus.loading:
      return {...state, userPostsApiStatus: apiStatus.loading}
    case apiStatus.success:
      return {
        ...state,
        userPostsList: action.payload,
        userPostsApiStatus: apiStatus.success,
      }
    case apiStatus.failure:
      return {...state, usersPostsApiStatus: apiStatus.failure}
    default:
      return state
  }
}

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [storiesState, storiesDispatch] = useReducer(
    userStoriesReducer,
    initialState,
  )
  const [postsState, postsDispatch] = useReducer(userPostsReducer, initialState)
  const value = useDetails()
  const {setUserPosts} = value
  const fetchUserStories = async () => {
    storiesDispatch({type: apiStatus.loading})
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    try {
      const data = await apiRequestPromise({method: 'GET', apiUrl})
      const usersStoriesList = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      storiesDispatch({type: apiStatus.success, payload: usersStoriesList})
    } catch (error) {
      storiesDispatch({type: apiStatus.failure})
    }
  }
  const fetchUserPosts = async () => {
    postsDispatch({type: apiStatus.loading})
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    try {
      const data = await apiRequestPromise({method: 'GET', apiUrl})
      const userPostsList = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        isLiked: false,
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      postsDispatch({type: apiStatus.success, payload: userPostsList})
      setUserPosts(userPostsList)
    } catch (error) {
      postsDispatch({type: apiStatus.failure})
    }
  }
  useEffect(() => {
    fetchUserStories()
    fetchUserPosts()
  }, [])

  useEffect(() => {
    fetchUserPosts()
  }, [searchInput])

  const renderUsersStories = () => {
    const {usersStoriesList} = storiesState
    return <UserStories usersStoriesDetails={usersStoriesList} />
  }

  const renderLoaderView = () => <LoadingView />

  const tryAgainFetch = () => {
    fetchUserStories()
    fetchUserPosts()
  }

  const renderHomeFailureView = () => (
    <div className="home-failure-view-container">
      <img
        src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646452421/alert-triangle_b3w5vg.svg"
        alt="failure view"
        className="home-failure-view-image"
      />
      <h1 className="home-failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        onClick={fetchUserPosts}
        className="home-failure-view-button"
      >
        Try again
      </button>
    </div>
  )

  const renderFailureView = () => {
    const {usersStoriesApiStatus, userPostsApiStatus} = postsState
    if (
      userPostsApiStatus === usersStoriesApiStatus ||
      usersStoriesApiStatus === 'FAILURE'
    ) {
      return <FailureView tryAgainFetch={tryAgainFetch} />
    }
    return renderHomeFailureView()
  }

  const renderAllUsersStories = () => {
    const {usersStoriesApiStatus} = storiesState
    switch (usersStoriesApiStatus) {
      case 'SUCCESS':
        return renderUsersStories()
      case 'LOADING':
        return <LoaderContainer>{renderLoaderView()}</LoaderContainer>
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  const renderUserPosts = () => {
    const {userPostsList} = postsState
    return (
      <>
        {userPostsList.length > 0 ? (
          <UserPostsListEl>
            {userPostsList.map(each => (
              <PostItem
                key={each.postId}
                userPostDetails={each}
                comments={each.comments}
              />
            ))}
          </UserPostsListEl>
        ) : (
          <div className="search-not-found-container">
            <img
              src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646411751/GroupsearchNotFound_xxrrzm.jpg"
              alt="search not found"
              className="search-not-found-image"
            />
            <h1 className="search-not-found-heading">Search Not Found</h1>
            <p className="search-not-found-description">
              Try different keyword or search again
            </p>
          </div>
        )}
      </>
    )
  }

  const renderUsersAllPosts = () => {
    const {userPostsApiStatus, usersStoriesApiStatus} = postsState
    switch (userPostsApiStatus) {
      case 'SUCCESS':
        if (usersStoriesApiStatus === 'FAILURE') {
          return null
        }
        return renderUserPosts()
      case 'LOADING':
        return renderLoaderView()
      case 'FAILURE':
        if (usersStoriesApiStatus === 'FAILURE') {
          return null
        }
        return renderFailureView()
      default:
        return null
    }
  }

  const searchPostCaption = caption => {
    setSearchInput(caption)
  }
  return (
    <HomeRoute>
      <Header searchPostCaption={searchPostCaption} />
      <BodyContainer>
        {renderAllUsersStories()}
        {renderUsersAllPosts()}
      </BodyContainer>
    </HomeRoute>
  )
}

export default Home
