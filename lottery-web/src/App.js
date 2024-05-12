import { css } from '@emotion/css'
import Header from './components/Header.js'
import Lottery from './components/lottery/Lottery.js'
import Ranking from './components/Ranking.js'
import { useState } from 'react'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  return (
    <div className={container}>
      <Header />
      {isWalletConnected ? (
        <div>지갑 주소, 잔액</div>
      ) : (
        <div>지갑 연결하여, 베팅에 참가하기</div>
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
