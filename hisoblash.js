document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
    const leftContent = document.querySelector('.left');
    const calorieText = document.querySelector('.circle-text h2');
    const progressCircle = document.querySelector('.progress');

    let totalCalories = 1240;
    const dailyGoal = 2000;

    function updateCircle() {
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (totalCalories / dailyGoal) * circumference;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = offset;
        calorieText.innerText = totalCalories.toLocaleString();
    }

    addBtn.addEventListener('click', () => {
        const foodName = searchInput.value.trim();
        if (foodName === "") return alert("Ovqat nomini yozing!");

        const kcal = Math.floor(Math.random() * 400) + 50;
        totalCalories += kcal;

        const newCard = document.createElement('div');
        newCard.className = 'card anime-in';
        newCard.innerHTML = `
            <div class="card-title">
                <h3>Yangi taom</h3>
                <span><b>${kcal} kcal</b></span>
            </div>
            <ul>
                <li>${foodName} <b>${kcal} kcal</b></li>
            </ul>
        `;

        // Bo'sh kartadan tepaga qo'shish
        const emptyCard = document.querySelector('.card.empty');
        leftContent.insertBefore(newCard, emptyCard);

        searchInput.value = "";
        updateCircle();
    });

    updateCircle();
});