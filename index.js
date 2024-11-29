document.addEventListener("DOMContentLoaded", () => {
  const videoOverlay = document.getElementById("video-overlay");
  const mainContent = document.getElementById("container");
  const introVideo = document.getElementById("intro-video");
  const navigation = document.querySelector(".navigation");
  const indexDescription = document.querySelector("#index-description");
  const h21 = document.querySelector(".h21");
  const h22 = document.querySelector(".h22");
  const h23 = document.querySelector(".h23");
  const herocard1 = document.querySelector("#herocard1");
  const herocard2 = document.querySelector("#herocard2");
  const herocard3 = document.querySelector("#herocard3");
  const menu = document.querySelector(".menu");
  const menuButton = document.getElementById("hover-item");
  const closeButton = document.getElementById("close-button");

  if (!navigation) {
    console.error("Navigation element not found!");
    return;
  }

  navigation.classList.add("start");

  let lastScrollY = 0;
  let isHidden = false;
  let scrollLogicInitialized = false;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function isHalfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const halfElementHeight = rect.height / 3;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top + halfElementHeight <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY && isHidden) {
      navigation.classList.remove("hide");
      navigation.classList.add("show");
      isHidden = false;
    } else if (currentScrollY > lastScrollY && !isHidden) {
      navigation.classList.remove("show");
      navigation.classList.add("hide");
      isHidden = true;
    }
    if (isElementInViewport(indexDescription)) {
      indexDescription.classList.add("scrolled");
    }
    if (isElementInViewport(h21) && !h21.classList.contains("scrolled")) {
      h21.classList.add("scrolled");

      h21.addEventListener(
        "animationstart",
        () => {
          const h21Duration =
            parseFloat(getComputedStyle(h21).animationDuration) * 1000;

          setTimeout(() => {
            h22.classList.add("scrolled");
          }, h21Duration / 2);

          h22.addEventListener(
            "animationstart",
            () => {
              const h22Duration =
                parseFloat(getComputedStyle(h22).animationDuration) * 1000;

              setTimeout(() => {
                h23.classList.add("scrolled");
              }, h22Duration / 2);
            },
            { once: true }
          );
        },
        { once: true }
      );
    }
    if (
      isHalfElementInViewport(herocard1) &&
      !herocard1.classList.contains("scrolled")
    ) {
      herocard1.classList.add("scrolled");

      herocard1.addEventListener(
        "animationstart",
        () => {
          const herocard1Duration =
            parseFloat(getComputedStyle(herocard1).animationDuration) * 1000;

          setTimeout(() => {
            herocard2.classList.add("scrolled");
          }, herocard1Duration / 4);

          herocard2.addEventListener(
            "animationstart",
            () => {
              const herocard2Duration =
                parseFloat(getComputedStyle(herocard2).animationDuration) *
                1000;

              setTimeout(() => {
                herocard3.classList.add("scrolled");
              }, herocard2Duration / 4);
            },
            { once: true }
          );
        },
        { once: true }
      );
    }

    lastScrollY = currentScrollY;
  };

  introVideo.addEventListener("ended", () => {
    videoOverlay.style.opacity = 0;
    setTimeout(() => {
      videoOverlay.style.display = "none";
      document.body.style.overflow = "auto";

      mainContent.style.display = "block";
      mainContent.style.opacity = 1;

      lastScrollY = window.scrollY;
      scrollLogicInitialized = true;

      window.addEventListener("scroll", () => {
        if (scrollLogicInitialized) handleScroll();
      });
    }, 100);
  });

  menuButton.addEventListener("click", () => {
    menu.classList.add("open");
  });

  closeButton.addEventListener("click", () => {
    menu.classList.remove("open");
    menu.classList.add("close");
    console.log("poasdasd");
  });
  window.addEventListener("scroll", handleScroll);
});
