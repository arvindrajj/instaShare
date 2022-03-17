import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import {RiLogoutBoxFill} from 'react-icons/ri'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import useLocalStorage from '../useLocalStorage'

import {
  NavContainer,
  ContentContainer,
  WebsiteLogoLinkItem,
  WebsiteLogo,
  Heading,
  LgNavMenu,
  SearchContainer,
  InputEl,
  SearchIconButton,
  LinkItem,
  CustomButton,
  BarIcon,
  SmNavMenu,
  SmNavItems,
  ButtonEl,
  VerySmNavMenu,
} from './styledComponents'

const selectedTabConstance = [
  {
    tabId: 'HOME',
    link: '/',
    displayedText: 'Home',
  },
  {
    tabId: 'PROFILE',
    link: '/my-profile',
    displayedText: 'Profile',
  },
]

const Header = props => {
  const [searchInput, changeInput] = useState('')
  const [showSearchContainer, setShowSearchContainer] = useState(false)
  const [showSmNavMenu, onToggleNavMenu] = useLocalStorage(
    'showSmNavMenu',
    false,
  )
  const history = useHistory()
  const {location} = history
  const {pathname} = location
  const [selectedTab, setSelectedTab] = useState(pathname)
  const {searchPostCaption} = props
  const logoutAccount = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onEnterPostCaption = event => {
    if (event.key === 'Enter') {
      searchPostCaption(searchInput)
    }
  }

  const onSearchPostCaption = () => {
    searchPostCaption(searchInput)
  }

  const showSearchCont = () => {
    setSelectedTab('SEARCH')
    onToggleNavMenu(!showSmNavMenu)
    setShowSearchContainer(true)
  }

  const onOpenNavMenu = () => {
    onToggleNavMenu(true)
    setShowSearchContainer(false)
  }

  const onCloseNavMenu = () => {
    onToggleNavMenu(false)
    setShowSearchContainer(false)
  }

  const renderMenu = () => (
    <SmNavItems>
      <RiLogoutBoxFill size="25" onClick={logoutAccount} cursor="pointer" />
      <LinkItem
        to="/"
        selected={selectedTab === '/'}
        onClick={() => setSelectedTab('/')}
      >
        Home
      </LinkItem>
      <ButtonEl type="button" onClick={showSearchCont}>
        <LinkItem as="p" selected={selectedTab === 'SEARCH'}>
          Search
        </LinkItem>
      </ButtonEl>
      <LinkItem
        to="/my-profile"
        selected={selectedTab === '/my-profile'}
        onClick={() => setSelectedTab('/my-profile')}
      >
        Profile
      </LinkItem>
      <AiFillCloseCircle size="20" cursor="pointer" onClick={onCloseNavMenu} />
    </SmNavItems>
  )

  const renderSearchContainer = () => (
    <SearchContainer>
      <InputEl
        type="search"
        placeholder="Search Caption"
        value={searchInput}
        onKeyDown={onEnterPostCaption}
        onChange={e => changeInput(e.target.value)}
      />
      <SearchIconButton type="button" data-testid="searchIcon">
        <FaSearch height="10" width="10" onClick={onSearchPostCaption} />
      </SearchIconButton>
    </SearchContainer>
  )
  return (
    <NavContainer>
      <ContentContainer>
        <WebsiteLogoLinkItem to="/" onClick={() => setSelectedTab('/')}>
          <WebsiteLogo
            src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
            alt="website logo"
          />
          <Heading>Insta Share</Heading>
        </WebsiteLogoLinkItem>
        <LgNavMenu>
          {renderSearchContainer()}
          {selectedTabConstance.map(each => (
            <LinkItem
              to={`${each.link}`}
              key={each.tabId}
              selected={each.link === selectedTab}
              onClick={() => setSelectedTab(each.link)}
            >
              {each.displayedText}
            </LinkItem>
          ))}
          <CustomButton type="button" onClick={logoutAccount}>
            Logout
          </CustomButton>
        </LgNavMenu>
        {showSearchContainer && (
          <SmNavMenu>{renderSearchContainer()}</SmNavMenu>
        )}
        {showSmNavMenu ? (
          <SmNavMenu>{renderMenu()}</SmNavMenu>
        ) : (
          <BarIcon onClick={onOpenNavMenu} />
        )}
      </ContentContainer>
      {showSmNavMenu && <VerySmNavMenu>{renderMenu()}</VerySmNavMenu>}
      {showSearchContainer && (
        <VerySmNavMenu>{renderSearchContainer()}</VerySmNavMenu>
      )}
    </NavContainer>
  )
}

export default Header
