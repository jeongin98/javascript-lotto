class App {
  constructor() {
    this.userMoney;
    this.lottoNumberSet = [];
  }

  setLottoNumber() {
    const playTimes = userMoney % 1000;

    // n번 반복
    for (let i = 0; i < playTimes; i++) {
      const lottoNum = [];
      while (lottoNum.length < 6) {
        const number = MissionUtils.Random.pickNumberInRange(1, 45);
        if (!lottoNum.includes(number)) {
          lottoNum.push(number);
        }
      }
      lottoNumberSet.push(lottoNum);
    }
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
    this.setLottoNumber();
  }
}

module.exports = App;
