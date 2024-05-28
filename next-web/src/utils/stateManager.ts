import {
  gameAnswer_events,
  getFinalNumbers,
  getGameState,
  getLuckyNumbers,
  getTopPayouts,
  initLocalWallet,
  initUserMetaWallet,
} from "./lotteryWeb3";

interface T_TopPayout {
  bettor: string;
  payout: bigint;
}

export interface T_IntTopPayout {
  bettor: string;
  payout: number;
}

export async function initGame() {
  let IntLuckyNumbers: number[] = [0, 0, 0];
  let IntFinalNumbers: number[] = [0, 0, 0, 0, 0, 0];
  let IntGetTopFive: T_IntTopPayout[] = [];

  let isSuccessAllProcess = false;

  const [
    isMetaInitSuccess,
    isSuccessLocal,
    gameStat,
    luckyNumbers,
    finalNumbers,
    topFive,
  ] = await Promise.all([
    initUserMetaWallet(),
    initLocalWallet(),
    getGameState(),
    getLuckyNumbers(),
    getFinalNumbers(),
    getTopPayouts(),
  ]);

  if (isMetaInitSuccess && isSuccessLocal) {
    IntLuckyNumbers = luckyNumbers.map((num: bigint) => Number(num));
    IntFinalNumbers = finalNumbers.map((num: bigint) => Number(num));
    IntGetTopFive = topFive.map((item: T_TopPayout) => {
      return { bettor: item.bettor, payout: Number(item.payout) };
    });
  }

  if (IntLuckyNumbers[0] || IntFinalNumbers[0]) {
    isSuccessAllProcess = true;
  }

  return {
    gameStat,
    IntLuckyNumbers,
    IntFinalNumbers,
    isSuccessAllProcess,
    IntGetTopFive,
  };
}

export async function startGame_rootin() {
  let gameStat: boolean = await getGameState();

  while (gameStat !== true) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 100ms 대기
    gameStat = await getGameState();
    console.log("게임 시작 블록 확정 대기중... ", gameStat);
  }

  const luckyNumbers: bigint[] = await getLuckyNumbers();
  const IntLuckyNumbers: number[] = luckyNumbers
    ? luckyNumbers.map((num) => Number(num))
    : [0, 0, 0];

  return { IntLuckyNumbers };
}

export async function endGame_rootin() {
  let gameStat: boolean = await getGameState();

  console.log("게임 종료 블록 확정 대기중... ", gameStat);
  while (gameStat !== false) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 100ms 대기
    gameStat = await getGameState();
    console.log("게임 종료 블록 확정 대기중... ", gameStat);
  }

  const [finalNumbers, answer, topFive] = await Promise.all([
    getFinalNumbers(),
    gameAnswer_events(),
    getTopPayouts(),
  ]);

  const IntFinalNumbers: number[] = finalNumbers.map((num: bigint) =>
    Number(num)
  );

  console.log("endgame topFive: ", topFive);

  return { IntFinalNumbers, answer };
}
