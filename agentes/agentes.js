const apiUrl = "https://valorant-api.com/v1/agents";

// Variable global para almacenar la plantilla
let plantilla;

fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => {
    inicializarPlantilla();
    procesarJSON(jsondata);

    // Escuchar cambios en el select
    const roleSelect = document.getElementById("roleSelect");
    roleSelect.addEventListener("change", () => {
      filtrarAgentes(jsondata, roleSelect.value);
    });
  })
  .catch(e => { console.log(e) });

function inicializarPlantilla() {
  // Guardar la plantilla y eliminarla del DOM
  plantilla = document.getElementById("plantilla");
  plantilla.parentNode.removeChild(plantilla);
}

function procesarJSON(jsondata) {
  const contenedor = document.querySelector(".row");

  for (let agente of jsondata.data) {
    if (agente.bustPortrait != null) {
      crearTarjeta(agente, contenedor);
    }
  }
}

function crearTarjeta(agente, contenedor) {
  let card = plantilla.cloneNode(true); // Usar la referencia de la plantilla
  contenedor.appendChild(card);

  card.setAttribute("id", "agente_" + agente.uuid);

  let propiedad = card.querySelector("#enlaceAgente");
  const url = `../agente/agente.html?id=${agente.uuid}`;
  propiedad.setAttribute("href", url);

  propiedad = card.querySelector("#fotoAgente");
  propiedad.setAttribute("src", agente.displayIcon);

  propiedad = card.querySelector("#titulo");
  propiedad.textContent = agente.displayName;

  card.setAttribute("data-role", agente.role ? agente.role.displayName : "Unknown");
}

function filtrarAgentes(jsondata, selectedRole) {
  const contenedor = document.querySelector(".row");
  contenedor.innerHTML = ""; // Limpiar agentes existentes

  for (let agente of jsondata.data) {
    const agenteRole = agente.role ? agente.role.displayName : "Unknown";
    if (selectedRole === "all" || agenteRole === selectedRole) {
      crearTarjeta(agente, contenedor);
    }
  }
}