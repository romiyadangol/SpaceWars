class Player {
    constructor() {
        this.position = {
            x: canvas.width / 2.8,
            y: canvas.height / 1.2,
        };

        this.velocity = { 
            x: 0,
            y: 0,
        };

        this.isDead = false;
        this.size = 80;
        this.image = new Image();
        this.image.src = "./images/spaceship.png";
        
    }

    draw() {
        c.beginPath();
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update(){
        this.draw();
        if(!this.isDead) {
            this.move();
        }
    }

    collision(enemies) {
        for(let i =0; i<enemies.length; i++) {
            if ( 
                this.position.x + this.size >= enemies[i].position.x && 
                this.position.x <= enemies[i].position.x + enemies[i].size && 
                this.position.y + this.size >= enemies[i].position.y && 
                this.position.y <= enemies[i].position.y + enemies[i].size 
            ) {
                this.velocity.y = 0;
                this.velocity.x = 0;
                this.isDead = true;
            }
        }
    }
}