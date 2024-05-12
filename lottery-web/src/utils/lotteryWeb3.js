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
  // window.ethereum 객체가 있는지 확인합니다.
  if (window.ethereum) {
    try {
      // 사용자에게 이더리움 계정 접근 권한을 요청합니다.
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      // 첫 번째 계정 주소를 가져옵니다.
      const account = accounts[0]

      // 이더리움 네트워크의 ID를 가져옵니다.
      const networkId = await window.ethereum.request({ method: 'net_version' })

      // 첫 번째 계정의 이더리움 잔액을 wei 단위로 가져옵니다.
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      })

      // wei를 이더(Ether) 단위로 변환합니다.
      const balanceInEther = Web3.utils.fromWei(balance, 'ether')
      // 계정 주소, 네트워크 ID, 이더리움 잔액을 반환합니다.
      return {
        account,
        networkId,
        balance: balanceInEther,
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return null
    }
  } else {
    alert('Please install MetaMask!')
    return null
  }
}

// 컨트랙트 변수 불러오기

// 컨트랙트 메서드 불러오기
