
export function modalInitializer(userProfile, modal) {
    document.getElementById("orange-egg").addEventListener("click", () => {
      userProfile.egg = "orange";
      userProfile.choice = true;
      modal.style.display = "none";
    });

    document.getElementById("purple-egg").addEventListener("click", () => {
      userProfile.egg = "purple";
      userProfile.choice = true;
      modal.style.display = "none";
    });

    document.getElementById("green-egg").addEventListener("click", () => {
      userProfile.egg = "green";
      userProfile.choice = true;
      modal.style.display = "none";
    });
  }

export default modalInitializer