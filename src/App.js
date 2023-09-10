class App {

  constructor() {
    this.userMoney;
  }

  checkUserInput(userInput) {
    if (userInput % 1000 != 0)
      throw new Error("입력하신 금액은 1000 단위가 아닙니다.");

    return;
  }

  getUserInput() {
    MissionUtils.Console.readLine('구입금액을 입력해주세요.', (userInput) => {
      this.checkUserInput(userInput);
      this.userMoney = userInput;
    });
  }



  play() {
    this.getUserInput();
  }
}

module.exports = App;
