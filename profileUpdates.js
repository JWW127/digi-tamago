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
  eggStartModal
) => {
  // get userProfile from storage
  // userProfile = saved.userProfile
  // get time lapsed
  // update sprite for time lapse events
  // create new start time
  // if(Object.keys(userProfile.sprite).length === 0) {
  // }

  checkOne(userProfile, slimeSprite, modalInitializer, eggStartModal);
};
