import { Avatar, AvatarFallback, AvatarImage } from "@/utils/ui/avatar";

export default function LearderBoard({ topFive }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
        Leaderboard
      </h2>
      <div className="p-4 space-y-2 bg-gray-200 rounded-lg dark:bg-gray-800">
        {topFive &&
          topFive[0].payout !== 0 &&
          topFive.map((betInfo: any, i: number) => {
            if (betInfo.payout === 0) return null;

            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-50">
                      {betInfo.bettor}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {window.web3.utils.fromWei(betInfo.payout, "ether")} ETH
                    </p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-50">
                  {i + 1}st
                </div>
              </div>
            );
          })}
        {topFive && topFive[0].payout === 0 && (
          <div> 아직 베팅을 한 사람이 없어요</div>
        )}
      </div>
    </div>
  );
}
