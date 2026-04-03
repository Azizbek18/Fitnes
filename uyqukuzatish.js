document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.querySelector('.form button');
    const inputs = document.querySelectorAll('.form .row input');
    const sleepRange = document.querySelector('.form input[type="range"]');
    const averageSleepText = document.querySelector('.card h2 span').parentElement;
    const chartBars = document.querySelectorAll('.chart-bars .day');

    chartBars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 100) + 50;
        bar.style.height = `${randomHeight}px`;
        bar.style.transition = "all 0.6s ease-out";
        
        bar.addEventListener('click', () => {
            document.querySelector('.day.active')?.classList.remove('active');
            bar.classList.add('active');
        });
    });

    saveBtn.addEventListener('click', () => {
        const sleepStart = inputs[0].value; //
        const sleepEnd = inputs[1].value;

        if (sleepStart && sleepEnd) {
            saveBtn.innerText = "Saqlanmoqda...";
            saveBtn.style.opacity = "0.7";

            setTimeout(() => {
                alert(`Muvaffaqiyatli saqlandi! \nUyqu vaqti: ${sleepStart} dan ${sleepEnd} gacha.`);
                saveBtn.innerText = "Ma'lumotlarni Saqlash";
                saveBtn.style.opacity = "1";
                
                const activeBar = document.querySelector('.day.active');
                if (activeBar) {
                    activeBar.style.height = "140px";
                }
            }, 1000);
        } else {
            alert("Iltimos, vaqtni to'liq kiriting!");
        }
    });

    sleepRange.addEventListener('input', (e) => {
        const qualityPercent = e.target.value;
        const qualityDisplay = document.querySelector('.card:nth-child(2) h2');
        const progressBar = document.querySelector('.card:nth-child(2) .bar');
        
        qualityDisplay.innerText = `${qualityPercent}%`;
        progressBar.style.width = `${qualityPercent}%`;
        
        if (qualityPercent < 50) {
            progressBar.style.background = "red";
        } else if (qualityPercent < 80) {
            progressBar.style.background = "orange";
        } else {
            progressBar.style.background = "green";
        }
    });

    const aiTips = [
        "Sizning Deep Sleep ko'rsatkichingiz past. Har kuni bir xil vaqtda uxlang.",
        "Uyqudan 2 soat oldin telefon ishlatmaslik sifatni 20% ga oshiradi. 📱",
        "Xonangiz harorati (19°C) ideal. Uyqungiz tinch bo'ladi. 🌡️",
        "Kofeinni soat 16:00 dan keyin iste'mol qilmaslikka harakat qiling. ☕"
    ];

    const aiBox = document.querySelector('.card.ai p');
    setInterval(() => {
        const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
        aiBox.style.opacity = "0";
        setTimeout(() => {
            aiBox.innerText = randomTip;
            aiBox.style.opacity = "1";
        }, 500);
    }, 5000);
});