//! Variables
let counter = parseInt(localStorage.getItem("potatoCounter")) || 0
let peelerCounter = parseInt(localStorage.getItem("peelerCounter")) || 0
let potatoAnimationRandomizer = 0
const potatoContainer = document.getElementById("potatoContainer")
const potatoContainerII = document.getElementById("potatoContainerII")
const potatoContainerIII = document.getElementById("potatoContainerIII")
const counterRight = document.getElementById("counter-right")
const peelerHTML = document.getElementById("potato-peeler-html")
const plus = document.getElementById("plus")
const peelerPlus = document.getElementById("potato-peeler-plus")
const bodyimage = document.querySelector("body")
//! Variables Done

//! When the app starts
window.onload = ()=>{
    counterRight.innerHTML = counter;
    if (counter === 0){
        bodyimage.style.setProperty('--bg-opacity', '0.00');
    }
    const savedPeelerHTML = localStorage.getItem("peelerHTML");
    // kayıt edilmiş opacity'sini localden çeker
    const savedBgOpacity = localStorage.getItem('bgOpacity');
    if(peelerCounter >= 1){
        peelerHTML.innerHTML = (`${savedPeelerHTML}`)
    }
    // eğer değer boş değilse, css değerini ekler
    if (savedBgOpacity !== null) {
        bodyimage.style.setProperty('--bg-opacity', savedBgOpacity);
    }
}
//! App booting ends

//! Potato spawn animations
function potatoAnimation(){
    potatoContainer.classList.add("potatoAnimation");
    setTimeout(() => {
        potatoContainer.classList.remove("potatoAnimation")
    }, 950);
    ++potatoAnimationRandomizer 
}

function potatoAnimationII(){
    potatoContainerII.classList.add("potatoAnimationII");
    setTimeout(() => {
        potatoContainerII.classList.remove("potatoAnimationII")
    }, 950);
    ++potatoAnimationRandomizer 
}

function potatoAnimationIII(){
    potatoContainerIII.classList.add("potatoAnimationII");
    setTimeout(() => {
        potatoContainerIII.classList.remove("potatoAnimationII")
    }, 950);
    ++potatoAnimationRandomizer 
}
//! Animation Done

//top click

plus.addEventListener("click", () =>{
    counter++
    counterRight.innerHTML = counter
    localStorage.setItem("potatoCounter", counter);
    if (potatoAnimationRandomizer === 0){
        potatoAnimation()
    }else if (potatoAnimationRandomizer === 1){
        potatoAnimationII()
    }else if (potatoAnimationRandomizer === 2){
        potatoAnimationIII()
    }else if (potatoAnimationRandomizer >= 3){
        potatoAnimation()
        potatoAnimationRandomizer = 0
    }

    //background opacity'sini locale atar
    updateBackgroundOpacity(counter);
    const bgOpacity = getComputedStyle(bodyimage).getPropertyValue("--bg-opacity").trim();
    localStorage.setItem("bgOpacity", bgOpacity);
});

function updateBackgroundOpacity(counter) {
    const counterOpacityMap = {0: 0.00, 20: 0.01,40: 0.02, 60: 0.03, 80: 0.04, 100: 0.05, 120: 0.06, 140: 0.07, 160: 0.08, 180: 0.09, 200: 0.10, 250: 0.11, 350: 0.12, 500: 0.13, 900: 0.14, 1400: 0.15, 2000: 0.16, 3000: 0.17, 5000: 0.18, 10000: 0.19, 50000: 0.20,
      };
      let opacity = 0.00;
      for (let i in counterOpacityMap) {
        if (counter > i) {
          opacity = counterOpacityMap[i];
        } else {
          break;
        }
      }
      
      bodyimage.style.setProperty('--bg-opacity', opacity);
    bodyimage.clientHeight;
}

//bottom peeler-click

peelerPlus.addEventListener("click", () =>{
if (counter >= 50 && counter >= peelCost * peelerCounter){
    if (peelerCounter === 0){
        counter -= 50
    }
    counter -= peelCost * peelerCounter
    counterRight.innerHTML = counter
    updateBackgroundOpacity(counter);
    peelerCounter++
    localStorage.setItem("peelerCounter", peelerCounter);
    peelerHTML.innerHTML = (`: ${(peelSec * peelerCounter).toFixed(2)}/sec & Upgrade Cost: ${peelCost * peelerCounter} Potatoes`)
    localStorage.setItem("peelerHTML", peelerHTML.innerHTML);
    peelerPotatoes()
} else {
    return;
}
})

let peelSec = 0.9
let peelCost = 50
let peelInterval = 900 // starting interval in milliseconds
let lastPeelerCounter = 0

function updatePeelInterval() {
  // Calculate the new interval based on the peelerCounter
  const newInterval = Math.floor(peelInterval / peelerCounter)
  
  // Clear the existing setInterval
  clearInterval(peelTimer)
  
  // Set a new setInterval with the updated interval
  peelTimer = setInterval(peelerPotatoes, newInterval)
  
  // Store the last peelerCounter value
  lastPeelerCounter = peelerCounter
}

if (peelerCounter >= 1){
    // Start the setInterval
    var peelTimer = setInterval(peelerPotatoes, peelInterval)
}

function peelerPotatoes() {
    counter++
    updateBackgroundOpacity(counter);
    counterRight.innerHTML = counter;
    localStorage.setItem("potatoCounter", counter);
    // Check if the peelerCounter has changed since the last update
    if (peelerCounter !== lastPeelerCounter) {
      updatePeelInterval()
    }
}