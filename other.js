document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const menuButton = document.getElementById("hover-item");
  const closeButton = document.getElementById("close-button");
  const navigation = document.querySelector(".navigation");
  const herocards = document.querySelectorAll(".herocard");
  const links = document.querySelectorAll("a.delayed-link");
  let contents = document.querySelectorAll(".disapear");

  if (!navigation) {
    console.error("Navigation element not found!");
    return;
  }
  navigation.classList.add("start");
  let lastScrollY = 0;
  let isHidden = false;

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;

    return (
      rect.top + elementHeight * 0.1 >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const addScrolledClass = () => {
    let baseDelay = 0;

    herocards.forEach((card) => {
      if (isInViewport(card) && !card.classList.contains("scrolled")) {
        const rect = card.getBoundingClientRect();
        const delay = baseDelay + rect.left * 0.01;

        setTimeout(() => {
          card.classList.add("scrolled");
        }, delay);

        baseDelay += Math.random(300);
      }
    });
  };

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

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", addScrolledClass);

  menuButton.addEventListener("click", () => {
    menu.classList.add("open");
    menu.classList.remove("close");
    menuButton.classList.add("remove");
    menuButton.classList.remove("add");
  });

  closeButton.addEventListener("click", () => {
    menu.classList.remove("open");
    menu.classList.add("close");
    menuButton.classList.add("add");
    menuButton.classList.remove("remove");
  });

  addScrolledClass();

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetUrl = this.getAttribute("href");
      if (menu.classList.contains("open")) {
        menu.classList.add("close");
        menuButton.classList.add("add");
        menuButton.classList.remove("remove");
      }
      if (navigation.classList.contains("hide")) {
        navigation.classList.add("show");
      }
      contents.forEach((content) => {
        content.classList.add("fade");
      });

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
});
