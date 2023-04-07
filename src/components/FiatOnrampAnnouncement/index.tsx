import { Trans } from '@lingui/macro'
import { sendAnalyticsEvent } from '@uniswap/analytics'
import { InterfaceEventName } from '@uniswap/analytics-events'
import { useWeb3React } from '@web3-react/core'
import fiatMaskUrl from 'assets/svg/fiat_mask.svg'
import { useCallback, useEffect, useState } from 'react'
import { X } from 'react-feather'
import { useToggleWalletDropdown } from 'state/application/hooks'
import { useAppSelector } from 'state/hooks'
import { useFiatOnrampAck } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'
import { isMobile } from 'utils/userAgent'

const Arrow = styled.div`
  top: -4px;
  height: 16px;
  position: absolute;
  right: 16px;
  width: 16px;

  ::before {
    background: hsl(315.75, 93%, 83%);
    border-top: none;
    border-left: none;
    box-sizing: border-box;
    content: '';
    height: 16px;
    position: absolute;
    transform: rotate(45deg);
    width: 16px;
  }
`
const ArrowWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 90%;
  width: 100%;
  max-width: 320px;
  min-height: 92px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.lg}px) {
    right: 36px;
  }
`

const CloseIcon = styled(X)`
  color: white;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`
const Wrapper = styled.button`
  background: radial-gradient(105% 250% at 100% 5%, hsla(318, 95%, 85%) 1%, hsla(331, 80%, 75%, 0.1) 84%),
    linear-gradient(180deg, hsla(296, 92%, 67%, 0.5) 0%, hsla(313, 96%, 60%, 0.5) 130%);
  background-color: hsla(297, 93%, 68%, 1);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: start;
  max-width: 320px;
  min-height: 92px;
  width: 100%;

  :before {
    background-image: url(${fiatMaskUrl});
    background-repeat: no-repeat;
    content: '';
    height: 100%;
    position: absolute;
    right: -154px; // roughly width of fiat mask image
    top: 0;
    width: 100%;
  }
`

const Header = styled(ThemedText.SubHeader)`
  color: white;
  margin: 0;
  padding: 12px 12px 4px;
  position: relative;
`
const Body = styled(ThemedText.BodySmall)`
  color: white;
  margin: 0 12px 12px 12px !important;
  position: relative;
`

const ANNOUNCEMENT_RENDERED = 'FiatOnrampAnnouncement-rendered'
const ANNOUNCEMENT_DISMISSED = 'FiatOnrampAnnouncement-dismissed'

const MAX_RENDER_COUNT = 3
export function FiatOnrampAnnouncement() {
  const { account } = useWeb3React()
  const [acks, acknowledge] = useFiatOnrampAck()
  const [localClose, setLocalClose] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem(ANNOUNCEMENT_RENDERED)) {
      acknowledge({ renderCount: acks?.renderCount + 1 })
      sessionStorage.setItem(ANNOUNCEMENT_RENDERED, 'true')
    }
  }, [acknowledge, acks])

  const handleClose = useCallback(() => {
    setLocalClose(true)
    localStorage.setItem(ANNOUNCEMENT_DISMISSED, 'true')
  }, [])

  const toggleWalletDropdown = useToggleWalletDropdown()
  const handleClick = useCallback(() => {
    sendAnalyticsEvent(InterfaceEventName.FIAT_ONRAMP_BANNER_CLICKED)
    toggleWalletDropdown()
    acknowledge({ user: true })
  }, [acknowledge, toggleWalletDropdown])

  const openModal = useAppSelector((state) => state.application.openModal)

  if (!account || acks?.user || acks?.renderCount >= MAX_RENDER_COUNT || isMobile || openModal !== null || localClose) {
    return null
  }
  return (
    <ArrowWrapper>
      <Arrow />
      <CloseIcon onClick={handleClose} data-testid="FiatOnrampAnnouncement-close" />
      <Wrapper onClick={handleClick}>
        <Header>
          <Trans>WRAPPED TOKENS</Trans>
        </Header>
        <Body>
          Uniswap was designed to primarily use the WETH token to facilitate swaping. Nearly every action touching a
          chains native token uses the WETH contract. In many cases you may find yourself with WETH tokens on chains
          with native tokens of a different name. This interface was modified to allow you to wrap and unwrap WETH back
          into a chains native token. Even though the names may not match, the forked over WETH is still backed by the
          native token (PLS, TPLS, ETHW, etc...)
        </Body>
        <Header>
          <Trans>USE AT YOUR OWN RISK</Trans>
        </Header>
        <Body>
          <Trans>
            This software is provided “as is”, without warranty of any kind, express or implied, including but not
            limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no
            event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in
            an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
            or other dealings in the software.
          </Trans>
        </Body>
      </Wrapper>
    </ArrowWrapper>
  )
}
