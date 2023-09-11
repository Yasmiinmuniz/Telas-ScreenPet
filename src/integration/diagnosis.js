const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v3/cadastrar-diagnostico";

  const isymptoms = document.querySelector("#symptoms").laboratory;
  const ipatology = document.querySelector("#patology").value;
  const iprescription = document.querySelector("#prescription").value;
  const icomments = document.querySelector("#comments").value;

  const data = {
    symptoms: isymptoms,
    patology: ipatology,
    prescription: iprescription,
    comments: icomments,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Diagnóstico cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar diagnóstico.");
  }
});