// Obtener los parámetros de la URL
const queryString = window.location.search;

// Crear un objeto URLSearchParams para manejar los parámetros
const urlParams = new URLSearchParams(queryString);

// Recuperar el valor del parámetro "id"
const id = urlParams.get('id');
console.log(id)
const apiUrl = "https://valorant-api.com/v1/agents/"+id.toString();

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

      let card = plantilla.cloneNode(true);
      contenedor.appendChild(card);

      card.setAttribute("id", "agente_"+jsondata.uuid);
      let propiedad = document.getElementById("nombreAgente");
      propiedad.textContent = jsondata.displayName;
      propiedad = document.getElementById("descripcionAgente");
      propiedad.textContent = jsondata.description;


      propiedad = document.getElementById("imagenRol");
      propiedad.setAttribute("src", jsondata.data.role.displayIcon);
      propiedad = document.getElementById("nombreRol");
      propiedad.textContent = jsondata.data.role.displayName;
      propiedad = document.getElementById("imagenAgente");
      propiedad.setAttribute("src", jsondata.fullPortrait)

      let plantilla2 = document.getElementById("plantilla2");
      let contenedor2 = plantilla2.parentNode;
      contenedor2.removeChild(plantilla2);

      for(let habilidad of jsondata.data.abilities){
        
        let card2 = plantilla2.cloneNode(true);
        contenedor2.appendChild(card2)
        card.setAttribute("id", "habilidad_"+habilidad.slot)

        propiedad = document.getElementById("nombreHabilidad");
        propiedad.textContent = habilidad.displayName;
        propiedad = document.getElementById("imagenHabilidad");
        propiedad.textContent = habilidad.displayIcon
        propiedad = document.getElementById("descripcionHabilidad");
        propiedad.textContent = habilidad.description;
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
  a.innerHTML = ""
  document.getElementsByTagName("footer")[0].appendChild(a);
}
