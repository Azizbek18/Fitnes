document.addEventListener('DOMContentLoaded', () => {
    const taskItems = document.querySelectorAll('.task-list li');
    const progressText = document.querySelector('.box-header span');
    
    taskItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if (item.classList.contains('done')) {
                item.classList.remove('done');
                item.innerHTML = item.innerHTML.replace('✅', '');
            } else {
                item.classList.add('done');
                item.classList.remove('active');
                if (!item.innerHTML.includes('✅')) {
                    item.innerHTML = '✅' + item.innerHTML;
                }
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
            alert(`${newCourse} kursi muvaffaqiyatli qo'shildi!`);
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
    });
});