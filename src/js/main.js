let userOptions = document.querySelectorAll(".user-option")
let machineOptions = document.querySelectorAll(".machine-option")

let random = Math.floor(Math.random() * 3)
let computerChoose = machineOptions[random]

let rules = document.querySelector(".rules")

let btnRules = document.querySelector("#btnRules")
btnRules.addEventListener("click", () => {
  rules.classList.add("visible")
})

let btnCloseRules = document.querySelector("#btnCloseRules")
btnCloseRules.addEventListener("click", () => {
  rules.classList.remove("visible")
})

let btnPlayAgain = document.querySelector("#btnPlayAgain")
btnPlayAgain.addEventListener("click", () => {
  location.reload()
})

let btnReset = document.querySelector("#btnReset")
btnReset.addEventListener("click", () => {
  localStorage.clear()
  loadScore()
})

userOptions.forEach((option, index) => {
  
  option.addEventListener("click", () => {
    
    document.querySelector(".options").style.backgroundImage = "none"
    document.querySelector(".options").style.height = "200px"
    
    userOptions.forEach(option => {
      option.style.display = "none"
    })
    
    option.style.display = "grid"
    option.classList.add("left")
    
    createText(option, "you picked")
      
    setTimeout(() => {
      computerChoose.style.opacity = "1"
      computerChoose.classList.add("right")
      
      createText(computerChoose, "the house picked")
      
      setTimeout(() => {
        
        displayResult(index, option)
        
      },1500)
      
    }, 1500)
  })
})

function createText(parent, text) {
  let p = document.createElement("p")
  p.innerHTML = text;
  p.classList.add("additional-text")
  
  setTimeout(() => {
    p.style.opacity = "1"
  }, 500)
  
  parent.appendChild(p)
}

function displayResult(index, option) {
  
  let resultText = document.querySelector(".end-game .result-text")
  
  let outScore = document.querySelector("#outScore")
  let score = Number(outScore.textContent)
  
  if (index == random) {
    
    resultText.innerHTML = "draw"
    
  } else if(index == 0 && random == 1 || index == 1 && random == 2 || index == 2 && random == 0) {
    
    score++
    resultText.innerHTML = "yow win"
    
    option.classList.add("winner")
    
  } else {
    resultText.innerHTML = "you lose"
    
    if (score > 0) {
      score--
    }
    
    computerChoose.classList.add("winner")
  }
  
  endGame()
  
  localStorage.setItem("score", score)
  loadScore()
  
}

function endGame() {
  document.querySelector(".end-game .result-text").style.opacity = "1";
  
  document.querySelector(".end-game .btn-play-again").classList.add("left-position")
}

function loadScore() {
  
  let outScore = document.querySelector("#outScore")
  
  if (localStorage.getItem("score")) {
  
    outScore.textContent = localStorage.getItem("score")
    
  } else {
    outScore.textContent = "0"
  }
}

loadScore()