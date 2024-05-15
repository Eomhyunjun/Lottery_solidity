// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 1. owner가 게임 시작 함수 호출
// 2. 1~45 숫자 중 숫자를 임의로 3개 생성하기.
// 3. 사람들은 각 숫자에 대해서 true or false로 베팅(ex.10, 15, 20) -> 정답 (n,y,n)
// 4. 배팅 금액에 따른 배당 보여줌
// 5. owner가 게임 종료 함수를 호출
// 6. 1 ~ 45 숫자 중 6개를 뽑기
// 7. 6개 숫자 중 2번에서 뽑은 3개의 숫자가 있는 지 확인 후, 각 숫자에 대하여 있다면 true 없다면 false 측 승리
// 8. 승리 배당을 받기
// 9. 베팅 금액이 높은 순서대로 랭킹 보여줌

contract Lottery {
    address public owner; // owner 주소
    
    bool public gameStarted = false; // 게임 상태
    uint256 constant internal MIN_BET_AMOUNT = 1 * 10 ** 18; // 베팅 최소 금액, 1 이더
    uint public tmp_randomNumber; // 랜덤 숫자 임시 저장 변수
    
    uint[3] public luckyNumbers; // 세개의 숫자
    mapping(uint => bool) private luckyNumExists;  // 세 개의 숫자 존재 유무

    struct BetInfo {
        address payable bettor; // 베팅을 한 사람 주소
        uint256 betAmount;  // 베팅 금액
        uint number; // 베팅 번호 (1~45)
        bool guess; // 예측 true or false
    }

    event GAME_STARTED(uint[3] luckyNumbers);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function.");
    _;
    }

    function startGame() public onlyOwner { 
        require(!gameStarted, "Game has already started.");

        for (uint i = 0; i < 3; i++) {
            tmp_randomNumber = (generateRandomNumber(i) % 45 + 1);

            while(luckyNumExists[tmp_randomNumber]) {
                tmp_randomNumber = (generateRandomNumber(i) % 45 + 1);
            }
            luckyNumbers[i] = tmp_randomNumber;
            luckyNumExists[tmp_randomNumber] = true;
        }
        gameStarted = true;
        emit GAME_STARTED(luckyNumbers);
    }

    function endGame() public onlyOwner {
        require(gameStarted, "Game has not started yet.");
        gameStarted = false;
    }

    function generateRandomNumber(uint seed) private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed)));
    }
}