const apiUrl = "https://valorant-api.com/v1/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04";

fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => procesarJSON(jsondata))
  .catch(e => console.log(e));

function procesarJSON(jsondata) {
    
    // Agrupar por divisionName
    let grupos = {};
    for (let tier of jsondata.data.tiers) {
        
        if (tier.divisionName === "Unused1" || tier.divisionName === "Unused2") {
            continue; // Omitir estas divisiones
        }
        
        if (!grupos[tier.divisionName]) {
            grupos[tier.divisionName] = [];
        }
        
        grupos[tier.divisionName].push(tier);
        
    }
    
    console.log(grupos )

    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla)

    // Crear acordeones para cada divisionName
    for (let division in grupos) {

        let card = plantilla.cloneNode(true);
        contenedor.appendChild(card);

        card.setAttribute("id", "division_"+division);
        let propiedad = document.getElementById("botonRango");
        propiedad.setAttribute("id", "botonRango_"+division);
        propiedad.setAttribute("data-bs-target", "#rangos_" + division)
        propiedad.textContent = division;
        propiedad = document.getElementById("rangos");
        propiedad.setAttribute("id", "rangos_"+division);

        let plantillaRango = document.getElementById("plantillaRango");
        let contenedorRango = plantillaRango.parentNode;
        contenedorRango.removeChild(plantillaRango);

        for(let rango of grupos[division]){

            console.log(rango)

            let cardRango = plantillaRango.cloneNode(true);
            contenedorRango.appendChild(cardRango);

            cardRango.setAttribute("id", "rango_"+rango.tierName);
            let propiedadRango = document.getElementById("imagenRango");
            propiedadRango.setAttribute("id", "imagenRango_"+rango.tierName);
            propiedadRango.setAttribute("src", rango.largeIcon);
            propiedadRango = document.getElementById("nombreRango");
            propiedadRango.setAttribute("id", "nombreRango_"+rango.tierName);
            propiedadRango.textContent = rango.tierName;

        }

    }
}