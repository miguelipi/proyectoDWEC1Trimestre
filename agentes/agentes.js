const apiUrl = "https://valorant-api.com/v1/agents";
let agentsData = []; // Variable global para almacenar todos los agentes

// Obtener todos los agentes de la API
fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => {
    agentsData = jsondata.data; // Guardamos los agentes
    renderAgents(agentsData); // Renderizamos todos los agentes inicialmente
  })
  .catch(e => {
    console.log(e);
  });

// Función para renderizar los agentes en el contenedor
function renderAgents(agents) {
    let contenedor = document.getElementById("agentsContainer");
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    // Recorremos cada agente y lo mostramos
    agents.forEach(agente => {
        if (agente.bustPortrait != null) {
            let card = document.createElement("div");
            card.classList.add("col-5", "col-md-4", "col-xxl-3", "my-3");

            card.innerHTML = `
                <div class="card">
                    <a href="../agente/agente.html?id=${agente.uuid}" class="text-center">
                        <img src="${agente.displayIcon}" alt="${agente.displayName}" class="card-img-top" />
                    </a>
                    <div class="card-body">
                        <h3 class="card-title">${agente.displayName}</h3>
                    </div>
                </div>
            `;
            contenedor.appendChild(card); // Agregamos el card al contenedor
        }
    });
}

// Función que se ejecuta cuando se selecciona un rol del select
document.getElementById("roleSelect").addEventListener("change", function() {
    const selectedRole = this.value;

    // Filtrar agentes según el rol seleccionado
    let filteredAgents;
    if (selectedRole === "all") {
        filteredAgents = agentsData; // Si selecciona "Todos", mostramos todos los agentes
    } else {
        filteredAgents = agentsData.filter(agent => agent.role === selectedRole); // Filtramos por rol
    }

    renderAgents(filteredAgents); // Renderizamos los agentes filtrados
});

