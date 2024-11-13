class Firstscene extends Phaser.Scene{
    constructor(){
        super("Firstscene");
    }

    init(){
        console.log("Scene Firstscene");

        // Inicializamos la variable respawn
        this.respawn = 0;
        this.score = 0;
        this.kills = 0;
        this.kills2 = 0;
        this.scoreText = "";
        this.killsText = "";
        this.kills2Text = "";
    }

    preload(){
        // Sprites, imagenes, fondo, etc
        this.load.spritesheet("Idle", "assets/PinkMan/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("Run", "assets/PinkMan/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("Idle2", "assets/NinjaFrog/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("Run2", "assets/NinjaFrog/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("ToxicFrog", "assets/ToxicFrog/BlueBrown/ToxicFrogBlueBrown_Hop.png", {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet("Bat", "assets/Bat/bat.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("SpikeHead", "assets/SpikeHead/spikehead.png", {frameWidth: 54, frameHeight: 52});
        this.load.image("lifeicon", "assets/Icons/lifeicon.png");
        this.load.image("bullet", "assets/Fruits/PineappleBullet.png");
        this.load.image("bullet2", "assets/Fruits/BananasBullet.png");
        this.load.image("evilbullet", "assets/EvilBullet/Spike.png");
        this.load.image("background", "assets/Background/fondo.png");

        // Audio
        this.load.audio("shot", ["assets/Audio/shot.wav"])
        this.load.audio("evilshot", ["assets/Audio/evilshot.wav"])
        this.load.audio("killed", ["assets/Audio/killed.mp3"])
        this.load.audio("wasted", ["assets/Audio/wasted.mp3"])
        this.load.audio("bgmusic", ["assets/Audio/bgmusic.mp3"]);
    }

    create(){
        // TEXTS
        this.scoreText = this.add.text(this.sys.game.canvas.width / 2, 0, 'SCORE: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#000000' });
        this.scoreText.setDepth(1);
        this.killsText = this.add.text(50, 10, 'Kills Player 1: ' + this.kills, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'white' });
        this.killsText.setDepth(1);
        this.kills2Text = this.add.text(this.sys.game.canvas.width - 180, 10, 'Kills Player 2: ' + this.kills2, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'white' });
        this.kills2Text.setDepth(1);

        // Creación del fondo
        this.background = this.add.image(this.sys.game.canvas.width/2,
        this.sys.game.canvas.height/2, 'background');

        // Iconos
        this.lifeSprite = this.add.image(30, 20, 'lifeicon').setDepth(1);
        this.lifeSprite = this.add.image(800, 20, 'lifeicon').setDepth(1);

        //Creamos los controles 
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireKeyPlayer1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.leftKeyPlayer2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKeyPlayer2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.fireKeyPlayer2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Creamos los personajes le añadimos físicas.
        this.player = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height-0, "Idle");
        this.player2 = this.physics.add.sprite(this.sys.game.canvas.width/2+50, this.sys.game.canvas.height-0, "Idle2");
        // Hacemos que en las caídas tenga un pequeño rebote
        this.player.setBounce(0.2);
        this.player2.setBounce(0.2);
        // Hitbox de los jugadores
        this.player.setSize(20, 27);
        this.player.setOffset(7, 5);
        this.player2.setSize(20, 27);
        this.player2.setOffset(7, 5);
        // El personaje colisionará con los bordes del juego
        this.player.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);

        //GROUPS
        // Creamos el sprite del proyectil con un grupo ya que se va a repetir
        this.bullets=this.physics.add.group({
            defaultKey: "bullet",
            // maxSize: 1000
        });
        this.bullets2=this.physics.add.group({
            defaultKey: "bullet2",
            // maxSize: 1000
        });
        this.evilbullets=this.physics.add.group({
            defaultKey: "evilbullet",
        });

        // Creamos el sprite del enemigo con un grupo ya que se van a generar varios
        this.enemys = this.physics.add.group({
            defaultKey: "ToxicFrog"
        });
        this.enemys2 = this.physics.add.group({
            defaultKey: "Bat"
        });
        this.enemys3 = this.physics.add.group({
            defaultKey: "SpikeHead"
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("Run", {start:0, end:11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "static",
            frames: this.anims.generateFrameNumbers("Idle", {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("Run", {start: 0, end: 11}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "left2",
            frames: this.anims.generateFrameNumbers("Run2", {start:0, end:11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "static2",
            frames: this.anims.generateFrameNumbers("Idle2", {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "right2",
            frames: this.anims.generateFrameNumbers("Run2", {start: 0, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "hop",
            frames: this.anims.generateFrameNumbers("ToxicFrog", { start: 0, end: 6 }),
            frameRate: 1.5,
            repeat: -1
        });
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("Bat", { start: 0, end: 3 }),
            frameRate: 1.5,
            repeat: -1
        });
        this.anims.create({
            key: "spike",
            frames: this.anims.generateFrameNumbers("SpikeHead", { start: 0, end: 3 }),
            frameRate: 1.5,
            repeat: -1
        });
        
        // Colisiones entre enemigos, balas, items y jugadores
        this.physics.add.collider(this.player, this.enemys, this.hitPlayer, null, this);
        this.physics.add.collider(this.player, this.enemys2, this.hitPlayer, null, this);
        this.physics.add.collider(this.player, this.enemys3, this.hitPlayer, null, this);
        this.physics.add.collider(this.player2, this.enemys, this.hitPlayer2, null, this);
        this.physics.add.collider(this.player2, this.enemys2, this.hitPlayer2, null, this);
        this.physics.add.collider(this.player2, this.enemys3, this.hitPlayer2, null, this);
        this.physics.add.collider(this.bullets, this.enemys, this.hitEnemy, null, this);
        this.physics.add.collider(this.bullets, this.enemys2, this.hitEnemy, null, this);
        this.physics.add.collider(this.bullets, this.enemys3, this.hitEnemy, null, this);
        this.physics.add.collider(this.bullets2, this.enemys, this.hitEnemy2, null, this);
        this.physics.add.collider(this.bullets2, this.enemys2, this.hitEnemy2, null, this);
        this.physics.add.collider(this.bullets2, this.enemys3, this.hitEnemy2, null, this);
        this.physics.add.collider(this.player, this.evilbullets, this.hitPlayer, null, this);
        this.physics.add.collider(this.player2, this.evilbullets, this.hitPlayer2, null, this);

        // Efectos de sonido
        this.shotSound = this.sound.add('shot');
        this.evilshotSound = this.sound.add('evilshot');
        this.killedSound = this.sound.add('killed');
        this.wastedSound = this.sound.add('wasted');

        // Musica de fondo
        this.backgroundMusic = this.sound.add("bgmusic");
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    // Funciones de disparo
    fire(object){ // Jugador 1
        var bullet=this.bullets.get(object.x, object.y-30);
        if(bullet){
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y=-200;
            bullet.setSize(15, 15);
            bullet.setOffset(9, 8);
            this.shotSound.play();
            
            // Aseguramos que la bala comienza desde 0 grados
            bullet.angle=0;
            // Tween para hacer rotar la bala
            this.tweens.add({
                targets: bullet,
                angle: 360, // Rotar 360 grados
                duration: 1000, // Duración infinita
                ease: 'Linear',
                repeat: -1 // Repetir indefinidamente 
            });
        }
        bullet.outOfBoundsKill=true;
    }
    fire2(object){ // Disparo de jugador 2
        var bullet2=this.bullets2.get(object.x, object.y-30);
        if(bullet2){
            bullet2.setActive(true);
            bullet2.setVisible(true);
            bullet2.body.velocity.y=-200;
            bullet2.setSize(15, 15);
            bullet2.setOffset(9, 8);
            this.shotSound.play();
            
            // Aseguramos que la bala comienza desde 0 grados
            bullet2.angle=0;
            // Tween para hacer rotar la bala
            this.tweens.add({
                targets: bullet2,
                angle: 360, // Rotar 360 grados
                duration: 1000, // Duración infinita
                ease: 'Linear',
                repeat: -1 // Repetir indefinidamente 
            });
        }
        bullet2.outOfBoundsKill=true;
    }

    fire3(object){ // Disparo de enemigo
        var evilbullet=this.evilbullets.get(object.x, object.y-30);
        if(evilbullet){
            evilbullet.setActive(true);
            evilbullet.setVisible(true);
            evilbullet.body.velocity.y=-200;
            evilbullet.setSize(15, 15);
            evilbullet.setOffset(9, 8);
        }
        evilbullet.outOfBoundsKill=true;
    }

    // Enemigos
    newEnemy() {
        var oneEnemy= this.enemys.get(Phaser.Math.Between(0, this.game.canvas.width), 20);
        if (oneEnemy) {
            oneEnemy.setActive(true)
                   .setVisible(true)
                   .setGravityY(300)
                   .setCollideWorldBounds(true)
                   .setCircle(11, 11, 13) //Alineamos la hitbox y establecemos su tamaño
                   .setBounce(1, 1)
                   .setVelocityX((Phaser.Math.Between(0, 1) ? 100 : -100));
            oneEnemy.anims.play("hop");
        }
    }
    newEnemy2() {
        var oneEnemy= this.enemys2.get(Phaser.Math.Between(0, this.game.canvas.width), 100);
        if (oneEnemy) {
            oneEnemy.setActive(true)
                   .setVisible(true)
                   .setGravityY(0)
                   .setCollideWorldBounds(true)
                   .setCircle(10, 6, 13) //Alineamos la hitbox y establecemos su tamaño
                   .setBounce(1, 1)
                   .setVelocityX((Phaser.Math.Between(0, 1) ? 100 : -100));
            oneEnemy.anims.play("fly");

            // Crear un tiempo aleatorio para que el enemigo se detenga
            let randomTime = Phaser.Math.Between(1000, 6000); // Entre 1 y 3 segundos
            // Después de ese tiempo, detener el movimiento horizontal y aplicar la gravedad
            this.time.delayedCall(randomTime, () => {
                oneEnemy.setVelocityX(0); // Detiene el movimiento horizontal

                // Crear el proyectil en la posición actual del enemigo
                var evilbullet = this.evilbullets.get(oneEnemy.x, oneEnemy.y);
                if (evilbullet) {
                    evilbullet.setActive(true)
                            .setVisible(true)
                            .setGravityY(300) // Aplica gravedad para que caiga en vertical
                            .setVelocityY(200);
                }
                oneEnemy.destroy();
            });
        }
    }
    newEnemy3() {
        var oneEnemy= this.enemys3.get(Phaser.Math.Between(0, this.game.canvas.width), 50);
        if (oneEnemy) {
            oneEnemy.setActive(true)
                   .setVisible(true)
                   .setGravityY(0)
                   .setCollideWorldBounds(true)
                   .setCircle(20, 7, 10) //Alineamos la hitbox y establecemos su tamaño
                   .setBounce(1, 1)
                   .setVelocityX((Phaser.Math.Between(0, 1) ? 100 : -100));
            oneEnemy.anims.play("spike");

            // Crear un tiempo aleatorio para que el enemigo se detenga
            let randomTime = Phaser.Math.Between(1000, 4000); // Entre 1 y 3 segundos

            // Después de ese tiempo, detener el movimiento horizontal y aplicar la gravedad
            this.time.delayedCall(randomTime, () => {
                oneEnemy.setVelocityX(0); // Detiene el movimiento horizontal
                oneEnemy.setGravityY(300); // Aplica gravedad para que caiga en vertical
            });
        }
    }

    hitPlayer(player, enemy) {
        this.wastedSound.play();
        this.backgroundMusic.stop();
        alert("GAME OVER");
        this.enemys.clear(true, true); // clear( [removeFromScene] [, destroyChild])
        this.enemys2.clear(true, true);
        this.enemys3.clear(true, true);
        this.bullets.clear(true, true);
        this.evilbullets.clear(true, true);
        this.scene.pause();
    }

    hitPlayer2(player2, enemy) {
        this.wastedSound.play();
        this.backgroundMusic.stop();
        alert("GAME OVER");
        this.enemys.clear(true, true); // clear( [removeFromScene] [, destroyChild])
        this.enemys2.clear(true, true);
        this.enemys3.clear(true, true);
        this.bullets.clear(true, true);
        this.evilbullets.clear(true, true);
        this.scene.pause(); 
    }

    hitPlayerWithEvilbullet(player, evilbullet) {
        this.evilshotSound.play();
        this.wastedSound.play();
        this.backgroundMusic.stop();
    }

    hitPlayer2WithEvilbullet(player2, evilbullet) {
        this.evilshotSound.play();
        this.wastedSound.play();
        this.backgroundMusic.stop();
    }
    
    hitEnemy(bullet, enemy) {
        enemy.destroy();
        this.score+=10;
        this.scoreText.setText('SCORE: ' + this.score);

        this.kills++;
        this.killsText.setText('Kills Player 1: '+this.kills);
        bullet.destroy();
        this.killedSound.play(); 
        
    }

    hitEnemy2(bullet2, enemy) {
        enemy.destroy();
        this.score+=10;
        this.scoreText.setText('SCORE: ' + this.score);
        
        this.kills2++;
        this.kills2Text.setText('Kills Player 2: '+this.kills2);
        bullet2.destroy();
        this.killedSound.play(); 
        
    }

    update(time, delta){
        if (Phaser.Input.Keyboard.JustDown(this.fireKeyPlayer1)) {
            this.fire(this.player);
        } else if (this.cursors.left.isDown) {
            this.player.flipX = true;
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.flipX = false;
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("static", true);
        }
                // Movimiento y disparo de Player 2
                if (Phaser.Input.Keyboard.JustDown(this.fireKeyPlayer2)) {
                    this.fire2(this.player2);
                } else if (this.leftKeyPlayer2.isDown) {
                    this.player2.flipX = true;
                    this.player2.setVelocityX(-160);
                    this.player2.anims.play("left2", true);
                } else if (this.rightKeyPlayer2.isDown) {
                    this.player2.flipX = false;
                    this.player2.setVelocityX(160);
                    this.player2.anims.play("right2", true);
                } else {
                    this.player2.setVelocityX(0);
                    this.player2.anims.play("static2", true);
                }

        if (time > this.respawn) {
            this.newEnemy();
            this.newEnemy2();
            this.newEnemy3();
            this.respawn= time+3000;
        }
    }
}

export default Firstscene;