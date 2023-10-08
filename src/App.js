/*
[피드백]

리팩토링은 커밋 중간 중간에 해주기. 다 끝나고나서 하려면 많은 걸 손대야한다

실제 사용자가 있다고 생각해보기
→ 다양한 상황의 예외 처리를 미리 고민해보기
ex) 사용자가 공백 입력, 중복 처리, 입력 및 보너스 중복 처리 등등

배열 및 객체로 선언했을 것 같다
→ this.matchSix = 0; this.matchFiveAndBonus = 0; ...
→ (객체로 고치면)
reward = {
  firstWin : 
  secondWin : 
}

유효성 검사 함수명을 통일 시키기
→ check함수명과 validate 함수명을 통일 

Boolean 값의 변수명은 is 나 has 접두사로 쓰기 
→ bonusSame → isBonusSame

변수명이 동사로 시작하면 착각할 수도 있다. 명사형으로 써주기
→ playTimes

Lotto 클래스와 App 클래스 
→ 일단은 App에 모든 함수를 작성했지만, 함수를 다시 한번 보면서 Lotto와 App(게임진행) 중에 어디에 더 적합한지 고민해보기

MVC패턴 적용하는 것보다 기본기가 가장 중요하다 
→ 기본기 = 함수명 잘 짓기 & 함수가 한 가지 일을 하기 ...
EX) UI와 로직 모듈화 
→ 분리 근거를 갖고있는 것이 중요
→ MVC은 기본기가 쌓인 이후에 적용할 것

*/


const MissionUtils = require("@woowacourse/mission-utils"); // 우테코 API
const Lotto = require("./Lotto");

class App {

  constructor() {
    this.userMoney;
    this.wholeLottoList = []; // 이중 배열인 상태로 저장됨
    this.userLottoNum = [];
    this.bonusNumber;
    this.matchSix = 0;
    this.matchFiveAndBonus = 0;
    this.matchFive = 0;
    this.matchFour = 0;
    this.matchThree = 0;
    this.rateOfReturn = 0; // rateOfReturn을 클래스 멤버 변수로 선언
  }

  getUserInput() {
    MissionUtils.Console.readLine('구입금액을 입력해주세요.\n', (userInput) => {
      this.checkUserInput(userInput);
      this.userMoney = userInput;
      this.setLottoNumber();
    });
  }

  setLottoNumber() {
    const playTimes = this.userMoney / 1000;
    // n번 반복
    for (let i = 0; i < playTimes; i++) {
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6); // 배열 반환
      // 오름차순
      this.wholeLottoList.push(numbers.sort(function (a, b) {
        return a - b;
      }));
    }
    MissionUtils.Console.print(`${playTimes}개를 구매했습니다.`);
    this.wholeLottoList.forEach((eachLottoList) => MissionUtils.Console.print(eachLottoList));
    /*
    this.wholeLottoList.forEach((lottoNumber) =>
      MissionUtils.Console.print(`[${lottoNumber.join(', ')}]`)
    );
     */
    this.getUserLotto();
  }

  // 유저로부터 받은 로또 저장시 각 배열의 요소를 Number로 형변환 해줌
  getUserLotto() {
    MissionUtils.Console.readLine('\n당첨 번호를 입력해 주세요. \n', (userInput) => { // readLine은 문자열을 반환
      this.userLottoNum = userInput.split(',').map(Number); // 숫자가 저장된 배열 반환 [1,3,5,7,9,10]
      //console.log("this.userLottoNum :" + this.userLottoNum);
      new Lotto(this.userLottoNum); // 로또 번호저장(유효성 검사 알아서 함)
      this.getUserBonusNum();
    });
  }

  getUserBonusNum() {
    MissionUtils.Console.readLine('\n보너스 번호를 입력해 주세요. \n', (userInput) => {
      // 보너스 숫자도 유효성 검사 필요
      this.bonusNumber = Number(userInput); // userInput이 String이라 Number로 형변환
      //console.log('userMoney', this.userMoney);
      this.calculateReward();
    });
  }

  // 당첨금 정산 및 수익률 출력
  printMoneyReward() {
    MissionUtils.Console.print(
      `\n당첨 통계
    ---
    3개 일치(5, 000원) - ${this.matchThree}개
    4개 일치(50, 000원) - ${this.matchFour}개
    5개 일치(1, 500, 000원) - ${this.matchFive}개
    5개 일치, 보너스 볼 일치(30, 000, 000원) - ${this.matchFiveAndBonus}개
    6개 일치(2, 000, 000, 000원) - ${this.matchSix}개
    총 수익률은 ${this.rateOfReturn}% 입니다.`
    );

  }


  // 정산 및 수익률 계산 함수
  calculateMoneyReward(matchCount, bonusSame) {
    //console.log('matchCount', matchCount);
    //console.log('bonusSame', bonusSame);

    // let matchSix = 0, matchFiveAndBonus = 0, matchFive=0,matchFour = 0, matchThree = 0; // 전역 멤버로

    if (matchCount == 6)
      this.matchSix++;
    if (matchCount == 5 && bonusSame == true)
      this.matchFiveAndBonus++;
    if (matchCount == 5 && bonusSame == false)
      this.matchFive++;
    if (matchCount == 4)
      this.matchFour++;
    if (matchCount == 3)
      this.matchThree++;


    const sum = (5000 * this.matchThree) + (50000 * this.matchFour) + (1500000 * this.matchFive) + (30000000 * this.matchFiveAndBonus) + (2000000000 * this.matchSix);
    // 수익률 계산
    this.rateOfReturn = (sum / this.userMoney) * 100;
    this.rateOfReturn = (this.rateOfReturn).toFixed(2); // 소수 둘째자리 까지만

  }

  // 오류 함수 코드
  // include 안 먹힘 -> oneLottoList가 배열이 아닌가봐
  calculateReward() {
    this.wholeLottoList.forEach((oneLottoList) => {
      let bonusSame = false;
      let matchCount = oneLottoList.filter((nums) => this.userLottoNum.includes(nums)).length; // 맞춘 로또 숫자 개수 반환
      //console.log('here');
      //console.log('checkhere', oneLottoList.includes(this.bonusNumber)); // number로 바꿔야하니?
      //console.log('oneLottoList', oneLottoList);
      //console.log('type oneLottoList', typeof oneLottoList, '  typeof this.bonusNumber', typeof this.bonusNumber);
      if (oneLottoList.includes(this.bonusNumber)) {
        // console.log('this.bonusNumber', this.bonusNumber);
        bonusSame = true;
      }

      //console.log('matchCount', matchCount);
      //console.log('bonusNumber', this.bonusNumber);

      this.calculateMoneyReward(matchCount, bonusSame);
    });
    this.printMoneyReward();
  }



  checkUserInput(userInput) {
    if (userInput % 1000 != 0)
      throw new Error("[ERROR] 입력하신 금액은 1000 단위가 아닙니다.");
    return;
  }


  play() {
    this.getUserInput();
  }

}

const app = new App();
app.play();

module.exports = App;
