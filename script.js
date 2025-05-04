function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // Create two spans
    let parent = document.createElement("span");
    let child = document.createElement("span");

    // parent and child both sets their respective classes
    parent.classList.add("parent");
    child.classList.add("child");

    // span parent gets child and child gets elem details
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // elem replaces its value with parent span
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function valueSetters() {
  gsap.set("#nav", { y: "-100%", opacity: 0 });
  gsap.set("#home .parent .child", { y: "-100%" });
  gsap.set("#home .row img", { opacity: 0 });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader .child span", {
    x: 100,
    stagger: 0.2,
    duration: 1.4,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -0.8,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      duration: 0.6,
      delay: -0.5,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomePage();
      },
    });
}

function headingImgTransition() {
  // Entry Animation
  gsap.from(".full-stack", {
    x: 200,
    scale: 0.5,
    opacity: 0,
    delay: 4,
    duration: 1.5,
    ease: "back.out(1.7)",
  });

  // Floating effect
  gsap.to(".full-stack", {
    y: "-=10",
    repeat: -1,
    yoyo: true,
    duration: 2,
    delay: 4.5,
    ease: "sine.inOut",
  });
}
headingImgTransition();

function navDisplay() {
  gsap.to("#home #nav", {
    y: "0",
    opacity: 1,
    // paddingTop:"6vw",
    delay: 4,
    stagger: 0.2,
    ease: Circ.easeInOut,
  });
}
navDisplay();

function animateHomePage() {
  var tl = gsap.timeline();

  gsap.to("#home .parent .child", {
    y: 0,
    stagger: 0.1,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  gsap.from("#home .row img", {
    x: "-100%",
    opacity: 0,
    delay: -0.5,
    duration: 1.8,
    ease: Expo.easeInOut,
    onComplete: function () {
      svgAnimation();
    },
  });
  gsap.to("#home .row img", {
    x: "0",
    opacity: 1,
    duration: 1.8,
    delay: -0.5,
    ease: Expo.easeInOut,
    onComplete: function () {
      svgAnimation();
    },
  });
}

function svgAnimation() {
  const nameImg = document.getElementById("nameImage");
  gsap.to(nameImg, {
    y: -10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  gsap.to(nameImg, {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0.3,
  });
}

revealToSpan();
valueSetters();
loaderAnimation();

function cardHoverEffect() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;
    cnt.addEventListener("mousemove", function (dets) {
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showingImage = dets.target;
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
      showingImage.style.filter = "grayscale(1)";
      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });
    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showingImage.dataset.index
      ].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#e4e2e2";
    });
  });
}
cardHoverEffect();

// function locoInitialize() {
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector("#home"),
//     smooth: true,
//   });
// }

// locoInitialize();

function imageryScrollAnimation() {
  let lastScrollTop = 0;
  let ticking = false;
  const imgright = document.getElementById("imgright");

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
          imgright.setAttribute("data-state", "straight");
        } else {
          imgright.setAttribute("data-state", "tilted");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });
      ticking = true;
    }
  });
}
imageryScrollAnimation();

function writeMessage() {
  const msgButton = document.querySelector(".msgBtn");
  const payment = document.querySelector(".payment");
  const close = document.querySelector(".close");

  msgButton.addEventListener("click", () => {
    payment.style.display = "flex";
  });

  close.addEventListener("click", () => {
    payment.style.display = "none";
  });
}
writeMessage();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
