let counter = parseInt(localStorage.getItem("potatoCounter")) || 0
let peelerCounter = parseInt(localStorage.getItem("peelerCounter")) || 0
let potatoAnimationRandomizer = 0
const potatoContainer = document.getElementById("potatoContainer")
const potatoContainerII = document.getElementById("potatoContainerII")
const potatoContainerIII = document.getElementById("potatoContainerIII")
const counterRight = document.getElementById("counter-right")
const plus = document.getElementById("plus")
const peelerPlus = document.getElementById("potato-peeler-plus")
const bodyimage = document.querySelector("body")

window.onload = ()=>{
    counterRight.innerHTML = counter;
    if (counter === 0){
        bodyimage.style.setProperty('--bg-opacity', '0.00');
    }
    // kayıt edilmiş opacity'sini localden çeker
    const savedBgOpacity = localStorage.getItem('bgOpacity');

    // eğer değer boş değilse, css değerini ekler
    if (savedBgOpacity !== null) {
        bodyimage.style.setProperty('--bg-opacity', savedBgOpacity);
    }

}

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
    const counterOpacityMap = {0: 0.00, 20: 0.01,40: 0.02, 60: 0.03, 80: 0.04, 100: 0.05, 120: 0.06, 140: 0.07, 160: 0.08, 180: 0.09, 200: 0.10
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
if (counter >= 50){
    counter -= 50
    counterRight.innerHTML = counter
    updateBackgroundOpacity(counter);
    peelerCounter++
    localStorage.setItem("peelerCounter", peelerCounter);
} else {
    return;
}
})

if (peelerCounter >= 1){
    setInterval(peelerPotatoes, 1000)
}

function peelerPotatoes() {
    counter++
    counterRight.innerHTML = counter;
    localStorage.setItem("potatoCounter", counter);
}