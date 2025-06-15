
document.addEventListener("DOMContentLoaded", () => {
    const fields = document.querySelectorAll("input");
    const langDE = document.getElementById("lang-de");
    const langEN = document.getElementById("lang-en");

    fields.forEach(field => {
        const key = field.id;
        const saved = localStorage.getItem(key);
        if (saved) field.value = saved;
        field.addEventListener("focus", () => field.select());
        field.addEventListener("input", () => localStorage.setItem(key, field.value));
    });

    langDE.addEventListener("click", () => setLanguage("de"));
    langEN.addEventListener("click", () => setLanguage("en"));

    function setLanguage(lang) {
        localStorage.setItem("lang", lang);
        location.reload();
    }

    const savedLang = localStorage.getItem("lang") || "de";
    if (savedLang === "en") {
        document.querySelector("h1").textContent = "Abidos Calculation";
        document.querySelector("button[type='submit']").textContent = "Compare";
    }
});
