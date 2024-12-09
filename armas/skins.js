const id = new URL(window.location).searchParams.get("id");
console.log(id);
const apiUrl = `https://valorant-api.com/v1/weapons/${id}`; // Usar directamente la URL con el id

fetch(apiUrl)
  .then(response => response.json())
  .then(jsondata => {
    procesarJSONSkins(jsondata);
    inicializarFiltro(jsondata);
  })
  .catch(e => { console.log(e); });

  function procesarJSONSkins(jsondata) {
    let plantilla = document.getElementById("plantillaArmas");
    if (!plantilla) {
        console.error("El elemento con id 'plantillaArmas' no está presente en el DOM.");
        return;
    }

    let contenedor = plantilla.parentElement;
    contenedor.removeChild(plantilla);

    const skins = jsondata.data.skins;
    console.log(skins);

    for (let skin of skins) {
        if (skin.displayName !== "Random Favorite Skin") {
            let card = plantilla.cloneNode(true);
            contenedor.appendChild(card);

            let propiedad = card.querySelector("#imagen");
            if (propiedad) {
                propiedad.setAttribute("src", skin.chromas[0].fullRender);
            }

            propiedad = card.querySelector("#nombreArma");
            if (propiedad) {
                propiedad.textContent = skin.displayName;
            }
        }
    }
}
function inicializarFiltro(jsondata) {
  const select = document.getElementById("type");
  const plantilla = document.getElementById("plantillaArmas");
  if (!plantilla) {
      console.error("El elemento 'plantillaArmas' no está disponible para clonar.");
      return;
  }

  select.addEventListener("change", function () {
      const valorSeleccionado = this.value;
      const skins = jsondata.data.skins;

      let contenedor = document.querySelector(".row.justify-content-center.m-4");
      contenedor.innerHTML = ""; // Limpiar contenido actual

      // Filtrar las skins que coincidan con el valor seleccionado
      const skinsFiltradas = skins.filter(skin =>
          valorSeleccionado === "all" || skin.contentTierUuid === valorSeleccionado
      );

      if (skinsFiltradas.length === 0) {
          // Mostrar mensaje si no hay resultados
          const mensaje = document.createElement("p");
          mensaje.textContent = "No existe ninguna skin de este arma que sea de esta rareza.";
          mensaje.classList.add("text-center", "text-danger", "mt-4"); // Clases para estilo opcional
          contenedor.appendChild(mensaje);
      } else {
          // Mostrar las skins filtradas
          for (let skin of skinsFiltradas) {
              let card = plantilla.cloneNode(true);
              card.style.display = "block"; // Asegurarse de que sea visible
              contenedor.appendChild(card);

              let propiedad = card.querySelector("#imagen");
              if (propiedad) {
                  propiedad.setAttribute("src", skin.chromas[0].fullRender);
              }

              propiedad = card.querySelector("#nombreArma");
              if (propiedad) {
                  propiedad.textContent = skin.displayName;
              }
          }
      }
  });
}

