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
      if(agente.bustPortrait!=null){
       
        let card = plantilla.cloneNode(true);
        contenedor.appendChild(card);
  
        card.setAttribute("id", "agente_"+agente.uuid);
        let propiedad = document.getElementById("enlaceAgente");
        const url = `../agente/agente.html?id=${agente.uuid}`
        console.log(url)
        if(agente && agente.uuid)
          propiedad.setAttribute("href", url);
        
        else
          console.log("no hay uuid")
        propiedad.setAttribute("id", "enlaceAgente_"+agente.uuid);
        propiedad = document.getElementById("fotoAgente");
        propiedad.setAttribute("id", "imagenAgente_"+agente.uuid);
        propiedad.setAttribute("src",agente.displayIcon);
        propiedad = document.getElementById("titulo");
        propiedad.setAttribute("id", "titulo_"+agente.uuid);
        propiedad.textContent = agente.displayName;
        
      }

    }
}