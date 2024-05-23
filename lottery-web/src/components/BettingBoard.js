import { css } from '@emotion/css'

const BettingBoard = ({ betEvent, luckyNumbers }) => {
  console.log('betEvent in Board: ', betEvent)
  return (
    <div>
      <table className={table}>
        <thead>
          <tr>
            <th>게임 회차</th>
            <th>베팅자</th>
            <th>베팅 숫자</th>
            <th>T or F</th>
            <th>베팅 금액</th>
          </tr>
        </thead>
        <tbody>
          {betEvent.length > 0 &&
            betEvent.map((event, index) => (
              <tr key={index}>
                <td>{Number(event.returnValues.index)}</td>
                <td>{event.returnValues.bettor}</td>
                <td>
                  {Number(luckyNumbers[Number(event.returnValues.number)])}
                </td>
                <td>{Number(event.returnValues.guess) ? 'T' : 'F'}</td>
                <td>
                  {window.web3.utils.fromWei(
                    event.returnValues.amount,
                    'ether'
                  )}
                  ETH
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default BettingBoard

const table = css`
  text-align: center;
  th,
  td {
    padding: 2px 10px;
  }
`
