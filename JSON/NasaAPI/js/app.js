// Clave de API y URL base de la NASA
const apiKey = "8jGcEJ63OmU0EMLmwChSDkpNV9tzbMDXgkg9rcVk";
const apiUrl = "https://api.nasa.gov/planetary/apod";

// Elementos del DOM
const filtersForm = document.getElementById("filters");
const content = document.getElementById("content");

// Escuchar el evento de envío del formulario de filtros
filtersForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    const date = document.getElementById("date").value; // Obtener valor del filtro de fecha

    // Construir la URL dinámica según el filtro
    let url = `${apiUrl}?api_key=${apiKey}`;
    if (date) {
        url += `&date=${date}`; // Buscar una imagen específica por fecha
    } else {
        url += `&count=10`; // Obtener 10 imágenes aleatorias
    }

    // Llamada a la API
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderCards(data); // Renderizar tarjetas con los datos obtenidos
    } catch (error) {
        console.error("Error fetching data from NASA API:", error);
    }
});

// Función para renderizar las tarjetas en el DOM
function renderCards(data) {
    content.innerHTML = ""; // Limpiar contenido previo

    const items = Array.isArray(data) ? data : [data];

    items.forEach((item) => {
        let mediaContent;

        // Mostrar el contenido dependiendo del tipo de media
        if (item.media_type === "image") {
            mediaContent = `<img src="${item.url}" alt="${item.title}" class="card-header">`;
        } else if (item.media_type === "video") {
            mediaContent = `<iframe src="${item.url}" frameborder="0" allowfullscreen class="card-header"></iframe>`;
        } else {
            mediaContent = `<p>No se puede mostrar este tipo de contenido: ${item.media_type}</p>`;
        }

        const card = `
            <article class="card">
                ${mediaContent}
                <div class="card-body">
                    <h1 class="card-body-title">${item.title}</h1>
                    <p class="card-body-text">${item.date}</p>
                    <p>${item.explanation}</p>
                </div>
            </article>
        `;
        content.innerHTML += card;
    });
}