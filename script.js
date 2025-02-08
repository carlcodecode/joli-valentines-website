let heart = document.querySelector('.heart-count')
let parsedHeart = parseFloat(heart.innerHTML)

const upgrades = [
    {
        name: 'matcha',
        cost: document.querySelector('.matcha-cost'),
        parsedCost: parseFloat(document.querySelector('.matcha-cost').innerHTML),
        level: document.querySelector('.matcha-level'),
        increase: document.querySelector('.matcha-increase'),
        parsedIncrease: parseFloat(document.querySelector('.matcha-increase').innerHTML),
        heartMult: 1.1,
        costMult: 1.1,
    },
    {
        name: 'spike',
        cost: document.querySelector('.spike-cost'),
        parsedCost: parseFloat(document.querySelector('.spike-cost').innerHTML),
        level: document.querySelector('.spike-level'),
        increase: document.querySelector('.spike-increase'),
        parsedIncrease: parseFloat(document.querySelector('.spike-increase').innerHTML),
        heartMult: 1.08,
        costMult: 1.2,
    },
    {
        name: 'hello-kitty',
        cost: document.querySelector('.hello-kitty-cost'),
        parsedCost: parseFloat(document.querySelector('.hello-kitty-cost').innerHTML),
        level: document.querySelector('.hello-kitty-level'),
        increase: document.querySelector('.hello-kitty-increase'),
        parsedIncrease: parseFloat(document.querySelector('.hello-kitty-increase').innerHTML),
        heartMult: 1.06,
        costMult: 1.3,
    },
    {
        name: 'pink-whitney',
        cost: document.querySelector('.pink-whitney-cost'),
        parsedCost: parseFloat(document.querySelector('.pink-whitney-cost').innerHTML),
        level: document.querySelector('.pink-whitney-level'),
        increase: document.querySelector('.pink-whitney-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pink-whitney-increase').innerHTML),
        heartMult: 1.04,
        costMult: 1.5,
    },
    {
        name: 'buffet',
        cost: document.querySelector('.buffet-cost'),
        parsedCost: parseFloat(document.querySelector('.buffet-cost').innerHTML),
        level: document.querySelector('.buffet-level'),
        increase: document.querySelector('.buffet-increase'),
        parsedIncrease: parseFloat(document.querySelector('.buffet-increase').innerHTML),
        heartMult: 1.03,
        costMult: 1.7,
    },
    {
        name: 'uzi',
        cost: document.querySelector('.uzi-cost'),
        parsedCost: parseFloat(document.querySelector('.uzi-cost').innerHTML),
        level: document.querySelector('.uzi-level'),
        increase: document.querySelector('.uzi-increase'),
        parsedIncrease: parseFloat(document.querySelector('.uzi-increase').innerHTML),
        heartMult: 1.02,
        costMult: 1.9,
    },
    {
        name: 'mustang',
        cost: document.querySelector('.mustang-cost'),
        parsedCost: parseFloat(document.querySelector('.mustang-cost').innerHTML),
        level: document.querySelector('.mustang-level'),
        increase: document.querySelector('.mustang-increase'),
        parsedIncrease: parseFloat(document.querySelector('.mustang-increase').innerHTML),
        heartMult: 1.01,
        costMult: 2.1,
    },
    {
        name: 'babies',
        cost: document.querySelector('.babies-cost'),
        parsedCost: parseFloat(document.querySelector('.babies-cost').innerHTML),
        level: document.querySelector('.babies-level'),
        increase: document.querySelector('.babies-increase'),
        parsedIncrease: parseFloat(document.querySelector('.babies-increase').innerHTML),
        heartMult: 1.005,
        costMult: 2.3,
    }
    
]


let hpcText = document.querySelector('.hpc')
let hpsText = document.querySelector('.hps')

let joliImgContainer = document.querySelector('.joli-img-container')

let heartsPerClick = 1
let heartsPerSecond = 0

let bgm = new Audio('./assets/audio/bgm.mp3')
bgm.volume = 0.05
bgm.loop = true  

document.addEventListener("click", () => {
    bgm.play().catch(error => console.log("Autoplay blocked:", error))
}, {once: true})

function incrementHeart(event){
    let clickSound = new Audio('./assets/audio/pop.mp3')
    clickSound.volume = 0.8
    clickSound.play()
    heart.innerHTML = Math.round(parsedHeart += heartsPerClick)
    
    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(heartsPerClick)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`

    joliImgContainer.appendChild(div)
    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    },800)
}

function showUpgrade() {
    upgrades.forEach(upgrade => {
        const upgradeElement = document.querySelector(`.upgrade[onclick="buyUpgrade('${upgrade.name}')"]`);
        if (parsedHeart >= Math.floor(upgrade.parsedCost)) {
            upgradeElement.classList.remove('hidden')
            upgradeElement.style.display = "flex"
        } 
    });
}

function buyUpgrade(upgrade){
    const chosenUpgrade = upgrades.find((u) => {
        if(u.name==upgrade) return u
    })

    if(parsedHeart >= Math.floor(chosenUpgrade.parsedCost)){
        let upgradeSound = new Audio('./assets/audio/upgrade-sound.mp3')
        upgradeSound.play()

        heart.innerHTML = Math.round(parsedHeart-=chosenUpgrade.parsedCost)
        
        chosenUpgrade.level.innerHTML++
        
        if(chosenUpgrade.name === 'matcha'){
            heartsPerClick += chosenUpgrade.parsedIncrease
        }
        else{
            heartsPerSecond += chosenUpgrade.parsedIncrease
        }
        
        chosenUpgrade.parsedIncrease = parseFloat((chosenUpgrade.parsedIncrease * chosenUpgrade.heartMult).toFixed(2))
        chosenUpgrade.increase.innerHTML = chosenUpgrade.parsedIncrease

        chosenUpgrade.parsedCost *= chosenUpgrade.costMult
        chosenUpgrade.cost.innerHTML = Math.round(chosenUpgrade.parsedCost)
    }
    else{
        showErrorMessage()
    }
}

function showErrorMessage() {
    const errorMessage = document.getElementById("error-message")

    errorMessage.style.display = "block"

    let error = new Audio('./assets/audio/error.mp3')
    error.play()

    setTimeout(() => {
        errorMessage.style.display = "none"
    }, 1000)
}

let epic = new Audio('./assets/audio/epic.mp3')
epic.currentTime = 28.8
epic.volume = 0.2

setInterval(() => {
    heart.innerHTML = Math.round(parsedHeart += heartsPerSecond / 10)
    hpcText.innerHTML = Math.round(heartsPerClick)
    hpsText.innerHTML = Math.round(heartsPerSecond)
    showUpgrade()

    if (parsedHeart >= 8000000000) {
        triggerFinalUpgrade()
    }
}, 100)

function triggerFinalUpgrade() {
    bgm.pause()
    bgm.currentTime = 0

    epic.play()

    const finalUpgrade = document.getElementById("final-upgrade")
    const overlay = document.getElementById("overlay")

    finalUpgrade.style.display = "flex";
    overlay.style.display = "block";

    setTimeout(() => {
        finalUpgrade.style.opacity = "1";
        overlay.style.opacity = "0.7";
    }, 100);
}


function pressFinalUpgrade() {
    document.body.style.transition = "opacity 1s"
    document.body.style.opacity = "0"

    setTimeout(() => {
        document.body.innerHTML = `
            <div style="
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                text-align: center;
                background-color: #e66e7e; 
                color: white;
                font-family: 'Fredoka', sans-serif;">
                
                <h1 style="
                    font-size: 60px;">
                    Thank You for Playing!
                </h1>
                <p style="
                    font-size: 32px;">
                You could have had 8 billion hearts but you chose mine! ❤️ </br>
                Will you be my Valentine?
                </p>
                <img src="./assets/me.png" class="me-img">
                
                <!-- Yes and No buttons -->
                <div style="display: flex; gap: 20px;">
                    <button onclick="sayYes()" style="
                        padding: 15px 30px; 
                        font-size: 24px; 
                        border: none; 
                        background: #FFFADA; 
                        color: #4E342E;
                        cursor: pointer;
                        border-radius: 10px;
                        font-weight: bold;">Yes</button>

                    <button onclick="sayNo()" style="
                        padding: 15px 30px; 
                        font-size: 24px; 
                        border: none; 
                        background: #4E342E; 
                        color: #FFFADA;
                        cursor: pointer;
                        border-radius: 10px;
                        font-weight: bold;">No</button>
                </div>
            </div>
        `
        document.body.style.opacity = "1"
    }, 1000) 
}


function sayYes() {
    epic.pause()
    epic.currentTime = 0

    let win = new Audio('./assets/audio/win.mp3')
    win.play()

    document.body.style.transition = "opacity 1s"
    document.body.style.opacity = "0"

    setTimeout(() => {
        document.body.innerHTML = `
            <div id="container" style="
                height: 100vh; 
                width: 100vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                position: relative">

                <img src="./assets/us.png" class="us-img" id="center-img" draggable="false">
                <h1>I love you!</h1>
            </div>
        `
        document.body.style.opacity = "1"

        addBouncingGifs()
    }, 1690)
}

function addBouncingGifs() {
    const container = document.getElementById('container')
    const centerImg = document.getElementById('center-img')
    
    const gifNames = [
        "./assets/dog.gif",
        "./assets/eric.gif",
        "./assets/frog.gif",
        "./assets/goku.gif",
        "./assets/mario.gif",
        "./assets/sqrl.gif"
    ]

    const gifs = []

    const positions = [
        {x: 50, y: 50},
        { x: window.innerWidth - 150, y: 50 },
        { x: 50, y: window.innerHeight - 150 },  
        { x: window.innerWidth - 150, y: window.innerHeight - 150 }, 
        { x: window.innerWidth / 4 - 10, y: window.innerHeight / 2 },  
        { x: (window.innerWidth / 4) * 3, y: window.innerHeight / 2 }
    ]

    for(let i = 0; i < 6; i++){
        let gif = document.createElement("img")

        gif.src = gifNames[i]
        gif.classList.add("bouncing-gif")
        gif.draggable = false

        let{x, y} = positions[i]

        let dx = (Math.random() - 0.5) * 4
        let dy = (Math.random() - 0.5) * 4

        

        gif.style.cssText = `
            position: absolute;
            width: 120px; 
            height: auto;
            left: ${x}px;
            top: ${y}px;
            z-index: 1;
        `

        container.appendChild(gif);
        gifs.push({ element: gif, x, y, dx, dy })
    }

    function updateGifs() {
        gifs.forEach(gif => {
            let { element, x, y, dx, dy } = gif

            if (x <= 0 || x + element.offsetWidth >= window.innerWidth) {
                gif.dx = -dx
            }
            if (y <= 0 || y + element.offsetHeight >= window.innerHeight) {
                gif.dy = -dy
            }

            let imgRect = centerImg.getBoundingClientRect()
            let gifRect = element.getBoundingClientRect()

            if (
                gifRect.right > imgRect.left &&
                gifRect.left < imgRect.right &&
                gifRect.bottom > imgRect.top &&
                gifRect.top < imgRect.bottom
            ) {
                gif.dx = -dx; 
                gif.dy = -dy; 
            }

            gif.x += gif.dx;
            gif.y += gif.dy;
            element.style.left = gif.x + "px";
            element.style.top = gif.y + "px";
        });

        requestAnimationFrame(updateGifs);
    }

    updateGifs();

}

function sayNo() {
    epic.pause()
    epic.currentTime = 0

    let bruh = new Audio('./assets/audio/bruh.mp3')
    bruh.currentTime = 0
    bruh.play()
    
    let emojiOverlay = document.createElement("div")
    emojiOverlay.innerHTML = "😡"
    emojiOverlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 500px; 
        z-index: 1001;
        opacity: 1;
        transition: opacity 1s ease-out;
    `

    document.body.appendChild(emojiOverlay);

    let dimOverlay = document.createElement("div");
    dimOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #e66e7e;
        opacity: 0;
        transition: opacity 1s;
        z-index: 1000;
    `

    document.body.appendChild(dimOverlay)

    setTimeout(() => {
        dimOverlay.style.opacity = "1"
    }, 100)

    setTimeout(() => {
        emojiOverlay.style.opacity = "0"
    }, 7000)

    setTimeout(() => {
        location.reload()
    }, 8000)
}






function switchImg(){
    const img = document.getElementById("joli-id");

    const originalSrc = "./assets/joli1.png";
    const newSrc = "./assets/joli2.png";

    img.addEventListener("mousedown", function() {
        img.src = newSrc; 
    });

    img.addEventListener("mouseup", function() {
        img.src = originalSrc; 
    });

    img.addEventListener("mouseleave", function() {
        img.src = originalSrc; 
    });
}

document.addEventListener("DOMContentLoaded", switchImg)


