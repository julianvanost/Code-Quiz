//array of highscores, .push method to array each time the quiz is taken
//timer, use
let countdown = 100
document.addEventListener('click', function (event) {
  if (event.target.className === "numBtn") {
    count += parseInt(event.target.value)
    document.getElementById('count').textContent = count
  }
})


$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});