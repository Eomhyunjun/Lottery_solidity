export const owner_addr = '0xF76c9B7012c0A3870801eaAddB93B6352c8893DB'
export const owner_priv =
  '0x8d22a0aa9c43da157ebc24bc7d70c26d198381e042ab93434757752e3f0ee8e5'

export const contract_addr = '0xC8cbDe94d91791d7Fd2282c04C021271449eFc4D'
export const lottery_abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[3]',
        name: 'luckyNumbers',
        type: 'uint256[3]',
      },
    ],
    name: 'GAME_STARTED',
    type: 'event',
  },
  {
    inputs: [],
    name: 'gameStarted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'luckyNumbers',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'tmp_randomNumber',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
