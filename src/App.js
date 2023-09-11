const MissionUtils = require("@woowacourse/mission-utils"); // 우테코 API
const Lotto = require("./Lotto");

class App {

  constructor() {
    this.userMoney;
    this.wholeLottoNum = []; // 이중 배열인 상태로 저장됨
    this.userLottoNum = [];
    this.bonusNumber;


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
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      // 오름차순
      this.wholeLottoNum.push(numbers.sort(function (a, b) {
        return a - b;
      }));
      console.log("전체 : " + this.wholeLottoNum);
    }
    this.getUserLotto();
  }





  getUserLotto() {
    MissionUtils.Console.readLine('당첨 번호를 입력해 주세요.', (userInput) => {
      this.userLottoNum = userInput.split(',');
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


  calculateReward() {
    // let matchCount = 0; // 일치하는 숫자 카운트 변수 초기화


    for (let oneLotto of this.wholeLottoNum) {
      let matchCount = 0;
      let bonusSame = false;
      console.log("oneLotto  : " + oneLotto);
      //for (let digit of oneLotto) {
      if (oneLotto.filter(x => this.userLottoNum.includes(x)))
        matchCount++; // 일치하는 숫자 발견 시 카운트 증가

      console.log("matchCount : " + matchCount);
      // 보너스 체크 -> true로 바꾸기
      console.log("this.bonusNumber : " + this.bonusNumber);
      if (oneLotto.includes(this.bonusNumber)) {
        bonusSame = true;

        console.log("bonusSame1 : " + bonusSame);
      }

      console.log("bonusSame2 : " + bonusSame);
      //this.jeongsan(matchCount, bonusSame);
      // }
      console.log("일치 개수 : " + matchCount);
    }
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
