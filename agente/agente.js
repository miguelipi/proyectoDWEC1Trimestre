// Obtener los parámetros de la URL
const queryString = window.location.search;

// Crear un objeto URLSearchParams para manejar los parámetros
const urlParams = new URLSearchParams(queryString);

// Recuperar el valor del parámetro "id"
const id = urlParams.get('id');
const apiUrl = "https://valorant-api.com/v1/agents/"+id;

fetch(apiUrl)
  .then(response => {
    return response.json();
  })
  .then(jsondata => procesarJSON(jsondata))
  .catch(e => { console.log(e) });

  
function procesarJSON(jsondata){

    //procesarJSON

    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    for(let agente of jsondata){
      if(agente.bustPortrait!=null){}
      let card = plantilla.cloneNode(true);
      contenedor.appendChild(card);

      card.setAttribute("id", "agente_"+agente.uuid);
      let propiedad = document.getElementById("titulo");
      propiedad.textContent = agente.displayName;
      propiedad = document.getElementById("descripcion");
      propiedad.textContent = agente.description;
      propiedad = document.getElementById("imagenRol");
      propiedad.setAttribute("src", agente.role.displayIcon);
      propiedad = document.getElementById("rolAgente");
      propiedad.textContent = agente.rol.displayName;


    }

    const a = document.createElement("a");
  //cuidadiinn joorrlll, que estamos con un literal de cadena
  const archivo = new Blob([`
  <!doctype html>
  <html lang="en">
  `+ document.head.outerHTML + `

  <!-- Todo lo que viene ahora lo has creado tu solit@ con javascript y jugando con el DOM
       y esto solo la punta del iceberg de todo lo que vas a crear!!!
       venga! vamos a por ello  -->

  `+ document.body.outerHTML + `
  </html>`], { type: 'html' });
  const url = URL.createObjectURL(archivo);
  a.href = url;
  a.download = "statico.html";
  a.innerHTML = "descarga el htlm que has creado con js y el dom"
  document.getElementsByTagName("footer")[0].appendChild(a);
}
