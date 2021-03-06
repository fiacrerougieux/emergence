//const s = ( p ) => {
//
//  x = 100; 
//  y = 100;
//
//  p.setup = function() {
//    p.createCanvas(700, 410);
//  };
//
//  p.draw = function() {
//    p.background(0);
//    p.fill(255);
//    p.rect(x,y,50,50);
//  };
//};

const s = ( p ) => {
  p.alive = [];
  p.resetalive = [];
  p.aliveTemp = [];
  p.maxDistance;
  p.spacer;
  p.rule;
  p.ruleN = 90;

  p.setup = function() {
    p.createCanvas(720, 600);
    p.spacer = 6;
    p.init();
    p.reset();
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.frameRate(20);
  }

  p.draw = function() {
    p.fill(20,20,20);
    p.rect(-2, -2, p.width+4, p.height+4);
    p.stroke(0,0,0);
    p.fill(0,150,0);
    p.display();
    p.applyRule();
  }

  p.init = function() {
      for (x = 0; x < (p.width/p.spacer); x += 1) {
      p.alive[x] = []; // create nested array
      p.aliveTemp[x] = []
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = 0;
        p.aliveTemp[x][y] = 0;
      }
    }
  }

  p.reset = function() {
    p.clearScreen();
    p.insertLife();
  }

  p.clearScreen = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.alive[x][y] = 0;
      }
    }
  }

  p.display = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
        for (y = 0; y < (p.height/p.spacer); y += 1) {
          if (p.alive[x][y] ==1) {
            p.square(x*p.spacer, y*p.spacer,p.spacer*0.8,p.spacer*0.2);
          }
        }
      }
  }

  p.applyRule = function() {
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        p.aliveTemp[x][y] = p.alive[x][y];
      }
    }
    p.simHeight = p.alive[0].length;
    p.simLength = p.alive.length;
    for (y = 0; y < p.simHeight; y += 1) {
      for (x = 0; x < p.simLength; x++) {
        // Any live cell with fewer than two live neighbours dies, as if by underpopulation
          if((p.alive[x][y]==1)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])<(2))) {p.aliveTemp[x][y]=0}
        // Any live cell with two or three live neighbours lives on to the next generation
          if((p.alive[x][y]==1)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(2||3))) {p.aliveTemp[x][y]=1}
        // Any live cell with more than three live neighbours dies, as if by overpopulation
          if((p.alive[x][y]==1)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])>(3))) {p.aliveTemp[x][y]=0}
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
          if((p.alive[x][y]==0)
            &&((p.alive[(x-1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x-1+p.simLength)%p.simLength][y]
            +p.alive[(x-1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight]
            +p.alive[x][(y+1+p.simHeight)%p.simHeight]
            +p.alive[x][(y-1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][(y+1+p.simHeight)%p.simHeight]
            +p.alive[(x+1+p.simLength)%p.simLength][y]
            +p.alive[(x+1+p.simLength)%p.simLength][(y-1+p.simHeight)%p.simHeight])==(3))) {p.aliveTemp[x][y]=1}
      }
    }
    for (x = 0; x < (p.width/p.spacer); x += 1) {
      for (y = 0; y < (p.height/p.spacer); y += 1) {
        // Outside area cell disapear
       p.alive[x][y] = p.aliveTemp[x][y];
      }
    }
  }

  p.insertLife = function(lifeformInstance=hammerhead,xOffset = p.int(p.width/p.spacer/2), yOffset = p.int(p.height/p.spacer/2)) {
      for (x = 0; x < lifeformInstance.length; x += 1) {
      for (y = 0; y < lifeformInstance[0].length; y += 1) {
        p.alive[xOffset+x-p.int(lifeformInstance.length/2)][yOffset+y-p.int(lifeformInstance[0].length/2)] = lifeformInstance[x][y];
      }
    }
  }
}

myp5 = new p5(s, 'canvas1');