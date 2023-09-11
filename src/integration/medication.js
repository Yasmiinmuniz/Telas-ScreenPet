const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v5/cadastrar-medicamento";

  const iname = document.querySelector("#name").value;
  const itype = document.querySelector("#type").value;
  const idosage = document.querySelector("#dosage").value;
  const iactiveCompound = document.querySelector("#activeCompound").value;
  const icomments = document.querySelector("#comments").value;

  const data = {
    name: iname,
    type: itype,
    dosage: idosage,
    activeCompound: iactiveCompound,
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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

function carregarMedicamentos() {
  fetch('http://localhost:8088/api/v5/listar-medicamentos')
  .then(response => response.json())
  .then(data => {
    const tabelaMedicamentos = document.getElementById('userTable');
    const tbody = tabelaMedicamentos.querySelector('tbody');

    data.forEach(medicamento => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${medicamento.name}</td>
      <td>${medicamento.type}</td>
      <td>${medicamento.dosage}</td>
      <td>${medicamento.activeCompound}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoMedicamentoParaEdicao(${medicamento.id})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar medicamentos:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarMedicamentos);

function carregarDadosDoMedicamentoParaEdicao(medicamentoId) {
  fetch(`http://localhost:8088/api/v5/pesquisar-medicamento/${medicamentoId}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById("edit-name").value = data.name;
    document.getElementById("edit-type").value = data.type;
    document.getElementById("edit-dosage").value = data.dosage;
    document.getElementById("edit-activeCompound").value = data.activeCompound;
    document.getElementById("edit-comments").value = data.comments;
  })
  .catch(error => {
    console.error('Erro ao carregar dados do medicamento para edição:', error);
  });
}