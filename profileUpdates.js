export const checkOne = (
  userProfile,
  slimeSprite,
  modalInitializer,
  eggStartModal
) => {
  if (!userProfile.choice) {
    userProfile.sprite = slimeSprite;
    modalInitializer(userProfile, eggStartModal);
  } else {
    eggStartModal.style.display = "none";
  }
};


export const userProfileUpdate = (
  userProfile,
  slimeSprite,
  modalInitializer,
  eggStartModal,
  saveStartTime
  
) => {
  setTimeout(() => {
    if(userProfile.timeLapse > 200000){
      saveStartTime()
    }
  }, 5000)
  
  // checkPoop(userProfile)
  checkOne(userProfile, slimeSprite, modalInitializer, eggStartModal);
  // setProfile(userProfile);
};
