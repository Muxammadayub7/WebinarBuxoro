const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');   // agar o'rnatilmagan bo'lsa: npm install node-fetch@2

const app = express();

const TELEGRAM_TOKEN = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
const CHAT_ID = "8482529498";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    console.log("✅ Ma'lumot ketdi!");

    const name = req.body.name || "Noma'lum";
    const phone = req.body.phone || "Noma'lum";

    const text = `📥 Yangi lead!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible; TelegramBot/1.0)'   // User-Agent ni o'zgartirdik
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            console.log("✅ Telegramga muvaffaqiyatli yuborildi!");
        } else {
            console.log("❌ Telegram xatosi:", data);
        }
    } catch (err) {
        console.error("❌ Telegramga yuborishda xatolik:", err.message);
    }

    res.send("OK");
});

app.get('/', (req, res) => {
    res.send("Server ishlamoqda!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda ishga tushdi!`);
});