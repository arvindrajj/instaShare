/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import useLocalStorage from '../useLocalStorage'
import apiRequest from '../apiRequest'

import {
  PostContainer,
  ProfileLink,
  ProfileImageEl,
  Heading,
  PostImageEl,
  PostContentContainer,
  IconsContainer,
  ButtonEl,
  HighlightedPara,
  Para,
  CommentContainer,
  SpanEl,
  CreatedAtPara,
} from './styledComponents'

const PostItem = props => {
  const [message, setMessage] = useState('Post has been disliked')
  const {userPostDetails} = props
  const {postId} = userPostDetails
  const [likeStatus, setLikeStatus] = useLocalStorage(postId, false)

  const fetchLikeStatus = async () => {
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const body = JSON.stringify({like_status: likeStatus})
    try {
      const data = await apiRequest({method: 'POST', apiUrl, body})
      setMessage(data.message)
    } catch (error) {
      setMessage(message)
    }
  }

  useEffect(() => {
    fetchLikeStatus()
  }, [likeStatus])

  const {
    userId,
    userName,
    profilePic,
    postDetails,
    createdAt,
    comments,
    likesCount,
  } = userPostDetails
  const latestComments = comments.slice(0, 2)

  const renderLikesCount = () => {
    let count = likesCount
    switch (message) {
      case 'Post has been liked':
        count += 1
        return count
      case 'Post has been disliked':
        return count
      default:
        return likesCount
    }
  }

  const onClickLikeButton = () => {
    setLikeStatus(true)
  }

  const onClickUnlikeButton = () => {
    setLikeStatus(false)
  }

  return (
    <PostContainer data-testid="postItem">
      <ProfileLink to={`/users/${userId}`}>
        <ProfileImageEl src={profilePic} alt="post author profile" />
        <Heading>{userName}</Heading>
      </ProfileLink>
      <PostImageEl src={postDetails.imageUrl} alt="post" />
      <PostContentContainer>
        <IconsContainer>
          <ButtonEl type="button">
            {likeStatus ? (
              <FcLike
                data-testid="unLikeIcon"
                size="20"
                color="#F05161"
                onClick={onClickUnlikeButton}
              />
            ) : (
              <BsHeart
                data-testid="likeIcon"
                size="20"
                onClick={onClickLikeButton}
              />
            )}
          </ButtonEl>
          <ButtonEl type="button">
            <FaRegComment size="20" color="#475569" />
          </ButtonEl>
          <ButtonEl type="button">
            <BiShareAlt size="20" color="#475569" />
          </ButtonEl>
        </IconsContainer>
        <HighlightedPara>{renderLikesCount()} likes</HighlightedPara>
        <Para>{postDetails.caption}</Para>
        {latestComments.map(each => {
          const length = each.userId.length > 14
          const wrap = length ? '...' : ''
          return (
            <CommentContainer key={each.userId}>
              <HighlightedPara>
                {each.userId.slice(0, 14)}
                {wrap}
                <SpanEl>{each.comment}</SpanEl>
              </HighlightedPara>
            </CommentContainer>
          )
        })}
        <CreatedAtPara>{createdAt}</CreatedAtPara>
      </PostContentContainer>
    </PostContainer>
  )
}

export default PostItem
