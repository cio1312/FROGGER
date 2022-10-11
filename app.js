const timeleft = document.querySelector('#time-left');  // for ID we use #
const result = document.querySelector('#result'); 
const reset = document.querySelector('#restart'); 
const start_pasue_button = document.querySelector('#start-pause-button');
const sqaures = document.querySelectorAll('.grid div'); //  get all div inside grid


let currentindex = 1129; //curent div block in the grid. start from 0. 76 is start of frog position

const widthofgridblock = 36;  // each row has 9 divs
let timerID;
let currenttime = 80;  // play for 10 sec. as logs move time dec by 1
let outcometimerID  // to start a timer that calls a function to see if won or lost 

function movefrog(e) {
    console.log(currentindex)
    sqaures[currentindex].classList.remove('frog')  // remove frog before shifting from its currentindex
    console.log(e)

    switch (e.key) {

        case 'ArrowLeft':
            console.log('moved left')
            // number divisible by 9. thats it reached border
            if(currentindex % widthofgridblock !== 0) // to take care not to cross boundries
            { currentindex -= 1 }
            break


        case 'ArrowRight':
            console.log('moved ArrowRight')
            if (currentindex % widthofgridblock < widthofgridblock - 1) { currentindex += 1 }

            break


        case 'ArrowUp':
            // max not go above 0
            console.log('moved ArrowUp')
            if (currentindex - widthofgridblock >= 0) { currentindex -= widthofgridblock }

            break


        case 'ArrowDown':
            // max not go below 9*9 = 81
            console.log('moved ArrowDown')
            if (currentindex + widthofgridblock < widthofgridblock * widthofgridblock) { currentindex += widthofgridblock }

            break

    }


    sqaures[currentindex].classList.add('frog') // add frog depending on currentindex
}



const logleft = document.querySelectorAll('.log-left') // get all div with class = logleft
const logright = document.querySelectorAll('.log-right')

const carsleft = document.querySelectorAll('.car-left'); 
const carsright = document.querySelectorAll('.car-right');

// function that starts movement of logs and cars
// this function is called after every 1 sec.
function autoMoveLogs() {
    currenttime--;  // intitally set to 10 sec. if this goes 0 then game over.
    timeleft.innerHTML = currenttime // showing decreasing time on screen.

    // acccessing individual <div> given to car and logs
    logleft.forEach(foreachlogleftblock => movelogleft(foreachlogleftblock))
    logright.forEach(foreachlogrightblock => movelogRight(foreachlogrightblock))
    carsleft.forEach(foreachcarleft => movecarleft(foreachcarleft))
    carsright.forEach(foreachlcarright => movecarright(foreachlcarright))

}

// take care of 1st line of moving left
function movelogleft(foreachlogleftblock) {
    switch (true) {
        case foreachlogleftblock.classList.contains('l1'):
            foreachlogleftblock.classList.remove('l1')
            foreachlogleftblock.classList.add('l2')
            break;

        case foreachlogleftblock.classList.contains('l2'):
            foreachlogleftblock.classList.remove('l2')
            foreachlogleftblock.classList.add('l3')
            break;

        case foreachlogleftblock.classList.contains('l3'):
            foreachlogleftblock.classList.remove('l3')
            foreachlogleftblock.classList.add('l4')
            break;

        case foreachlogleftblock.classList.contains('l4'):
            foreachlogleftblock.classList.remove('l4')
            foreachlogleftblock.classList.add('l5')
            break;


        case foreachlogleftblock.classList.contains('l5'):
            foreachlogleftblock.classList.remove('l5')
            foreachlogleftblock.classList.add('l1')
            break;
    }
}



function movelogRight(foreachlogrightblock) {
    switch (true) {
        case foreachlogrightblock.classList.contains('l1'):
            foreachlogrightblock.classList.remove('l1')
            foreachlogrightblock.classList.add('l5')
            break;

        case foreachlogrightblock.classList.contains('l2'):
            foreachlogrightblock.classList.remove('l2')
            foreachlogrightblock.classList.add('l1')
            break;

        case foreachlogrightblock.classList.contains('l3'):
            foreachlogrightblock.classList.remove('l3')
            foreachlogrightblock.classList.add('l2')
            break;

        case foreachlogrightblock.classList.contains('l4'):
            foreachlogrightblock.classList.remove('l4')
            foreachlogrightblock.classList.add('l3')
            break;


        case foreachlogrightblock.classList.contains('l5'):
            foreachlogrightblock.classList.remove('l5')
            foreachlogrightblock.classList.add('l4')
            break;
    }
}





function movecarleft(foreachcarleft) {
    switch (true) {
        case foreachcarleft.classList.contains('c1'):
            foreachcarleft.classList.remove('c1')
            foreachcarleft.classList.add('c2')
            break;

        case foreachcarleft.classList.contains('c2'):
            foreachcarleft.classList.remove('c2')
            foreachcarleft.classList.add('c3')
            break;

        case foreachcarleft.classList.contains('c3'):
            foreachcarleft.classList.remove('c3')
            foreachcarleft.classList.add('c1')
            break;
    }
}


function movecarright(foreachlcarright) {
    switch (true) {
        case foreachlcarright.classList.contains('c1'):
            foreachlcarright.classList.remove('c1')
            foreachlcarright.classList.add('c3')
            break;

        case foreachlcarright.classList.contains('c2'):
            foreachlcarright.classList.remove('c2')
            foreachlcarright.classList.add('c1')
            break;

        case foreachlcarright.classList.contains('c3'):
            foreachlcarright.classList.remove('c3')
            foreachlcarright.classList.add('c2')
            break;
    }
}

function lose() {
    if (sqaures[currentindex].classList.contains('c1') ||  // hit by a car
        sqaures[currentindex].classList.contains('l4') ||  // go in water
        sqaures[currentindex].classList.contains('l5') ||  // go in water
        currenttime <= 0                                   // check if timeup
    ) {
        result.textContent = "You Lose!"
        clearInterval(timerID);
        sqaures[currentindex].classList.remove('frog')
        document.removeEventListener('keyup', movefrog)
        clearInterval(outcometimerID)
    }
}


function win() {
    if (sqaures[currentindex].classList.contains('ending-block')) {
        result.textContent = "You Win!"
        clearInterval(timerID);
        document.removeEventListener('keyup', movefrog)
        clearInterval(outcometimerID)
    }
}

// this is a collback function ()=>
// start debugging from here
start_pasue_button.addEventListener('click', () => {

    if (timerID) {        // pause it
        clearInterval(timerID);
        clearInterval(outcometimerID)
        document.removeEventListener('keyup', movefrog) //
        timerID=null
        outcometimerID=null
    } else {
        timerID = setInterval(autoMoveLogs, 1000)
        outcometimerID = setInterval(checkoutcome , 50)
        document.addEventListener('keyup', movefrog)
    }

})


function checkoutcome(){
    lose() // check if hit a car or fell in water
    win()
}

reset.addEventListener('click', () => {

  
    location.reload();
  })   