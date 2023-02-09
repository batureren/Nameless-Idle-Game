let counter = parseInt(localStorage.getItem("potatoCounter")) || 0
let potatoAnimationRandomizer = 0
const potatoContainer = document.getElementById("potatoContainer")
const potatoContainerII = document.getElementById("potatoContainerII")
const potatoContainerIII = document.getElementById("potatoContainerIII")
const counterRight = document.getElementById("counter-right")
const plus = document.getElementById("plus")

window.onload = ()=>{
    counterRight.innerHTML = counter;
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

plus.addEventListener("click", () =>{
    console.log(potatoAnimationRandomizer);
    counter++
    counterRight.innerHTML = counter
    console.log(counter);
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
    
});