import { useEffect, useMemo, useState } from "react";
import { GameState } from "@/types/games";
import { GAME_ENDED, GAME_IN_PROGRES } from "@/utils/val/time_val";
import { endGame, startGame } from "@/utils/lotteryWeb3";

type StatusBarProps = {
  title: string;
  status: GameState;
  setState: (state: GameState) => void;
};

export function StatusBar({ title, status, setState }: StatusBarProps) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "게임 진행 중") {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let newTime = prevTime + 1;
          if (newTime > GAME_IN_PROGRES) {
            clearInterval(interval);
            endGame().then((res) => {
              setState("게임 종료");
            });
            newTime--;
          }
          return newTime;
        });
      }, 1000);
    } else if (status === "게임 종료 대기") {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let newTime = prevTime + 1;
          if (newTime > GAME_ENDED) {
            clearInterval(interval);
            startGame().then(() => {
              setState("게임 시작");
            });
            newTime--;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, setState]);

  useEffect(() => {
    setTime(0); // 상태가 변경될 때마다 타이머를 초기화합니다.
  }, [status]);

  const statusTime = useMemo(() => {
    return status === "게임 진행 중" ? GAME_IN_PROGRES : GAME_ENDED;
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "게임 종료 대기") {
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
    } else if (status === "게임 진행 중") {
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    }

    return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
  }, [status]);

  const barColor = useMemo(() => {
    if (status === "게임 종료 대기") {
      return " bg-red-500 ";
    } else if (status === "게임 진행 중") {
      return " bg-green-500 ";
    } else {
      return " bg-yellow-500 ";
    }
  }, [status]);

  const ment = useMemo(() => {
    if (status === "게임 진행 중") {
      return "게임이 종료됩니다.";
    } else if (status === "게임 종료 대기") {
      return "게임이 시작됩니다.";
    } else {
      return "서버와 연결중입니다...";
    }
  }, [status]);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{title}</div>
        <div
          className={
            "px-2 py-1 text-xs font-medium rounded-full " + statusColor
          }
        >
          {status}
        </div>
      </div>
      <div className="w-full h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-800">
        <div
          className={"h-2 " + barColor + " rounded-full"}
          style={{
            width: `calc((${time} / ${statusTime}) * 100%)`,
            transition: "width 1s ease",
          }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {(status === "게임 진행 중" || status === "게임 종료 대기") &&
          `${statusTime - time}초 후에`}{" "}
        {ment}
      </div>
    </div>
  );
}
