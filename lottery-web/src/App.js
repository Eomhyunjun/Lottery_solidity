import { css } from '@emotion/css'
import Header from './components/Header.js'
import Lottery from './components/lottery/Lottery.js'
import Ranking from './components/Ranking.js'
import { useEffect, useState } from 'react'
import { Web3 } from 'web3'
import { contract_addr, lottery_abi } from './utils/contract_val.js'

function App() {
  const [gameState, setGameState] = useState(-1) //  0: 게임 종료 상태, 1: 게임 진행 중
  const [walletInfo, setWalletInfo] = useState(null)
  const [luckyNumbers, setLuckyNumbers] = useState([])

  useEffect(() => {
    // 소켓 연결을 위한 web3 객체 생성
    const local_socket_web3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:8545')
    )

    const socket_lottery_con = new local_socket_web3.eth.Contract(
      lottery_abi,
      contract_addr
    )
    const subscription = socket_lottery_con.events.GAME_STARTED()
    subscription.on('data', (event) => {
      setGameState(1)
      setLuckyNumbers(event.returnValues.luckyNumbers)
    })
  }, [])

  return (
    <div className={container}>
      <Header setWalletInfo={setWalletInfo} walletInfo={walletInfo} />
      <Lottery
        gameState={gameState}
        setGameState={setGameState}
        luckyNumbers={luckyNumbers}
        setLuckyNumbers={setLuckyNumbers}
      />
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
