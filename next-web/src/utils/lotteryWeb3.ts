import Web3 from "web3";
import {
  lottery_abi,
  contract_addr,
  owner_addr,
  owner_priv,
} from "./val/contract_val";

// 브라우저에서 사용할 수 있는 web3 객체 생성
let web3;
let lottery_con: any;
export async function initUserMetaWallet(): Promise<number> {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.web3 = web3;
    lottery_con = new web3.eth.Contract(lottery_abi, contract_addr);
    window.lottery_con = lottery_con;
    return 1;
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log("window.ethereum is not defined");
    return 0;
  }

  return 1;
}

let owner: any;
let local_web3: any;
let local_lottery_con: any;
export async function initLocalWallet(): Promise<number> {
  if (window.ethereum) {
    const rpcURL = "http://localhost:8545";
    local_web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    owner = local_web3.eth.accounts.privateKeyToAccount(owner_priv);
    console.log("owner :", owner);
    local_web3.eth.accounts.wallet.add(owner);
    local_web3.eth.defaultAccount = owner.address;

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
  console.log("getWalletInfo...........");
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts: string[] = await window.web3.eth.getAccounts();
    console.log(accounts);
    const balance: bigint = await window.web3.eth.getBalance(accounts[0]);

    return {
      account: accounts[0],
      balance: Number(balance),
    };
  } else {
    alert("Please download metamask");
  }
}

// 컨트랙트 변수 불러오기
export async function getGameState() {
  console.log("getGameState...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const started = await window.local_lottery_con.methods
        .gameStarted()
        .call();
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
  console.log("getBettingAmount...........");
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

// 최고 지급액 가져오기
export async function getTopPayouts() {
  console.log("getTopPayouts...........");
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

// 배당률 가져오기
export async function getOddsRate(number: number, guess: boolean) {
  console.log("getDividendRate...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const rate = await window.lottery_con.methods
        .calculateOdds(number, guess)
        .call();
      console.log("rate: ", rate);
      return rate;
    } catch (error) {
      console.error("Error fetching dividend rate:", error);
    }
  }
}

// 베팅하기
export async function bet(number: number, guess: boolean) {
  console.log("betting...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const accounts = await window.web3.eth.getAccounts();
      console.log("betting account: ", accounts[0]);
      console.log("betting number: ", number);
      console.log("betting guess: ", guess);

      const bet = await window.lottery_con.methods.bet(number, guess).send({
        from: accounts[0],
        to: contract_addr,
        value: window.web3.utils.toWei("1", "ether"),
        gas: 30000000,
        gasPrice: window.web3.utils.toWei("10", "gwei"),
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
  console.log("getLuckyNumbers...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.local_lottery_con.getPastEvents(
        "GAME_STARTED",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      const numbers =
        event_val.length > 0
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
  console.log("getFinalNumbers...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.local_lottery_con.getPastEvents(
        "GAME_ENDED",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      const numbers =
        event_val.length > 0
          ? event_val[event_val.length - 1].returnValues.finalNumbers
          : [];
      console.log("final: ", numbers);
      return numbers;
    } catch (error) {
      console.error("Error fetching final numbers:", error);
    }
  }
}

// 게임 정답 이벤트 가져오기
export async function gameAnswer_events() {
  console.log("gameAnswer_events...........");
  if (window.web3 && window.web3.eth && window.ethereum) {
    try {
      const event_val = await window.lottery_con.getPastEvents("GAME_ANSWER", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const answer: boolean[] =
        event_val.length > 0
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
  console.log("getLocalWalletInfo...........");
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
  console.log("startGame...........");
  if (window.local_web3) {
    try {
      const accounts = await window.local_web3.eth.getAccounts();
      const defaultAccount = accounts[0];

      if (defaultAccount !== owner_addr) {
        console.log("owner의 지갑이 아닙니다.");
        return 0;
      }

      const receipt = await window.local_lottery_con.methods.startGame().send({
        from: defaultAccount,
        gas: 5000000,
        gasPrice: local_web3.utils.toWei("10", "gwei"),
      });
      console.log("start game Transaction Hash: " + receipt.transactionHash);
      return 1;
    } catch (error: any) {
      console.error("Error starting game:", error);
      if (error.message.includes("revert")) {
        console.error("Smart contract revert reason:", error.reason);
      }
    }
  } else {
    console.log("window.local_web3 is not defined");
  }
  return 0;
}

// 게임 종료 (로컬)
export async function endGame() {
  console.log("endGame...........");
  if (window.local_web3) {
    try {
      const accounts = await window.local_web3.eth.getAccounts();
      const defaultAccount = accounts[0];

      if (defaultAccount !== owner_addr) {
        console.log("owner의 지갑이 아닙니다.");
        return 0;
      }

      // await window.local_lottery_con.methods.endGame().call({
      //   from: defaultAccount,
      // });

      const receipt = await window.local_lottery_con.methods.endGame().send({
        from: defaultAccount,
        gas: 5000000,
        gasPrice: local_web3.utils.toWei("10", "gwei"),
      });

      console.log("Endgame Transaction Hash: " + receipt.transactionHash);

      return 1;
    } catch (error: any) {
      console.error("Error ending game:", error);
      if (error.message.includes("revert")) {
        console.error("Smart contract revert reason:", error.reason);
      }
      return 0;
    }
  } else {
    console.log("window.local_web3 is not defined");
  }
  return 0;
}
