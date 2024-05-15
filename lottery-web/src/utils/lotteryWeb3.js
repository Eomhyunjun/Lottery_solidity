import { Web3 } from 'web3'
import { lottery_abi, contract_addr, owner_priv } from './contract_val'

// 브라우저에서 사용할 수 있는 web3 객체 생성
const web3 = new Web3(window.ethereum)
window.web3 = web3
const lottery_con = new window.web3.eth.Contract(lottery_abi, contract_addr)

// 로컬 테스트를 위한 web3 객체 생성
const rpcURL = 'http://localhost:8545'
const local_web3 = new Web3(new Web3.providers.HttpProvider(rpcURL))
export const owner_wallet = local_web3.eth.accounts.wallet.add(owner_priv)
const local_lottery_con = new web3.eth.Contract(lottery_abi, contract_addr)
local_lottery_con.handleRevert = true

// 로컬 소켓 연결을 위한 web3 Provider 객체 생성

/** 함수 리스트
 *
 * getWalletInfo - 지갑 정보 불러오기
 * getGameState - 게임 상태 변수 불러오기
 * getLuckyNumbers - 당첨 번호 배열 불러오기
 * startGame - 게임 시작 함수
 */

/**
 * 지갑 정보 불러오기
 *
 * 성공 시: 지갑 정보 객체 프로미스 반환 (account, balance)
 * @returns {object} - wallet info
 */
export async function getWalletInfo() {
  if (window.ethereum) {
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
export async function getGameState() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const started = await lottery_con.methods.gameStarted().call()
    return started
  }
}

// 컨트랙트 메서드 불러오기
export async function startGame() {
  if (local_web3 && local_web3.eth && local_web3.eth.accounts) {
    const providersAccounts = await local_web3.eth.getAccounts()

    const defaultAccount = providersAccounts[0]

    try {
      const receipt = await local_lottery_con.methods.startGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: '10000000000',
      })
      console.log('Transaction Hash: ' + receipt.transactionHash)
    } catch (error) {
      console.error(error)
    }
  }
}
export async function endGame() {
  if (local_web3 && local_web3.eth && local_web3.eth.accounts) {
    const providersAccounts = await local_web3.eth.getAccounts()

    const defaultAccount = providersAccounts[0]

    try {
      const receipt = await local_lottery_con.methods.endGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: '10000000000',
      })
      console.log('Transaction Hash: ' + receipt.transactionHash)
    } catch (error) {
      console.error(error)
    }
  }
}

export async function bet(number, guess) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const accounts = await web3.eth.getAccounts()

    const bet = await lottery_con.methods
      .bet(number, guess)
      .send({
        from: accounts[0],
        to: contract_addr,
        value: window.web3.utils.toWei('1', 'ether'),
        gas: 300000,
        gasPrice: window.web3.utils.toWei('5', 'gwei'),
      })
      .then((result) => {
        console.log(result)
      })
    console.log(bet)
  }
}

/**
 * 이벤트
 */
export async function startGame_events() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const event = await lottery_con.getPastEvents('GAME_STARTED', {
      fromBlock: 0,
      toBlock: 'latest',
    })
    console.log(event)
    // return <div>{event}</div>
  }
  // return <></>
}

export async function getLuckyNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      // luckyNumbers 배열의 크기가 3이므로, 0부터 2까지 반복
      const event_val = await lottery_con.getPastEvents('GAME_STARTED', {
        fromBlock: 0,
        toBlock: 'latest',
      })
      console.log('lucky_event_val: ', event_val)
      const numbers = event_val[0].returnValues.luckyNumbers
      console.log('lucky: ', numbers)
      return numbers
    } catch (error) {
      console.error('Error fetching lucky numbers:', error)
    }
  }
}

export async function getFinalNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      // finalNumbers 배열의 크기가 3이므로, 0부터 2까지 반복
      const event_val = await lottery_con.getPastEvents('GAME_ENDED', {
        fromBlock: 0,
        toBlock: 'latest',
      })
      const numbers = event_val[0].returnValues.finalNumbers
      console.log('final: ', numbers)
      return numbers
    } catch (error) {
      console.error('Error fetching lucky numbers:', error)
    }
  }
}

export async function bet_events(number, guess) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const event = await lottery_con.getPastEvents('BET', {
      fromBlock: 0,
      toBlock: 'latest',
    })

    return event
  }
  return []
}
