// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// [v] 1. owner가 게임 시작 함수 호출
// [v] 2. 1~45 숫자 중 숫자를 임의로 3개 생성하기.
// 3. 사람들은 각 숫자에 대해서 true or false로 베팅(ex.10, 15, 20) -> 정답 (n,y,n)
// 4. 배팅 금액에 따른 배당 보여줌
// [v] 5. owner가 게임 종료 함수를 호출
// [v] 6. 1 ~ 45 숫자 중 6개를 뽑기
// 7. 6개 숫자 중 2번에서 뽑은 3개의 숫자가 있는 지 확인 후, 각 숫자에 대하여 있다면 true 없다면 false 측 승리
// 8. 승리 배당을 받기
// 9. 베팅 금액이 높은 순서대로 랭킹 보여줌

contract Lottery {
    address public owner; // owner 주소
    bool public gameStarted = false; // 게임 상태
    uint256 constant internal MIN_BET_AMOUNT = 1 * 10 ** 18; // 베팅 최소 금액, 1 이더
    uint public tmp_randomNumber; // 랜덤 숫자 임시 저장 변수
    
    struct Game {
        uint[3] luckyNumbers;
        mapping(uint => bool) luckyNumExists;
        uint[6] finalNumbers;
        mapping(uint => bool) finalNumExists;
        mapping(uint => mapping(bool => uint)) bettingAmount;
    }

    struct BetInfo {
        address payable bettor; // 베팅을 한 사람 주소
        uint256 betAmount;  // 베팅 금액
        uint number; // 베팅 번호 (1~45)
        bool guess; // 예측 true or false
    }

    mapping (uint256 => Game) private games;
    uint256 private _games_tail = 0;

    mapping (uint256 => BetInfo) private _bets;
    uint256 private _bets_tail;

    event GAME_STARTED(uint[3] luckyNumbers);
    event GAME_ENDED(uint[6] finalNumbers);
    event BET(uint256 index, address bettor, uint256 amount, uint number, bool guess);


    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function.");
    _;
    }

    function startGame() public onlyOwner {
        require(!gameStarted, "Game has already started.");

        Game storage game = games[_games_tail];

        for (uint i = 0; i < 3; i++) {
            tmp_randomNumber = generateRandomNumber(i) % 45 + 1;
            while(game.luckyNumExists[tmp_randomNumber]) {
                tmp_randomNumber = generateRandomNumber(i + 12) % 45 + 1;
            }
            game.luckyNumbers[i] = tmp_randomNumber;
            game.luckyNumExists[tmp_randomNumber] = true;
        }

        gameStarted = true;
        emit GAME_STARTED(game.luckyNumbers);
    }

    function endGame() public onlyOwner {
        require(gameStarted, "Game has not started yet");

        Game storage game = games[_games_tail];

        for (uint i = 0; i < 6; i++) {
            tmp_randomNumber = generateRandomNumber(i) % 45 + 1;
            while(game.finalNumExists[tmp_randomNumber]) {
                tmp_randomNumber = generateRandomNumber(i + 12) % 45 + 1;
            }
            game.finalNumbers[i] = tmp_randomNumber;
            game.finalNumExists[tmp_randomNumber] = true;
        }

        emit GAME_ENDED(game.finalNumbers);
        
        popGame();
        _games_tail++;
        gameStarted = false;
    }

    function generateRandomNumber(uint seed) private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed)));
    }

    function popGame() private onlyOwner returns (bool) {
        delete games[_games_tail];
        return true;
    }

    function bet(uint number, bool guess) public payable returns(bool result) {
    // 게임이 시작되어야 함
    require(gameStarted, "Game has not started.");
    // 숫자는 정해진 범위 안에서
    require(number >= 0 && number <= 2, "Number must be between 0 and 2");
    // 최소 베팅 금액
    require(msg.value >= MIN_BET_AMOUNT, "Not enough ETH");

    require(pushBet(number, guess), "pushBet failed!!");

    emit BET(_bets_tail - 1, msg.sender, msg.value, number, guess);

    return true;
    }

    function pushBet(uint number, bool guess) internal returns (bool) {
        games[_games_tail].bettingAmount[number][guess] += msg.value; // 총 베팅 금액에 저장 

        BetInfo memory betting; //한 사람이 배팅한 정보 
        betting.bettor = payable(msg.sender);
        betting.betAmount = msg.value;
        betting.number = number;
        betting.guess = guess;

        _bets[_bets_tail] = betting;
        _bets_tail++;

        return true;
    }

    function getBettingAmount(uint number, bool status) public view returns (uint) {
        return games[_games_tail].bettingAmount[number][status];
    }
}