console.log("JavaScript підключено!");
console.log(localStorage.getItem('block6Color'));

// Функція для обміну текстами між блоками 1 та 6
function swapTexts() {
    let text1 = document.getElementById('block-X').innerText;
    let text6 = document.getElementById('div2-1').innerText;
    document.getElementById('block-X').innerText = text6;
    document.getElementById('div2-1').innerText = text1;
}

function calculateCircleArea(radius) {
    return Math.PI * Math.pow(radius, 2);
}

// Виклик функції обчислення площі кола
let radius = 2;
let area = calculateCircleArea(radius);
document.getElementById('div2-5-2-3').innerHTML += `<p>Площа кола: ${area.toFixed(2)}</p>`;


// Функція для знаходження мінімальної цифри в тексті
function findMinDigit(text) {
    // Знаходимо всі числа (цілі та дробові) в рядку
    let digits = text.match(/[\d]+(?:\.\d+)?/g); // Збираємо всі числа в масив
    if (digits) {
        // Перетворюємо масив рядків (чисел) у масив чисел
        let numbers = digits.map(Number); // Використовуємо map для перетворення рядків в числа

        // Повертаємо мінімальне число
        return Math.min(...numbers); 
    }
    return null; // Повертаємо null, якщо жодних чисел не знайдено
}

// Додаємо кнопку для отримання числа
document.getElementById('getNumberButton').addEventListener('click', function() {
    let textBlock = document.getElementById('div2-5-2-3').innerText; // Отримуємо текст з блоку «5»
    
    // Debugging: Вивести текст для перевірки
    console.log("Текст блоку:", textBlock);
    
    let minDigit = findMinDigit(textBlock); // Знайти мінімальну цифру

    // Debugging: Вивести підрахунки
    console.log("Мінімальна цифра:", minDigit);

    if (minDigit !== null) { // Перевірка наявності цифр
        alert(`Мінімальна цифра: ${minDigit}`); // Виводимо результат у діалоговому вікні

        // Зберігання в cookies
        document.cookie = `minDigit=${minDigit}; path=/;`;
    } else {
        alert("Цифр не знайдено в тексті."); // Якщо цифр немає
    }
});

// // Перевірка cookies при оновленні сторінки
// window.onload = function () {
//     // Обробка cookies для мінімальної цифри
//     if (document.cookie.includes("minDigit")) {
//         let cookieValue = document.cookie
//             .split('; ')
//             .find(row => row.startsWith('minDigit='))
//             .split('=')[1];
//         let confirmSave = confirm(`Збережені дані: ${cookieValue}. Хочете зберегти дані?`);

//         if (confirmSave) {
//             alert("Дані збережені. Перезавантажте сторінку.");
//         } else {
//             document.cookie = "minDigit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//             location.reload();
//         }
//     }

//     // Відновлення кольору тексту
//     let savedColor = localStorage.getItem('block6Color'); // отримуємо збережений колір
//     if (savedColor) {
//         let textBlock = document.getElementById('div2-5-2-1');
//         if (textBlock) {
//             textBlock.style.color = savedColor; // застосовуємо збережений колір
//         }

//         let colorSelect = document.getElementById('colorSelect');
//         if (colorSelect) {
//             colorSelect.value = savedColor; // оновлюємо вибір у select
//         }
//     }
// };

// // Зміна кольору тексту у блоці 6 при виборі кольору
// document.getElementById('colorSelect').addEventListener('change', function () {
//     let selectedColor = this.value; // отримуємо вибраний колір
//     let textBlock = document.getElementById('div2-5-2-1');
//     if (textBlock) {
//         textBlock.style.color = selectedColor; // змінюємо колір тексту
//     }
//     localStorage.setItem('block6Color', selectedColor); // зберігаємо вибраний колір у localStorage
// });

window.onload = function () {
    console.log("onload виконується!");

    // Відновлення кольору тексту
    let savedColor = localStorage.getItem('block6Color');
    console.log("Збережений колір у localStorage:", savedColor);

    if (savedColor) {
        let textBlock = document.getElementById('div2-5-2-1');
        if (textBlock) {
            textBlock.style.color = savedColor; // застосовуємо збережений колір
            console.log("Колір тексту встановлено:", savedColor);
        } else {
            console.warn("Елемент #div2-5-2-1 не знайдено!");
        }

        let colorSelect = document.getElementById('colorSelect');
        if (colorSelect) {
            colorSelect.value = savedColor; // оновлюємо вибір у select
            console.log("Вибраний колір у select встановлено:", savedColor);
        } else {
            console.warn("Елемент #colorSelect не знайдено!");
        }
    }
};

document.getElementById('colorSelect').addEventListener('change', function () {
    let selectedColor = this.value;
    console.log("Вибраний новий колір:", selectedColor);

    let textBlock = document.getElementById('div2-5-2-1');
    if (textBlock) {
        textBlock.style.color = selectedColor;
        console.log("Колір тексту змінено на:", selectedColor);
    } else {
        console.warn("Елемент #div2-5-2-1 не знайдено!");
    }

    localStorage.setItem('block6Color', selectedColor);
    console.log("Колір збережено у localStorage:", selectedColor);
});





// Створення таблиці
let tableContainer = document.getElementById('block7');
let tableData = JSON.parse(localStorage.getItem('tableData')) || [];

// Функція для додавання нової комірки в таблицю
function addTableCell() {
    let cellValue = document.getElementById('cellInput').value;
    if (cellValue) {
        tableData.push(cellValue);
        renderTable();
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }
}

// Функція для рендерингу таблиці
function renderTable() {
    tableContainer.innerHTML = '';
    let table = document.createElement('table');
    let row = table.insertRow();
    tableData.forEach((data, index) => {
        let cell = row.insertCell(index);
        cell.innerText = data;
    });
    tableContainer.appendChild(table);
}

// Очищення localStorage на перезавантаження
window.onbeforeunload = function() {
    localStorage.removeItem('tableData');
};

// Додаємо обробник події для кнопки
document.getElementById('addCellButton').addEventListener('click', addTableCell);

// Рендерим таблицю при завантаженні сторінки
window.onload = renderTable;