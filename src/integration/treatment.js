const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v8/cadastrar-tratamento";

  const iname = document.querySelector("#name").value;
  const idate = document.querySelector("#date").value;
  const iposology = document.querySelector("#posology").value;
  const icomments = document.querySelector("#comments").value;

  const data = {
    name: iname,
    date: idate,
    posology: iposology,
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
    console.log("Tratament cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar tratamento.");
  }
});