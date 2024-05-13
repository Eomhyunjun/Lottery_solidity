import { css } from '@emotion/css'

import React, { useEffect, useState } from 'react'
import { getLuckyNumbers } from '../../utils/lotteryWeb3'

const GameInProgress = ({ gameState }) => {
  const [luckyNumbers, setLuckyNumbers] = useState([])

  useEffect(() => {
    if (gameState === 1) {
      getLuckyNumbers().then((numbers) => {
        setLuckyNumbers([...numbers])
      })
    }
  }, [gameState])

  return (
    <div>
      {luckyNumbers.map((number, index) => (
        <div className={lotteryCard} key={index + 1}>
          <p>{index}번 숫자</p>
          <p>{Number(number)}</p>
          <button>베팅하기</button>
        </div>
      ))}
    </div>
  )
}

export default GameInProgress

const lotteryCard = css`
  width: 200px;
  padding: 20px;
  border: 1px solid black;
  margin-top: 10px;
`