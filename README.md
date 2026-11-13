# 🧮 Modern Calculator

A modern and responsive calculator built with **HTML, CSS, and Vanilla JavaScript**.
This project focuses on practicing JavaScript logic, DOM manipulation, event handling, keyboard interaction, and basic arithmetic operations.


live Demo -----
https://devshabir.github.io/Modern-Calculator/

## ✨ Features

* ➕ Addition
* ➖ Subtraction
* ✖️ Multiplication
* ➗ Division
* 💯 Percentage calculation
* 🔄 Positive/negative number toggle
* 🧹 Clear/reset calculator
* 🔢 Decimal number support
* ⌨️ Full keyboard support
* 🇮🇷 Support for Persian and Arabic numerals
* ⚠️ Division-by-zero error handling
* 📱 Responsive design
* 🔢 Automatic formatting for long numbers
* ⚡ Instant display updates

## 🛠️ Technologies

* **HTML5** — Structure of the calculator
* **CSS3** — Styling and responsive interface
* **JavaScript (ES6+)** — Calculator logic and interactions
* **DOM API** — Manipulating the calculator interface
* **Keyboard Events** — Supporting keyboard input

## 📂 Project Structure

```text
calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🧠 JavaScript Concepts Practiced

This project was created to practice important JavaScript concepts, including:

* Variables and data types
* Functions
* Conditional statements
* `switch`
* `if / else`
* String manipulation
* Arrays
* `forEach()`
* Regular Expressions
* `parseFloat()`
* `isNaN()`
* Error handling with `try...catch`
* DOM manipulation
* Event listeners
* Event delegation
* Keyboard events
* Immediately Invoked Function Expression (IIFE)

## ⚙️ How It Works

The calculator keeps track of four main pieces of state:

```javascript
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetInput = false;
```

### `currentInput`

Stores the number currently displayed on the calculator.

### `previousInput`

Stores the previous number when an operator is selected.

### `operator`

Stores the mathematical operation:

```text
+
−
×
÷
```

### `shouldResetInput`

Determines whether the current display should be reset before entering a new number.

## 🔢 Basic Calculation Flow

For example, when the user enters:

```text
10 + 5 =
```

The calculator works approximately like this:

```text
10 → currentInput
+
↓
10 → previousInput
+ → operator
↓
5 → currentInput
=
↓
10 + 5
↓
15
```

The calculation is handled by the `compute()` function:

```javascript
function compute(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '−': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        default: return b;
    }
}
```

## ⌨️ Keyboard Shortcuts

The calculator can also be controlled using the keyboard.

| Key      | Action         |
| -------- | -------------- |
| `0 - 9`  | Enter number   |
| `.`      | Decimal point  |
| `+`      | Addition       |
| `-`      | Subtraction    |
| `*`      | Multiplication |
| `/`      | Division       |
| `Enter`  | Calculate      |
| `=`      | Calculate      |
| `%`      | Percentage     |
| `Escape` | Clear          |
| `C`      | Clear          |

## 🌍 Persian & Arabic Number Support

The calculator converts Persian and Arabic numerals into English numerals before processing them.

For example:

```text
۱۲۳ → 123
١٢٣ → 123
```

This functionality is implemented using the `toEnglishNumber()` function.

## ⚠️ Error Handling

Division by zero is prevented:

```javascript
function divide(a, b) {
    if (b === 0) throw new Error('تقسیم بر صفر');
    return a / b;
}
```

When an invalid calculation occurs, the calculator displays:

```text
خطا
```

The calculator can then be reset by pressing **Clear** or entering a new value.

## 📐 Number Formatting

Very long numbers are automatically converted to scientific notation to prevent the display from becoming too large.

For example:

```text
123456789012345
```

may be displayed in a shorter exponential format.

## 🚀 How to Run

No installation or external dependencies are required.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the project

Open the project folder and run:

```text
index.html
```

in your browser.

You can also use **VS Code + Live Server** for development.

## 🎯 Purpose of the Project

The main purpose of this project is to strengthen practical JavaScript skills by building a real interactive application without using a JavaScript framework.

The project demonstrates how JavaScript can:

1. Receive user input
2. Manage application state
3. Process mathematical operations
4. Manipulate the DOM
5. Handle mouse and keyboard events
6. Handle errors
7. Update the user interface dynamically

## 🔮 Future Improvements

Possible improvements for future versions:

* [ ] Calculation history
* [ ] Dark/Light mode
* [ ] Scientific calculator mode
* [ ] Copy result button
* [ ] Delete/backspace button
* [ ] Memory functions (`M+`, `M-`, `MR`, `MC`)
* [ ] More advanced keyboard controls
* [ ] Improved accessibility
* [ ] Calculation history stored in `localStorage`

## 👨‍💻 Author

**Sayed Shabir Hossaini**

This project was developed as part of my journey to improve my **JavaScript and frontend development skills**.

---

⭐ If you find this project useful, consider giving the repository a star!
