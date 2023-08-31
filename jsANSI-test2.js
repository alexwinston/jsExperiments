import { jsANSI, Text, rgba } from './jsANSI-WebGL.js'
import anime from './anime.es.js';

var ansi = new jsANSI(document.getElementById('canvas'), 15, 4)
ansi.grid = []
for (var i = 0; i < ansi.columns; i++) {
    ansi.grid[i] = []
    for (var j = 0; j < ansi.rows; j++)
        ansi.grid[i][j] = { scale: 0 }
}

var text = new Text('Test', 2, 2)
ansi.add(text)

anime({
    targets: text,
    x: [text.x, ansi.columns - 5],
    round: 1,
    delay: 500,
    direction: 'alternate',
    loop: true,
    update: function() {
        ansi.draw(false)
    }
});

function between(x, min, max) {
    return x > min && x <= max;
}
  
anime({
    targets: ansi.grid,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    direction: 'alternate',
    loop: true,
    delay: anime.stagger(200, {grid: [ansi.rows, ansi.columns], from: 'center'}),
    update: function() {
        for (var x = 0; x < ansi.columns; x++) {
            for (var y = 0; y < ansi.rows; y++) {
                var scale = ansi.grid[x][y].scale
                var char = '';
                if (scale > 0.2 && scale <= 0.4) {
                    char = '░'
                } else if (between(scale, 0.4, 0.6)) {
                    char = '▒'
                } else if (between(scale, 0.6, 0.8)) {
                    char = '▓'
                } else if (between(scale, 0.8, 1.0)) {
                    char = '█'
                }
                ansi.buffer(char.charCodeAt(0), x, y, { color: rgba(0,170,0,1), backgroundColor: rgba(50,170,255,1) })
            }
        }
        text.dirty = true
        // TODO??? Include ignoreDirty parameter for draw
        ansi.draw(false)
    }
});