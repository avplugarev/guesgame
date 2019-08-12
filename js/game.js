const numDivs = 36;
const maxHits = 10;
let hits = 0;
let firstHitTime = 0;

function round() {
  //надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass ("target");
  $('.miss').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  //тут надо определять при первом клике firstHitTime
  if (firstHitTime === 0) {
    firstHitTime=getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
  //помечать target текущим номером
  else {
    $(divSelector).text(hits + 1)
  }
}

function endGame() {
  //спрятать игровое поле сначала
  $('#gameBoard').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $(".target").removeClass ("target");
  $('.miss').removeClass('miss');
}

function handleClick(event) {
  //убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $('.target').text('');
    round();
  }

  // как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass("miss");
  }
}

function init() {
  //заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $('#gameBoard').show();
    $("#win-message").addClass("d-none");
    $('.target').text('');
    hits=0;
    firstHitTime=0;
    totalPlayedSeconds=0;
    totalPlayedMillis=0;
    firstHitTime=getTimestamp();
    round();
  });
}

$(document).ready(init);
