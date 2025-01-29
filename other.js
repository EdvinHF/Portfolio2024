document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const menuButton = document.getElementById("hover-item");
  const closeButton = document.getElementById("close-button");
  const navigation = document.querySelector(".navigation");
  const herocards = document.querySelectorAll(".herocard");
  const links = document.querySelectorAll("a.delayed-link");
  let contents = document.querySelectorAll(".disapear");
  const listButton = document.querySelector(".fields-header");
  const designList = document.querySelector(".design-list");
  const plus = document.querySelector(".plus");
  let designOpen = false;
  const listButton2 = document.querySelector(".fields-header2");
  const designList2 = document.querySelector(".design-list2");
  const plus2 = document.querySelector(".plus2");
  let designOpen2 = false;

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

    if (currentScrollY <= 100) {
      navigation.classList.remove("hide");
      navigation.classList.add("show");
      isHidden = false;
    } else if (currentScrollY > lastScrollY && !isHidden) {
      // Hide navigation when scrolling down
      navigation.classList.remove("show");
      navigation.classList.add("hide");
      isHidden = true;
    } else if (currentScrollY < lastScrollY && isHidden) {
      // Show navigation when scrolling up
      navigation.classList.remove("hide");
      navigation.classList.add("show");
      isHidden = false;
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

  listButton.addEventListener("click", () => {
    if (!designOpen) {
      designList.classList.add("design-open");
      listButton.classList.remove("hover-enabled");
      plus.classList.add("close-button");
    } else {
      designList.classList.remove("design-open");
      listButton.classList.add("hover-enabled");
      plus.classList.remove("close-button");
    }
    designOpen = !designOpen; // Toggle the flag
  });

  listButton2.addEventListener("click", () => {
    if (!designOpen2) {
      designList2.classList.add("design-open");
      listButton2.classList.remove("hover-enabled");
      plus2.classList.add("close-button");
      console.log("open");
    } else {
      designList2.classList.remove("design-open");
      listButton2.classList.add("hover-enabled");
      plus2.classList.remove("close-button");
    }
    designOpen2 = !designOpen2; // Toggle the flag
  });
});
