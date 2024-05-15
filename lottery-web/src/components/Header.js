import { css } from '@emotion/css'

import React from 'react'
import { getWalletInfo } from '../utils/lotteryWeb3'
import { contract_addr } from '../utils/contract_val'

/**
 * 게임 제목, 셜명
 * 로그인 버튼?
 */

const Header = ({ walletInfo, setWalletInfo }) => {
  return (
    <div className={haedWrapper}>
      <div className={header}>
        <h1 className={title}>Lottery Game</h1>
        <h2 className={subTitle}>당신의 숫자에 베팅하세요!</h2>
      </div>
      <div className={myWallet}>
        {walletInfo ? (
          <div>
            <p>지갑 주소: {walletInfo.account}</p>
            <p>
              잔액: {window.web3.utils.fromWei(walletInfo.balance, 'ether')} ETH
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              const walletInfoPromise = getWalletInfo()
              walletInfoPromise.then((wallet) => {
                setWalletInfo(wallet)
              })
            }}
          >
            메타마스크 지갑 연결하여, 베팅에 참가하기
          </button>
        )}
      </div>
      <div className={myWallet}>
        {/* 이더스캔 링크 연결 */}
        컨트팩트 주소: {contract_addr}
      </div>
    </div>
  )
}

export default Header

const haedWrapper = css`
  width: 100%;
  font-size: 13px;
  margin: 0 auto;
  padding: 20px;
`
const title = css`
  font-size: 20px;
  margin-bottom: 10px;
`
const subTitle = css`
  font-size: 13px;
  margin-top: 10px;
  color: #666;
`

const header = css`
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
`

const myWallet = css`
  width: 50%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`
