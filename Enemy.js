class Enemy {
    constructor() {
      this.position = {
        x: Math.random() * canvas.width - 30,
        y: -80,
      };
  
      this.velocity = {
        x: 0,
        y: 1,
      };
  
      this.isCrossedBorder = false;
      this.size = Math.random() * (80 - 30) + 30;
      this.isDead = false;
      const images = ["./images/enemy1.png", "./images/Asteroid1.png"];
      this.image = new Image();
      this.image.src = images[Math.floor(Math.random() * 2)];
      this.explosionSound = new Audio();
      this.explosionSound.src="./sounds/shoot.wav";
    }
  
    draw() {
      c.beginPath();
      c.fillStyle = "red";
      if (this.isDead) this.image.src = "./images/explosion.png";
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
    }
  
    move() {
      this.position.y += this.velocity.y;
    }
    checkBottomCollision() {
      if (this.position.y + this.size >= canvas.height) {
        this.isCrossedBorder = true;
      }
    }
  
    dead() {
      this.velocity.y = 0;
      this.isDead = true;

      this.explosionSound.play();
      setTimeout(() => {
        this.velocity.y = 0;
        this.position.y = -200;
        this.position.x = -200;
        this.isDead = true;
        score++;
      }, 100);
    }
  
    collision(allBullets) {
      for (let i = 0; i < allBullets.length; i++) {
        if (
          this.position.x + this.size >= allBullets[i].position.x &&
          this.position.x <= allBullets[i].position.x + allBullets[i].size &&
          this.position.y + this.size >= allBullets[i].position.y &&
          this.position.y <= allBullets[i].position.y + allBullets[i].size
        ) {
          allBullets[i].isDestroyed = true;
  
          this.dead();
        }
      }
    }
  
    update(playerDead) {
      this.draw();
  
      if (!playerDead) {
        this.move();
        this.checkBottomCollision();
      }
    }
  }