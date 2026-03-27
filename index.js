const TELEGRAM_TOKEN = "8651201120:AAFPICb43540D0zuz6aDlHXNxDKthVZLGtw";
const CHAT_ID = "8482529498";

function doPost(e) {
  try {
    const name  = e.parameter.name  || "Noma'lum";
    const phone = e.parameter.phone || "Noma'lum";

    const text = `📥 Yangi lead!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

    // GET usuli bilan sinaymiz (ko'pincha barqarorroq)
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=HTML`;

    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true
    });

    const result = response.getContentText();
    console.log("Telegram javobi: " + result);   // Apps Script Logger da ko'rinadi
    Logger.log("Telegram javobi: " + result);

    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.error("Xatolik: ", error);
    Logger.log("Xatolik: " + error);
    return ContentService.createTextOutput("Error").setMimeType(ContentService.MimeType.TEXT);
  }
}