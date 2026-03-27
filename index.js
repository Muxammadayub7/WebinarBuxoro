async function sendData(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    
    if (!nameInput.value || !phoneInput.value) {
        alert("Iltimos, ism va telefonni kiriting!");
        return;
    }

    const name = nameInput.value;
    const phone = phoneInput.value;

    const token = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
    const chat_id = "8482529498";
    
    // Matnni URL formatiga moslab tayyorlaymiz
    const message = encodeURIComponent(`📥 *Yangi lead!*\n👤 Ism: ${name}\n📞 Tel: ${phone}`);

    // 1. TELEGRAMGA YUBORISH (Eng ishonchli GET usuli)
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=Markdown`;

    try {
        const response = await fetch(telegramUrl);
        const resData = await response.json();

        if (resData.ok) {
            console.log("Telegram ok! ✅");
        } else {
            // AGAR SHU YERDA XATO CHIQSA: Chat ID yoki Botda muammo bor
            alert("Bot xatosi: " + resData.description);
            return; // Botga bormasa, alert berib to'xtatamiz
        }
    } catch (err) {
        console.error("Telegram error:", err);
    }

    // 2. SHEETSGA YUBORISH
    const SHEETS_URL = "https://script.google.com/macros/s/AKfycbw90oTua6aedgd8N26UXMdwPQPrjAhIfrJJe_X5LtJD5_EcWL_IJBG3vk5N-UH2Jucm/exec";
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    // Sheets-ga yuborishni orqa fonda qoldiramiz
    fetch(SHEETS_URL, { method: "POST", body: formData, mode: 'no-cors' });

    alert("Muvaffaqiyatli yuborildi!");
    nameInput.value = "";
    phoneInput.value = "";
}