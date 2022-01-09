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
    if (userProfile.timeLapse > 200000) {
      saveStartTime();
    }

  // checkPoop(userProfile)
  checkOne(userProfile, slimeSprite, modalInitializer, eggStartModal);
  // setProfile(userProfile);
};
