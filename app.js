
(function () {
    'use strict';
    // ----- عناصر DOM -----
    const resultDisplay = document.getElementById('result');
    const expressionDisplay = document.getElementById('expression');
    const buttonsContainer = document.getElementById('buttonsContainer');
    // ----- حالت ماشین حساب -----
    let currentInput = '0';        // عدد یا عبارت در حال نمایش
    let previousInput = '';        // برای محاسبات دو مرحله‌ای
    let operator = '';            // عملگر ذخیره شده (+ ، − ، × ، ÷)
    let shouldResetInput = false; // بعد از فشار = یا عملگر، صفحه را بازنشانی کن
    let lastAction = '';          // برای مدیریت دکمه‌های تکراری
    // ----- توابع کمکی -----
    function toEnglishNumber(str) {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        let result = str;
        persian.forEach((p, i) => result = result.replace(new RegExp(p, 'g'), i));
        arabic.forEach((a, i) => result = result.replace(new RegExp(a, 'g'), i));
        return result;
    }
    function updateDisplay() {
        let displayValue = currentInput;
        if (displayValue.length > 14 && currentInput !== 'خطا') {
            displayValue = parseFloat(displayValue).toExponential(6);
        }
        resultDisplay.textContent = displayValue;
        if (operator && previousInput) {
            const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
            expressionDisplay.textContent = `${previousInput} ${opSymbol}`;
        } else {
            expressionDisplay.textContent = '';
        }
    }
    // ----- عملیات پایه -----
    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) {
        if (b === 0) throw new Error('تقسیم بر صفر');
        return a / b;
    }
    function compute(operator, a, b) {
        switch (operator) {
            case '+': return add(a, b);
            case '−': return subtract(a, b);
            case '×': return multiply(a, b);
            case '÷': return divide(a, b);
            default: return b;
        }
    }
    function getCurrentNumber() {
        return parseFloat(currentInput);
    }
    function getPreviousNumber() {
        return parseFloat(previousInput);
    }
    function setResult(value) {
        currentInput = String(parseFloat(value.toPrecision(12)));
    }
    // ----- عملیات اصلی -----
    function handleClear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        shouldResetInput = false;
        lastAction = 'clear';
        updateDisplay();
    }
    function handleSign() {
        if (currentInput === '0') return;
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        lastAction = 'sign';
        updateDisplay();
    }
    function handlePercent() {
        const num = getCurrentNumber();
        if (isNaN(num)) return;
        setResult(num / 100);
        lastAction = 'percent';
        updateDisplay();
    }
    function handleNumber(value) {
        if (shouldResetInput) {
            currentInput = '0';
            shouldResetInput = false;
        }
        if (value === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        lastAction = 'number';
        updateDisplay();
    }
    function handleOperator(op) {
        const currentNum = getCurrentNumber();
        if (operator && !shouldResetInput) {
            try {
                const prevNum = getPreviousNumber();
                const result = compute(operator, prevNum, currentNum);
                setResult(result);
                previousInput = currentInput;
            } catch (e) {
                currentInput = 'خطا';
                operator = '';
                previousInput = '';
                shouldResetInput = true;
                updateDisplay();
                return;
            }
        } else {
            previousInput = currentInput;
        }
        operator = op;
        shouldResetInput = true;
        lastAction = 'operator';
        updateDisplay();
    }
    function handleCalculate() {
        if (!operator || shouldResetInput) return;
        try {
            const currentNum = getCurrentNumber();
            const prevNum = getPreviousNumber();
            const result = compute(operator, prevNum, currentNum);
            setResult(result);
            operator = '';
            previousInput = '';
            shouldResetInput = true;
            lastAction = 'equal';
        } catch (e) {
            currentInput = 'خطا';
            operator = '';
            previousInput = '';
            shouldResetInput = true;
        }
        updateDisplay();
    }
    // ----- مدیریت رویدادها -----
    function handleButtonClick(value) {
        // اگر خطا باشد، با هر کلیک غیر از clear بازنشانی می‌شود
        if (currentInput === 'خطا' && value !== 'clear') {
            handleClear();
        }
        switch (value) {
            case 'clear':
                handleClear();
                break;
            case 'sign':
                handleSign();
                break;
            case 'percent':
                handlePercent();
                break;
            case '=':
                handleCalculate();
                break;
            case '+':
            case '−':
            case '×':
            case '÷':
                handleOperator(value);
                break;
            default: {
                const num = toEnglishNumber(value);
                if (!isNaN(num) || num === '.') {
                    handleNumber(num);
                }
                break;
            }
        }
    }
    // ----- رویدادهای کلیک و کیبورد -----
    buttonsContainer.addEventListener('click', function (e) {
        const target = e.target.closest('button');
        if (!target) return;
        const value = target.dataset.value;
        handleButtonClick(value);
    });
    document.addEventListener('keydown', function (e) {
        const key = e.key;
        if (currentInput === 'خطا' && key !== 'Escape' && key !== 'c' && key !== 'C') {
            handleClear();
        }
        if (key >= '0' && key <= '9') {
            e.preventDefault();
            handleButtonClick(key);
        } else if (key === '.') {
            e.preventDefault();
            handleButtonClick('.');
        } else if (key === '+') {
            e.preventDefault();
            handleButtonClick('+');
        } else if (key === '-') {
            e.preventDefault();
            handleButtonClick('−');
        } else if (key === '*') {
            e.preventDefault();
            handleButtonClick('×');
        } else if (key === '/') {
            e.preventDefault();
            handleButtonClick('÷');
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            handleButtonClick('=');
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            e.preventDefault();
            handleButtonClick('clear');
        } else if (key === '%') {
            e.preventDefault();
            handleButtonClick('percent');
        }
    });
    // ----- مقداردهی اولیه -----
    updateDisplay();
})();