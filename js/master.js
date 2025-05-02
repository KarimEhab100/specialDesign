/* toggle setting gear*/
let settingBtn = document.querySelector(".setting-icon");
let settingBox = document.querySelector(".setting-box");
settingBtn.addEventListener("click", (e) => {
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
});
/* toggle setting gear*/

/*switch colors*/
//select list of colors
let colorsLis = document.querySelectorAll(".colors-list li");
//loop on list of colors
colorsLis.forEach((li) => {
  //add click Event on each color
  li.addEventListener("click", (e) => {
    //loop on all colors on click and remove active classes
    colorsLis.forEach((element) => {
      element.classList.remove("active");
    });
    // make the target color class active
    e.target.classList.add("active");
    // set the value in local storage throw a custom attribute
    window.localStorage.setItem(
      "pageColor",
      e.target.getAttribute("data-color")
    );
    //change color in the page to the color we clicked
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.getAttribute("data-color")
    );
  });
});
//trigger the function to get the color from local storage if found
getDataFromLocal();

//create a function to get the color from local storage if found
function getDataFromLocal() {
  if (localStorage.getItem("pageColor")) {
    //change color in the page from local storage
    document.documentElement.style.setProperty(
      "--main-color",
      localStorage.getItem("pageColor")
    );
    //loop on all colors on click and remove active classes
    colorsLis.forEach((element) => {
      element.classList.remove("active");
      // make the color's class active which matches with local storage throw custom attribute
      if (
        element.getAttribute("data-color") === localStorage.getItem("pageColor")
      ) {
        element.classList.add("active");
      }
    });
  }
}

/*switch colors*/
/*###############################################################################*/

/*random back ground*/

//make boolian value to choose if we want random background image or not
let enableRandom = true;
//select the random image container
let myLandingPage = document.querySelector(".landig-page");
//select the option spans
let changeBg = document.querySelectorAll(".random-background span");
//define a variable to handle the interval function
let randomBg;
//set value from localStorage to enableRandom

if (localStorage.getItem("randomBg") !== null) {
  if (localStorage.getItem("randomBg") === "true") {
    enableRandom = true;
    // changeBg.forEach((ele)=>{
    //     ele.classList.remove("active")
    // })
    // changeBg.forEach((ele)=>{
    // if(ele.dataset.background === "yes"){
    //     ele.classList.add("active")
    // }
    // })
  } else {
    enableRandom = false;
    // changeBg.forEach((ele)=>{
    //     ele.classList.remove("active")
    // })
    // changeBg.forEach((ele)=>{
    //     if(ele.dataset.background === "yes"){
    //         ele.classList.add("active")
    //     }
    //     })
  }
}
changeBg.forEach((ele) => {
  ele.classList.remove("active");
});
//put active class to option span according to enableRandom value
if (enableRandom == true) {
  document.querySelector(".random-background .yes").classList.add("active");
} else {
  document.querySelector(".random-background .no").classList.add("active");
}
//add event listener to option spans
changeBg.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    //remove active class from all spans
    changeBg.forEach((ele) => {
      ele.classList.remove("active");
    });
    //add active class to clicked span
    e.target.classList.add("active");
    //set enableRandom value to true or false according to clicked span
    if (e.target.dataset.background === "yes") {
      enableRandom = true;
      //trigger random image function according to function
      randomizeImgs();
      localStorage.setItem("randomBg", true);
    } else {
      enableRandom = false;
      clearInterval(randomBg);
      localStorage.setItem("randomBg", false);
    }
  });
});
let photoArr = [
  "photo-1.jpg",
  "photo-2.jpg",
  "photo-3.jpg",
  "photo-4.jpg",
  "photo-5.jpg",
  "photo-6.jpg",
  "photo-7.jpg",
  "photo-8.jpg",
  "photo-9.jpg",
  "photo-10.jpg",
];
function randomizeImgs() {
  if (enableRandom)
    randomBg = setInterval(() => {
      let randomNum = Math.floor(Math.random() * photoArr.length);
      myLandingPage.style.backgroundImage = `url('images/${photoArr[randomNum]}')`;
    }, 5000);
}

randomizeImgs();

let ourSkills = document.querySelector(".skills");
window.onscroll = () => {
  /*The [HTMLElement.offsetTop] read-only property returns the distance from
    the outer border of the current element (including its margin)
    to the top padding edge of the offsetParent, the closest positioned ancestor element.*/
  let skillsOffsetTop = ourSkills.offsetTop;

  /*The HTMLElement.offsetHeight read-only property returns the height
     of an element, including vertical padding and borders, as an integer.
 */
  let skillsOuterHeight = ourSkills.offsetHeight;
  /* return the window height*/
  let windowHeight = this.innerHeight;
  /* return (measure your scroll in this page)*/
  let windowScrollTop = this.pageYOffset;
  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 50
  ) {
    document
      .querySelectorAll(".skill-box .skill-progress span")
      .forEach((e) => {
        e.style.width = e.dataset.progress;
      });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    //add overlay tobody
    document.body.appendChild(overlay);
    //create popup
    let popup = document.createElement("div");
    popup.className = "popup-box";
    //add image to popup
    if (img.alt) {
      let popupHeading = document.createElement("h3");
      popupHeading.innerText = img.alt;
      popup.appendChild(popupHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popup.appendChild(popupImage);
    //add popup to body
    overlay.appendChild(popup);
    let closeBtn = document.createElement("div");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.addEventListener("click", (e) => {
      //remove popup
      overlay.remove();
    });
    popup.appendChild(closeBtn);
  });
});

//sellect all links
let mylinks = document.querySelectorAll(
  ".landig-page .header-area .links li a"
);
// mylinks.forEach((link)=>{
//     link.addEventListener('click',(e)=>{
//         e.preventDefault();
//         document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
//             behavior:'smooth'
//         })
//     })
// })
// select all bullets
let bullets = document.querySelectorAll(".nav-bullet .bullet");
let footer_links = document.querySelectorAll(".footer-links .footer-link");
// bullets.forEach((bullet)=>{
//     bullet.addEventListener('click',(e)=>{
//         document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
//             behavior:'smooth'
//         })
//     })
// })

// function to move to desiered section
function directionTo(arrOfEelements) {
  arrOfEelements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}


directionTo(bullets);
directionTo(mylinks);
directionTo(footer_links);

let showBullets = document.querySelectorAll(".show-bullets span");
showBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    showBullets.forEach((bullet) => {
      bullet.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.show == "yes") {
      document.querySelector(".nav-bullet").style.display = "block";
    } else {
      document.querySelector(".nav-bullet").style.display = "none";
    }
  });
});

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
});

let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
toggleMenu.addEventListener("click", (e) => {
  links.classList.toggle("open");
  // to stop propagation on btn
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target != toggleMenu && e.target != links) {
    if (links.classList.contains("open")) {
      links.classList.remove("open");
    }
  }
});

// to stop propagation on list
links.addEventListener("click", function (e) {
  e.stopPropagation();
});
