document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const menuButton = document.getElementById("hover-item");
  const closeButton = document.getElementById("close-button");
  const navigation = document.querySelector(".navigation");
  const herocards = document.querySelectorAll(".herocard");
  const links = document.querySelectorAll("a.delayed-link");
  let contents = document.querySelectorAll(".disapear");

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  // If it's a touch device, hide the ball
  if (isTouchDevice()) {
    ball.classList.add("hidden"); // Add the class to hide the ball
  } else {
    function updateBallPosition() {
      const x = mouseX - ball.offsetWidth / 2;
      const y = mouseY - ball.offsetHeight / 2;
      ball.style.transform = `translate(${x}px, ${y}px)`;
    }

    function updateBallPosition() {
      const scrollX = window.pageXOffset;
      const scrollY = window.pageYOffset;
      const x = mouseX - ball.offsetWidth / 2 + scrollX;
      const y = mouseY - ball.offsetHeight / 2 + scrollY;
      ball.style.transform = `translate(${x}px, ${y}px)`;
    }

    document.addEventListener("mousemove", (e) => {
      ball.style.opacity = 1;
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateBallPosition();
    });
    document.addEventListener("mouseleave", () => {
      ball.style.opacity = 0;
    });

    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        ball.classList.add("large"); // Make ball bigger
      });

      element.addEventListener("mouseleave", () => {
        ball.classList.remove("large"); // Restore ball size
      });
    });

    window.addEventListener("scroll", updateBallPosition);
  }

  window.addEventListener("pageshow", function (event) {
    var historyTraversal =
      event.persisted ||
      (typeof window.performance != "undefined" &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      // Handle page restore.
      window.location.reload();
    }
  });
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
    event.stopPropagation();
    menu.classList.add("open");
    menu.classList.remove("close");
    menuButton.classList.add("remove");
    menuButton.classList.remove("add");
  });

  closeButton.addEventListener("click", () => {
    event.stopPropagation();
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

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Add event listeners to the <b> elements
  document.querySelector("#email").addEventListener("click", function () {
    copyToClipboard(this.innerText);
    event.stopPropagation();
    console.log("hi");
  });

  document.querySelector("#phone").addEventListener("click", function () {
    copyToClipboard(this.innerText);
    event.stopPropagation();
  });
});
