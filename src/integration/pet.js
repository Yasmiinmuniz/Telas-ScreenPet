const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v6/cadastrar-pet";

  const iname = document.querySelector("#name").value;
  const igender = document.querySelector("#gender").value;
  const ibreed = document.querySelector("#breed").value;
  const ispecie = document.querySelector("#specie").value;
  const ibirthday = document.querySelector("#birthday").value;
  const iactive = document.querySelector("#active").value;

  const data = {
    name: iname,
    gender: igender,
    breed: ibreed,
    specie: ispecie,
    birthday: ibirthday,
    active: iactive,
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
    console.log("Pet cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar pet.");
  }
});

function carregarPets() {
  fetch('http://localhost:8088/api/v6/listar-pets')
  .then(response => response.json())
  .then(data => {
    const tabelaPets = document.getElementById('userTable');
    const tbody = tabelaPets.querySelector('tbody');
    data.forEach(pet => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.breed}</td>
      <td>${pet.specie}</td>
      <td>${pet.gender}</td>
      <td>${pet.birthday}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoPetParaEdicao(${pet.id})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deletePet(${pet.id})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar pets:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarPets);

function deletePet(petId) {
  const url = `http://localhost:8088/api/v6/deletar-pet/${petId}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Pet removido com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover pet.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover pet:", error);
  });
}