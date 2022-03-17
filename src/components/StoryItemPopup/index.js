/* eslint-disable jsx-a11y/no-static-element-interactions */
import {useState} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Slider from 'react-slick'
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import UserPostsContext from '../../context/UserPostsContext'

import {
  ReactPopup,
  PopupBgContainer,
  CloseButton,
  StoryItem,
  StoryImage,
  Para,
  Box,
  ImgContainer,
  HrLine,
} from './styledComponents'

import './index.css'

const StoryItemPopup = props => {
  const [imageIndex, setImageIndex] = useState(0)

  const {storiesImagesList, usersStoryDetails} = props

  const renderPopupStoryView = () => {
    const NextArrow = ({onClick}) => (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
    const PrevArrow = ({onClick}) => (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
    const settings = {
      infinite: true,
      lazyLoad: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      initialSlide: imageIndex,
      beforeChange: (current, next) => setImageIndex(next),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <UserPostsContext.Consumer>
        {value => {
          const {userPosts} = value
          return (
            <div className="slider-container">
              <Slider {...settings}>
                {storiesImagesList.map((each, index) => {
                  const profileObject = userPosts.filter(
                    eachObj => eachObj.userId === each.userId,
                  )
                  const {profilePic} = profileObject[0]
                  return (
                    <div
                      className={
                        index === imageIndex ? 'active-slide' : 'slide'
                      }
                      key={each.userId}
                    >
                      <ImgContainer
                        active={index === imageIndex}
                        image={each.storyUrl}
                      >
                        <HrLine active={index === imageIndex} />
                        <Link
                          to={`/users/${each.userId}`}
                          className="popup-link-item"
                        >
                          <img
                            src={profilePic}
                            alt="popup author profile"
                            className="popup-story-author-profile"
                          />
                          <h1 className="popup-story-heading">{each.userId}</h1>
                        </Link>
                      </ImgContainer>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )
        }}
      </UserPostsContext.Consumer>
    )
  }

  const onChangeCurrentSlider = async userId => {
    const usersList = storiesImagesList.map(each => each.userId)
    const index = usersList.indexOf(userId)
    await setImageIndex(index)
  }

  const length = usersStoryDetails.userId.length > 11
  const wrap = length ? '...' : ''
  return (
    <ReactPopup
      trigger={
        <div key={usersStoryDetails.userId} className="popup-trigger">
          <StoryItem
            onClick={() => onChangeCurrentSlider(usersStoryDetails.userId)}
          >
            <Box>
              <StoryImage src={usersStoryDetails.storyUrl} alt="user story" />
            </Box>
            <Para>
              {usersStoryDetails.userId.slice(0, 11)}
              {wrap}
            </Para>
          </StoryItem>
        </div>
      }
      modal
    >
      {close => (
        <PopupBgContainer>
          <CloseButton type="button" onClick={close}>
            <RiCloseLine color="#ffffff" size="35" />
          </CloseButton>
          {renderPopupStoryView()}
        </PopupBgContainer>
      )}
    </ReactPopup>
  )
}
export default StoryItemPopup
