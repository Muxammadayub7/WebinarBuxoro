const TELEGRAM_TOKEN = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
const CHAT_ID = "8482529498";

function doPost(e) {
  try {
    const name = e.parameter.name || "Noma'lum";
    const phone = e.parameter.phone || "Noma'lum";

    const text = `📥 Yangi lead!\n👤 Ism: ${name}\n📞 Tel: ${phone}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const payload = {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: "HTML"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);

    return ContentService.createTextOutput("OK");
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput("Error: " + error);
  }
}

async function sendData(e) {
    if (e) e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
        alert("Ism va telefon raqamini kiriting!");
        return;
    }

    // ←←← BU YERGA O‘ZING OLGAN GOOGLE APPS SCRIPT URL ni qo‘y
    const PROXY_URL = "https://script.google.com/macros/s/AKfycbw90oTua6aedgd8N26UXMdwPQPrjAhIfrJJe_X5LtJD5_EcWL_IJBG3vk5N-UH2Jucm/exec";  

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    try {
        const response = await fetch(PROXY_URL, {
            method: "POST",
            body: formData
        });

        console.log("✅ So'rov yuborildi!");
        
        alert("Muvaffaqiyatli yuborildi! ✅");

        // Formani tozalash
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";

    } catch (err) {
        console.error("Xatolik:", err);
        alert("Yuborishda muammo chiqdi. Qayta urinib ko‘ring.");
    }
}