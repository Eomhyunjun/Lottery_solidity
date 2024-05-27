import { Badge } from "@/utils/ui/badge";

export default function MyBettinglist() {
  return (
    <div className="mt-4">
      <h3 className="mb-4 text-lg font-medium">내 베팅 기록</h3>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Bet Amount:</span>
              0.5 ETH{"\n"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Odds:</span>
              2.5x{"\n"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Potential Payout:</span>
              1.25 ETH{"\n"}
            </div>
            <Badge variant="success">Won</Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Bet Amount:</span>
              0.2 ETH{"\n"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Odds:</span>
              3x{"\n"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Potential Payout:</span>
              0.6 ETH{"\n"}
            </div>
            <Badge variant="danger">Lost</Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Bet Amount:</span>
              0.8 ETH{"\n"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Odds:</span>
              1.8x{"\n"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Potential Payout:</span>
              1.44 ETH{"\n"}
            </div>
            <Badge variant="success">Won</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
