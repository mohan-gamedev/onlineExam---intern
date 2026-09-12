const quizData = [
    { question: "How much 2+2 ?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is full form of JS?", options: ["script", "node", "javascript", "python"], answer: "javascript" },
    { question: "What is var x=; ?", options: ["NaN", "x", "error", "undefined"], answer: "undefined" }
];

let timeLeft = 60;
let timerInterval;

function startExam() {
    document.getElementById("quiz-container").style.display = "block";
    document.querySelector(".btn-success").style.display = "none";
    loadQuiz();
}

function startTimer() {
    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("mb-3");
        questionDiv.innerHTML = `<b>${index + 1}. ${q.question}</b>`;
        q.options.forEach(option => {
            questionDiv.innerHTML += `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="question${index}" value="${option}" onclick="updateProgress()">
                            <label class="form-check-label">${option}</label>
                        </div>`;
        });
        quizContainer.appendChild(questionDiv);
    });
    startTimer();
}

function submitQuiz() {
    clearInterval(timerInterval);
    let score = 0;
    quizData.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const questionDiv = document.querySelectorAll(".mb-3")[index];
        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
                questionDiv.classList.add("correct");
            } else {
                questionDiv.classList.add("incorrect");
            }
        }
        document.querySelectorAll(`input[name="question${index}"]`).forEach(input => input.disabled = true);
    });
    document.getElementById("result").innerText =` You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
    loadQuiz();
    document.getElementById("result").innerText = "";
}

function updateProgress() {
    let answered = document.querySelectorAll("input:checked").length;
    document.getElementById("progress").innerText =` Answered: ${answered} / ${quizData.length}`;
}
