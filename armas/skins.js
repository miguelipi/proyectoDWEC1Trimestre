const urlPacks = "https://valorant-api.com/v1/themes";

fetch(urlPacks)
  .then(response => response.json())
  .then(jsondata => procesarJSONPacks(jsondata))
  .catch(e => { console.log(e); });

const id = new URL(window.location).searchParams.get("id"); 
console.log(id);
const apiUrl = `https://valorant-api.com/v1/weapons/${id}`; // Usar directamente la URL con el id

fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => procesarJSONSkins(jsondata))
  .catch(e => { console.log(e); });

function procesarJSONSkins (jsondata){

    let plantilla = document.getElementById("plantillaArmas");
    let contenedor = plantilla.parentElement;
    contenedor.removeChild(plantilla);

    let skins = jsondata.data.skins;
    console.log(skins);

    for(let skin of skins){
        if(skin.displayName != "Random Favorite Skin"){

            let card = plantilla.cloneNode(true);
            contenedor.appendChild(card);
            
            let propiedad = document.getElementById("plantillaArmas");
            propiedad.setAttribute("id", "skin_"+skin.uuid);
            propiedad = document.getElementById("imagen");
            propiedad.setAttribute("id","imagen_"+skin.uuid);
            propiedad.setAttribute("src",skin.chromas[0].fullRender);
            propiedad = document.getElementById("nombreArma");
            propiedad.setAttribute("id", "nombre_"+skin.uuid);
            propiedad.textContent = skin.displayName;
            
        }

    }

}