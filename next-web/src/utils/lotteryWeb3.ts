import Web3 from "web3";
import { lottery_abi, contract_addr, owner_addr } from "./val/contract_val";

// 브라우저에서 사용할 수 있는 web3 객체 생성
let lottery_con: any;
export async function initUserMetaWallet(): Promise<number> {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.web3 = web3;
    lottery_con = new web3.eth.Contract(lottery_abi, contract_addr);
    window.lottery_con = lottery_con;
    return 1;
  } else {
    console.log("window.ethereum is not defined");
    return 0;
  }
}

let local_lottery_con: any;
export async function initLocalWallet(): Promise<number> {
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

// 지갑 정보 불러오기
export async function getWalletInfo() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts: string[] = await window.web3.eth.getAccounts();
    const balance: string = await window.web3.eth.getBalance(accounts[0]);

    return {
      account: accounts[0],
      balance: Number(balance),
    };
  } else {
    alert("Please download metamask");
  }
}

// 최고 지급액 가져오기
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

// 컨트랙트 변수 불러오기
export async function getGameState() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const started = await window.lottery_con.methods.gameStarted().call();
      return started;
    } catch (error) {
      console.error("Error fetching game state:", error);
      return -1;
    }
  }
  return -1;
}

// 베팅 금액 가져오기
export async function getBettingAmount(number: number, guess: boolean) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const amount = await window.lottery_con.methods
        .getBettingAmount(number, guess)
        .call();
      return amount;
    } catch (error) {
      console.error("Error fetching betting amount:", error);
    }
  }
}

// 베팅하기
export async function bet(number: number, guess: boolean) {
  if (window.web3 && window.web3.eth && window.ethereum) {
    console.log("betting...........");
    try {
      const accounts = await window.web3.eth.getAccounts();
      console.log("betting account: ", accounts[0]);
      console.log("betting number: ", number);
      console.log("betting guess: ", guess);

      const bet = await window.lottery_con.methods.bet(number, guess).send({
        from: accounts[0],
        to: contract_addr,
        value: window.web3.utils.toWei("1", "ether"),
        gas: 5000000,
        gasPrice: window.web3.utils.toWei("15", "gwei"),
      });
      console.log("betting success...........", bet);
      return bet;
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  }
}

// 이벤트: 게임 시작
export async function startGame_events() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const events = await window.lottery_con.getPastEvents("GAME_STARTED", {
        fromBlock: 0,
        toBlock: "latest",
      });
      console.log(events);
      return events;
    } catch (error) {
      console.error("Error fetching game start events:", error);
    }
  }
}

// 당첨 번호 가져오기
export async function getLuckyNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.lottery_con.getPastEvents("GAME_STARTED", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const numbers = event_val.length
        ? event_val[event_val.length - 1].returnValues.luckyNumbers
        : [];
      console.log("lucky: ", numbers);
      return numbers;
    } catch (error) {
      console.error("Error fetching lucky numbers:", error);
    }
  }
}

// 최종 번호 가져오기
export async function getFinalNumbers() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.lottery_con.getPastEvents("GAME_ENDED", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const numbers = event_val.length
        ? event_val[event_val.length - 1].returnValues.finalNumbers
        : [];
      console.log("final: ", numbers);
      return numbers;
    } catch (error) {
      console.error("Error fetching final numbers:", error);
    }
  }
}

// 게임 답변 이벤트 가져오기
export async function gameAnswer_events() {
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.lottery_con.getPastEvents("GAME_ANSWER", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const answer: boolean[] = event_val.length
        ? event_val[event_val.length - 1].returnValues.winner
        : [];
      console.log("answer: ", answer);
      return answer;
    } catch (error) {
      console.error("Error fetching game answer events:", error);
    }
  }
  return [];
}

// 로컬 지갑 정보 가져오기
export async function getLocalWalletInfo() {
  if (window.local_web3) {
    try {
      const accounts = await window.local_web3.eth.getAccounts();
      console.log("Accounts:", accounts);
      return accounts;
    } catch (error) {
      console.error("Error fetching local wallet info:", error);
    }
  } else {
    console.log("window.local_web3 is not defined");
  }
}

// 게임 시작 (로컬)
export async function startGame() {
  if (window.local_web3) {
    try {
      const accounts = await window.local_web3.eth.getAccounts();
      const defaultAccount = accounts[0];
      const receipt = await window.local_lottery_con.methods.startGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Transaction Hash: " + receipt.transactionHash);
      return 1;
    } catch (error) {
      console.error("Error starting game:", error);
    }
  } else {
    console.log("window.local_web3 is not defined");
  }
  return 0;
}

// 게임 종료 (로컬)
export async function endGame() {
  if (window.local_web3) {
    try {
      const accounts = await window.local_web3.eth.getAccounts();
      const defaultAccount = accounts[0];
      if (defaultAccount !== owner_addr) {
        console.log("owner의 지갑이 아닙니다.");
        return 0;
      }
      console.log("owner의 지갑 확인");
      const receipt = await window.local_lottery_con.methods.endGame().send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Transaction Hash: " + receipt.transactionHash);
      return 1;
    } catch (error) {
      console.error("Error ending game:", error);
      return 0;
    }
  } else {
    console.log("window.local_web3 is not defined");
  }
  return 0;
}
