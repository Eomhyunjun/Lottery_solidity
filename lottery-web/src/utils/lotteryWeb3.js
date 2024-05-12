import { Web3 } from 'web3'

/** 함수 리스트
 * getWalletInfo - 지갑 정보 불러오기
 *
 */

/**
 * 지갑 정보 불러오기
 *
 * 성공 시: 지갑 정보 객체 프로미스 반환 (account, balance)
 * @returns {object} - wallet info
 */
export async function getWalletInfo() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })

    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])

    return {
      account: accounts[0],
      balance,
    }
  } else {
    alert('Please download metamask')
  }
}

// 컨트랙트 변수 불러오기

// 컨트랙트 메서드 불러오기
