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

    saveBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const comment = commentInput.value;
        const date = new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });

        if (!weight) {
            alert("Iltimos, vazningizni kiriting!");
            return;
        }

        saveBtn.innerText = "Saqlanmoqda...";
        saveBtn.disabled = true;

        setTimeout(() => {
            currentWeightDisplay.innerHTML = `${weight} <span>kg</span>`;
            calculateBMI(weight);

            const newRow = table.insertRow(1);
            newRow.innerHTML = `
                <td>${date}</td>
                <td>${weight} kg</td>
                <td class="minus">-0.0</td>
                <td>${comment || "Izoh yo'q"}</td>
            `;

            weightInput.value = "";
            commentInput.value = "";
            saveBtn.innerText = "Saqlash";
            saveBtn.disabled = false;

            alert("Vazn muvaffaqiyatli saqlandi! 📉");
        }, 800);
    });

    const tabs = document.querySelectorAll('.tabs span');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tabs .active').classList.remove('active');
            tab.classList.add('active');

            // Grafik yo'lini (path) biroz o'zgartirish (effekt uchun)
            const path = document.querySelector('.chart-area path');
            const randomPath = `M0 ${Math.random() * 100} Q50 ${Math.random() * 100} 100 ${Math.random() * 100} T200 ${Math.random() * 100} T300 ${Math.random() * 100}`;
            path.setAttribute('d', randomPath);
        });
    });

    // 5. Foto qo'shish tugmasi
    const addPhotoBtn = document.querySelector('.photo.add');
    addPhotoBtn.addEventListener('click', () => {
        alert("Tez orada: Abdulaziz, bu yerga rasmingizni yuklash funksiyasi qo'shiladi! 📸");
    });
});