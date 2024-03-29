import { modalInitializer } from "./eggModal.js";
import { userProfileUpdate } from "./profileUpdates.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    //on load do some stuff
    const eggStartModal = document.getElementById("modal-start");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const bg = new Image();

    //! need to change to class and move from global scope
    let userProfile = {
      choice: false,
      egg: "green",
      sprite: {},
      startTime: Number,
      endTime: Number,
      timeLapse: Number,
      food: 0,
      poop: 0,
      play: 0,
      sleep: 0,
      sick: 0,
    };

    img.src = `assets/slime/hop-slime-${userProfile.egg}.png`;
    bg.src = "assets/backgrounds/moss-floor.png";

    //? saves profile to storage
    const saveProfile = async () => {
      await chrome.storage.local.set({ userProfile: userProfile }, () => {
        console.log("profile saved");
      });
    };

    //? gets saved profile from storage and syncs profile to it
    const syncProfile = async () => {
      await chrome.storage.local.get("userProfile", (result) => {
        if (Object.keys(result).length === 0) {
          saveStartTime();
        } else {
          userProfile = result.userProfile;
          console.log(userProfile);
        }
      });
    };

    //? create new start time and save to storage
    const saveStartTime = () => {
      userProfile.startTime = Date.now();
      saveProfile();
      console.log("new startTime created and stored");
    };

    //? compare old startTime with endTime
    const getLapsedTime = () => {
      let endTime = Date.now();
      userProfile.timeLapse = endTime - userProfile.startTime;
    };

    const preLoad = async () => {
      await syncProfile();
      //! runtime bug with timeLapse uncomment below then inspect userProfile.timeLapse
      // await syncProfile();
      setTimeout(() => {
        window.requestAnimationFrame(init);
      }, 1000);
    };

    preLoad();
    ctx.globalCompositeOperation = "source-over";

    //#--------------------------------- ASSET  SETTINGS -----------------------------------------
    //! need to make a sprite class and remove these from global scope
    let slimeSprite = {
      spriteSheet: img,
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
      spriteStatus: 99,
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

    //#--------------------------------- SPRITE UPDATE --------------------------------------

    const updateSprite = (spriteObj) => {
      spriteObj.frameIndex = ++spriteObj.frameIndex % spriteObj.frameCount; // rotate frame index
      //------- animation move back and forth on canvas
      spriteObj.canvasLocationX += spriteObj.dx * spriteObj.speed;
      if (spriteObj.canvasLocationX < 1 || spriteObj.canvasLocationX > 400) {
        spriteObj.dx *= -1;
        spriteObj.spriteStatus *= -1; //change status to change src
      }
      //------------------------------------------------------
      if (spriteObj.spriteStatus === -1) {
        img.src = `assets/slime/atk-slime-${userProfile.egg}.png`;
        spriteObj.spriteStatus *= -1;
      }

      // exception for initial render img src
      if (spriteObj.spriteStatus === 99) {
        if (userProfile.choice === false) {
          spriteObj.speed = 0;
        }
        if (userProfile.choice) {
          img.src = `assets/slime/hop-slime-${userProfile.egg}.png`;
          spriteObj.speed = 4;
          spriteObj.spriteStatus = 1;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas to prepare for next render
    };

    const render = (bgObj, spriteObj) => {
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

      ctx.drawImage(
        spriteObj.spriteSheet,
        (spriteObj.frameIndex * spriteObj.spriteLocationX) /
          spriteObj.frameCount,
        spriteObj.spriteLocationY,
        spriteObj.spriteWidth,
        spriteObj.spriteHeight,
        spriteObj.canvasLocationX,
        spriteObj.canvasLocationY,
        spriteObj.scaleX,
        spriteObj.scaleY
      );
    };

    //#--------------------------------- GAME LOOP -----------------------------------------
    function init() {
      updateSprite(userProfile.sprite);
      getLapsedTime();
      userProfileUpdate(
        userProfile,
        slimeSprite,
        modalInitializer,
        eggStartModal,
        saveStartTime
      );
      render(bgObj, userProfile.sprite); //renders bg and sprite
      //continue animation loop
      setTimeout(() => {
        requestAnimationFrame(init);
      }, 100);
    }
  },
  false
);
