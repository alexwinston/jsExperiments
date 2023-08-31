import { jsANSI, Text, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var easingNames = [
    'easeInQuad',
    'easeInCubic',
    'easeInQuart',
    'easeInQuint',
    'easeInSine',
    'easeInExpo',
    'easeInCirc',
    'easeInBack',
    'easeOutQuad',
    'easeOutCubic',
    'easeOutQuart',
    'easeOutQuint',
    'easeOutSine',
    'easeOutExpo',
    'easeOutCirc',
    'easeOutBack',
    'easeInBounce',
    'easeInOutQuad',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInOutSine',
    'easeInOutExpo',
    'easeInOutCirc',
    'easeInOutBack',
    'easeInOutBounce',
    'easeOutBounce',
    'easeOutInQuad',
    'easeOutInCubic',
    'easeOutInQuart',
    'easeOutInQuint',
    'easeOutInSine',
    'easeOutInExpo',
    'easeOutInCirc',
    'easeOutInBack',
    'easeOutInBounce',
  ]

var ansi = new jsANSI(document.getElementById('canvas'), 50, 20)

for (var i = 0; i < easingNames.length; i++) {
    var easingText = new Text('-', i, 0)
    ansi.add(easingText)
    anime({
        targets: easingText,
        y: [ansi.rows - 1],
        round: 1,
        direction: 'alternate',
        loop: true,
        delay: 100,
        endDelay: 100,
        duration: 1000,
        easing: easingNames[i],
        update: function(e) {
            if (e.id === 0)
                ansi.draw()
        }
    })
}

var text = new Text('Test', 5, 10)
var text2 = new Text('Test', -3, 10)
ansi.add(text)
ansi.add(text2)
ansi.draw()

anime({
    targets: text,
    keyframes: [
      {y: 3},
      {x: 35},
      {y: 18},
      {x: 5},
      {y: 10}
    ],
    round: 1,
    delay: 200,
    duration: 4000,
    easing: 'easeOutBounce',
    loop: true,
    update: function() {
        // ansi.draw()
    }
});

anime({
    targets: text2,
    keyframes: [
      {y: 1},
      {x: 49},
      {y: 19},
      {x: -3},
      {y: 10}
    ],
    round: 1,
    duration: 4000,
    easing: 'easeOutBounce',
    loop: true,
    update: function() {
        // ansi.draw()
    }
});