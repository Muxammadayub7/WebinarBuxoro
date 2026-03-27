const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const TELEGRAM_TOKEN = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
const CHAT_ID = "8482529498";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Bu yerda konsolda "Ma'lumot ketdi!" chiqishi kerak
app.post('/send', (req, res) => {
    console.log("✅ Ma'lumot ketdi!");

    const name = req.body.name || "Noma'lum";
    const phone = req.body.phone || "Noma'lum";

    const text = `📥 Yangi lead!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=HTML`;

    // Telegramga yuborish
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("✅ Telegramga muvaffaqiyatli yuborildi!");
            } else {
                console.log("❌ Telegram xatosi:", data.description || data);
            }
        })
        .catch(err => {
            console.error("❌ Telegramga ulanishda xatolik:", err.message);
        });

    res.send("OK");   // Brauzerga javob qaytaradi
});

app.get('/', (req, res) => {
    res.send("Server ishlamoqda!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda ishga tushdi!`);
});