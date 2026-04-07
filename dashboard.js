document.addEventListener('DOMContentLoaded', () => {
    const taskItems = document.querySelectorAll('.task-list li');
    const progressText = document.querySelector('.box-header span');
    const xabarCon = document.querySelector(".xabar-con");

    function xabarnoma(xabar, turi) {
        let xabarMatn = document.createElement('div');
        xabarMatn.classList.add("xabar", turi);
        xabarMatn.innerText = xabar;

        xabarCon.appendChild(xabarMatn);

        setTimeout(() => {
            xabarMatn.style.opacity = '0';
            xabarMatn.style.transition = '0.5s';
            setTimeout(() => xabarMatn.remove(), 500);
        }, 4000);
    }

    taskItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if (item.classList.contains('done')) {
                item.classList.remove('done');
                item.innerHTML = item.innerHTML.replace('✅', '');
                xabarnoma("Vazifa qaytarildi", "info");
            } else {
                item.classList.add('done');
                item.classList.remove('active');
                if (!item.innerHTML.includes('✅')) {
                    item.innerHTML = '✅' + item.innerHTML;
                }
                xabarnoma("Vazifa bajarildi!", "success");
            }
            updateProgress();
        });
    });

    function updateProgress() {
        const total = taskItems.length;
        const done = document.querySelectorAll('.task-list li.done').length;
        const percent = Math.round((done / total) * 100);
        progressText.innerText = `${percent}%`;
    }

    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
        const newCourse = prompt("Yangi kurs nomini kiriting:");
        if (newCourse) {
            xabarnoma(`${newCourse} kursi muvaffaqiyatli qo'shildi!`, "success");
        }
    });

    const chartBars = document.querySelectorAll('.chart div');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            bar.style.opacity = '0.7';
            bar.style.transition = '0.3s';
        });
        bar.addEventListener('mouseleave', () => {
            bar.style.opacity = '1';
        });
    });

    const aiBox = document.querySelector('.ai-box');
    const aiTips = [
        "Bugun ko'proq suv ichishni unutmang! 💧",
        "Uyqu rejimi tiklanish uchun juda muhim. 😴",
        "Yaxshi natija! Ertaga yuklamani biroz oshirish mumkin. 🔥",
        "Plank mashqini to'g'ri bajarayotganingizga ishonch hosil qiling."
    ];

    aiBox.addEventListener('click', () => {
        const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
        aiBox.querySelector('p').innerText = randomTip;
        
        xabarnoma("Yangi maslahat!", "info");
    });
});