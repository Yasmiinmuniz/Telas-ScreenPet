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
    console.log("Medicamento cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar medicamento.");
  }
});

function carregarMedicamentos() {
  fetch('http://localhost:8088/api/v5/listar-medicamentos')
  .then(response => response.json())
  .then(data => {
    const tabelaMedicamentos = document.getElementById('userTable');
    const tbody = tabelaMedicamentos.querySelector('tbody');
    data.forEach(medicament => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${medicament.name}</td>
      <td>${medicament.type}</td>
      <td>${medicament.dosage}</td>
      <td>${medicament.activeCompound}</td>
      <td>${medicament.comments}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoMedicamentoParaEdicao(${medicament.id})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deleteMedicament(${medicament.id})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar medicamentos:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarMedicamentos);

function deleteMedicament(medicamentId) {
  const url = `http://localhost:8088/api/v5/deletar-medicamento/${medicamentId}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Medicamento removido com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover medicamento.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover medicamento:", error);
  });
}