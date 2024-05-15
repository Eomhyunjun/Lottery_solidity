import { css } from '@emotion/css'
import { bet } from '../../utils/lotteryWeb3'

const GameInProgress = ({ luckyNumbers }) => {
  console.log('luckyNumbers: ', luckyNumbers)
  return (
    <div>
      {luckyNumbers.length > 0 &&
        luckyNumbers.map((number, index) => (
          <div className={lotteryCard} key={index + 1}>
            <p>{index + 1}번 숫자</p>
            <p>{Number(number)}</p>
            <button onClick={() => bet(index, true)}>참</button>
            <button onClick={() => bet(index, false)}>거짓</button>
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
