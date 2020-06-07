function fspl(distance) {
  let a = 20 * Math.log10(distance) + 20 * Math.log10(2400000000) - 147.55;
  return -a.toFixed(1);
}

let recalc = document.getElementById('recalc-button');
let newHeightInput = document.getElementById('height-input');
let newWidthInput = document.getElementById('width-input');
let newHeigh, newWidth;

let routerXInput = document.getElementById('x-input');
let routerYInput = document.getElementById('y-input');
let routerXPosition, routerYPosition;

let wallStartXInput = document.getElementById('wall-start-x-input');
let wallStartYInput = document.getElementById('wall-start-y-input');
let wallEndXInput = document.getElementById('wall-end-x-input');
let wallEndYInput = document.getElementById('wall-end-y-input');
let wallStartX, wallStartY, wallEndX, wallEndY;

let getD = (routerX, routerY, wallStartX, wallEndX, wallStartY, wallEndY) => (routerX - wallStartX) * (wallEndY - wallStartY) - (routerY - wallStartY) * (wallEndX - wallStartX);
let buildShadow = (array, wallStarX, wallEndX, wallStartY, wallEndY, D, width, height, routerYPosition, routerXPosition) => {
  if (wallStarX == wallEndX) {
    //if wall vertical
    if (D > 0) {
      //router right

      if (routerYPosition >= wallEndY) {
        let k = wallStartY;
        //main +z
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = 0; j < wallStarX; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        for (let i = 0; i <= wallEndY; i++) {
          k--;
          if (k >= 0) {
            for (let j = 0; j < wallStarX - k; j++) {
              array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
            }
          }
        }
      }

      if (routerYPosition != wallEndY && routerYPosition != wallStartY
        && routerYPosition > wallStartY && routerYPosition < wallEndY) {
        //main +z
        let k = wallStartY;
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = 0; j < wallStarX; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        //top stairs
        for (let i = 0; i <= wallEndY; i++) {
          k--;
          if (k >= 0) {
            for (let j = 0; j < wallStarX - k; j++) {
              array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
            }
          }
        }
        //bottom stairs
        let n = 0;
        for (let i = wallEndY + 1; i < height; i++) {
          n++;
          for (let j = 0; j < wallStarX + 1 - n; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
      }

      if (routerYPosition <= wallStartY) {
        //main +z
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = 0; j < wallStarX; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        //bottom stairs
        let k = 0;
        for (let i = wallEndY + 1; i < height; i++) {
          k++;
          for (let j = 0; j < wallStarX + 1 - k; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
      }
    } else if (routerXPosition < wallStarX) {
      //router left
      if (routerYPosition >= wallEndY) {
        //main +z
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = wallStarX + 1; j < width; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        //top stairs
        let k = wallStartY;
        for (let i = 0; i <= wallStartY; i++) {
          k--;
          if (k >= 0) {
            for (let j = wallStarX + 1 + k; j < width; j++) {
              array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
            }
          }
        }
      }

      if (routerYPosition != wallEndY && routerYPosition != wallStartY
        && routerYPosition > wallStartY && routerYPosition < wallEndY) {
        //main +z
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = wallStarX + 1; j < width; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        //top stairs
        let k = wallStartY;
        for (let i = 0; i <= wallStartY; i++) {
          k--;
          if (k >= 0) {
            for (let j = wallStarX + 1 + k; j < width; j++) {
              array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
            }
          }
        }
        //bottom stairs 
        let n = 0;
        for (let i = wallEndY + 1; i < height; i++) {
          n++;
          for (let j = wallStarX + n; j < width; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
      }

      if (routerYPosition <= wallStartY) {
        //main +z
        for (let i = wallStartY; i <= wallEndY; i++) {
          for (let j = wallStarX + 1; j < width; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
        //bottom stairs
        let n = 0;
        for (let i = wallEndY + 1; i < height; i++) {
          n++;
          for (let j = wallStarX + n; j < width; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
      }
    }
  }
  if (wallEndY == wallStartY) {
    //if wall horizontal
    if (D < 0) {
      //router bottom
      let k = wallStartY + 1;
      for (let i = 0; i < wallEndY; i++) {
        k--;

        if (routerXPosition >= wallEndX) {
          for (let j = wallStarX - k; j <= wallEndX; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }

        } else if (wallEndX != routerXPosition && wallStarX != routerXPosition
          && routerXPosition > wallStarX && routerXPosition < wallEndX) {
          for (let j = wallStarX - k; j <= wallEndX + k; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }

        } else if (wallStarX >= routerXPosition) {
          for (let j = wallStarX; j <= wallEndX + 1 + k; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }

      }

    } else if (routerYPosition < wallStartY) {
      //router top
      let k = 0;
      for (i = wallStartY + 1; i < height; i++) {
        k++;
        if (routerXPosition >= wallEndX) {
          console.log('left =');
          for (j = wallStarX - k; j <= wallEndX; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        } else if (wallEndX != routerXPosition && wallStarX != routerXPosition
          && routerXPosition > wallStarX && routerXPosition < wallEndX) {
          console.log('=');
          for (j = wallStarX - k; j <= wallEndX + k; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }

        } else if (wallStarX >= routerXPosition) {
          console.log('r =');
          for (j = wallStarX; j < wallEndX + 1 + k; j++) {
            array[i][j] = 'z' + Number(array[i][j] - 4.44).toFixed(1)
          }
        }
      }
    }
  }
  return array;
}

let createBuildingArray = function (height, width) {
  let arr = new Array();
  for (let i = 0; i < height; i++) {
    arr[i] = [];
    for (let j = 0; j < width; j++) {
      arr[i][j] = 0
    }
  } return arr;
}

let calcDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(((Math.abs(x2 - x1) * 10) + 10), 2) + Math.pow(((Math.abs(y2 - y1) * 10) + 10), 2));
let checkIfRouter = (routerX, routerY, currentX, currentY) => routerX == currentX && routerY == currentY;

let initBuilding = function (routerX, routerY, width, height) {
  let array = createBuildingArray(height, width);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      array[i][j] = fspl(calcDistance(i, j, routerY, routerX));
    }
  }
  array[routerY][routerX] = 'X';
  return array;
}

let buildWall = function (array, wallStartX, wallEndX, wallStartY, wallEndY) {
  for (i = wallStartY; i <= wallEndY; i++) {
    for (j = wallStartX; j <= wallEndX; j++) {
      array[i][j] = 'w' + Number(array[i][j] - 4.44).toFixed(1);
    }
  }
  return array;
}

recalc.onclick = function buildMatrix() {
  let table = document.getElementById('tablet');
  if (table) {
    table.parentNode.removeChild(table);
  }
  newHeigh = newHeightInput.value;
  newWidth = newWidthInput.value;
  routerXPosition = Number(routerXInput.value);
  routerYPosition = Number(routerYInput.value);

  wallStartX = Number(wallStartXInput.value);
  wallStartY = Number(wallStartYInput.value);
  wallEndX = Number(wallEndXInput.value);
  wallEndY = Number(wallEndYInput.value);

  let init = initBuilding(routerXPosition, routerYPosition, newWidth, newHeigh);
  let withWall = buildWall(init, wallStartX, wallEndX, wallStartY, wallEndY);
  let D = getD(routerXPosition, routerYPosition, wallStartX, wallEndX, wallStartY, wallEndY);
  let withShadow = buildShadow(withWall, wallStartX, wallEndX, wallStartY, wallEndY, D, newWidth, newHeigh, routerYPosition, routerXPosition);

  let createRow = function (array) {
    let tr = document.createElement('tr');

    for (let i = 0; i < array.length; i++) {
      let td = document.createElement('td');
      let p = document.createElement('p');
      p.innerHTML = array[i];
      if (array[i][0] == 'w') {
        td.setAttribute('class', 'wall');
        p.innerHTML = array[i].substr(1);
      }
      if (array[i][0] == 'z') {
        td.setAttribute('class', 'attenuation');
        p.innerHTML = array[i].substr(1);
      }
      if (array[i] == 'X') {
        td.setAttribute('class', 'router');
      }
      td.append(p);
      tr.append(td);
    }
    return tr;
  }

  let convertArrayToTable = function (matrix) {
    table = document.createElement('table');
    table.setAttribute('id', 'tablet');
    for (let i = 0; i < matrix.length; i++) {
      let row = matrix[i];
      let tr = createRow(row);
      table.append(tr);
    }
    return table;
  }

  table = convertArrayToTable(withShadow, newWidth, newHeigh);
  document.getElementById('matrix').append(table);
}