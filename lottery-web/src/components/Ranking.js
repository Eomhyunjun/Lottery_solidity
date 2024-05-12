import { css } from '@emotion/css'

import React from 'react'

/**
 * 당첨자 랭킹 정보
 * 당첨자 지갑 주소 / 지금까지 총 당첨금 / 당첨 횟수 / 자세히보기 -> 클릭 시 아코디언형태로 늘어나며, 해당 지갑의 모든 당첨 정보 표시
 * 당첨자 랭킹 표시
 */

const Ranking = () => {
  return (
    <table className={table}>
      <thead>
        <tr>
          <th>순위</th>
          <th>지갑 주소</th>
          <th>총 당첨금</th>
          <th>당첨 횟수</th>
          <th>당첨 회차</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>0x1234...5678</td>
          <td>1000</td>
          <td>3</td>
          <td>
            <button>자세히보기</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>0x1234...5678</td>
          <td>1000</td>
          <td>3</td>
          <button>자세히보기</button>
        </tr>
        <tr>
          <td>3</td>
          <td>0x1234...5678</td>
          <td>1000</td>
          <td>3</td>
          <button>자세히보기</button>
        </tr>
      </tbody>
    </table>
  )
}

export default Ranking

const container = css``

const table = css`
  text-align: center;
  th,
  td {
    padding: 2px 10px;
  }
`
