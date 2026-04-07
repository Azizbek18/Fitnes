const SUPABASE_URL = 'https://olerglrehwbfolrsyzzo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9oYVfdjz9tqko55o9EZjdQ_AXWhvvhu';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.search button');
    const searchInput = document.getElementById('ovqat'); 
    const leftContent = document.querySelector('.left');
    const calorieText = document.querySelector('.circle-text h2');
    const progressCircle = document.querySelector('.progress');
    const xabarCon = document.querySelector(".xabar-con");

    let totalCalories = 1240;
    const dailyGoal = 2000;

    function xabarnoma(xabar, turi) {
        if (!xabarCon) return;

        let xabarMatn = document.createElement('div');
        xabarMatn.classList.add("xabar", turi);
        xabarMatn.innerText = xabar;

        xabarCon.appendChild(xabarMatn);

        setTimeout(() => {
            xabarMatn.style.opacity = '0';
            xabarMatn.style.transform = 'translateX(20px)';
            xabarMatn.style.transition = '0.5s all ease';
            setTimeout(() => xabarMatn.remove(), 500);
        }, 4000);
    }

    function updateCircle() {
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (totalCalories / dailyGoal) * circumference;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = offset;
        calorieText.innerText = totalCalories.toLocaleString();
    }

    addBtn.addEventListener('click', async () => {
        const foodName = searchInput.value.trim();

        if (foodName === "") {
            xabarnoma("Iltimos, ovqat nomini yozing! ⚠️", "info");
            return;
        }

        const kcal = Math.floor(Math.random() * 400) + 50;

        try {
            const { error } = await _supabase
                .from('kaloriya')
                .insert([
                    {
                        ovqat_nomi: foodName,
                        kaloriya: kcal
                    }
                ]);

            if (error) throw error;

            xabarnoma("Muvaffaqiyatli qo'shildi! ✅", "success");

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

            const emptyCard = document.querySelector('.card.empty');
            if (emptyCard) {
                leftContent.insertBefore(newCard, emptyCard);
            } else {
                leftContent.appendChild(newCard);
            }

            searchInput.value = "";
            updateCircle();

        } catch (err) {
            console.error("Xatolik:", err.message);
            xabarnoma("Xatolik yuz berdi: " + err.message, "error");
        }
    });

    updateCircle();
});