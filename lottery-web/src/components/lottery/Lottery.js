import { css } from '@emotion/css'

import React, { useState } from 'react'
import {
  getFinalNumbers,
  getGameState,
  getLuckyNumbers,
  startGame,
} from '../../utils/lotteryWeb3'
import GameInProgress from './GameInProgress'

/**
 * 베팅 관련 View
 * 게임 상황 (게임이 시작되었는지, 게임이 끝났는지, 게임 결과) / 총 베팅 금액 / 게임 남은 시간
 *
 * 게임 진행중이라면 -> 베팅 가능한 숫자들 (+ 배당률, yes or no 각각에 대한 총 금액)
 * 각 숫자에 해당하는 베팅하기 버튼
 *
 * 게임 종료 후 -> 게임 결과 (yes or no) / 총 베팅 금액 / 총 배당금 / 당첨자 지갑 명단 / 5초 후 자동으로 다음 게임 시작 / 전광판 변경
 *
 */

const Lottery = ({
  gameState,
  setGameState,
  luckyNumbers,
  setLuckyNumbers,
  finalNumbers,
  setFinalNumbers,
}) => {
  useState(() => {
    getGameState().then((state) => {
      console.log('getGameState', state)
      const state_to_number = state ? 1 : 0
      setGameState(state_to_number)
    })
    return () => {
      setGameState(0)
    }
  }, [window.web3])

  useState(() => {
    if (gameState === 0) setLuckyNumbers(getLuckyNumbers())
    else if (gameState === 1) setLuckyNumbers([])

    return () => {
      setFinalNumbers([getFinalNumbers()])
    }
  }, [gameState])

  return (
    <div className={lotteryWrapper}>
      <button onClick={() => startGame()}>게임 시작 버튼</button>
      {gameState === -1 && <div>게임 시작 대기</div>}
      {gameState === 0 && <GameInProgress luckyNumbers={finalNumbers} />}
      {gameState === 1 && <GameInProgress luckyNumbers={luckyNumbers} />}
    </div>
  )
}

export default Lottery

const lotteryWrapper = css`
  padding: 20px;
`
