// Using this array to create a grid within the #grid div.
const cardArray = [
    {
        name: 'fries',
        img: 'img/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png',
    },
    {
        name: 'hot-dog',
        img: 'img/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'img/pizza.png',
    },
    {
        name: 'fries',
        img: 'img/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png',
    },
    {
        name: 'hot-dog',
        img: 'img/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'img/pizza.png',
    }
];

// Randomly shuffling the array
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.getElementById("grid");
const resultDisplay = document.getElementById('result')
const scoreDisplay = document.getElementById('score-display');
const scoreContainer = document.getElementById('score-container')
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard () {
    // For each item in array, create an HTML element 
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png' );
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        // Move card to grid
        gridDisplay.append(card);
        // Adding a class here for styling
        card.classList.add('grid-item');
    };
};

createBoard()

function checkMatch () {
    // get every card on the grid
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    if (optionOneId == optionTwoId) {
        // alert('You have clicked the same image twice! Try again.')
        scoreDisplay.innerHTML = 'You clicked the same image twice! Try again.'
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
    }
    // Get both items in chosen card array and check if they are a match
    else if (cardsChosen[0] == cardsChosen[1]) {
        // alert('You found a match!')
        scoreDisplay.innerHTML = 'You found a match!'
        // Find X cards and assign the background color to white if two cards are a match
        cards[optionOneId].setAttribute('src', 'img/white.png')
        cards[optionTwoId].setAttribute('src', 'img/white.png')
        // Remove the event listener for matched cards so that they can no longer be clicked
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        // Keep track of matched cards
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
        // alert('Not a match! Try again.')
        scoreDisplay.innerHTML = 'Not a match! Try again.'
    }

    // Start again
    resultDisplay.innerHTML = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    // If all cards are matched
    if (cardsWon.length == (cardArray.length/2)) {
        scoreContainer.innerHTML = "Congratulations! You've found them all!"
        scoreDisplay.innerHTML = "";
    }
};

// Function that allows user to flip the card when it is clicked
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img);
    // Once two cards have been chosen...
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}