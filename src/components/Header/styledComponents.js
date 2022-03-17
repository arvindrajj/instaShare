import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const NavContainer = styled.nav`
  width: 100vw;
  bottom: 20;
  height: 64px;
  position: fixed;
`

export const ContentContainer = styled.div`
  width: 80%;
  max-width: 1100px;
  background-color: #ffffff;
  max-width: 1100px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`

export const WebsiteLogoLinkItem = styled(Link)`
  height: 30px;
  width: 173px;
  display: flex;
  align-items: center;
  text-decoration: none;
  @media all and (max-width: 380px) {
    height: 20px;
    width: 36px;
    margin-right: 22px;
  }
`

export const WebsiteLogo = styled.img`
  height: 34.14px;
  width: 59px;
  margin-right: 12px;
  @media all and (max-width: 380px) {
    height: 28px;
    width: 55px;
  }
`

export const Heading = styled.h1`
  font-family: Roboto;
  font-weight: 500;
  font-size: 20px;
  color: #262626;
  min-width: 108px;
  @media all and (max-width: 380px) {
    font-size: 16px;
    min-width: 92px;
  }
`

export const LgNavMenu = styled.div`
  display: flex;

  align-items: center;
  @media all and (max-width: 780px) {
    display: none;
  }
`

export const SmNavMenu = styled.div`
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  @media all and (min-width: 780px) {
    display: none;
  }
  @media all and (max-width: 512px) {
    display: none;
  }
`

export const VerySmNavMenu = styled.div`
  display: flex;
  width: 100%;
  margin-top: -18px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  @media all and (min-width: 512px) {
    display: none;
  }
`

export const SmNavItems = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 512px) {
    margin: auto;
  }
`

export const SearchContainer = styled.div`
  display: flex;
  width: 214px;
  height: 28px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 3px;
  margin-right: 32px;
  @media all and (max-width: 992px) {
    margin-right: 18px;
  }
  @media all and (max-width: 814px) {
    margin-left: 10px;
  }
  @media all and (max-width: 544px) {
    width: 195px;
  }
  @media all and (max-width: 512px) {
    margin-top: 4px;
    width: 214px;
  }
`

export const InputEl = styled.input`
  width: 179px;
  height: 28px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  outline: none;
  padding: 7px;
  @media all and (max-width: 544px) {
    width: 160px;
  }
  @media all and (max-width: 512px) {
    width: 179px;
  }
`

export const SearchIconButton = styled.button`
  border: none;
  background-color: transparent;
  width: 34px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`

export const LinkItem = styled(Link)`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  text-decoration: none;
  margin-right: 16px;
  margin-left: 10px;
  :hover {
    text-decoration: underline #409ef4 2px;
    color: #4094ef;
  }
  color: ${props => (props.selected ? '#4094EF' : '#262626')};
  @media all and (max-width: 814px) {
    margin-right: 10px;
  }
  @media all and (max-width: 380px) {
    font-size: 14px;
  }
`
export const ButtonEl = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export const CustomButton = styled.button`
  background: #4094ef;
  border-radius: 4px;
  height: 32px;
  width: 86px;
  color: #ffffff;
  font-size: 16px;
  border: none;
  cursor: pointer;
  @media all and (max-width: 380px) {
    width: 38px;
    height: 16px;
  }
`
export const BarIcon = styled(FaBars)`
  height: 24px;
  width: 24px;
  color: #231f20;
  cursor: pointer;
  @media all and (min-width: 780px) {
    display: none;
  }
`
