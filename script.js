// Define the operators and their corresponding functions
const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  
  // Get a random operator for hints
  const getRandomOperator = () => {
    const operatorKeys = Object.keys(operators);
    const randomIndex = Math.floor(Math.random() * operatorKeys.length);
    return operatorKeys[randomIndex];
  };
  
  // Check if the user's expression is valid
  const isExpressionValid = (expression, hintNumber, requiredOperators) => {
    const usedNumbers = expression.split(' ').filter(v => !isNaN(v));
    const usedOperators = expression.split('').filter(char => requiredOperators.includes(char));
    return usedNumbers.includes(hintNumber) && usedOperators.length === requiredOperators.length;
  };
  
  // Evaluate the user's expression
  const evaluateExpression = expression => {
    try {
      return eval(expression);
    } catch (error) {
      throw new Error("Invalid operation.");
    }
  };
  
  // Main game loop
  const startGame = () => {
    const hintNumber = String(Math.floor(Math.random() * 99) + 2);
    const userNumber = Math.floor(Math.random() * 99) + 2;
  
    // Create an array of available numbers
    const numbers = [hintNumber, userNumber, userNumber, userNumber];
    shuffleArray(numbers);
  
    // Generate required operators for hints
    const requiredOperators = [getRandomOperator(), getRandomOperator(), getRandomOperator()];
  
    // Generate the target answer
    const targetAnswer = evaluateExpression(
      `${hintNumber} ${requiredOperators[0]} ${userNumber} ${requiredOperators[1]} ${userNumber} ${requiredOperators[2]} ${userNumber}`
    );
  
    document.getElementById('hint-number').textContent = hintNumber;
    document.getElementById('operators').textContent = requiredOperators.join(' ');
    document.getElementById('target-answer').textContent = targetAnswer;
  
    const userExpressionInput = document.getElementById('user-expression');
    const checkAnswerButton = document.getElementById('check-answer');
    const resultMessage = document.getElementById('result-message');
  
    checkAnswerButton.addEventListener('click', () => {
      const userExpression = userExpressionInput.value;
      if (isExpressionValid(userExpression, hintNumber, requiredOperators)) {
        const userAnswer = evaluateExpression(userExpression);
        if (userAnswer === targetAnswer) {
          resultMessage.textContent = 'Congratulations! Your answer is correct.';
        } else {
          resultMessage.textContent = `Oops! Your answer is incorrect. The correct answer is ${targetAnswer}.`;
        }
      } else {
        resultMessage.textContent = "You didn't use the hints. Game Over!";
      }
    });
  };
  
  // Shuffle an array in place (Fisher-Yates algorithm)
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  startGame();
  