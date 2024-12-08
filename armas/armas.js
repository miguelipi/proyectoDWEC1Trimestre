

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
        if(arma.shopData == null){
            propiedadArma.textContent = arma.displayName
        }else{
            propiedadArma.textContent = arma.shopData.category;
        }
        propiedadArma = document.getElementById("enlace");
        propiedadArma.setAttribute("id", "enlace"+arma.uuid);
        propiedadArma.setAttribute("href", "skin.html?id="+arma.uuid);

    }

}
document.getElementById("type").addEventListener("change", function() {
    const selectedCategory = this.value; // Obtiene el valor seleccionado
    const armas = document.querySelectorAll("[id^='arma']"); // Selecciona todas las armas

    armas.forEach(arma => {
        const category = arma.querySelector("[id^='typeArma']").textContent.trim(); // Categoría del arma
        if (selectedCategory === "all" || category === selectedCategory) {
            arma.style.display = ""; // Muestra el arma
        } else {
            arma.style.display = "none"; // Oculta el arma
        }
    });
});


