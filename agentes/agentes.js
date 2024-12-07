const apiUrl = "https://valorant-api.com/v1/agents"

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

    for(let agente of jsondata.data){

      let card = plantilla.cloneNode(true);
      contenedor.appendChild(card);

      card.setAttribute("id", "agente_"+agente.uuid);
      let propiedad = document.getElementById("enlaceAgente");
      propiedad.setAttribute("href", `../agente/agente.html?id=${agente.uuid}`);
      propiedad.setAttribute("id", "enlaceAgente_"+agente.uuid);
      propiedad = document.getElementById("fotoAgente");
      propiedad.setAttribute("id", "imagenAgente_"+agente.uuid);
      propiedad.setAttribute("src",agente.displayIconSmall);
      propiedad = document.getElementById("titulo");
      propiedad.setAttribute("id", "titulo_"+agente.uuid);
      propiedad.textContent = agente.displayName;

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
