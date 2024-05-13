// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint[3] public luckyNumbers; // 세개의 숫자
    uint[6] public finalNumbers; // 6개 숫자
    bool[3] public answer; // 각 숫자가 존재하는지에 대한 정답
    bool public gameStarted = false; // 게임 상태
    uint public randomNumber;
    uint[3] public totalBetAmount;
    
    uint256 constant internal MIN_BET_AMOUNT = 1 * 10 ** 17; // 베팅 최소 금액, 1 이더

    mapping(uint => mapping(bool => uint)) private bettingAmount; // 각 숫자와 예상(true/false)에 따른 총 베팅 금액을 저장하는 맵핑입니다.
    mapping(address => mapping(uint => bool)) private bettors; // 베터들의 주소, 그들이 선택한 숫자, 그리고 그들의 예측을 저장하는 맵핑입니다.
    mapping(uint => bool) private luckyNumExists;  // 세 개의 숫자 존재 유무
    mapping(uint => bool) private finalNumExists; // 6개의 숫자 존재 유무
    
    struct BetInfo {
        address payable bettor; // 맞추면 보내줄 주소
        uint256 betAmount;  // 베팅 금액
        uint number; // 베팅 번호
        bool guess; // 예측
    }
    
    uint256 private _tail;
    // mapping (uint => mapping(bool => BetInfo[])) private _bets; // 베팅 정보
    mapping (uint256 => BetInfo) private _bets;

    // event -> 게임 시작 시 -> luckyNumbers 출력
    event GAME_STARTED(uint[3] luckyNumbers);

    // event -> bet이 진행될 때마다 -> bettor, number, guess, amount, 베팅한 곳의 bettingAmount 출력
    event BET(uint256 index, address bettor, uint256 amount, uint number, bool guess, uint256 answerBlockNumber);

    // event -> 게임이 끝나면 -> answer, 당첨자 지갑 주소, 당첨 금액
    // 당첨자들은 모두 지금까지 상금 mapping에 저장, mapping에 저장하며 최댓값(top5) 따로 저장

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // 초기화
    function init() private {
            for (uint i = 0; i < luckyNumbers.length; i++) {
                luckyNumExists[luckyNumbers[i]] = false;
            }

            for (uint i = 0; i < finalNumbers.length; i++) {
                finalNumExists[finalNumbers[i]] = false;
            }

            for (uint i = 0; i < luckyNumbers.length; i++) {
                bettingAmount[i][true] = 0;
                bettingAmount[i][false] = 0;
            }
            _tail = 0;
    }

    // 게임 시작 함수, 시작과 함께 숫자 3개 뽑음
    function startGame() public onlyOwner { 
        require(!gameStarted, "Game has already started.");
        init();

        for (uint i = 0; i < 3; i++) {
            randomNumber = (generateRandomNumber(i) % 45 + 1);

            while(luckyNumExists[randomNumber]) {
                randomNumber = (generateRandomNumber(i) % 45 + 1);
            }
            luckyNumbers[i] = randomNumber;
            luckyNumExists[randomNumber] = true;
            
        }
        gameStarted = true;
        emit GAME_STARTED(luckyNumbers);
    }
    
    // 베팅 함수 -> 베팅 금액과 bettors를 알 수 있음
    // 반대쪽에 걸 수 없도록 하는 예외처리 필요
    function bet(uint number, bool guess) public payable returns(bool result) {
        // 게임이 시작되어야 함
        require(gameStarted, "Game has not started.");
        // 숫자는 정해진 범위 안에서
        require(number >= 0 && number <= 2, "Number must be between 0 and 2");
        // 최소 베팅 금액
        require(msg.value >= MIN_BET_AMOUNT, "Not enough ETH");

        require(pushBet(number, guess), "pushBet failed!!");

        emit BET(_tail - 1, msg.sender, msg.value, number, guess, bettingAmount[number][guess]);

        return true;
    }

    function pushBet(uint number, bool guess) internal returns (bool) {
        bettingAmount[number][guess] += msg.value; // 총 배팅 금액에 저장

        BetInfo memory betting; // 한 사람이 배팅한 정보
        betting.bettor = payable(msg.sender);
        betting.betAmount = msg.value;
        betting.number = number;
        betting.guess = guess;

        _bets[_tail] = betting;
        _tail++;

        return true;
    }

    function getBetInfo(uint256 index) public view returns (address bettor, uint256 betAmount, uint number, bool guess) {
        BetInfo memory betting = _bets[index];
        bettor = betting.bettor;
        betAmount = betting.betAmount;
        number = betting.number;
        guess = betting.guess;
    }

    // 게임 종료 함수
    function endGame() public onlyOwner {
        require(gameStarted, "Game has not started.");
        for (uint i = 0; i < 6; i++) {
            randomNumber = (generateRandomNumber(i + 3) % 45 + 1);

            while(finalNumExists[randomNumber]) {
                randomNumber = (generateRandomNumber(i) % 45 + 1);
            }
            finalNumbers[i] = randomNumber;
            finalNumExists[randomNumber] = true;
            
        }
        rewardBettors();
        gameStarted = false;
    }


    function rewardBettors() private {
        // 당첨 번호 확인
        // luckyNumExists에 해당 값이 있는 지 조회 후 answer에 저장
        for (uint i = 0; i < luckyNumbers.length; i++) {
            answer[i] = finalNumExists[luckyNumbers[i]] ? true : false;
            
        }

        // 각 숫자 돌면서 -> 당첨자 확인 -> 당첨자에게 배당
        for (uint i = 0; i < luckyNumbers.length; i++) {
            bool existsInFinal = answer[i] ? true : false; // 당첨 여부
            

            totalBetAmount[i] += bettingAmount[i][true] + bettingAmount[i][false]; // 총 상금
            

            uint winnerPool = existsInFinal ? bettingAmount[i][true] : bettingAmount[i][false];
            
            if (winnerPool > 0) {
                uint256 rewardPerEther = (totalBetAmount[i] * 9 / 10) / winnerPool; // 배팅한 1 이더씩 얻는 금액
                
                // BetInfo[] memory winners = _bets[i][existsInFinal];
                BetInfo memory winners;

                for (uint k = 0; k < _tail; k++) {
                    // 각 승자에게 보상을 분배합니다.
                    winners = _bets[k];
                    
                    if((winners.number == i) && (winners.guess == existsInFinal) ) {
                        
                        payable(winners.bettor).transfer(winners.betAmount * (1 + rewardPerEther));
                        
                        totalBetAmount[i] = 0;
                    }
                    popBet(k);
                }
            }
        }
    }

    function popBet(uint256 index) internal returns (bool) {
        delete _bets[index]; //가스를 돌려받음
        return true;
    }

    // 랜덤 숫자 생성 함수
    function generateRandomNumber(uint seed) private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed)));
    }
}