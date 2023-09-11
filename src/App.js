const MissionUtils = require("@woowacourse/mission-utils"); // 우테코 API
const Lotto = require("./Lotto");

class App {

  constructor() {
    this.userMoney;
    this.userLottoNum = [];
    this.bonusNumber;
    this.wholeLottoNum = []; // 이중 배열인 상태로 저장됨
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
