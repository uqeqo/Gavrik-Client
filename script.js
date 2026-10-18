let currentRotation = 0;
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;

    // Генерируем случайное число от 1 до 100 для распределения шансов
    const chance = Math.floor(Math.random() * 100) + 1;
    
    let targetSegment = 2; // По умолчанию (если ничего не подошло) — 10 рублей
    let prizeText = "";
    let targetAngle = 0;

    // Считаем математику шансов:
    if (chance <= 5) {
        // 5% шанс на 4-й слот (Подписка на чит 180 дней)
        targetSegment = 4;
        prizeText = "Подписка на чит 180 дней!";
        targetAngle = 45; // Центр 4-го сектора
    } else if (chance > 5 && chance <= 20) {
        // 15% шанс на 1-й слот (Подписка на чит 30 дней) -> от 6 до 20 (ровно 15 значений)
        targetSegment = 1;
        prizeText = "Подписка на чит 30 дней!";
        targetAngle = 315; // Центр 1-го сектора
    } else if (chance > 20 && chance <= 50) {
        // 30% шанс на 3-й слот (Промокод на 9%) -> от 21 до 50 (ровно 30 значений)
        targetSegment = 3;
        prizeText = "Промокод на 9%!";
        targetAngle = 135; // Центр 3-го сектора
    } else {
        // Оставшиеся 50% шанса уходят на 2-й слот (10 рублей на баланс) -> от 51 до 100
        targetSegment = 2;
        prizeText = "10 рублей на баланс!";
        targetAngle = 225; // Центр 2-го сектора
    }

    // Делаем 5 полных кругов (1800 градусов) + доворачиваем до нужного сектора
    // Вычитаем остаток от предыдущего вращения, чтобы колесо крутилось всегда вперед
    const baseMatrix = 1800 + targetAngle;
    currentRotation += baseMatrix - (currentRotation % 360);

    // Крутим колесо через CSS анимацию
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Ждем окончания прокрутки (4 секунды) и выдаем честный результат
    setTimeout(() => {
        alert(`🎉 Выигрыш: ${prizeText}`);
        spinBtn.disabled = false;
    }, 4000);
});
