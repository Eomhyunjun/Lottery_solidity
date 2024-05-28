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
  payout: BigInt;
}

export interface T_IntTopPayout {
  bettor: string;
  payout: number;
}

export async function initGame() {
  const isSuccess = await initUserMetaWallet();
  const isSuccessLocal = await initLocalWallet();

  let gameStat: boolean | undefined;
  let luckyNumbers: BigInt[] | undefined;
  let IntLuckyNumbers: number[] | undefined;
  let finalNumbers: BigInt[] | undefined;
  let IntFinalNumbers: number[] | undefined;
  let topFive: T_TopPayout[] | undefined;
  let IntGetTopFive: T_IntTopPayout[] | undefined;

  if (isSuccess && isSuccessLocal) {
    gameStat = await getGameState();

    if (gameStat) {
      luckyNumbers = await getLuckyNumbers();
      IntLuckyNumbers = luckyNumbers
        ? luckyNumbers.map((num) => Number(num))
        : [0, 0, 0];
    } else {
      finalNumbers = await getFinalNumbers();
      IntFinalNumbers = finalNumbers
        ? finalNumbers.map((num) => Number(num))
        : [0, 0, 0, 0, 0, 0];
    }
    topFive = await getTopPayouts();
    IntGetTopFive = topFive
      ? topFive.map((bettorInfo: T_TopPayout): T_IntTopPayout => {
          return {
            bettor: bettorInfo.bettor,
            payout: Number(bettorInfo.payout),
          };
        })
      : [{ bettor: "", payout: 0 }];
    console.log("getTopPayout: ", topFive);
  }
  return {
    gameStat,
    IntLuckyNumbers,
    IntFinalNumbers,
    isSuccess,
    IntGetTopFive,
  };
}

export async function startGame_rootin() {
  const luckyNumbers: BigInt[] = await getLuckyNumbers();
  const IntLuckyNumbers: number[] = luckyNumbers
    ? luckyNumbers.map((num) => Number(num))
    : [0, 0, 0];
  return { IntLuckyNumbers };
}

export async function endGame_rootin() {
  const finalNumbers: BigInt[] = await getFinalNumbers();
  const IntFinalNumbers: number[] = finalNumbers
    ? finalNumbers.map((num) => Number(num))
    : [0, 0, 0, 0, 0, 0];
  const answer: boolean[] = await gameAnswer_events();
  const topFive = await getTopPayouts();

  return { IntFinalNumbers, answer };
}
