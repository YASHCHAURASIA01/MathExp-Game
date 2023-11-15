# BODMAS ARITHMATIC GAME...
import random
import operator

operators = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv
}

hint_operator1 = random.choice(list(operators.keys()))
hint_operator2 = random.choice(list(operators.keys()))
hint_operator3 = random.choice(list(operators.keys()))
required_operators = [hint_operator1, hint_operator2, hint_operator3]
def is_valid_expression(expression, hint_number):

    used_numbers = [v for v in expression.split() if v.isdigit()]
    used_operators = [char for char in expression if char in operators.keys()]
    return hint_number in used_numbers and set(used_operators) == set(required_operators)
    

def evaluate_expression(expression):
    try:
        return eval(expression)
    
    except:
        raise ArithmeticError("Invalid operation.")
        raise


random.shuffle(required_operators)

# Main game loop
while True:

    hint_number =str(random.randint(2, 100))

    num_choices = [n for n in range(2, 101) if n not in [0, 1, hint_number]]  # Updated number range
    user_number = random.choice(num_choices)

    # Create a list of numbers that can be used in the expression
    numbers = [hint_number, user_number, user_number, user_number]
    random.shuffle(numbers)

    # Generate the target answer
    target_answer = evaluate_expression(f'{hint_number} {required_operators[0]} {user_number} {required_operators[1]} {user_number} {required_operators[2]} {user_number}')

    print(f'Hint Number: {hint_number}')
    print(f'Operators: {required_operators}')
    print(f'Target Answer: {target_answer}')

    user_expression = input('Enter your expression (e.g., "3 + 4 * 2 / 2"): ')

    if not is_valid_expression(user_expression, hint_number):
        print("You didn't use the hints. Game Over!")
        break

    user_answer = evaluate_expression(user_expression)

    if user_answer == target_answer:
        print('Congratulations! Your answer is correct.\n')
    else:
        print(f'Oops! Your answer is incorrect. The correct answer is {target_answer}.\n')
