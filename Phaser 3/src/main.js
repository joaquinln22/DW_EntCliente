// IMPORTAR LA PRIMERA ESCENA
import Firstscene from './scenes/Firstscene.js';

const config={
    // Opcionales
    title: 'Título luego',
    url: 'ces-vegamedia.', 
    version:'0.0',

    pixelArt: true, // Remarcar los pixeles de las imágenes

    // OBLIGATORIO
    type: Phaser.AUTO, // WEBGL O CANVAS O AUTOMÁTICO
    backgroundColor: '#344495', // FONDO DEL LIENZO.
    
    physics: {
        default: 'arcade',  // Motor de físicas por defecto (en este caso Arcade)
        arcade: {
            gravity:{       // Configurar la gravedad si es necesario
                y:0, 
            },
            debug: false     // Activa o desactiva el modo de depuración de físicas
        }
    },

    scale: {
        width: 1136, // TAMAÑO DEL LIENZO 
        height: 640,
        parent: 'container', // ID DEL CONTENEDOR
        mode: Phaser. Scale. FIT, // ID DEL CONTENEDOR
        autocenter: Phaser.Scale.CENTER_HORIZONTALY
    },
    scene:[Firstscene]
};

// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);