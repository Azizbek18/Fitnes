const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const p1 = "gsk_vQNqxZN7qTUQktayqtuKWG";
const p2 = "dyb3FYZZTmUcAONaO9zcUzgI236UVt";
const hammasi = p1 + p2;

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const AI_PROMPT = {
    role: `Sen faqat sportga oid savollarga javob bera oladigan kuchli AI’san.
Sen do‘stona, iliq va hurmat bilan muloqot qilasan. Har doim aniq, to‘g‘ri va tushunarli javob berasan.
Faqat futbol, basketbol, tennis, fitness, sportchilar va musobaqalar haqida gapirasan.
Agar savol sportga aloqador bo‘lmasa: "Men faqat sport haqida javob beraman."`,

    botName: "FitBot AI"
};

let xotira = [
    { role: "system", content: AI_PROMPT.role }
];

function addMessage(role, text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let formattedText = text;
    if (role === 'bot' && typeof marked !== 'undefined') {
        formattedText = marked.parse(text);
    } else {
        formattedText = `<p>${text}</p>`;
    }

    const msgHTML = `
    <div class="msg-row ${role}">
        ${role === 'bot' ? '<div class="bot-icon"><i class="fa-solid fa-robot"></i></div>' : ''}
        
        <div class="msg-bubble">
            ${formattedText}
            <span class="msg-meta">
                ${role === 'bot' ? AI_PROMPT.botName : 'SIZ'} • ${time}
            </span>
        </div>

        ${role === 'user' ? `
        <div class="user-avatar-msg" style="width:35px;height:35px;background:#FF5C28;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;margin-left:10px;">
            JS
        </div>` : ''}
    </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', msgHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage('user', text);
    xotira.push({ role: "user", content: text });
    userInput.value = "";

    const tempId = "typing_" + Date.now();

    const typingHTML = `
    <div class="msg-row bot" id="${tempId}">
        <div class="bot-icon"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-bubble">O'ylayapman...</div>
    </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', typingHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${hammasi}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: xotira,
                temperature: 0.7
            })
        });

        const data = await response.json();
        document.getElementById(tempId)?.remove();

        if (data.choices && data.choices.length > 0) {
            const aiResponse = data.choices[0].message.content;

            xotira.push({ role: "assistant", content: aiResponse });
            addMessage('bot', aiResponse);
        } else {
            addMessage('bot', "Kechirasiz, javob olishda xatolik yuz berdi.");
        }

    } catch (error) {
        document.getElementById(tempId)?.remove();
        console.error("API Error:", error);
        addMessage('bot', "Tarmoq xatosi yuz berdi. API kalitni tekshiring.");
    }
}

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});