const urlPacks = "https://valorant-api.com/v1/themes";

fetch(urlPacks)
  .then(response => response.json())
  .then(jsondata => procesarJSONPacks(jsondata))
  .catch(e => { console.log(e); });

function procesarJSONPacks(jsondata) {
    let packs = {}; // packs será un objeto

    // Organizar los datos en el objeto packs
    for (let pack of jsondata.data) {
        if (!packs[pack.displayName]) {
            packs[pack.displayName] = [];
        }
        packs[pack.displayName].push(pack);
    }
    console.log(packs);

    let plantillaPack = document.getElementById("plantillaPack");

    for (let packName in packs) {
        let option = plantillaPack.cloneNode(true);
        plantillaPack.parentNode.appendChild(option);

        option.setAttribute("id", "pack_" + packName);
        option.textContent = packName;
    }
}

const urlSkins = "https://valorant-api.com/v1/weapons";
fetch(urlSkins)
  .then(response => response.json())
  .then(jsondata => procesarJSONSkins(jsondata))
  .catch(e => { console.log(e); });

function procesarJSONSkins(jsondata){

    let plantillaArmas = document.getElementById("plantillaArmas");
    let contenedorArmas = plantillaArmas.parentNode;
    contenedorArmas.removeChild(plantillaArmas);

    for(let arma of jsondata.data){

        let cardArma = plantillaArmas.cloneNode(true);
        contenedorArmas.appendChild(cardArma);

        let propiedadArma = document.getElementById("plantillaArmas")
        propiedadArma.setAttribute("id", "arma_"+arma.uuid);
        propiedadArma = document.getElementById("imagen");
        propiedadArma.setAttribute("id", "imagen"+arma.uuid);
        propiedadArma.setAttribute("src", arma.displayIcon);
        propiedadArma = document.getElementById("nombreArma");
        propiedadArma.setAttribute("id", "nombre_"+arma.uuid);
        propiedadArma.textContent = arma.displayName;
        propiedadArma = document.getElementById("typeArma");
        propiedadArma.setAttribute("id", "typeArma"+arma.uuid);
        propiedadArma.textContent = arma.shopData.category;
        


    }

}

