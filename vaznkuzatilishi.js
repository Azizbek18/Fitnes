const SUPABASE_URL = 'https://olerglrehwbfolrsyzzo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9oYVfdjz9tqko55o9EZjdQ_AXWhvvhu';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.querySelector('.form input');
    const commentInput = document.querySelector('.form textarea');
    const saveBtn = document.querySelector('.form button');
    const table = document.querySelector('table');
    const currentWeightDisplay = document.querySelector('.cards .card:first-child h2');
    const bmiDisplay = document.querySelector('.cards .card:last-child h2');

    function calculateBMI(weight) {
        const height = 1.80;
        const bmi = (weight / (height * height)).toFixed(1);
        let status = "NORMAL";
        let color = "green";

        if (bmi < 18.5) { status = "OZG'IN"; color = "blue"; }
        else if (bmi > 25) { status = "ORTIQCHA"; color = "orange"; }

        bmiDisplay.innerHTML = `${bmi} <span class="status" style="color: ${color}">${status}</span>`;
    }

    saveBtn.addEventListener('click', async () => {
        const weightValue = weightInput.value.trim();
        const comment = commentInput.value.trim();
        
        const dateStr = new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });

        if (!weightValue) {
            alert("Iltimos, vazningizni kiriting!");
            return;
        }

        const weightNum = Math.round(parseFloat(weightValue));

        saveBtn.innerText = "Saqlanmoqda...";
        saveBtn.disabled = true;

        try {
            const { error } = await _supabase
                .from('vazn') 
                .insert([
                    { 
                        sana: dateStr,
                        vazn: weightNum,
                        ozgarishi: 0,
                        izoh: comment || "Izoh yo'q"
                    }
                ]);

            if (error) throw error;

            alert("Muvaffaqiyatli saqlandi! ✅");
            currentWeightDisplay.innerHTML = `${weightNum} <span>kg</span>`;
            calculateBMI(weightNum);

            const newRow = table.insertRow(1);
            newRow.innerHTML = `
                <td>${dateStr}</td>
                <td>${weightNum} kg</td>
                <td class="minus">0</td>
                <td>${comment || "Izoh yo'q"}</td>
            `;

            weightInput.value = "";
            commentInput.value = "";

        } catch (err) {
            console.error("Xatolik tafsiloti:", err);
            alert("Xatolik: " + err.message + ". Supabase-da 'sana' ustuni 'text' ekanligini tekshiring.");
        } finally {
            saveBtn.innerText = "Saqlash";
            saveBtn.disabled = false;
        }
    });

    const tabs = document.querySelectorAll('.tabs span');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tabs .active').classList.remove('active');
            tab.classList.add('active');
            const path = document.querySelector('.chart-area path');
            const randomPath = `M0 ${Math.random() * 80 + 20} Q50 ${Math.random() * 80} 100 ${Math.random() * 80} T200 ${Math.random() * 80} T300 ${Math.random() * 80}`;
            path.setAttribute('d', randomPath);
        });
    });
});