const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v13/cadastrar-vacina";

  const iname = document.querySelector("#name").value;
  const ifabricator = document.querySelector("#fabricator").value;
  const itype = document.querySelector("#type").value;
  const ifrequency = document.querySelector("#frequency").value;
  const icomments = document.querySelector("#comments").value;

  const data = {
    name: iname,
    fabricator: ifabricator,
    type: itype,
    frequency: ifrequency,
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
    console.log("Vacina cadastrada com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar vacina.");
  }
});

function carregarVacinas() {
  fetch('http://localhost:8088/api/v13/listar-vacinas')
  .then(response => response.json())
  .then(data => {
    const tabelaVacinas = document.getElementById('userTable');
    const tbody = tabelaVacinas.querySelector('tbody');
    data.forEach(vaccine => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${vaccine.name}</td>
      <td>${vaccine.fabricator}</td>
      <td>${vaccine.type}</td>
      <td>${vaccine.frequency}</td>
      <td>${vaccine.comments}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoVacinaParaEdicao(${vaccine.id})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deleteVaccine(${vaccine.id})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar vacinas:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarVacinas);

function deleteVaccine(vaccineId) {
  const url = `http://localhost:8088/api/v13/deletar-vacina/${vaccineId}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Vacina removida com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover vacina.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover vacina:", error);
  });
}