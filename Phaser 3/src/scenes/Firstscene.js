var AMOUNT_DIAMONDS=30;
var AMOUNT_BOOBLES=30;
var SCORE=0;
var DIAMANTES_COGIDOS=0;
var ENDGAME=false;
var COUNTSMILE=-1;

class Firstscene extends Phaser.Scene{
    constructor (){
        super('Firstscene');
    }
    init(){
        /*Variable que nos indica si le hemos
        dado al clic izquierdo del ratón y así
        comenzar el juego */
        this.flagFirstMouseDown=false;
        console.log("init");
    }

    preload(){
        this.load.audio('musicaExplosion', 'assets/sounds/sfxPop.mp3');
        this.load.audio('musica', 'assets/sounds/musicLoop.mp3');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('fishes', 'assets/images/fishes.png')
        this.load.image('mollusk', 'assets/images/mollusk.png');
        this.load.image('shark', 'assets/images/shark.png');
        this.load.image('booble1', 'assets/images/booble1.png');
        this.load.image('booble2', 'assets/images/booble2.png');
        this.load.spritesheet('horse', 'assets/images/horse.png', {frameWidth: 84, frameHeight: 156});
        this.load.spritesheet('diamonds', 'assets/images/diamonds.png', {frameWidth: 81, frameHeight: 84});
        console.log("preload");
    }

    create(){
        // Añadir la música al juego
        this.music=this.sound.add('musica', {loop: true});
        this.background=this.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'background');
        this.boobleArray=[];
        for(var i=0; i<AMOUNT_BOOBLES; i++){
            var xBooble=Phaser.Math.Between(1, 1140);
            var yBooble=Phaser.Math.Between(600, 950);

            var booble=this.add.sprite(xBooble, yBooble, 'booble' + Phaser.Math.Between(1, 2));
            booble.vel=0.2+Phaser.Math.FloatBetween(0, 1)*2;
            booble.alpha=0.9;
            var escalab=0.20+Phaser.Math.FloatBetween(0, 1);
            booble.setScale(escalab);
            this.boobleArray[i]=booble;
        }
        this.fishes=this.add.sprite(100, 550, "fishes");
        this.mollusk=this.add.sprite(500, 150, "mollusk");
        this.shark=this.add.sprite(500, 70, "shark");
        this.horse=this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, "horse", 0);
        this.horse.x=this.sys.game.canvas.width/2;
        this.horse.y=this.sys.game.canvas.height/2;
        this.horse.body.setSize(84, 156); // Configurar el cuerpo de colisión
        this.input.on('pointerdown', this.onTap, this);
        console.log("create");
        // Crea un grupo de físicas para los diamantes
        this.diamonds=this.physics.add.group();
        // Añadiremos también el caballo para que ningún diamante toque al caballo inicialmente
        this.diamonds.add(this.horse);
        for(var i=0; i<AMOUNT_DIAMONDS; i++){
            var diamond=this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'diamonds', Phaser.Math.Between(0, 3));
            
            var escala=0.30 + Phaser.Math.FloatBetween(0, 1);
            diamond.setScale(escala);
            diamond.body.setSize(81, 84);
            
            // Verificar si el nuevo diamante se superpone con los diamantes existentes
            var overlapping=true;
            var safeAttempts=0;
            while(overlapping && safeAttempts < 100){
                diamond.x=Phaser.Math.Between(50, 1050);
                diamond.y=Phaser.Math.Between(50, 600);
                overlapping=this.checkOverlap(diamond);
                safeAttempts++;
            }

            // Agregar el diamante al grupo
            this.diamonds.add(diamond);
        }

        // Definimos el estilo del texto
        var style={
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        // Crea el texto del marcador
        this.scoreText=this.add.text(this.sys.game.canvas.width/2, 10, '0', style);
        this.scoreText.setOrigin(0.5, 0); //Establecer el origen del texto en el centro horizontal
    }

    increaseScore(){
        COUNTSMILE=0;
        this.horse.setFrame(1);
        this.sound.play('musicaExplosion');
        SCORE+=100;
        this.scoreText.text=SCORE;
    }

    shoWinMessage(){
        // Mensaje de victoria
        var style={
            font: 'bold 40pt Arial', 
            fill: '#00FF00', // color verde
            align: 'center'
        };

        var winMessage= this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'BOLETIN APROBAAADOOO!!', style);
        winMessage.setOrigin(0.5);

        /* Cuando acabe el juego haremos que tanto el fondo como el caballo se vuelvan un poco transparentes */
        this.background.setAlpha(0.3);
        this.horse.setAlpha(0.3);
    } 

    update(time, delta){
        if(this.flagFirstMouseDown && ENDGAME==false){
            if(COUNTSMILE>=0){
                COUNTSMILE++;
                if(COUNTSMILE>=50){
                    COUNTSMILE=-1;
                    this.horse.setFrame(0);
                }
            }
            for(var i=0; i<AMOUNT_BOOBLES; i++){
                var booble=this.boobleArray[i];
                booble.y-=booble.vel;
                if(booble.y<-50){
                    booble.y=700;
                    booble.x=Phaser.Math.Between(1, 1140);
                }
            }

            this.fishes.x+=0.3;
            if(this.fishes.x>1300){
                this.fishes.x=-300;
            }
            this.mollusk.y-=0.5;
            if(this.mollusk.y<0){
                this.mollusk.y=600;
            }
            this.shark.x--;
            if(this.shark.x<-300){
                this.shark.x=1300;
            }
           var pointerX=this.input.x;
           var pointerY=this.input.y;
           var distX=pointerX-this.horse.x;
           var distY=pointerY-this.horse.y;
           // El modificador de 0.02 lo usaremos para la velocidad del caballo
           this.horse.x += distX*0.02;
           this.horse.y += distY*0.02;

           // Condición para que el caballo mire donde esté nuestro cursor
           if(distX>0){
            this.horse.setFlip(false, false); // Sin inversion horizontal, ni vertical
           }else{
            this.horse.setFlip(true, false); // Invertir horizontalmente
            this.horse.body.setSize(84, 156); // Ajustar el cuerpo de colisión
           }

           // Verificar colisiones y eliminar diamantes
           this.diamonds.children.iterate(function(diamond){
            if(diamond instanceof Phaser.GameObjects.Sprite){
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.horse.getBounds(), diamond.getBounds())){
                    if(diamond !== this.horse){     // Evitar que el caballo se elimine
                        diamond.destroy();          // Eliminar el diamante
                        SCORE+=100;
                        this.increaseScore();
                        DIAMANTES_COGIDOS++;
                        if(DIAMANTES_COGIDOS==AMOUNT_DIAMONDS){
                            this.shoWinMessage();
                            ENDGAME=true;
                            this.music.stop(); // Paramos la música en bucle
                        }
                    }
                }
            }
           }, this);
           console.log("update"); 
        }
    }

    // CUSTOM FUNCTIONS
    onTap(){
        if(this.flagFirstMouseDown==false){
            this.flagFirstMouseDown=true;
            this.music.play(); // Reproducir la música en bucle
        }
    }

    checkOverlap(sprite){
        var overlapping=false;
        this.diamonds.children.iterate(function(diamond){
            if(Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), diamond.getBounds())){
                overlapping=true;
            }
        });
        return overlapping;
    }
}
export default Firstscene;