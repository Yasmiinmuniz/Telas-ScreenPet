// CRMV
function handleCrmvBoxDisplay() {
    const accessTypeSelect = document.getElementById("accessType");
    const crmvBox = document.getElementById("crmvBox");

    if (accessTypeSelect.value === "veterinarian") {
        crmvBox.style.display = "block";
    } else {
        crmvBox.style.display = "none";
    }
}

document.getElementById("accessType").addEventListener("change", handleCrmvBoxDisplay);

// Data de nascimento
document.getElementById("birthdate").addEventListener("change", () => {
    const selectedDate = new Date(document.getElementById("birthdate").value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    console.log("Idade:", age);
});
