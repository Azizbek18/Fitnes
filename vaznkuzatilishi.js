const xabarCon = document.querySelector(".xabar-con");

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

const SUPABASE_URL = 'https://olerglrehwbfolrsyzzo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9oYVfdjz9tqko55o9EZjdQ_AXWhvvhu';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const weightInput = document.querySelector('.form input');
    const commentInput = document.querySelector('.form textarea');
    const saveBtn = document.querySelector('.form button');
    const table = document.querySelector('table');
    const currentWeightDisplay = document.querySelector('.cards .card:first-child h2');
    const bmiDisplay = document.querySelector('.cards .card:last-child h2');

    function calculateBMI(weight) {
        const height = 1.80; // Abdulazizning bo'yi
        const bmi = (weight / (height * height)).toFixed(1);
        let status = "NORMAL";
        let color = "green";

        if (bmi < 18.5) { status = "OZG'IN"; color = "blue"; }
        else if (bmi > 25) { status = "ORTIQCHA"; color = "orange"; }

        bmiDisplay.innerHTML = `${bmi} <span class="status" style="color: ${color}">${status}</span>`;
    }

    // --- 1. JADVALGA QATOR QO'SHISH FUNKSIYASI ---
    function addRowToTable(data, isNew = false) {
        const newRow = table.insertRow(isNew ? 1 : -1); // Yangi bo'lsa tepaga, yuklanayotgan bo'lsa pastga
        newRow.innerHTML = `
            <td>${data.sana}</td>
            <td>${data.vazn} kg</td>
            <td class="${data.ozgarishi < 0 ? 'minus' : ''}">${data.ozgarishi || 0}</td>
            <td>${data.izoh || "Izoh yo'q"}</td>
        `;
    }

    // --- 2. BAZADAN MA'LUMOTLARNI YUKLASH (F5 UCHUN) ---
    async function loadWeightData() {
        const { data, error } = await _supabase
            .from('vazn')
            .select('*')
            .order('id', { ascending: false }); // Oxirgi qo'shilganlar birinchi

        if (error) {
            console.error("Yuklashda xato:", error.message);
            return;
        }

        if (data && data.length > 0) {
            currentWeightDisplay.innerHTML = `${data[0].vazn} <span>kg</span>`;
            calculateBMI(data[0].vazn);

            while(table.rows.length > 1) table.deleteRow(1);
            data.forEach(item => addRowToTable(item));
        }
    }

    saveBtn.addEventListener('click', async () => {
        const weightValue = weightInput.value.trim();
        const comment = commentInput.value.trim();
        const dateStr = new Date().toLocaleDateString('en-EN', { day: 'numeric', month: 'long' });

        if (!weightValue) {
            xabarnoma("Iltimos, vazningizni kiriting! ⚠️", "error");
            return;
        }

        const weightNum = Math.round(parseFloat(weightValue));
        saveBtn.innerText = "Saqlanmoqda...";
        saveBtn.disabled = true;

        try {
            const { error } = await _supabase
                .from('vazn') 
                .insert([{ 
                    sana: dateStr,
                    vazn: weightNum,
                    ozgarishi: 0, 
                    izoh: comment || "Izoh yo'q"
                }]);

            if (error) throw error;

            xabarnoma("Vazn muvaffaqiyatli saqlandi! ✅", "success");
            
            // Sahifani yangilamasdan ma'lumotni ko'rsatish
            currentWeightDisplay.innerHTML = `${weightNum} <span>kg</span>`;
            calculateBMI(weightNum);
            addRowToTable({ sana: dateStr, vazn: weightNum, ozgarishi: 0, izoh: comment }, true);

            weightInput.value = "";
            commentInput.value = "";

        } catch (err) {
            xabarnoma("Xatolik yuz berdi! ❌", "error");
        } finally {
            saveBtn.innerText = "Saqlash";
            saveBtn.disabled = false;
        }
    });

    // Tablar uchun random chart effekti (kodning qolgan qismi)
    const tabs = document.querySelectorAll('.tabs span');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tabs .active')?.classList.remove('active');
            tab.classList.add('active');
            xabarnoma(`${tab.innerText} ma'lumotlari yuklanmoqda...`, "info");
            
            const path = document.querySelector('.chart-area path');
            if (path) {
                const randomPath = `M0 ${Math.random() * 80 + 20} Q50 ${Math.random() * 80} 100 ${Math.random() * 80} T200 ${Math.random() * 80} T300 ${Math.random() * 80}`;
                path.setAttribute('d', randomPath);
            }
        });
    });

    // Sahifa ochilganda yuklash
    await loadWeightData();
});