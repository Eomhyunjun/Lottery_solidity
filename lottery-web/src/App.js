import { css } from '@emotion/css'
import Header from './components/Header.js'
import Lottery from './components/lottery/Lottery.js'
import Ranking from './components/Ranking.js'
import { useState } from 'react'
import { getWalletInfo } from './utils/lotteryWeb3.js'

function App() {
  const [walletInfo, setWalletInfo] = useState(null)

  return (
    <div className={container}>
      <Header />
      {walletInfo ? (
        <div>
          <p>지갑 주소: {walletInfo.account}</p>
          <p>잔액: {Number(walletInfo.balance)} ETH</p>
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
      <Lottery />
      <Ranking />
    </div>
  )
}

export default App

const container = css``

/**
 * 시간 나면 추가할 기능
 * 지갑에 닉네임 설정
 */
