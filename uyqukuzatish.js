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

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.querySelector('.form button');
    const inputs = document.querySelectorAll('.form .row input');
    const sleepRange = document.querySelector('.form input[type="range"]');
    const chartBars = document.querySelectorAll('.chart-bars .day');

    chartBars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 100) + 50;
        bar.style.height = `${randomHeight}px`;
        bar.style.transition = "all 0.6s ease-out";
        
        bar.addEventListener('click', () => {
            document.querySelector('.day.active')?.classList.remove('active');
            bar.classList.add('active');
            xabarnoma(`${bar.innerText} kuni tanlandi`, "info");
        });
    });

    saveBtn.addEventListener('click', () => {
        const sleepStart = inputs[0].value;
        const sleepEnd = inputs[1].value;

        if (sleepStart && sleepEnd) {
            saveBtn.innerText = "Saqlanmoqda...";
            saveBtn.style.opacity = "0.7";

            setTimeout(() => {
                xabarnoma(`Muvaffaqiyatli saqlandi, Abdulaziz! ✅ Uyqu: ${sleepStart} - ${sleepEnd}`, "success");
                
                saveBtn.innerText = "Ma'lumotlarni Saqlash";
                saveBtn.style.opacity = "1";
                
                const activeBar = document.querySelector('.day.active');
                if (activeBar) {
                    activeBar.style.height = "140px";
                }
            }, 1000);
        } else {
            xabarnoma("Iltimos, vaqtni to'liq kiriting! ⚠️", "error");
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
        "Abdulaziz, Deep Sleep ko'rsatkichingiz past. Rejimga amal qiling. 😴",
        "Uyqudan 2 soat oldin telefon ishlatmaslik sifatni oshiradi. 📱",
        "Xonangiz harorati ideal. Uyqungiz tinch bo'ladi. 🌡️",
        "Kofeinni kechki payt iste'mol qilmaslikka harakat qiling. ☕"
    ];

    const aiBox = document.querySelector('.card.ai p');
    setInterval(() => {
        const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
        if (aiBox) {
            aiBox.style.opacity = "0";
            setTimeout(() => {
                aiBox.innerText = randomTip;
                aiBox.style.opacity = "1";
                xabarnoma("Yangi AI maslahati mavjud ✨", "info");
            }, 500);
        }
    }, 10000);
});