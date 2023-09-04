const MissionUtils = require("@woowacourse/mission-utils"); // 우테코 API


class App {

  setRandomNum() {
    const computerNumber = [];
    while (computerNumber.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computerNumber.includes(number)) {
        computerNumber.push(number);
      }
    }
    return computerNumber;
  }


  getUserInput() {
    MissionUtils.Console.readLine('숫자를 입력해주세요.', (userInput) => {
      this.checkUserInput(userInput);
      // userInput이 유효성 문제가 없을 경우



    });
  }

  checkUserInput(userInput) {
    // 이후 조건 추가 및 파일 분리할 예정
    if (userInput.length !== 3) {
      throw new Error("입력하신 숫자는 세자리가 아닙니다");
    }
    return;
  }


  play() {
    // 1. 난수 발생
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    const randomNum = this.setRandomNum();
    // MissionUtils.Console.print(randomNum);

    // 2. 숫자 입력 받기
    const userInput = this.getUserInput();


  }

}


const app = new App();
app.play();

module.exports = App;
