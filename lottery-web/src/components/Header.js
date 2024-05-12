import { css } from '@emotion/css'

import React from 'react'

/**
 * 게임 제목, 셜명
 * 로그인 버튼?
 */

const Header = () => {
  return (
    <div className={haedWrapper}>
      <h1 className={title}>Lottery Game</h1>
      <h2 className={subTitle}>당신의 숫자에 베팅하세요!</h2>
    </div>
  )
}

export default Header

const haedWrapper = css`
  width: 100%;
  font-size: 13px;
  margin: 0 auto;
  padding: 20px;
`
const title = css`
  font-size: 20px;
  margin-bottom: 10px;
`
const subTitle = css`
  font-size: 13px;
  margin-top: 10px;
  color: #666;
`
