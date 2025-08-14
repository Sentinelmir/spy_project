const startGameBtn = document.querySelector('#startBtn');
const numberOfPlayers = document.querySelector('#players');
const numberOfSpies = document.querySelector('#spies');
const themeSelector = document.querySelector('#category');
const newGameBtn = document.querySelector('#start_new_game');
const showWordBtn = document.querySelector('#show_word_button');
const hideWordBtn = document.querySelector('#hide_word_button');
let word;
let currentPlayer = 1;
const currentPlayerField = document.querySelector('.current_player_p');
let currentWordText = document.querySelector('.current_word_text');
let spyMassive = [];
let numberField = document.querySelector('#spies');

const words = {
  places: [
        "Библиотека", "Школа", "Аэропорт", "Пляж", "Музей", "Кафе", "Рынок", "Театр", "Стадион", "Парк",
        "Метро", "Автовокзал", "Гостиница", "Кладбище", "Ферма", "Супермаркет", "Ресторан", "Офис", "Банк", "Зоопарк",
        "Бассейн", "Кинотеатр", "Планетарий", "Тюрьма", "Вокзал", "Аптека", "Церковь", "Детский сад", "Салон красоты", "Магазин игрушек",
        "Галерея", "Танцевальная студия", "Площадь", "Обсерватория", "Лес", "Бар", "Концертный зал", "Парк аттракционов", "Гараж", "Суд",
        "Винодельня", "Спортзал", "Пекарня", "Больница", "Порт", "Фабрика", "Гора", "Озеро", "Дворец", "Пещера"
    ],
    hobbies: [
        "Рисование", "Фотография", "Чтение", "Пение", "Игра на гитаре", "Плавание", "Йога", "Бег", "Танцы", "Шахматы",
        "Вышивка", "Рыбалка", "Велоспорт", "Кулинария", "Катание на коньках", "Скейтбординг", "Садоводство", "Путешествия", "Кемпинг", "Пение в караоке",
        "Сноуборд", "Катание на лыжах", "Пазлы", "Настольные игры", "Ролики", "Кроссворды", "Фехтование", "Каллиграфия", "Флористика", "Пение в хоре",
        "Керамика", "Фигурное катание", "Боевые искусства", "Моделизм", "Картинг", "Астрономия", "Археология", "Серфинг", "Пение в душе", "Блогинг",
        "Пение на сцене", "Видеомонтаж", "Гейминг", "Фридайвинг", "Вышивание бисером", "Реставрация мебели", "Пение в парке", "Коллекционирование марок", "Оригами", "Караоке"
    ],
    food: [
        "Пицца", "Суши", "Бургер", "Паста", "Салат", "Шашлык", "Борщ", "Сырники", "Омлет", "Блины",
        "Пельмени", "Вареники", "Плов", "Котлета", "Картошка фри", "Сэндвич", "Торт", "Мороженое", "Пирог", "Смузи",
        "Стейк", "Курица", "Рыба", "Овощи", "Фрукты", "Суп", "Шоколад", "Мюсли", "Йогурт", "Гречка",
        "Рис", "Печенье", "Чизкейк", "Мороженое с шоколадом", "Салат Цезарь", "Паста Карбонара", "Пицца Маргарита", "Крабовые палочки", "Пельмени с мясом", "Каша овсяная",
        "Сэндвич с ветчиной", "Салат Оливье", "Бифштекс", "Куриные крылышки", "Лазанья", "Кебаб", "Гуляш", "Панини", "Фахитос", "Рамен"
    ]
};

function getRandomWord(category) {
  const categoryWords = words[category];
  const randomIndex = getRandomInt(categoryWords.length);
  return categoryWords[randomIndex];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getTheSpyNumber(totalPlayers, spyCount){
    while (spyMassive.length < spyCount) {
        let randomIndex = Math.floor(Math.random() * totalPlayers);
        if (!spyMassive.includes(randomIndex+1)) {
            spyMassive.push(randomIndex+1);
        }}
}

startGameBtn.addEventListener('click', startNewGame);
newGameBtn.addEventListener('click', endTheGame);
showWordBtn.addEventListener('click', showWordToPlayer);
hideWordBtn.addEventListener('click', hideWordFromPlayer);

function removeAttribute(){
     themeSelector.removeAttribute('aria-invalid');
     numberOfPlayers.removeAttribute('aria-invalid');
     numberOfSpies.removeAttribute('aria-invalid');
}


function startNewGame(e){
    e.preventDefault();

    const playersNumber = numberOfPlayers.value.trim();
    const spiesNumber = numberOfSpies.value.trim();
    const theme = themeSelector.value.trim();

    let errorDetected = 0;

    removeAttribute();

    if (!playersNumber) {
        console.log('Detected 1');
        numberOfPlayers.setAttribute('aria-invalid', 'true');
        errorDetected += 1;
    } 
    
    if (Number(spiesNumber) >= Number(playersNumber) || !spiesNumber){
        console.log('Detected 2');
        numberOfSpies.setAttribute('aria-invalid', 'true');
        errorDetected += 1;
    } 

    if (!theme) {
        console.log('Detected 3');
        themeSelector.setAttribute('aria-invalid', 'true');
        errorDetected += 1;
    } 

    if (errorDetected>0){
        return;
    }
    

    document.getElementById('first_section_id').classList.add('hidden');
    document.getElementById('second_section_id').classList.remove('hidden');
    hideWordBtn.disabled = true;
    word = getRandomWord(theme);

    getTheSpyNumber(Number(playersNumber), Number(spiesNumber));

    currentPlayerField.textContent = `Очередь игрока: ${currentPlayer}`;

    console.log(word);

}

function showWordToPlayer(e){
    e.preventDefault();

    hideWordBtn.disabled = false;
    showWordBtn.disabled = true;

    if (!spyMassive.includes(currentPlayer)) {
        currentWordText.textContent = word;
    } else {
        currentWordText.textContent = "Ты шпион!";
    }

}

function hideWordFromPlayer(e){
    e.preventDefault();

    if (currentPlayer == Number(numberOfPlayers.value.trim())){
        hideWordBtn.disabled = true;
        showWordBtn.disabled = true;

        currentWordText.textContent = "Игра началась!";
    } else {

    hideWordBtn.disabled = true;
    showWordBtn.disabled = false;

    currentPlayer += 1;
    currentPlayerField.textContent = `Очередь игрока: ${currentPlayer}`;
    currentWordText.textContent = "Тут будет слово";
    }
}

function endTheGame(e){
    e.preventDefault();

    document.getElementById('second_section_id').classList.add('hidden');
    document.getElementById('first_section_id').classList.remove('hidden');

    currentWordText.textContent = "Тут будет слово";
    hideWordBtn.disabled = true;
    showWordBtn.disabled = false;

    currentPlayer = 1;
    spyMassive = [];
}
