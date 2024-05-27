// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// [v] 1. owner가 게임 시작 함수 호출
// [v] 2. 1~45 숫자 중 숫자를 임의로 3개 생성하기.
// [v] 3. 사람들은 각 숫자에 대해서 true or false로 베팅(ex.10, 15, 20) -> 정답 (n,y,n)
// [v] 4. 배팅 금액에 따른 배당 보여줌
// [v] 5. owner가 게임 종료 함수를 호출
// [v] 6. 1 ~ 45 숫자 중 6개를 뽑기
// [v] 7. 6개 숫자 중 2번에서 뽑은 3개의 숫자가 있는 지 확인 후, 각 숫자에 대하여 있다면 true 없다면 false 측 승리
// [v] 8. 승리 배당을 받기
// 9. 베팅 금액이 높은 순서대로 랭킹 보여줌

contract Lottery {
    address payable public owner; // owner 주소
    bool public gameStarted = false; // 게임 상태
    uint256 constant internal MIN_BET_AMOUNT = 1 ether; // 베팅 최소 금액, 1 이더
    uint public tmp_randomNumber; // 랜덤 숫자 임시 저장 변수
    
    struct Game {
        uint[3] luckyNumbers; // 추첨된 행운 번호들
        mapping(uint => bool) luckyNumExists; // 행운 번호 존재 여부 확인용 매핑
        uint[6] finalNumbers; // 최종 번호들
        mapping(uint => bool) finalNumExists; // 최종 번호 존재 여부 확인용 매핑
        mapping(uint => mapping(bool => uint)) bettingAmount; // 베팅 금액 매핑
        bool[3] winner; // 행운 번호가 최종 번호에 포함되는지 여부

        mapping(uint256 => BetInfo) _bets; // 베팅 정보 매핑
        uint256 _bets_tail; // 베팅 인덱스

        mapping(address => mapping(uint => bool)) userBets; // 사용자별 각 번호에 대한 베팅 상태 추적
    }

    struct BetInfo {
        address payable bettor; // 베팅을 한 사람 주소
        uint256 betAmount; // 베팅 금액
        uint number; // 베팅 번호 (0~2)
        bool guess; // 예측 true or false
    }

    struct PayoutInfo {
        address bettor; // 상금을 받은 사람 주소
        uint256 payout; // 상금
    }

    mapping(address => uint256) public payouts; // 사용자별 상금 저장
    PayoutInfo[5] public topPayouts; // 상위 5명 상금 정보 저장

    mapping (uint256 => Game) private games; // 게임 데이터 매핑
    uint256 private _games_tail = 0; // 게임 인덱스

    event GAME_STARTED(uint[3] luckyNumbers); // 게임 시작 이벤트
    event GAME_ENDED(uint[6] finalNumbers); // 게임 종료 이벤트
    event GAME_ANSWER(bool[3] winner); // 게임 결과 이벤트
    event BET(uint256 index, address bettor, uint256 amount, uint number, bool guess); // 베팅 이벤트
    event PAYOUT(address indexed bettor, uint256 amount); // 상금 지급 이벤트

    constructor() {
        owner = payable(msg.sender); // 컨트랙트 생성자 설정
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function."); // 오직 소유자만 호출 가능
        _;
    }

    function startGame() public onlyOwner {
        require(!gameStarted, "Game has already started."); // 게임이 이미 시작되지 않아야 함

        Game storage game = games[_games_tail]; // 현재 게임 불러오기

        for (uint i = 0; i < 3; i++) {
            tmp_randomNumber = generateRandomNumber(i) % 45 + 1; // 랜덤 숫자 생성
            while(game.luckyNumExists[tmp_randomNumber]) { // 이미 존재하는 번호면 재생성
                tmp_randomNumber = generateRandomNumber(i + 12) % 45 + 1;
            }
            game.luckyNumbers[i] = tmp_randomNumber; // 행운 번호 설정
            game.luckyNumExists[tmp_randomNumber] = true; // 행운 번호 존재 여부 설정
        }

        gameStarted = true; // 게임 시작 상태로 변경
        emit GAME_STARTED(game.luckyNumbers); // 게임 시작 이벤트 발생
    }

    function endGame() public onlyOwner {
        require(gameStarted, "Game has not started yet"); // 게임이 시작되어야 함

        Game storage game = games[_games_tail]; // 현재 게임 불러오기

        for (uint i = 0; i < 6; i++) {
            tmp_randomNumber = generateRandomNumber(i) % 45 + 1; // 랜덤 숫자 생성
            while(game.finalNumExists[tmp_randomNumber]) { // 이미 존재하는 번호면 재생성
                tmp_randomNumber = generateRandomNumber(i + 12) % 45 + 1;
            }
            game.finalNumbers[i] = tmp_randomNumber; // 최종 번호 설정
            game.finalNumExists[tmp_randomNumber] = true; // 최종 번호 존재 여부 설정
        }

        emit GAME_ENDED(game.finalNumbers); // 게임 종료 이벤트 발생

        determineWinners(); // 게임 결과 및 게임 winner 파악
        
        popGame(); // 게임 데이터 초기화
        _games_tail++; // 게임 인덱스 증가
        gameStarted = false; // 게임 시작 상태 해제
    }

    function determineWinners() private {
        Game storage game = games[_games_tail]; // 현재 게임 불러오기

        for (uint i = 0; i < game.luckyNumbers.length; i++) {
            game.winner[i] = game.finalNumExists[game.luckyNumbers[i]] ? true : false; // 행운 번호가 최종 번호에 포함되는지 여부 설정
        }
        emit GAME_ANSWER(game.winner); // 게임 결과 이벤트 발생

        // 베팅 배당금 계산
        calculatePayouts();
    }

    function calculatePayouts() private {
        Game storage game = games[_games_tail]; // 현재 게임 불러오기

        for (uint i = 0; i < 3; i++) {
            bool lucky = game.winner[i]; // 행운 번호 당첨 여부

            // 해당 숫자에 베팅한 금액 가져오기
            uint totalBettingAmount = game.bettingAmount[i][true] + game.bettingAmount[i][false]; // 해당 번호에 대한 총 베팅 금액

            if (totalBettingAmount > 0) {
                // 수수료 계산
                uint commission = (totalBettingAmount * 1) / 10; // 베팅 금액의 10%를 수수료로 사용

                // 각 승리자에게 배당금 계산
                for (uint j = 0; j < game._bets_tail; j++) {
                    BetInfo storage currentBet = game._bets[j];
                    if (currentBet.number == i && currentBet.guess == lucky) { // 베팅 번호와 당첨 여부가 일치하는 경우
                        uint payout = (currentBet.betAmount * calculateOdds(i, lucky)) / 100; // 배당금 계산
                        payouts[currentBet.bettor] += payout; // 상금을 사용자별로 저장
                        updateTopPayouts(currentBet.bettor, payouts[currentBet.bettor]); // 상위 5명 업데이트
                        currentBet.bettor.transfer(payout); // 배당금 전송
                        emit PAYOUT(currentBet.bettor, payout); // 상금 지급 이벤트 발생
                    }
                }
                // 컨트랙트 소유자에게 수수료 전송
                owner.transfer(commission);
            }
        }
    }


    function calculateOdds(uint number, bool guess) public view returns (uint) {
        require(gameStarted, "Game has not started."); // 게임이 시작되어야 함

        Game storage game = games[_games_tail]; // 현재 게임 불러오기
        uint totalBettingAmount = game.bettingAmount[number][true] + game.bettingAmount[number][false]; // 총 베팅 금액
        uint guessingAmount = game.bettingAmount[number][guess]; // 해당 예측에 대한 베팅 금액

        if (guessingAmount == 0 || totalBettingAmount == 0) { // 해당 예측에 대한 베팅 금액이 0인 경우 또는 총 베팅 금액이 0인 경우
            return 0;
        }

        uint winningAmount = (totalBettingAmount * 9) / 10; // 베팅 금액의 90%를 상금으로 사용
        uint odds = (winningAmount * 100) / guessingAmount; // 배당률을 퍼센트로 계산

        return odds;
    }


    function generateRandomNumber(uint seed) private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))); // 랜덤 숫자 생성
    }

    function popGame() private onlyOwner {
        delete games[_games_tail]; // 현재 게임 데이터 삭제
    }

    function bet(uint number, bool guess) public payable returns(bool result) {
        Game storage game = games[_games_tail]; // 현재 게임 불러오기
        // 게임이 시작되어야 함
        require(gameStarted, "Game has not started.");
        // 숫자는 정해진 범위 안에서
        require(number >= 0 && number <= 2, "Number must be between 0 and 2");
        // 최소 베팅 금액
        require(msg.value >= MIN_BET_AMOUNT, "Not enough ETH");
        // 이미 반대편에 베팅했는지 확인
        require(!game.userBets[msg.sender][number], "Cannot bet on both true and false for the same number.");

        require(pushBet(number, guess), "pushBet failed!!");
        
        game.userBets[msg.sender][number] = true; // 사용자가 해당 번호에 베팅했음을 표시

        emit BET(game._bets_tail - 1, msg.sender, msg.value, number, guess); // 베팅 이벤트 발생

        return true;
    }

    function pushBet(uint number, bool guess) internal returns (bool) {
        Game storage game = games[_games_tail]; // 현재 게임 불러오기

        game.bettingAmount[number][guess] += msg.value; // 총 베팅 금액에 저장 
        
        BetInfo memory betting; // 한 사람이 배팅한 정보 
        betting.bettor = payable(msg.sender);
        betting.betAmount = msg.value;
        betting.number = number;
        betting.guess = guess;

        game._bets[game._bets_tail] = betting; // 베팅 정보 저장
        game._bets_tail++; // 베팅 인덱스 증가

        return true;
    }

    function getBettingAmount(uint number, bool status) public view returns (uint) {
        return games[_games_tail].bettingAmount[number][status]; // 해당 번호와 상태에 대한 베팅 금액
    
    }

    // 상위 5명 상금 업데이트 함수
    function updateTopPayouts(address bettor, uint256 payout) private {
        for (uint i = 0; i < topPayouts.length; i++) {
            if (topPayouts[i].bettor == bettor) {
                topPayouts[i].payout = payout;
                sortTopPayouts();
                return;
            }
        }
        for (uint i = 0; i < topPayouts.length; i++) {
            if (topPayouts[i].payout < payout) {
                topPayouts[i] = PayoutInfo(bettor, payout);
                sortTopPayouts();
                return;
            }
        }
    }

    // 상위 5명 정렬 함수
    function sortTopPayouts() private {
        for (uint i = 0; i < topPayouts.length - 1; i++) {
            for (uint j = i + 1; j < topPayouts.length; j++) {
                if (topPayouts[i].payout < topPayouts[j].payout) {
                    PayoutInfo memory temp = topPayouts[i];
                    topPayouts[i] = topPayouts[j];
                    topPayouts[j] = temp;
                }
            }
        }
    }

    // 상위 5명 조회 함수
    function getTopPayouts() public view returns (PayoutInfo[5] memory) {
        return topPayouts;
    }
}