const SUPABASE_URL = 'https://olerglrehwbfolrsyzzo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9oYVfdjz9tqko55o9EZjdQ_AXWhvvhu';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const addBtn = document.querySelector('.search button');
    const searchInput = document.getElementById('ovqat'); 
    const leftContent = document.querySelector('.left');
    const calorieText = document.querySelector('.circle-text h2');
    const progressCircle = document.querySelector('.progress');
    const xabarCon = document.querySelector(".xabar-con");

    let totalCalories = 0; 
    const dailyGoal = 2000;

    function updateCircle() {
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const percent = Math.min(totalCalories / dailyGoal, 1);
        const offset = circumference - (percent * circumference);
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = offset;
        calorieText.innerText = totalCalories.toLocaleString();
    }

    function renderCard(foodName, kcal) {
        const newCard = document.createElement('div');
        newCard.className = 'card anime-in';
        newCard.innerHTML = `
            <div class="card-title">
                <h3>Taom</h3>
                <span><b>${kcal} kcal</b></span>
            </div>
            <ul>
                <li>${foodName} <b>${kcal} kcal</b></li>
            </ul>`;
        
        const emptyCard = document.querySelector('.card.empty');
        if (emptyCard) {
            leftContent.insertBefore(newCard, emptyCard);
        } else {
            leftContent.appendChild(newCard);
        }
    }

    async function fetchInitialData() {
        console.log("Ma'lumotlar yuklanmoqda...");
        const { data, error } = await _supabase
            .from('kaloriya')
            .select('*');

        if (error) {
            console.error("Xatolik yuz berdi:", error.message);
            return;
        }

        if (data) {
            console.log("Bazadan kelgan ma'lumotlar:", data);
            data.forEach(item => {
                renderCard(item.ovqat_nomi, item.kaloriya);
                totalCalories += item.kaloriya;
            });
            updateCircle();
        }
    }

    addBtn.addEventListener('click', async () => {
        const foodName = searchInput.value.trim();
        if (foodName === "") return;

        const kcal = Math.floor(Math.random() * 400) + 50;

        const { error } = await _supabase
            .from('kaloriya')
            .insert([{ ovqat_nomi: foodName, kaloriya: kcal }]);

        if (error) {
            console.error("Qo'shishda xato:", error.message);
        } else {
            totalCalories += kcal;
            renderCard(foodName, kcal);
            updateCircle();
            searchInput.value = "";
        }
    });

    await fetchInitialData();
});