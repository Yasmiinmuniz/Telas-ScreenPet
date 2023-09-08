// Importar o arquivo medication.js
import './medicationScreen.js';

// Importar o arquivo telaCadastro.js
import '../TelaCadastro/telaCadastro.js';

// Importar a biblioteca Iconify
import 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js';

// Importar jQuery
import 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
    integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin = "anonymous"

// Importar Popper.js
import 'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js';
    integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin = "anonymous"

// Importar Bootstrap
import 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js';
    integrity = "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin = "anonymous"

function searchTable() {
    var input, filter, table, tr, td, i, txtValue, found;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    found = false;

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Altere para o índice da coluna que deseja pesquisar
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                found = true;
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    // Exibir mensagem quando não houver correspondentes
    var noResultsMessage = document.getElementById("noResultsMessage");
    if (found) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
}
