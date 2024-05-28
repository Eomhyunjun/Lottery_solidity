import { useEffect, useState } from "react";

export default function WinningNum({
  finalNumbers,
  luckNumbers,
}: {
  finalNumbers: number[];
  luckNumbers: number[];
}) {
  const [colorBalls, setColorBalls] = useState<any>([]);

  useEffect(() => {
    makeColorBall();

    function makeColorBall() {
      if (!finalNumbers && !luckNumbers) return;

      const tmp = finalNumbers.map((num, i) => {
        return { num: Number(num), isAnswer: luckNumbers.includes(num) };
      });
      setColorBalls(tmp);
    }
  }, [finalNumbers, luckNumbers]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
        Winning Numbers
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {colorBalls.map((item, i): any => {
          return (
            <div
              key={i}
              className={`flex items-center justify-center w-12 h-12 font-bold text-gray-900 ${
                item.isAnswer ? "bg-green-200" : "bg-gray-200"
              } rounded-full dark:bg-gray-800 dark:text-gray-50`}
            >
              {item.num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
