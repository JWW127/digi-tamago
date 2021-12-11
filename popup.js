document.addEventListener(
  "DOMContentLoaded",
  function () {
    //on load do some stuff

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "assets/slime/atk-slime.png";
    const bg = new Image();
    bg.src = "assets/backgrounds/moss-floor.png";
    window.requestAnimationFrame(init);
    ctx.globalCompositeOperation = 'source-over'
    
    let slimeSprite = {
      spriteSheet: img,
      spriteStatus: 1,
      spriteLocationX: 512,
      spriteLocationY: 10,
      spriteWidth: 64,
      spriteHeight: 64,
      canvasLocationX: 0,
      canvasLocationY: 25,
      scaleX: 120,
      scaleY: 120,
      frameIndex: 0,
      frameCount: 8,
      speed: 4,
      dx: 1,
      dy: 1,
    };

    let bgObj = {
      spriteSheet: bg,
      spriteStatus: 1,
      spriteLocationX: 0,
      spriteLocationY: 0,
      spriteWidth: 755,
      spriteHeight: 120,
      canvasLocationX: -25,
      canvasLocationY: 50,
      scaleX: 650,
      scaleY: 65,
      frameIndex: 0,
      frameCount: 0,
      speed: 0,
      dx: 0,
      dy: 0,
    };

    function updateSprite(spriteObj) {
      spriteObj.frameIndex = ++spriteObj.frameIndex % spriteObj.frameCount; // rotate frame index
      //------- animation move back and forth on canvas
      spriteObj.canvasLocationX += spriteObj.dx * spriteObj.speed;
      if (spriteObj.canvasLocationX < 1 || spriteObj.canvasLocationX > 400) {
        spriteObj.dx *= -1;
        spriteObj.spriteStatus *= -1; //change status to change src
      }
      //------------------------------------------------------
      if (spriteObj.spriteStatus === -1) {
        img.src = "assets/slime/hop-slime.png";
        spriteObj.spriteStatus *= -1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height); //wipe entire canvas
    }

    //changes spriteSheet src onClick
    document.getElementById("food").addEventListener("click", () => {
      img.src = "assets/slime/atk-slime.png";
    });

    function initialSprite(spriteObj) {
      ctx.drawImage(spriteObj.spriteSheet,
        (spriteObj.frameIndex * spriteObj.spriteLocationX) / 8,
        spriteObj.spriteLocationY,
        spriteObj.spriteWidth,
        spriteObj.spriteHeight,
        spriteObj.canvasLocationX,
        spriteObj.canvasLocationY,
        spriteObj.scaleX,
        spriteObj.scaleY)
    }

    function init() {
      updateSprite(slimeSprite);
      ctx.drawImage(
        bgObj.spriteSheet,
        bgObj.spriteLocationX,
        bgObj.spriteLocationY,
        bgObj.spriteWidth,
        bgObj.spriteHeight,
        bgObj.canvasLocationX,
        bgObj.canvasLocationY,
        bgObj.scaleX,
        bgObj.scaleY
      );
      initialSprite(slimeSprite)

      setTimeout(() => {
        requestAnimationFrame(init);
      }, 100);
      // requestAnimationFrame(init)
    }
  },
  false
);
