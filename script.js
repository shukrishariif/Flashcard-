// Initialize contentArray from localStorage
var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Function to create and display a flashcard
const flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;

  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.my_answer;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    renderFlashcards();
  });

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    answer.style.display = (answer.style.display === "none") ? "block" : "none";
  });

  document.querySelector("#flashcards").appendChild(flashcard);
};

// Function to add a flashcard
const addFlashcard = () => {
  const question = document.querySelector("#question").value.trim();
  const answer = document.querySelector("#answer").value.trim();

  if (question && answer) {
    const flashcard_info = {
      'my_question': question,
      'my_answer': answer
    };

    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));
    renderFlashcards();
    document.querySelector("#question").value = "";
    document.querySelector("#answer").value = "";
    document.getElementById("create_card_section").style.display = "none";
  } else {
    alert("Please fill out both fields.");
  }
};

// Function to render flashcards from contentArray
const renderFlashcards = () => {
  const flashcardsContainer = document.querySelector("#flashcards");
  flashcardsContainer.innerHTML = ''; // Clear existing cards
  contentArray.forEach((flashcard, index) => {
    flashcardMaker(flashcard, index);
  });
};

// Event listeners for buttons
document.getElementById("save_card").addEventListener("click", addFlashcard);

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.removeItem('items');
  contentArray = [];
  renderFlashcards();
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card_section").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card_section").style.display = "none";
});

// Initial rendering of flashcards
renderFlashcards();
