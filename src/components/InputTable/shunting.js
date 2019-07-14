class ShuntingALG {
  constructor() {
    this.operatorstack = [];
    this.output = [];
    this.Precedence = {
      "-": 2,
      "+": 2,
      "*": 3,
      "/": 3,
      "^": 4,
      "(": null,
      ")": null
    };
  }
  static calculate(str) {
    const calculator = new ShuntingALG();
    calculator.addInput(str);
    calculator.ShuntingFormat();
    return calculator.infixCalculator();
  }
  checkPareth(x) {
    return x === "(" || x === ")";
  }
  addInput(input) {
    this.input = input.trim().split(/\s|(?=[\-\+\/\^*\(\)])|(?<=[^-0-9.]+)/);
    return this;
  }
  checkPrecedence(operator) {
    if (this.operatorstack.length === 0 || operator === "(") {
      void this.operatorstack.push(operator);
      return;
    }

    if (operator === ")") {
      let len = this.operatorstack.length;
      while (len--) {
        if (this.operatorstack[len] === "(") {
          this.operatorstack.splice(len, 1);

          break;
        } else {
          this.output.push(this.operatorstack.pop());
        }
      }
      return;
    }

    if (
      this.Precedence[this.operatorstack[this.operatorstack.length - 1]] ===
        this.Precedence[operator] &&
      this.Precedence[operator] > 3
    ) {
      this.output.push(operator);

      return;
    }
    if (
      this.Precedence[this.operatorstack[this.operatorstack.length - 1]] ===
        this.Precedence[operator] &&
      this.Precedence[operator] < 3
    ) {
      this.operatorstack.push(operator);
      return;
    }
    if (
      this.Precedence[this.operatorstack[this.operatorstack.length - 1]] ===
        this.Precedence[operator] &&
      this.Precedence[operator] > 2
    ) {
      this.pushtoOutput(this.operatorstack.pop());
      this.operatorstack.push(operator);
      return;
    }
    if (
      this.Precedence[operator] >
      this.Precedence[this.operatorstack[this.operatorstack.length - 1]]
    ) {
      this.operatorstack.push(operator);
      return;
    } else {
      this.pushtoOutput(this.operatorstack.pop());
      this.operatorstack.push(operator);
      return;
    }
  }
  pushtoOutput(token) {
    if (!this.checkPareth(token)) {
      this.output.push(token);
    }
  }
  ShuntingFormat() {
    for (let char of this.input) {
      if (char === " ") continue;
      if (!(char in this.Precedence)) {
        this.output.push(char);
      } else {
        this.checkPrecedence(char);
      }
    }
    this.output = this.output.concat(this.operatorstack.reverse());
  }
  operate(a, b, o) {
    switch (o) {
      case "-":
        return a - b;
      case "+":
        return a + b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "^":
        return a ** b;
    }
  }
  infixCalculator() {
    const copiedoutput = [...this.output];
    let containedoperations = copiedoutput.reduce(
      (prev, curr) =>
        curr in this.Precedence && curr !== "(" && curr !== ")" ? ++prev : prev,
      0
    );
    let i = 2;
    while (containedoperations) {
      if (copiedoutput[i++] in this.Precedence) {
        const sum = this.operate(
          Number(copiedoutput[i - 3]),
          Number(copiedoutput[i - 2]),
          copiedoutput[i - 1]
        );
        copiedoutput.splice(i - 3, 3, "" + sum);
        i = 1;
        --containedoperations;
        continue;
      }
    }
    return copiedoutput[0];
  }
}

export function evaluateExpression(rule, str) {
  const shunting = /(?<=^[=])(.*)/;
  if (shunting.test(rule)) {
    const match = rule.match(shunting);
    if (match !== null)
      return ShuntingALG.calculate(rule.match(shunting)[0]) === str;
    return false;
  } else {
    return RegExp(rule).test(str);
  }
}
console.log(
  ShuntingALG.calculate("( 2 ^ 2 ^ 2 * 3 + ( 2 * 2 + ( 5 * 10 ) / 2 ) ) ^ 2"),
  ShuntingALG.calculate("5^(2^(2^2))"),
  ShuntingALG.calculate("5^2^2^2"),
  ShuntingALG.calculate("+5- -5"),
  ShuntingALG.calculate("+5 0- -5"),
  ShuntingALG.calculate("+5+ + -5"),
  ShuntingALG.calculate("2.5 + 2.5"),
  ShuntingALG.calculate("2.5^2"),
  ShuntingALG.calculate("10 + 25 - 30"),
  ShuntingALG.calculate("((3 * (25 / 5) - 15) + 2)^2^2")
);
