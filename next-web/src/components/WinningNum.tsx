export default function WinningNum({
  finalNumbers,
}: {
  finalNumbers: number[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
        Winning Numbers
      </h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-green-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          23
        </div>
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-green-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          11
        </div>
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          39
        </div>
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          7
        </div>
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          31
        </div>
        <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
          14
        </div>
      </div>
    </div>
  );
}
