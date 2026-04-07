document.addEventListener('DOMContentLoaded', () => {
    const daySpans = document.querySelectorAll('.days span');
    const xabarCon = document.querySelector(".xabar-con");

    // --- 1. XABARNOMA FUNKSIYASI ---
    function xabarnoma(xabar, turi) {
        if (!xabarCon) return;

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

    daySpans.forEach(day => {
        day.style.cursor = 'pointer';
        day.addEventListener('click', () => {
            const activeDay = document.querySelector('.days .active');
            if (activeDay) activeDay.classList.remove('active');
            
            day.classList.add('active');
            
            xabarnoma(`${day.innerText} kunidagi mashqlar yuklandi 📅`, "info");
        });
    });

    const startBtn = document.querySelector('.card button');
    let isTraining = false;

    startBtn.addEventListener('click', () => {
        if (!isTraining) {
            isTraining = true;
            xabarnoma("Mashg'ulot boshlandi! Omad, Abdulaziz! 💪", "success");

            startBtn.innerText = "Mashq bajarilmoqda... 00:00";
            startBtn.style.background = "#2ecc71";
            
            let seconds = 0;
            const timer = setInterval(() => {
                if (!isTraining) {
                    clearInterval(timer);
                    return;
                }
                seconds++;
                let min = Math.floor(seconds / 60);
                let sec = seconds % 60;
                startBtn.innerText = `Mashq bajarilmoqda... ${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
            }, 1000);

            startBtn.addEventListener('dblclick', () => {
                if (isTraining) {
                    isTraining = false;
                    startBtn.innerText = "Mashq tugatildi ✅";
                    startBtn.style.background = "#3498db";
                    
                    xabarnoma("Abdulaziz, bugungi mashg'ulot yakunlandi! Ofarin! 🔥🏆", "success");
                }
            });
        }
    });

    const allDetails = document.querySelectorAll('details');

    allDetails.forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                allDetails.forEach(otherDetail => {
                    if (otherDetail !== detail) {
                        otherDetail.open = false;
                    }
                });
                detail.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                detail.style.transition = "0.3s";
            } else {
                detail.style.boxShadow = "none";
            }
        });
    });

    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseover', () => {
            stat.style.transform = "translateY(-5px)";
            stat.style.transition = "0.3s";
            stat.style.border = "1px solid orange";
        });
        stat.addEventListener('mouseout', () => {
            stat.style.transform = "translateY(0)";
            stat.style.border = "none";
        });
    });
});