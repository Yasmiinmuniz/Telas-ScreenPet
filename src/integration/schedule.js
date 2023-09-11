const form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const url = "http://localhost:8088/api/v7/cadastrar-agendamento";

  const idate = document.querySelector("#date").value;
  const itype = document.querySelector("#type").value;
  const itime = document.querySelector("#time").value;

  const data = {
    date: idate,
    type: itype,
    time: itime,
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
    console.log("Agendamento cadastrado com sucesso.");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao cadastrar agendamento.");
  }
});

function carregarAgendamentos() {
  fetch('http://localhost:8088/api/v7/listar-agendamentos')
  .then(response => response.json())
  .then(data => {
    const tabelaSchedules = document.getElementById('form');
    const div = tabelaSchedules.querySelector('div');
    data.forEach(schedule => {
      const row = document.createElement('div');
      row.innerHTML = `
      <div class="add-event-input">${schedule.date}</div>
      <div class="add-event-input">${schedule.type}</div>
      <div class="add-event-input">${schedule.time}</div>
      <td><a href="#" title="Editar" onclick="carregarDadosDoMedicamentoParaEdicao(${schedule.id})">
      <iconify-icon class="btn btn-outline-info" icon="fluent:edit-24-regular"></iconify-icon></a>
      <a href="#" title="Remover" onclick="deleteSchedule(${schedule.id})"><iconify-icon class="btn btn-outline-danger" icon="icon-park-solid:delete"></iconify-icon></a></td>`;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar agendamentos:', error);
  });
}

document.addEventListener('DOMContentLoaded', carregarAgendamentos);

function deleteSchedule(scheduleId) {
  const url = `http://localhost:8088/api/v7/deletar-agendamento/${scheduleId}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Agendamento removido com sucesso.");
      window.location.reload();
    } else {
      console.error("Erro ao remover agendamento.");
    }
  })
  .catch((error) => {
    console.error("Erro ao remover agendamento:", error);
  });
}