document.addEventListener('DOMContentLoaded', () => {
    const daySpans = document.querySelectorAll('.days span');
    
    daySpans.forEach(day => {
        day.style.cursor = 'pointer';
        day.addEventListener('click', () => {
            document.querySelector('.days .active').classList.remove('active');
            day.classList.add('active');
            
            console.log(`${day.innerText} kunidagi mashqlar yuklanmoqda...`);
        });
    });

    const startBtn = document.querySelector('.card button');
    let isTraining = false;

    startBtn.addEventListener('click', () => {
        if (!isTraining) {
            isTraining = true;
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
                isTraining = false;
                startBtn.innerText = "Mashq tugatildi ✅";
                startBtn.style.background = "#3498db";
                alert("Abdulaziz, bugungi mashg'ulot yakunlandi! Ofarin! 🔥");
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