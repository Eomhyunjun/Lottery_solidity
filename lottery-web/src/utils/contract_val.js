export const owner_addr = '0xF76c9B7012c0A3870801eaAddB93B6352c8893DB'
export const owner_priv =
  '0x8d22a0aa9c43da157ebc24bc7d70c26d198381e042ab93434757752e3f0ee8e5'

export const contract_addr = "0x93926d65fCC81505490A0581a3c30597c8dA587A";
export const lottery_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"bettor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"number","type":"uint256"},{"indexed":false,"internalType":"bool","name":"guess","type":"bool"}],"name":"BET","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[6]","name":"finalNumbers","type":"uint256[6]"}],"name":"GAME_ENDED","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[3]","name":"luckyNumbers","type":"uint256[3]"}],"name":"GAME_STARTED","type":"event"},{"inputs":[],"name":"gameStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"tmp_randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"startGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"},{"internalType":"bool","name":"guess","type":"bool"}],"name":"bet","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"name":"getBettingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true}];
