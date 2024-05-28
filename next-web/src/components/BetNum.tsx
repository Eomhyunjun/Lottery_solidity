import React, { useMemo, useCallback } from "react";
import { NumberCard } from "./number-card";
import { StatusBar } from "./status-bar";
import { GameState } from "@/types/games";
import WinningNum from "./WinningNum";
import { initUserMetaWallet } from "@/utils/lotteryWeb3";

/**
 * 베팅 관련 View
 * 게임 상황 (게임이 시작되었는지, 게임이 끝났는지, 게임 결과) / 총 베팅 금액 / 게임 남은 시간
 *
 * 게임 진행중이라면 -> 베팅 가능한 숫자들 (+ 배당률, yes or no 각각에 대한 총 금액)
 * 각 숫자에 해당하는 베팅하기 버튼
 *
 * 게임 종료 후 -> 게임 결과 (yes or no) / 총 베팅 금액 / 총 배당금 / 당첨자 지갑 명단 / 5초 후 자동으로 다음 게임 시작 / 전광판 변경
 *
 */

// 게임 시간 - 1분, 게임 종료 후 30초 대기, 다음 게임 시작
// 자동으로 게임 시작
// 시간 세기 -> status bar 변경
// 베팅 숫자 가져오기 -> 베팅 숫자 변경
// 배팅액 배당율 가져오기 -> 배당율 변경
// 내 베팅 기록 가져오기

interface BetNumProps {
  state: GameState;
  luckNumbers: number[];
  time: number;
  answer: boolean[];
  finalNumbers: number[];
  setState: (state: GameState) => void;
}

const BetNum = React.memo(function BetNum({
  state,
  luckNumbers,
  answer,
  finalNumbers,
  setState,
}: BetNumProps) {
  const tmp_luckNumbers = useMemo(
    () => (luckNumbers?.length === 3 ? luckNumbers : [0, 0, 0]),
    [luckNumbers]
  );

  console.log("BetNum: 리렌더링???");
  const tmp_finalNumbers = useMemo(() => finalNumbers, [finalNumbers]);
  const renderNumberCards = useCallback(() => {
    return (
      answer &&
      answer.length > 0 &&
      tmp_luckNumbers.map((num, i) => (
        <NumberCard
          key={i}
          num={Number(num)}
          index={i}
          answer={answer[i]}
          state={state}
        />
      ))
    );
  }, [answer, tmp_luckNumbers, state]);

  return (
    <div className="space-y-4 ">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
        Your Bet
      </h2>
      <div className="grid grid-cols-3 gap-4">{renderNumberCards()}</div>
      <div>
        {state === "게임 종료" &&
          tmp_finalNumbers?.length > 0 &&
          tmp_finalNumbers[0] !== 0 && (
            <div className="my-[40px]">
              <WinningNum
                finalNumbers={tmp_finalNumbers}
                luckNumbers={luckNumbers}
              />
            </div>
          )}
        <StatusBar title="게임 상태" status={state} setState={setState} />
      </div>
    </div>
  );
});

export default BetNum;
