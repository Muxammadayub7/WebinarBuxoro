const TELEGRAM_TOKEN = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
const CHAT_ID = "8482529498";

function doPost(e) {
  try {
    const name  = e.parameter.name  || "Noma'lum";
    const phone = e.parameter.phone || "Noma'lum";

    const text = `📥 Yangi lead!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=HTML`;

    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const result = response.getContentText();

    Logger.log("Telegram javobi: " + result);   // Logda ko'rish uchun

    return ContentService.createTextOutput("OK");
  } catch (error) {
    Logger.log("Xatolik: " + error);
    return ContentService.createTextOutput("Error");
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Server ishlamoqda!");
}

async function sendData(e) {
    if (e) e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
        alert("Ism va telefonni kiriting!");
        return;
    }

    const PROXY_URL = "https://script.google.com/macros/s/SIZNING_URL/exec";  // ← yangi URL ni qo'y

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    try {
        await fetch(PROXY_URL, {
            method: "POST",
            body: formData
        });

        alert("✅ Muvaffaqiyatli yuborildi! Telegram botni tekshiring.");
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";

    } catch (err) {
        console.error(err);
        alert("Xatolik bo'ldi. F12 bosib Console dagi xatoni yubor.");
    }
}