import { Web3 } from "web3";
import { lottery_abi, contract_addr, owner_addr } from "./val/contract_val";

// 브라우저에서 사용할 수 있는 web3 객체 생성
let lottery_con: any;

export async function initUserMetaWallet() {
  if (window.ethereum) {
    const web3: Web3 = new Web3(window.ethereum);
    window.web3 = web3;
    lottery_con = new window.web3.eth.Contract(lottery_abi, contract_addr);
    window.lottery_con = lottery_con;
    return 1;
  } else {
    console.log("window.ethereum is not defined");
    return 0;
  }
}

let local_lottery_con;
export async function initLocalWallet() {
  if (window.ethereum) {
    const rpcURL = "http://localhost:8545";
    const local_web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
    window.local_web3 = local_web3;
    local_lottery_con = new local_web3.eth.Contract(lottery_abi, contract_addr);
    window.local_lottery_con = local_lottery_con;
    local_lottery_con.handleRevert = true;
    return 1;
  } else {
    console.log("로컬 테스트를 위한 web3 객체 생성 실패");
    return 0;
  }
}

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
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts: string[] = await window.web3.eth.getAccounts();
    console.log("accounts: ", accounts[0]);
    const balance: BigInt = await window.web3.eth.getBalance(accounts[0]);

    return {
      account: accounts[0],
      balance: Number(balance),
    };
  } else {
    alert("Please download metamask");
  }
}

export async function getTopPayouts() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const payouts = await window.lottery_con.methods.getTopPayouts().call();
      console.log("payouts: ", payouts);
      return payouts;
    } catch (error) {
      console.error("Error fetching payouts:", error);
    }
  }
}

export async function deleteWalletInfo() {}

// 컨트랙트 변수 불러오기
export async function getGameState() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const started = await window.lottery_con.methods.gameStarted().call();
    return started;
  }
  return -1;
}

export async function getBettingAmount(number, guess) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const started = await window.lottery_con.methods
      .getBettingAmount(number, guess)
      .call();
    return started;
  }
}

export async function bet(number: number, guess: boolean) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const accounts = await window.web3.eth.getAccounts();

    const bet = await window.lottery_con.methods
      .bet(number, guess)
      .send({
        from: accounts[0],
        to: contract_addr,
        value: window.web3.utils.toWei("1", "ether"),
        gas: 300000,
        gasPrice: window.web3.utils.toWei("5", "gwei"),
      })
      .then((result) => {
        console.log(result);
      });
    console.log(bet);
  }
}

/**
 * 이벤트
 */
export async function startGame_events() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const event = await window.lottery_con.getPastEvents("GAME_STARTED", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(event);
    // return <div>{event}</div>
  }
  // return <></>
}

export async function getLuckyNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      // luckyNumbers 배열의 크기가 3이므로, 0부터 2까지 반복
      const event_val = await window.lottery_con.getPastEvents("GAME_STARTED", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const numbers = event_val
        ? event_val[event_val.length - 1]?.returnValues?.luckyNumbers
        : [];
      console.log("lucky: ", numbers);
      return numbers;
    } catch (error) {
      console.error("Error fetching lucky numbers:", error);
    }
  }
}

export async function getFinalNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      // finalNumbers 배열의 크기가 3이므로, 0부터 2까지 반복
      const event_val = await window.lottery_con.getPastEvents("GAME_ENDED", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const numbers = event_val
        ? event_val[event_val.length - 1]?.returnValues?.finalNumbers
        : [];
      console.log("event_val: ", event_val);
      console.log("final: ", numbers);
      return numbers;
    } catch (error) {
      console.error("Error fetching final numbers:", error);
    }
  }
}

// export async function bet_events(number, guess) {
//   if (window.web3 && window.web3.eth && window.ethereum) {
//     const event = await lottery_con.getPastEvents("BET", {
//       fromBlock: 0,
//       toBlock: "latest",
//     });

//     return event;
//   }
//   return [];
// }

export async function gameAnswer_events() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    const event_val = await window.lottery_con.getPastEvents("GAME_ANSWER", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const answer: boolean[] = event_val
      ? event_val[event_val.length - 1]?.returnValues?.winner
      : [];
    console.log("answer: ", answer);
    return answer;
  }
  return [];
}

/** 로컬 전용 함수
 * startGame - 게임 시작 함수
 * endGame - 게임 종료 함수
 */

export async function getLocalWalletInfo() {
  try {
    // 모든 계정 가져오기
    const accounts = await window.local_web3.eth.getAccounts();
    console.log("Accounts:", accounts);
  } catch (error) {
    console.error("Error fetching wallet info:", error);
  }
}

// 컨트랙트 메서드 불러오기
export async function startGame() {
  if (
    window.local_web3 &&
    window.local_web3.eth &&
    window.local_web3.eth.accounts
  ) {
    const providersAccounts = await window.local_web3.eth.getAccounts();

    const defaultAccount = providersAccounts[0];

    try {
      const receipt = await window.local_lottery_con.methods.startGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Transaction Hash: " + receipt.transactionHash);
      return 1;
    } catch (error) {
      console.error(error);
    }
    return 0;
  }
}

export async function endGame() {
  if (
    window.local_web3 &&
    window.local_web3.eth &&
    window.local_web3.eth.accounts
  ) {
    const providersAccounts = await window.local_web3.eth.getAccounts();

    const defaultAccount = providersAccounts[0];
    if (defaultAccount !== owner_addr) {
      console.log("owner의 지갑이 아닙니다.");
    } else {
      console.log("owner의 지갑 확인");
    }

    try {
      const receipt = await window.local_lottery_con.methods.endGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Transaction Hash: " + receipt.transactionHash);
      return 1;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
}
