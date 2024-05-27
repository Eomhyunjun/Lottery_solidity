export const owner_addr: string = "0xF76c9B7012c0A3870801eaAddB93B6352c8893DB";
export const owner_priv: string =
  "0x8d22a0aa9c43da157ebc24bc7d70c26d198381e042ab93434757752e3f0ee8e5";

export const contract_addr: string = "0xC89C4883D9206f011cC10AeB06558845BCe8Ddfd";

export const lottery_abi:Array<any> = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"bettor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"number","type":"uint256"},{"indexed":false,"internalType":"bool","name":"guess","type":"bool"}],"name":"BET","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool[3]","name":"winner","type":"bool[3]"}],"name":"GAME_ANSWER","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[6]","name":"finalNumbers","type":"uint256[6]"}],"name":"GAME_ENDED","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[3]","name":"luckyNumbers","type":"uint256[3]"}],"name":"GAME_STARTED","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bettor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PAYOUT","type":"event"},{"inputs":[],"name":"gameStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"payouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"tmp_randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"topPayouts","outputs":[{"internalType":"address","name":"bettor","type":"address"},{"internalType":"uint256","name":"payout","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"startGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"},{"internalType":"bool","name":"guess","type":"bool"}],"name":"calculateOdds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"},{"internalType":"bool","name":"guess","type":"bool"}],"name":"bet","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"name":"getBettingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getTopPayouts","outputs":[{"components":[{"internalType":"address","name":"bettor","type":"address"},{"internalType":"uint256","name":"payout","type":"uint256"}],"internalType":"struct Lottery.PayoutInfo[5]","name":"","type":"tuple[5]"}],"stateMutability":"view","type":"function","constant":true}];
