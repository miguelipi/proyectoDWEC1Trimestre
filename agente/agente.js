const id = new URL(window.location).searchParams.get("id"); 
console.log(id);
const apiUrl = `https://valorant-api.com/v1/agents/${id}`; // Usar directamente la URL con el id

fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => procesarJSON(jsondata))
  .catch(e => { console.log(e); });

function procesarJSON(jsondata) {
  

  const agente = jsondata.data;

  //Asignar el nombre del agente al titulo de la pagina
  document.title = `${agente.displayName}`;

  // Asignar los datos del agente
  let propiedad = document.getElementById("nombreAgente");
  propiedad.textContent = agente.displayName;

  propiedad = document.getElementById("descripcionAgente");
  propiedad.textContent = agente.description;

  // Asignar el rol
  propiedad = document.getElementById("imagenRol");
  propiedad.setAttribute("src", agente.role.displayIcon);

  propiedad = document.getElementById("nombreRol");
  propiedad.textContent = agente.role.displayName;

  // Asignar la imagen del agente
  propiedad = document.getElementById("imagenAgente");
  propiedad.setAttribute("src", agente.fullPortrait);

  // Asignar habilidades 
  if (agente.abilities[0]) {
    let habilidad = agente.abilities[0];
    document.getElementById("nombreHabilidad_1").textContent = habilidad.displayName;
    document.getElementById("imagenHabilidad_1").setAttribute("src", habilidad.displayIcon);
    document.getElementById("descripcionHabilidad_1").textContent = habilidad.description;
  }

  if (agente.abilities[1]) {
    let habilidad = agente.abilities[1];
    document.getElementById("nombreHabilidad_2").textContent = habilidad.displayName;
    document.getElementById("imagenHabilidad_2").setAttribute("src", habilidad.displayIcon);
    document.getElementById("descripcionHabilidad_2").textContent = habilidad.description;
  }

  if (agente.abilities[2]) {
    let habilidad = agente.abilities[2];
    document.getElementById("nombreHabilidad_3").textContent = habilidad.displayName;
    document.getElementById("imagenHabilidad_3").setAttribute("src", habilidad.displayIcon);
    document.getElementById("descripcionHabilidad_3").textContent = habilidad.description;
  }

  if (agente.abilities[3]) {
    let habilidad = agente.abilities[3];
    document.getElementById("nombreHabilidad_4").textContent = habilidad.displayName;
    document.getElementById("imagenHabilidad_4").setAttribute("src", habilidad.displayIcon);
    document.getElementById("descripcionHabilidad_4").textContent = habilidad.description;
  }
}
