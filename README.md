# Lottery-Dapps

솔리디티를 이용한 복권 기반 토토 서비스입니다.

## 개발 목적
로또번호와 문제를 시스템에서 랜덤하게 생성하기 때문에 기준 로또보다 신뢰성과 공정성을 보장할 수 있으며,
관리자의 개입이 없어 **투명성을 보장**한다.

## 기존 복권의 문제점
1. **불공정성**: 번호 선택이나 당첨 여부에 인간의 개입이 있을 수 있어 공정하지 않을 수 있다.
2. **관리자 개입 가능성**: 복권 발급 과정에서 조작이 가능하며, 관리자의 부당한 개입으로 인한 불신이 발생할 수 있다.
3. **불투명성**: 복권 발행 및 당첨결과의 과정이 투명하지 않아, 당첨이 실제로 공정하게 이루어졌는지 확신하기 어렵다.
4. **사기와 부정행위 가능성**: 조작된 복권을 이용하여 부당이득을 취할 수 있다.
5. **적절한 보안 부재**: 보안 시스템이 취약하여 복권 발행 시스템에 해킹이나 침입이 발생할 수 있다.

## 예상 사용자 및 예상 효용
![다이어그램](readme/utility.png)

## 개요도
![개요도](readme/diagram.png)

## 주요 기능
1. owner가 게임 시작 함수 호출
2. 1~45 숫자 중 숫자를 임의로 3개 생성하기.
3. 사람들은 각 숫자에 대해서 true or false로 베팅(ex.10, 15, 20) -> 정답 (n,y,n)
4. 배팅 금액에 따른 배당 보여줌
5. owner가 게임 종료 함수를 호출
6. 1 ~ 45 숫자 중 6개를 뽑기
7. 6개 숫자 중 2번에서 뽑은 3개의 숫자가 있는 지 확인 후, 각 숫자에 대하여 있다면 true 없다면 false 측 승리
8. 승리 배당을 받기
9. 베팅 금액이 높은 순서대로 랭킹 보여줌

## 사용 방법
### [Ganache](https://github.com/trufflesuite/ganache)
- `cd lottery-sol`
- `npm run ga`

### [Truffle](https://github.com/trufflesuite/truffle)
- `cd lottery-sol`
- `npm run con`

### Web (React)
- `cd lottery-web`
- `npm run start`

### updateSol.sh
- lottery-sol에서 sol 파일을 빌드하여 생성된 ABI와 contract 주소를, lottery-web의 abi 변수에 복사하는 쉘 입니다.
- jq 명령어를 필요로 합니다. / Mac: `brew install jq`