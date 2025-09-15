const quizContainer = document.querySelector('.quiz-container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const answerDisplay = document.querySelector('.answer-display');

// Fixed: Added missing score variable declaration
let score = 0;

// Fixed: Corrected the last question's answer
const quiz = [
    {
        question: "Q. Who is known as the Father of Computers?",
        choices: ["Alan Turing", "Charles Babbage", "Bill Gates", "John von Neumann"],
        answer: "Charles Babbage"
    },
    {
        question: "Q. In which year was the World Wide Web invented?",
        choices: ["1980", "1989", "1990", "2001"],
        answer: "1989"
    },
    {
        question: "Q. The first computer virus was created in?",
        choices: ["1986", "1992", "2000", "1975"],
        answer: "1986"
    },
    {
        question: "Q. Which company's slogan is 'Don't be evil'?",
        choices: ["Microsoft", "Apple", "Google", "IBM"],
        answer: "Google"
    },
    {
        question: "Q. What does AI stand for?",
        choices: ["Automated Internet", "Artificial Intelligence", "Advanced Innovation", "Applied Information"],
        answer: "Artificial Intelligence"
    },
    {
        question: "Q. Which programming language is called the 'Mother of all languages'?",
        choices: ["Java", "C", "Assembly", "Python"],
        answer: "C"
    },
    {
        question: "Q. Which futuristic technology will allow controlling machines with thoughts?",
        choices: ["Internet of Things", "Brain Computer Interfaces", "Quantum Computing", "Augmented Reality"],
        answer: "Brain Computer Interfaces"
    },
    {
        question: "Q. The first iPhone was launched in:",
        choices: ["2000", "2004", "2007", "2010"],
        answer: "2007"
    },
    {
        question: "Q. What is the name of the AI chatbot that passed the Turing Test in 2014?",
        choices: ["Sophia", "Alexa", "Eugene Goostman", "Watson"],
        answer: "Eugene Goostman"
    },
    {
        question: "Q. Which of these is considered the next big revolution in computing?",
        choices: ["Blockchain", "Cloud Computing", "Quantum Computing", "Big Data"],
        answer: "Quantum Computing" // Fixed: Was "Charles Babbage"
    }
];

let currentQuestionIndex = 0;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";
    answerDisplay.style.display = "none"; // Hide answer display
    nextBtn.disabled = false; // Re-enable button

    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            // Fixed: Clear previous selections before selecting new one
            const allChoices = document.querySelectorAll('.choice');
            allChoices.forEach(choice => choice.classList.remove('selected'));

            choiceDiv.classList.add('selected');
        });
    }
};

// Fixed: Enhanced checkAnswer function with visual feedback
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    const correctAnswer = quiz[currentQuestionIndex].answer;
    const allChoices = document.querySelectorAll('.choice');

    // Disable all choices to prevent further clicking
    allChoices.forEach(choice => {
        choice.style.pointerEvents = 'none';
        if (choice.textContent === correctAnswer) {
            choice.classList.add('correct');
        }
    });

    if (selectedChoice.textContent === correctAnswer) {
        answerDisplay.textContent = "✓ Correct Answer!";
        answerDisplay.className = "answer-display correct";
        score++;
    } else {
        selectedChoice.classList.add('wrong');
        answerDisplay.textContent = `✗ Wrong! Correct answer: ${correctAnswer}`;
        answerDisplay.className = "answer-display wrong";
    }

    answerDisplay.style.display = "block";

    // Disable next button temporarily to show the result
    nextBtn.disabled = true;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quiz.length) {
            // Re-enable pointer events for next question
            allChoices.forEach(choice => {
                choice.style.pointerEvents = 'auto';
                choice.classList.remove('correct', 'wrong', 'selected');
            });
            showQuestions();
        } else {
            showScore();
        }
    }, 2000); // Show result for 2 seconds
};

// Fixed: Reset score when playing again
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    answerDisplay.style.display = "none";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    nextBtn.textContent = "Play Again";
    nextBtn.disabled = false;

    // Fixed: Remove previous event listener before adding new one
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    const newNextBtn = document.querySelector('.nextBtn');

    newNextBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0; // Reset score
        newNextBtn.textContent = "Next";
        scoreCard.textContent = "";
        showQuestions();

        // Re-add the main event listener
        addMainEventListener();
    });
};

// Fixed: Separate function for main event listener
const addMainEventListener = () => {
    const btn = document.querySelector('.nextBtn');
    btn.addEventListener('click', () => {
        const selectedChoice = document.querySelector('.choice.selected');
        if (!selectedChoice && btn.textContent === "Next") {
            alert("Select your answer");
            return;
        } else {
            checkAnswer();
        }
    });
};

// Initialize the quiz
showQuestions();
addMainEventListener();



// Tribute Section

// let nextDom = document.getElementById('next');
// let prevDom = document.getElementById('prev')
// let carouselDom = document.querySelector('carousel')
// let listItemDom = document.querySelector('carousel .tri-list')
// let thumbnailDom = document.querySelector('carousel .thumbnail')

// nextDom.onclick = function () {
//     showSlider('next');
// }

// prevDom.onclick = function () {
//     showSlider('prev')
// }

// let timeRunning = 3000;
// let timeAutoNext = 7000;
// let runTimeOut;
// let runAutoRun = setTimeout(() => {
//     nextDom.click();
// }, timeAutoNext);

// function showSlider(type) {
//     let itemSlider = document.querySelector('carousel .tri-list .tri-item')
//     let itemThumbnail = document.querySelector('carousel .thumbnail')

//     if (type === 'next') {
//         listItemDom.appendChild(itemSlider[0]);
//         thumbnailDom.appendChild(itemThumbnail[0]);
//         carouselDom.classList.add('next');
//     } else {
//         let positionLastItem = itemSlider.length - 1;
//         listItemDom.prepend(itemSlider[positionLastItem]);
//         thumbnailDom.prepend(itemThumbnail[positionLastItem]);
//         carouselDom.classList.add('prev')
//     }


//     clearTimeout(runTimeOut);
//     runTimeOut = setTimeout(() => {
//         carouselDom.classList.remove('next');
//         carouselDom.classList.remove('prev');
//     }, timeRunning)

//     clearTimeout(runAutoRun);
//     runAutoRun = setTimeout(() => {
//         nextDom.click();
//     }, timeAutoNext);
// }



const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');
const carouselDom = document.querySelector('.carousel');
const listItemDom = document.querySelector('.carousel .tri-list');
const thumbnailDom = document.querySelector('.carousel .thumbnail');

const timeRunning = 3000;  // animation time
const timeAutoNext = 7000;  // auto–next interval

let runTimeOut;
let runAutoRun = setTimeout(() => nextDom.click(), timeAutoNext);

nextDom.onclick = () => showSlider('next');
prevDom.onclick = () => showSlider('prev');

function showSlider(type) {
    // Always re-select current items (DOM order changes each click)
    const slides = document.querySelectorAll('.carousel .tri-list .tri-item');
    const thumbnails = document.querySelectorAll('.carousel .thumbnail .tri-item');

    // ✅ first remove any old state so we see the next image
    carouselDom.classList.remove('next', 'prev');

    if (type === 'next') {
        // move the first slide/thumbnail to the end
        listItemDom.appendChild(slides[0]);
        thumbnailDom.appendChild(thumbnails[0]);
        carouselDom.classList.add('next');
    } else {
        // move the last slide/thumbnail to the front
        const lastIndex = slides.length - 1;
        listItemDom.prepend(slides[lastIndex]);
        thumbnailDom.prepend(thumbnails[lastIndex]);
        carouselDom.classList.add('prev');
    }

    // Clear and restart timers
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => nextDom.click(), timeAutoNext);
}


// Scroll Section
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute("href");
//         const target = document.querySelector(targetId);
//         if (target) {
//             target.scrollIntoView({ behavior: "smooth" });
//         }
//     });
// });