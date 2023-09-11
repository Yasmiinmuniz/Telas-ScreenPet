const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v10/cadastrar-usuario";

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
  const iemail = document.querySelector("#email").value;
  const ipassword = document.querySelector("#password").value;

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
    email: iemail,
    password: ipassword,
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
    console.log("Usuário cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar usuário.");
  }
});

function carregarUsuarios() {
  fetch('http://localhost:8088/api/v10/listar-usuarios')
  .then(response => response.json())
  .then(data => {
    const tabelaUsuarios = document.getElementById('userTable');
    const tbody = tabelaUsuarios.querySelector('tbody');
    data.forEach(usuario => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${usuario.name}</td>
      <td>${usuario.cpf}</td>
      <td>${usuario.birthday}</td>
      <td>${usuario.gender}</td>
      <td>${usuario.active}</td>
      <td><a href="#" title="Editar" onclick="carregarDadosDoUsuarioParaEdicao(${usuario.email})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deleteUsuario(${usuario.email})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar usuarios:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarUsuarios);

function deleteUsuario(usuarioEmail) {
  const url = `http://localhost:8088/api/v10/deletar-usuario/${usuarioEmail}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Usuário removido com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover usuário.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover usuário:", error);
  });
}