const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v9/cadastrar-tutor";

  const iname = document.querySelector("#name").value;
  const icpf = document.querySelector("#cpf").value;
  const ibirthday = document.querySelector("#birthday").value;
  const igender = document.querySelector("#gender").value;
  const iactive = document.querySelector("#active").value;
  const iddd = document.querySelector("#ddd").value;
  const iphone = document.querySelector("#phone").value;
  const ipublicPlace = document.querySelector("#publicPlace").value;
  const inumber = document.querySelector("#number").value;
  const idistrict = document.querySelector("#district").value;
  const icity = document.querySelector("#city").value;
  const istate = document.querySelector("#state").value;

  const data = {
    name: iname,
    cpf: icpf,
    birthday: ibirthday,
    gender: igender,
    active: iactive,
    ddd: iddd,
    phone: iphone,
    publicPlace: ipublicPlace,
    number: inumber,
    district: idistrict,
    city: icity,
    state: istate,
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
    console.log("Tutor cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar tutor.");
  }
});

function carregarTutores() {
  fetch('http://localhost:8088/api/v9/listar-tutores')
  .then(response => response.json())
  .then(data => {
    const tabelaTutores = document.getElementById('userTable');
    const tbody = tabelaTutores.querySelector('tbody');
    data.forEach(tutor => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${tutor.name}</td>
      <td>${tutor.cpf}</td>
      <td>${tutor.birthday}</td>
      <td>${tutor.gender}</td>
      <td>${tutor.active}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoTutorParaEdicao(${tutor.cpf})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deleteTutor(${tutor.cpf})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar tutores:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarTutores);

function deleteTutor(TutorCpf) {
  const url = `http://localhost:8088/api/v9/deletar-tutor/${TutorCpf}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Tutor removido com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover tutor.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover tutor:", error);
  });
}