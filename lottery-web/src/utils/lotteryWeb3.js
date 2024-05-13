import { Web3 } from 'web3'
import { abi, contract_addr, owner_addr } from './contract_val'

const web3 = new Web3(window.ethereum)
window.web3 = web3

const lottery_con = new window.web3.eth.Contract(abi, contract_addr)

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

export async function getLuckyNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const numbers = []
      for (let i = 0; i < 3; i++) {
        // luckyNumbers 배열의 크기가 3이므로, 0부터 2까지 반복
        const number = await lottery_con.methods.luckyNumbers(i).call() // i번째 인덱스의 값을 가져옴
        numbers.push(number)
      }
      return numbers
    } catch (error) {
      console.error('Error fetching lucky numbers:', error)
    }
  }
}

// 컨트랙트 메서드 불러오기
export async function startGame() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const owner = await lottery_con.methods
      .startGame()
      .send({
        from: owner_addr,
        to: contract_addr,
        value: window.web3.utils.toWei('5000000000000000', 'wei'),
        gas: 300000,
        gasPrice: window.web3.utils.toWei('5', 'gwei'),
      })
      .then((result) => {
        console.log(result)
      })
    console.log(owner)
  }
}

export async function bet(number, guess) {}

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
