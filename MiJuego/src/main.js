// IMPORTAR LA PRIMERA ESCENA
import Firstscene from "./scenes/Firstscene.js";

const config={

    // OPCIONALES
    title: "Adventure time: Piñazos time",
    url: "http://joaquinelpangolin.tech",
    version: "0.0.1",
    
    // OPCIONAL
    pixelArt: true, // REMARCAR LOS PIXELES DE LAS IMAGENES

    // OBLIGATORIO
    type: Phaser.AUTO, // WEBGL O CANVAS O AUTOMÁTICO
    width: 1000, // TAMAÑO DEL LIENZO
    height: 400,
    parent: "container", // ID DEL CONTENEDOR
    backgroundColor: "#34495E", // FONDO DEL LIENZO

    // INFORMACIÓN DE LA CONSOLA
    banner: {
        hidePhaser: true, // OCULTAR TEXTO DE PHASER EN CONSOLA
        text: "#000000", // CAMBIAR COLOR DEL TEXTO DEL TÍTULO DEL JUEGO EN CONSOLA

        // PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            "red", 
            "#22a6f2",
            "green",
            "transparent"
        ]
    },

    // Físicas
    physics: {
        default: "arcade",
        arcade: {
            //gravity: {y: 300},
            debug: false
        }
    },

    // Escenas del juego
    scene: [Firstscene]
};

// CREAR LA INSTANCIA DEL JUEGO
const game=new Phaser.Game(config);