// http://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values

var text = "Text\xa0to animate";
// trailing space won't be visible thus not underlined
var textWithHardSpaces = text.replace(/\s/g, '\u00a0');

var elem = document.getElementById('anim');
var cursor = document.getElementById('cursor');

var stop = [];
var tickLower = 100;
var tickUpper = 300;
var spaceDelay = 50;
var delayAfterSpaceBeforeWord = 200;
var resumeCursor;

function generateTicks(text) {
  var ticks = [];
  for (var i = 0; i < textWithHardSpaces.length; i++) {
    var rand = textWithHardSpaces[i] === ' '? spaceDelay: getRandomInt(tickLower, tickUpper);

    if(i === 0) {
      ticks[i] = rand;
    } else {
      // add delay before new word
      if(textWithHardSpaces[i] !== '\xa0' && textWithHardSpaces[i - 1] === '\xa0') {
        rand = rand + delayAfterSpaceBeforeWord;
      }
      ticks[i] = ticks[i - 1] + rand;
    }
    // console.log(textWithHardSpaces[i], ticks[i]);
  }
  return ticks;
}


function animateText() {
  resetAnimation();
  var ticks = generateTicks();

  cursor.classList.remove("blink");
  for (var i = 0; i < textWithHardSpaces.length; i++) {
    stop[i] = setTimeout(function(j) {
      elem.innerHTML += textWithHardSpaces[j];
    }, ticks[i], i);
  }
  resumeCursor = setTimeout(function(j) {
    cursor.classList.add("blink");
  }, ticks[ticks.length - 1] + 500);
}

function resetAnimation() {
  for (var i = 1; i < stop.length; i++) {
      clearTimeout(stop[i]);
  }
  elem.innerHTML = '';
}

// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
