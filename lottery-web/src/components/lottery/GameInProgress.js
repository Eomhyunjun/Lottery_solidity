import { css } from '@emotion/css'
import { bet } from '../../utils/lotteryWeb3'

const GameInProgress = ({ luckyNumbers, poolAmount }) => {
  return (
    <div>
      {luckyNumbers.length > 0 &&
        luckyNumbers.map((number, i) => {
          const tPool = Number(poolAmount[i][1]) === 0 ? 0 : poolAmount[i][1]
          const fPool = Number(poolAmount[i][0]) === 0 ? 0 : poolAmount[i][0]
          const total = Number(tPool) + Number(fPool)
          console.log('total: ', tPool, fPool, total)

          const ratioT = fPool ? (tPool ? total / tPool : 1) : 0
          const ratioF = tPool ? (fPool ? total / fPool : 1) : 0
          return (
            <div className={lotteryCard} key={i + 1}>
              <p>{i + 1}번 숫자</p>
              <p>{Number(number)}</p>
              <p>
                {ratioT}배 ({tPool}eth) / {ratioF}배 ({fPool}eth)
              </p>
              <button onClick={() => bet(i, true)}>참</button>
              <button onClick={() => bet(i, false)}>거짓</button>
            </div>
          )
        })}
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
