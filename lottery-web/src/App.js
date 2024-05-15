import { css } from '@emotion/css'
import Header from './components/Header.js'
import Lottery from './components/lottery/Lottery.js'
import Ranking from './components/Ranking.js'
import { useEffect, useState } from 'react'
import { Web3 } from 'web3'
import { contract_addr, lottery_abi } from './utils/contract_val.js'
import BettingBoard from './components/BettingBoard.js'
import {
  bet_events,
  getFinalNumbers,
  getLuckyNumbers,
} from './utils/lotteryWeb3.js'

function App() {
  const [gameState, setGameState] = useState(-1) //  0: 게임 종료 상태, 1: 게임 진행 중
  const [walletInfo, setWalletInfo] = useState(null)
  const [luckyNumbers, setLuckyNumbers] = useState([])
  const [finalNumbers, setFinalNumbers] = useState([])
  const [betEvent, setBetEvent] = useState([])

  useEffect(() => {
    // 소켓 연결을 위한 web3 객체 생성
    const local_socket_web3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:8545')
    )

    const socket_lottery_con = new local_socket_web3.eth.Contract(
      lottery_abi,
      contract_addr
    )

    const sub_startGame_event = socket_lottery_con.events.GAME_STARTED()
    sub_startGame_event.on('data', (event) => {
      setGameState(1)
      setLuckyNumbers(event.returnValues.luckyNumbers)
      console.log('게임이 시작되었습니다.')
      console.log(event)
    })

    const sub_endGame_event = socket_lottery_con.events.GAME_ENDED()
    sub_endGame_event.on('data', (event) => {
      setGameState(0)
      setFinalNumbers(event.returnValues.finalNumbers)
      console.log('게임이 종료되었습니다.')
      console.log(event)
    })

    const sub_bet_event = socket_lottery_con.events.BET()
    sub_bet_event.on('data', (event) => {
      bet_events().then((event) => {
        console.log('bet_event: ', event)
        setBetEvent(event)
      })
    })
  }, [])

  useEffect(() => {
    if (gameState === 1) {
      bet_events().then((event) => {
        console.log('bet_event: ', event)
        setBetEvent(event)
      })
      getLuckyNumbers().then((numbers) => {
        console.log('set-luckyNumbers: ', numbers)
        setLuckyNumbers(numbers ? numbers : [])
      })
    } else if (gameState === 0) {
      getFinalNumbers().then((numbers) => {
        setFinalNumbers(numbers ? numbers : [])
      })
    }
    return () => {
      setLuckyNumbers([])
      setFinalNumbers([])
      setBetEvent([])
    }
  }, [gameState])

  console.log('luckyNumbers-now: ', luckyNumbers)

  return (
    <div className={container}>
      <Header setWalletInfo={setWalletInfo} walletInfo={walletInfo} />
      <Lottery
        gameState={gameState}
        setGameState={setGameState}
        luckyNumbers={luckyNumbers}
        finalNumbers={finalNumbers}
      />
      {betEvent.length > 0 && (
        <BettingBoard betEvent={betEvent} luckyNumbers={luckyNumbers} />
      )}
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
