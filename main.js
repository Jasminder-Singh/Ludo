const board = document.getElementById('board');
const diceRollSound = document.getElementById('diceRoll');
const diceJump = document.getElementById('diceJump');
const dice = ['one.svg', 'two.svg', 'three.svg', 'four.svg', 'five.svg', 'six.svg',];
const playersColor = ['blue', 'red', 'green', 'orange'];
let currRolledDice = null;
let turn = 0;
let dicedNumber = -1;

const players = [
    {
        complete: false,
        path: ['13-6', '12-6', '11-6', '10-6', '9-6', '8-5', '8-4', '8-3', '8-2', '8-1', '8-0', '7-0', '6-0', '6-1', '6-2',
            '6-3', '6-4', '6-5', '5-6', '4-6', '3-6', '2-6', '1-6', '0-6', '0-7', '0-8', '1-8', '2-8', '3-8', '4-8', '5-8', '6-9', '6-10',
            '6-11', '6-12', '6-13', '6-14', '7-14', '8-14', '8-13', '8-12', '8-11', '8-10', '8-9', '9-8', '10-8', '11-8', '12-8', '13-8', '14-8', '14-7',
            '13-7', '12-7', '11-7', '10-7', '9-7', '8-7'],
        blue1: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '11-1'
        },
        blue2: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '11-4'
        },
        blue3: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '12-1'
        },
        blue4: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '12-4'
        },
        startingPoint: '13-6',
        homePoint: '8-7',
        endPoint: '14-7',
        anyDiscOpen: false
    },
    {
        complete: false,
        path: ['6-1', '6-2', '6-3', '6-4', '6-5', '5-6', '4-6', '3-6', '2-6', '1-6', '0-6', '0-7', '0-8', '1-8', '2-8', '3-8', '4-8', '5-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '7-14', '8-14', '8-13', '8-12', '8-11', '8-10', '8-9', '9-8', '10-8',
            '11-8', '12-8', '13-8', '14-8', '14-7', '14-6', '13-6', '12-6', '11-6', '10-6', '9-6', '8-5', '8-4', '8-3', '8-2', '8-1', '8-0', '7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6'],
        red1: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '2-1'
        },
        red2: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '2-4'
        },
        red3: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '3-1'
        },
        red4: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '3-4'
        },
        startingPoint: '6-1',
        homePoint: '7-6',
        endPoint: '7-0',
        anyDiscOpen: false
    },
    {
        complete: false,
        path: ['1-8', '2-8', '3-8', '4-8', '5-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '7-14', '8-14', '8-13', '8-12', '8-11', '8-10', '8-9', '9-8', '10-8', '11-8', '12-8', '13-8', '14-8', '14-7', '14-6', '13-6', '12-6', '11-6', '10-6', '9-6', '8-5',
            '8-4', '8-3', '8-2', '8-1', '8-0', '7-0', '6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '5-6', '4-6', '3-6', '2-6', '1-6', '0-6', '0-7', '1-7', '2-7', '3-7', '4-7', '5-7', '6-7'],
        green1: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '2-10'
        },
        green2: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '2-13'
        },
        green3: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '3-10'
        },
        green4: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '3-13'
        },
        startingPoint: '1-8',
        homePoint: '6-7',
        endPoint: '0-7',
        anyDiscOpen: false
    },
    {
        complete: false,
        path: ['8-13', '8-12', '8-11', '8-10', '8-9', '9-8', '10-8', '11-8', '12-8', '13-8', '14-8', '14-7', '14-6', '13-6', '12-6', '11-6', '10-6', '9-6', '8-5', '8-4', '8-3', '8-2', '8-1', '8-0', '7-0', '6-0',
            '6-1', '6-2', '6-3', '6-4', '6-5', '5-6', '4-6', '3-6', '2-6', '1-6', '0-6', '0-7', '0-8', '1-8', '2-8', '3-8', '4-8', '5-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '7-14', '7-13', '7-12', '7-11', '7-10',
            '7-9', '7-8'],
        orange1: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '11-10'
        },
        orange2: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '11-13'
        },
        orange3: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '12-10'
        },
        orange4: {
            location: '',
            open: false,
            reached: false,
            sleepLocation: '12-13'
        },
        startingPoint: '8-13',
        homePoint: '7-8',
        endPoint: '7-14',
        anyDiscOpen: false
    },
];

function createBoard(N) {


    for (let row = 0; row < N; row++) {

        for (let col = 0; col < N; col++) {
            const box = document.createElement('span');
            box.style.border = '1px solid grey';
            // box.textContent = `${row}-${col}`;
            box.id = `${row}-${col}`;
            board.appendChild(box);
        }
    }

}

createBoard(15);

function fillColor(startRow, endRow, startCol, endCol, color, radius = '0px') {

    for (; startRow <= endRow; startRow++) {
        let col = startCol;
        for (; col <= endCol; col++) {
            const parent = document.getElementById(`${startRow}-${col}`);
            parent.style.backgroundColor = color;
            parent.style.border = 'none';
            parent.style.borderRadius = radius;

        }
    }
}

fillColor(0, 5, 0, 5, 'lightcoral'); // TOP LEFT
fillColor(0, 5, 9, 14, 'lightgreen'); // TOP RIGHT
fillColor(9, 14, 0, 5, 'lightblue'); // BOTTOM LEFT
fillColor(9, 14, 9, 14, 'rgb(241, 243, 155)'); // BOTTOM RIGHT
fillColor(6, 8, 6, 8, 'grey'); // CENTER
fillColor(7, 7, 1, 5, 'lightcoral'); // FILL path color for red disc
fillColor(1, 5, 7, 7, 'lightgreen'); // FILL path color for green disc
fillColor(7, 7, 9, 13, 'rgb(241, 243, 155)'); // FILL path color for blue disc
fillColor(9, 13, 7, 7, 'lightblue'); // FILL path color for yellow disc
//########### FILL COLOR FOR STARTING POINT FOR EACH DISC ############################

fillColor(13, 13, 6, 6, 'lightblue', '10px');
fillColor(6, 6, 1, 1, 'lightcoral', '10px');
fillColor(1, 1, 8, 8, 'lightgreen', '10px');
fillColor(8, 8, 13, 13, 'rgb(241, 243, 155)', '10px');

//################ END OF FILLING COLOR FOR EACH DISC STARTING POINT ####################
function putIcons(row, col, icon, Rotate = '0deg') {
    const parent = document.getElementById(`${row}-${col}`);
    const img = document.createElement('img');
    img.src = icon;
    img.style.transform = `rotate(${Rotate})`;
    parent.appendChild(img);

}

putIcons(13, 6, 'star.svg'); // Starting point of blue disc.
putIcons(6, 1, 'star.svg'); // Starting point of red disc.
putIcons(1, 8, 'star.svg'); // Starting point of green disc.
putIcons(8, 13, 'star.svg'); // Starting point of yellow disc.

// ################## PUT STAR ICONS ON SAFE POINTS ######################.
putIcons(8, 2, 'star.svg');
putIcons(2, 6, 'star.svg');
putIcons(6, 12, 'star.svg');
putIcons(12, 8, 'star.svg');

// ################## PUT HOME ICONS ON END POINTS ######################.
putIcons(7, 6, 'home.png', '90deg');
putIcons(6, 7, 'home.png', '180deg');
putIcons(7, 8, 'home.png', '-90deg');
putIcons(8, 7, 'home.png', '360deg');

// Creating the roll dice funciton.
function rollDice(e) {
    // checking if same palyer click on the dice who has turn.
    if (playersColor[turn] === e.target.id) {

        const button = e.target;
        img = button.children[0];
        e.target.style.pointerEvents = 'none';
        let count = 0;
        diceRollSound.play();
        const id = setInterval(() => {
            count++;
            if (count === 10) {
                clearInterval(id);
                dicedNumber = Math.floor(Math.random() * 6);
                img.src = dice[dicedNumber];
                currRolledDice = e.target;
                if (players[turn].anyDiscOpen === false && dicedNumber + 1 !== 6) {
                    turn++;
                    if (turn === 4) turn = 0;
                    e.target.style.pointerEvents = 'auto';

                }
            }
            else {
                temp = Math.floor(Math.random() * 6);
                img.src = dice[temp];
            }
        }, 100);


    }
}

// Move the discs function.
function moveDisc(number, child, currDisc) {
    let nextParent = null;
    let currLocation = players[turn][currDisc].location; // get the curr locaiton of the disc

    let currIndex = players[turn].path.indexOf(currLocation);// find the curr location index from the path
    if (currIndex === -1) {
        currIndex = players[turn].path.indexOf(players[turn].startingPoint);
    }
    if ((currIndex + number) >= players[turn].path.length) {
        return;
    }

    const id = setInterval(() => {
        if (number === 0) {
            clearInterval(id);
            if (dicedNumber + 1 !== 6) {
                if (nextParent && nextParent.children.length > 1 && nextParent.querySelector('img') == null) {
                    //Check if same color disk already present then place another same color disk.
                    let isCut = false;
                    for (let i = 0; i < nextParent.children.length; i++) {

                        if (!nextParent.children[i].className.includes(playersColor[turn])) {

                            const currId = nextParent.children[i].id;
                            const index = playersColor.indexOf(currId.slice(0, currId.length - 1));
                            const getSleepLocation = document.getElementById(`${players[index][currId].sleepLocation}`);
                            getSleepLocation.appendChild(nextParent.children[i]);
                            players[index][currId].open = false;
                            players[index][currId].location = '';

                            isCut = true;
                        }
                    }
                    // if isCut is false then it means it time to turn another palyer.
                    if (!isCut) {
                        nextParent.appendChild(child);
                        turn++;
                        if (turn === 4) turn = 0;

                    }

                } else {
                    turn++;
                    if (turn === 4) turn = 0;
                }
            }
            dicedNumber = -1;
            currRolledDice.style.pointerEvents = 'auto';


        } else {

            currIndex++;

            nextParent = document.getElementById(players[turn].path[currIndex]);
            nextParent.appendChild(child);
            players[turn][currDisc].location = nextParent.id;



            number--;

        }
    }, 300);
}

// Place the waiting disc function..
function placeWaitingDiscs(row, col, className, id) {

    const parent = document.getElementById(`${row}-${col}`);
    const disc = document.createElement('span');
    disc.id = id
    disc.addEventListener('click', (e) => {
        if (e.target.id.includes(playersColor[turn])) {

            const currDisc = e.target.id;

            // if location is not set yet. then it means it need to start from first.

            if (!players[turn][currDisc].open && dicedNumber + 1 === 6) {


                const index = players[turn].startingPoint;
                const parent = document.getElementById(index);
                parent.appendChild(e.target);
                players[turn].anyDiscOpen = true;
                currRolledDice.style.pointerEvents = 'auto';
                dicedNumber = -1;
                players[turn][currDisc].open = true;

            } else if (players[turn].anyDiscOpen && dicedNumber + 1 > 0 && players[turn][currDisc].open) {
                moveDisc(dicedNumber + 1, e.target, currDisc);
            }


        }
    })
    parent.appendChild(disc);
    disc.classList.add(className);
}

// Places waiting red disc..
placeWaitingDiscs(2, 1, 'redDisc', 'red1');
placeWaitingDiscs(2, 4, 'redDisc', 'red2');
placeWaitingDiscs(3, 1, 'redDisc', 'red3');
placeWaitingDiscs(3, 4, 'redDisc', 'red4');

// Places waiting green disc..
placeWaitingDiscs(2, 10, 'greenDisc', 'green1');
placeWaitingDiscs(2, 13, 'greenDisc', 'green2');
placeWaitingDiscs(3, 10, 'greenDisc', 'green3');
placeWaitingDiscs(3, 13, 'greenDisc', 'green4');
// Places waiting blue disc..
placeWaitingDiscs(11, 1, 'blueDisc', 'blue1');
placeWaitingDiscs(11, 4, 'blueDisc', 'blue2');
placeWaitingDiscs(12, 1, 'blueDisc', 'blue3');
placeWaitingDiscs(12, 4, 'blueDisc', 'blue4');
// Places waiting purple disc..
placeWaitingDiscs(11, 10, 'orangeDisc', 'orange1');
placeWaitingDiscs(11, 13, 'orangeDisc', 'orange2');
placeWaitingDiscs(12, 10, 'orangeDisc', 'orange3');
placeWaitingDiscs(12, 13, 'orangeDisc', 'orange4');




