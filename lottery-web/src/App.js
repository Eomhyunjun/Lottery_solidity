import { css } from '@emotion/css'
import Header from './components/Header.js'
import Lottery from './components/lottery/Lottery.js'
import Ranking from './components/Ranking.js'
import { useState } from 'react'

function App() {
  const [walletInfo, setWalletInfo] = useState(null)

  return (
    <div className={container}>
      <Header setWalletInfo={setWalletInfo} walletInfo={walletInfo} />
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
