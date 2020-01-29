var gameCount = true;
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});


$(document).ready(function () {
  $("#results-display").hide();
  $("#main-game").hide();
  $("#previousQuestion").hide();
  $("#nextQuestion").hide();
  $("#finish").hide();
});

var quesionIndex;
var gameTimer;
var quizTime = 60; //seconds
var questionObject = [
  {
    question: `What will the output of the following code be? ` +
      `<br><code class="code">let a = 8<br>let b = 6 <br>let c = 9<br>console.log(a*(b+c))</code>`,
    answers: [
      { ansID: 1000, answer: "23" },
      { ansID: 1001, answer: "57" },
      { ansID: 1002, answer: "120" },
      { ansID: 1003, answer: "12" },
    ],
    correct: 1002,
    selected: null,
    // reason: "It's Juneau, which still has a population of less than 33,000. Yikes."
  }, {
    question: `What type of html tag do you use in the HTML head to reference a CSS stylesheet?`,
    answers: [
      { ansID: 1003, answer: "script tag" },
      { ansID: 1004, answer: "link tag" },
      { ansID: 1005, answer: "html tag" },
      { ansID: 1006, answer: "header tag" },
    ],
    correct: 1004,
    selected: null,
    // reason: "Alexander Hamilton was a major contrinutor to the strucure of the formative years of the US government. Arguably his largest contribution, apart from being a major contributor to maturing the constitution itself, was managing and growing the fledgling US credit system."
  }, {
    question: `What will the following code output be? ` + `<br><code>const myVar = "zed"<br>let MyNextVar = 30<br><myVar = 'myVar string'<br>console.log(myVar + " " + (myNextVar))</code>`,
    answers: [
      { ansID: 1007, answer: "TypeError: Assignment to constant variable" },
      { ansID: 1008, answer: "Undefined" },
      { ansID: 1009, answer: "zed30" },
      { ansID: 1010, answer: "zed 30" },
    ],
    correct: 1010,
    selected: null,
    // reason: "Martin Van Buren was born in December 5th, 1782 in Kinderhook, NY. The first president not born under British rule and the first president not of British ancestry. He was of Dutch lineage."
  }, {
    question: `What will the following Javascript output be? ` + `<br><code>var a, b = ""<br>a = 'string'<br>b = '90'<br>const d = 30<br>console.log(a + " - " + b + d)</code>`,
    answers: [
      { ansID: 1011, answer: `'Undefined'` },
      { ansID: 1012, answer: `'string-120'` },
      { ansID: 1012, answer: `'string - 9030'` },
      { ansID: 1013, answer: `'TypeError: Must be string not integer'` },
    ],
    correct: 1012,
    selected: null,
    // reason: "Vermont was the 14th state which joined on March 4th, 1791."
  }, {
    question: `Please calculate the following output: ` + `<br><code>user = 'Johnny'<br>for (i = 0; i < user.length; i++) {<br>&nbsp&nbsp&nbsp&nbsp console.log("User : " + i + " : ")<br>}<br><br><br>    </code>`,
    answers: [
      { ansID: 1014, answer: `'User 5'` },
      { ansID: 1015, answer: `'Undefined Undefined Undefined Undefined Undefined'` },
      { ansID: 1016, answer: `'User: 1 : User: 2 : User: 3 : User: 4 : User: 5'` },
      { ansID: 1017, answer: `'User: 0 : User: 1 : User: 2 : User: 3 : User: 4'` },
    ],
    correct: 1017,
    selected: null,
    // reason: "Eastern, Central, Mountain, Pacific, Alaskan, and Hawaii-Aleutian"
  },
];

function populateQuestionDetails() {
  $("#answer-response").hide();
  $("#question-container").empty();
  $("#answers-container").empty();
  $("#answer-response").empty();
  $("#question-container").html(questionObject[quesionIndex].question);
  var quesAnswers = questionObject[quesionIndex].answers;
  for (var i = 0; i < quesAnswers.length; i++) {
    $("#answers-container").append('<div class="answer" data-content="' + quesAnswers[i].ansID + '">' + quesAnswers[i].answer + '</div>');
  }
  renderQuestionControls();
}

function renderQuestionControls() {
  if (quesionIndex === 0) {
    $("#previousQuestion").hide();
    $("#nextQuestion").show();
  } else if (quesionIndex === questionObject.length - 1) {
    $("#previousQuestion").show();
    $("#nextQuestion").hide();
    $("#finish").show();
  } else {
    $("#previousQuestion").show();
    $("#nextQuestion").show();
  }
  // console.log("quesionIndex: " + quesionIndex + " length: " + questionObject.length);
}

function getPreviousQuestion() {
  quesionIndex--;
  populateQuestionDetails();
}

function getNextQuestion() {
  quesionIndex++;
  populateQuestionDetails();
}

function processAnswer() {
  var selectedAnsID = parseInt($(this).attr("data-content"));
  var correctAnsID = questionObject[quesionIndex].correct;

  if (selectedAnsID === correctAnsID) {
    $("#answer-response").html("<h4>Correct!</h4>");
  } else {
    quizTime = quizTime - 5
    $("#answer-response").html("<h4>Sorry that's not right.<b> Lose 5 seconds...</h4>");
  }

  // $("#answer-response").append(questionObject[quesionIndex].reason);
  $("#answer-response").show();


  questionObject[quesionIndex].selected = selectedAnsID;

  // console.log(questionObject[quesionIndex].selected);
}



function countDown() {
  quizTime--;
  $("#timeContainer").html(quizTime);
  if (quizTime === 0) {
    clearInterval(gameTimer);
    if (gameCount) {
      endGame();
    }
  }
}

$("#start").on("click", function () {
  $("#splash-screen").hide();
  $("#main-game").show();
  gameTimer = setInterval(countDown, 1000);
  quesionIndex = 0;
  populateQuestionDetails(quesionIndex);
});

$(document).on("click", ".answer", processAnswer);
$("#previousQuestion").on("click", getPreviousQuestion);
$("#nextQuestion").on("click", getNextQuestion);
$("#finish").on("click", endGame);


function endGame() {

  $("#main-game").hide();
  $(".jumbotron").hide()

  processResults();
  $("#results-display").show();

  let yourTime = parseInt(quizTime)
  console.log("Completion Time: " + yourTime)
  $("#yourTime").text(yourTime)
  $("#yourTimeModal").text(yourTime)

  let highScore = yourTime // change this to yourScore
  let score = JSON.parse(localStorage.getItem('score')) || []

  const renderscore = _ => {
    document.getElementById('score').innerHTML = ''
    for (let i = 0; i < score.length; i++) {
      let itemElem = document.createElement('li')
      // itemElem.className = score[i].score ? 'complete' : 'incomplete'

      itemElem.innerHTML = `Name: <b>${score[i].text}</b>  -  Highscore: <b>${score[i].highScore}</b>`
      document.getElementById('score').append(itemElem)
    }
  }

  document.getElementById('addItem').addEventListener('click', event => {
    event.preventDefault()
    score.push({
      text: document.getElementById('item').value,
      highScore: highScore
    })
    localStorage.setItem('score', JSON.stringify(score))
    renderscore()
    document.getElementById('item').value = ''
  })
  renderscore()
}



$("#restart").on("click", function () {
  gameCount = true;
  window.location.reload()
});

function processResults() {
  var status;
  var correct = 0;
  var incorrect = 0;
  // var score = 0;

  for (var i = 0; i < questionObject.length; i++) {
    if (questionObject[i].correct === questionObject[i].selected) {
      correct++;
      status = "Correct!";
    } else {
      incorrect++;
      status = "Incorrect!";
    }
    if (questionObject[i].selected !== null) {
      var selectedText = "NA";
      for (var j = 0; j < questionObject[i].answers.length; j++) {
        if (questionObject[i].answers[j].ansID === questionObject[i].selected) {
          selectedText = questionObject[i].answers[j].answer;
          break;
        }
      }
    } else {
      selectedText = "--";
    }
    var correctText = "NA";
    for (var k = 0; k < questionObject[i].answers.length; k++) {
      if (questionObject[i].answers[k].ansID === questionObject[i].correct) {
        correctText = questionObject[i].answers[k].answer;
        break;
      }
    }

    $("#result-rows").append("<tr><td>" + questionObject[i].question + "</td><td>" + selectedText + "</td><td>" + correctText + "</td><td>" + status + "</td></tr>");

    // <b> Your Time: </div></b>
  }
}