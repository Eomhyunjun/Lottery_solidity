import { useState, useEffect } from "react";
import { Button } from "@/utils/ui/button";
import { bet } from "@/utils/lotteryWeb3";

interface NumberCardProps {
  num: number | null;
  index: number;
  answer: boolean;
  state: string;
}

export function NumberCard({ num, index, answer, state }: NumberCardProps) {
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    setFlipped(state === "게임 종료" ? true : false);
  }, [state]);

  return (
    <div className="perspective-1000 w-[268px] h-[268px] max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="card-face absolute inset-0  w-full h-full backface-hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-bold text-gray-900 text-8xl dark:text-gray-50">
              {num}
            </div>
            <div className="flex items-center justify-between w-full mt-6">
              <div className="flex flex-col items-center">
                <Button
                  className="text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:text-gray-50 dark:hover:bg-green-700"
                  size="sm"
                  variant="outline"
                  onClick={() => bet(index, true)}
                >
                  찬성
                </Button>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  베팅액: $100
                  <br />
                  배당율: 2.5x
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  className="text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-gray-50 dark:hover:bg-red-700"
                  size="sm"
                  variant="outline"
                  onClick={() => bet(index, false)}
                >
                  반대
                </Button>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  베팅액: $50
                  <br />
                  배당율: 3x
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-face absolute w-full h-full backface-hidden rotate-y-180">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-bold text-gray-900 text-3xl dark:text-gray-50">
              {num}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {String(answer)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
