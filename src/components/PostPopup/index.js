/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useReducer} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import LoadingView from '../LoadingView'
import apiRequest from '../apiRequest'
import useLocalStorage from '../useLocalStorage'

/*
you can import styledComponent (optional)

import {ReactPopup, PopupBgContainer, CloseButton} from './styledComponents'
*/

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const initialState = {
  postsList: [],
  apiStatus: apiStatus.initial,
}

const postsPopupReducer = (state, action) => {
  switch (action.type) {
    case apiStatus.loading:
      return {...state, apiStatus: apiStatus.loading}
    case apiStatus.success:
      return {
        ...state,
        postsList: action.payload,
        apiStatus: apiStatus.success,
      }
    case apiStatus.failure:
      return {...state, apiStatus: apiStatus.failure}
    default:
      return state
  }
}

const PostPopUp = props => {
  const [postsState, postDispatch] = useReducer(postsPopupReducer, initialState)
  const {postObject, alt} = props
  const {image, id} = postObject
  const [likeStatus, setLikeStatus] = useLocalStorage(id, false)

  const fetchPostDetails = async () => {
    postDispatch({type: apiStatus.loading})
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    try {
      const data = await apiRequest({method: 'GET', apiUrl})
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
      postDispatch({type: apiStatus.success, payload: userPostsList})
    } catch (error) {
      postDispatch({type: apiStatus.failure})
    }
  }

  const fetchLikeStatus = async () => {
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const body = JSON.stringify({like_status: likeStatus})
    try {
      await apiRequest({method: 'POST', apiUrl, body})
    } catch (error) {
      setLikeStatus(likeStatus)
    }
  }

  useEffect(() => {
    fetchPostDetails()
  }, [])

  useEffect(() => {
    fetchLikeStatus()
  }, [likeStatus])

  const renderPopupView = () => {
    const {postsList} = postsState
    const filteredPostDetails = postsList.filter(each => each.postId === id)
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      createdAt,
      comments,
    } = filteredPostDetails[0]
    return (
      <div className="pop-up-image-and-content">
        <img
          src={postDetails.imageUrl}
          className="pop-up-image"
          alt="popup post"
        />
        <div className="popup-item-content">
          <div className="popup-top-content-container">
            <Link to={`/users/${userId}`} className="popup-link-item">
              <img
                src={profilePic}
                alt="popup post author profile"
                className="popup-post-author-profile"
              />
              <h1 className="popup-post-heading">{userName}</h1>
            </Link>
            <Link to={`/users/${userId}`} className="popup-link-item">
              <img
                src={profilePic}
                alt="popup post author profile"
                className="popup-post-author-profile"
              />
              <h1 className="popup-post-heading">{userName}</h1>
              <p className="popup-caption">{postDetails.caption}</p>
            </Link>
            <p className="popup-created-at-post">{createdAt}</p>
            {comments.map(each => {
              const length = each.userId.length > 14
              const wrap = length ? '...' : ''
              const commentProfileList = postsList.filter(
                eachPost => eachPost.userId === each.userId,
              )
              return (
                <div key={each.userId} className="popup-comment-container">
                  <img
                    src={commentProfileList[0].profilePic}
                    alt="popup post author profile"
                    className="popup-post-author-profile"
                  />
                  <p className="popup-comment">
                    {each.userId.slice(0, 14)}
                    {wrap}
                    {'   '}
                    <span className="popup-span">{each.comment}</span>
                  </p>
                </div>
              )
            })}
          </div>
          <div className="popup-bottom-content-container">
            <div className="popup-icons-container">
              <button type="button" className="popup-button">
                {likeStatus ? (
                  <FcLike
                    size="20"
                    color="#F05161"
                    onClick={() => setLikeStatus(!likeStatus)}
                  />
                ) : (
                  <BsHeart
                    size="20"
                    onClick={() => setLikeStatus(!likeStatus)}
                  />
                )}
              </button>
              <button type="button" className="popup-button">
                <FaRegComment size="20" color="#475569" />
              </button>
              <button type="button" className="popup-button">
                <BiShareAlt size="20" color="#475569" />
              </button>
            </div>
            <p className="popup-likes-count">
              {likeStatus ? parseInt(likesCount) + 1 : likesCount} likes
            </p>
            <p className="popup-created-at">{createdAt}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderPopupViewDetails = () => {
    switch (postsState.apiStatus) {
      case 'SUCCESS':
        return renderPopupView()
      case 'LOADING':
        return <LoadingView />
      default:
        return null
    }
  }
  return (
    <Popup
      trigger={
        <li className="profile-post-item">
          <img src={image} alt={alt} className="profile-post-image" />
        </li>
      }
      modal
    >
      {close => (
        <div className="post-popup-bg-container">
          <button
            className="post-popup-close-button"
            type="button"
            onClick={close}
          >
            <RiCloseLine color="#ffffff" size="35" />
          </button>
          {renderPopupViewDetails()}
        </div>
      )}
    </Popup>
  )
}

export default PostPopUp
