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
    MissionUtils.Console.readLine('구입금액을 입력해주세요.', (userInput) => {
      this.checkUserInput(userInput);
      this.userMoney = userInput;
      this.setLottoNumber();
    });
  }

  setLottoNumber() {
    const playTimes = this.userMoney / 1000;
    console.log("playTimes : " + playTimes);
    // n번 반복
    for (let i = 0; i < playTimes; i++) {
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6); // 배열 반환
      // 오름차순
      this.wholeLottoList.push(numbers.sort(function (a, b) {
        return a - b;
      }));
      console.log("전체 : " + this.wholeLottoList);
    }
    this.getUserLotto();
  }

  getUserLotto() {
    MissionUtils.Console.readLine('당첨 번호를 입력해 주세요.', (userInput) => {
      this.userLottoNum = userInput.split(','); // 배열 반환
      // Lotto 클래스에서 유효성 검사 
      new Lotto(this.userLottoNum);
      this.getUserBonusNum(); // 여기서 호출이 맞나
      // Lotto의 private 필드 number에 잘 저장되었나 출력해보기
      // const lotto = new Lotto(this.userLottoNum); 
      // lotto.printLottoNum(); 
    });

    return;
  }

  getUserBonusNum() {
    MissionUtils.Console.readLine('보너스 번호를 입력해 주세요.', (userInput) => {
      // 보너스 숫자도 유효성 검사 필요
      this.bonusNumber = userInput;
      this.calculateReward();
    });

  }

  // 당첨금 정산 및 수익률 출력
  printMoneyReward() {
    MissionUtils.Console.print(
      `당첨 통계
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

    // let matchSix = 0, matchFiveAndBonus = 0, matchFive=0,matchFour = 0, matchThree = 0; // 전역 멤버로

    if (matchCount == 6)
      this.matchSix++;
    if (matchCount == 5 && bonusSame == true)
      this.matchFiveAndBonus++;
    if (matchCount == 5)
      this.matchFive++;
    if (matchCount == 4)
      this.matchFour++;
    if (matchCount == 3)
      this.matchThree++;


    const sum = (5000 * this.matchThree) + (50000 * this.matchFour) + (1500000 * this.matchFive) + (30000000 * this.matchFiveAndBonus) + (2000000000 * this.matchSix);
    // 수익률 계산
    this.rateOfReturn = (sum / this.userMoney) * 100;

  }

  // 오류 함수 코드
  calculateReward() {
    let bonusSame = false;

    // 문제상황 
    // 1) 맞춘 로또 번호 개수인 mathCount가 계속 0만 나옴. 
    // 2) 보너스점수 일치 여부가 확인이 안 됨. 마찬가지로 includes 문이 반응 안 함

    // this.wholeLottoNum와 oneLotto와 this.userLottoNum 와 oneLottoList 모두 배열 맞음(isArray 결과시 모두 true 나옴)
    // oneLottoList에 저장된 것들도 Number로, 문제 없음
    // 배열 내용도 잘 저장되어 있는 상황
    this.wholeLottoList.forEach((oneLottoList) => {
      let matchCount = oneLottoList.filter((nums) => this.userLottoNum.includes(nums)).length; // 맞춘 로또 숫자 개수 반환
      console.log("matchCount : " + matchCount); // 계속 0만 나옴 ㅠㅠ
      if (oneLottoList.includes(this.bonusNumber)) { // 실행이 안 됨
        bonusSame = true;
      }
      this.calculateMoneyReward(matchCount, bonusSame);
    });
    this.printMoneyReward();
  }



  checkUserInput(userInput) {
    if (userInput % 1000 != 0)
      throw new Error("입력하신 금액은 1000 단위가 아닙니다.");
    return;
  }


  play() {
    this.getUserInput();
  }

}

const app = new App();
app.play();

module.exports = App;
