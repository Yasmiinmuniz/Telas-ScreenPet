const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v4/cadastrar-exame";

  const ilaboratory = document.querySelector("#name").laboratory;
  const idate = document.querySelector("#date").value;
  const itype = document.querySelector("#type").value;
  const icomments = document.querySelector("#comments").value;

  const data = {
    laboratory: ilaboratory,
    date: idate,
    type: itype,
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
    console.log("Exame cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar exame.");
  }
});