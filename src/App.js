class App {

  constructor() {
    this.userMoney;
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
