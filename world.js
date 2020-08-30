// 20x20
const worldMatrix = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0],
  [4,0,0,0,0,6,6,0,0,0,0,0,0,5,0,0,0,0,0,0],
  [4,4,0,0,6,6,6,0,0,0,4,4,4,5,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

initWorldMatrix(worldMatrix);


function initWorldMatrix(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.tileType = matrix[row][col];
      tile.dataset.tileCoordinateX = col;
      tile.dataset.tileCoordinateY = row;
      document.querySelector('.world-matrix').appendChild(tile);
    }
  }
}

function deleteWorldMatrix(matrix) {
  for (let row = 0; row < matrix.length; row++) {
  document.querySelector('.world-matrix').childNodes.forEach(node => {
    node.remove(node);
  });
}
}

//  - - - - - - - - - - - - - //

const toolElements = document.querySelectorAll('.tool');
const tileElements = document.querySelectorAll('.tile');
const invElements = document.querySelectorAll('.inventory-item-wrapper');
let currentTool = '';
let currentTileType = 0;
let inventoryTileType = -1;




toolElements.forEach(tool => tool.addEventListener('click', chooseTool));
invElements.forEach(inv => inv.addEventListener('click', chooseInvItem))



// when a tool is clicked, sets the current tool to be the tool name (ex.currentTool='axe')
// sets this tool to be active, and other tools must be not active
function chooseTool(e) {
  currentTool = e.currentTarget.children[0].dataset.toolName;
  setAllToolsNotActive();
  e.currentTarget.dataset.toolStatus = 'active';
  tileElements.forEach(tile => tile.addEventListener('click', chooseTile));
}

function setAllToolsNotActive() {
  toolElements.forEach(tool => {
    tool.dataset.toolStatus = 'not-active';
  });
} 

// when a tile is clicked, sets the current tileType to be the tileType number (ex.currentTileType='2')
// checks if the tool it was clicked with is matching
// if not - blink background red
// if is matching - remmove the tile and place it at the head of the inventory
function chooseTile(e) {
  currentTileType = e.currentTarget.dataset.tileType;
  let matchingTool = checkIfToolMatchesTile(); // returns boolean true or false
  if(!matchingTool) {
    document.querySelector('.tool[data-tool-status="active"]').style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector('.tool[data-tool-status="active"]').style.backgroundColor = "";
    }, 200);
  }
  else {
    let inventoryFull = isInventoryFull();
    if(!inventoryFull) {
      removeTileFromWorld(e.currentTarget);
      pushToInventory(currentTileType);
    }
  }
}

function checkIfToolMatchesTile() {
  if (currentTool==='pickaxe') {
    if(currentTileType === '4') {
      return true;
    }
  }
  else if (currentTool==='shovel') {
    if(currentTileType === '2' || currentTileType === '3') {
      return true;
    }
  }
  else if (currentTool==='axe') {
    if(currentTileType === '5' || currentTileType === '6') {
      return true;
    }
  }
  return false;
}

function removeTileFromWorld(tileDivToRemove) {
  tileDivToRemove.dataset.tileType = '0';
}

// every node element if is not empty (if has a child), clones the child to the element before and removes it's child. 
// pushes the new tile element as a child to the last element of our node list.
function pushToInventory(tileTypeToPush) {
  let pushedTile = document.createElement('div');
  pushedTile.dataset.tileType = tileTypeToPush;

  for (let i = 0; i < invElements.length; i++) {
    if(invElements[i].hasChildNodes()) {
      const clone = invElements[i].firstElementChild.cloneNode(true);
      invElements[i-1].appendChild(clone);
      invElements[i].removeChild(invElements[i].firstElementChild);
      invElements[i-1].classList.add('stack-tail');
    }
  }
  invElements[4].appendChild(pushedTile);
  invElements[4].classList.add('stack-head');
}


function isInventoryFull() {
  if(invElements[0].hasChildNodes()) {
    document.querySelector('.inventory-wrapper').style.boxShadow = "inset 0px 0px 0px 5px rgba(158,45,14,1)"
    setTimeout(() => {
      document.querySelector('.inventory-wrapper').style.boxShadow = "";
    }, 200);
    return true;
  }
  else return false;
}


function chooseInvItem(e) {
  inventoryTileType = e.currentTarget.children[0].dataset.tileType;
  e.currentTarget.dataset.invItem = 'clicked';
  setAllToolsNotActive();
  tileElements.forEach(tile => tile.addEventListener('click', placeInvItem));
}

function placeInvItem(e) {
  currentTileType = e.currentTarget.dataset.tileType;
  // can be placed only on empty space
  if(currentTileType === '0' || currentTileType === '1') {
    e.currentTarget.dataset.tileType = inventoryTileType;
  }
  /* if (inventoryTileType === -1) {
    let coordinateX = e.currentTarget.dataset.tileCoordinateX;
    let coordinateY = e.currentTarget.dataset.tileCoordinateY;
    console.log(coordinateX + ',' + coordinateY);
    if (worldMatrix[coordinateX][coordinateY] === 0) {
      e.currentTarget.dataset.tileType = '0';
    }
    if (worldMatrix[coordinateX][coordinateY] === 1) {
      e.currentTarget.dataset.tileType = '1';
    }
  } */
  removeFromInventory();
}

function removeFromInventory() {
  invElements[4].firstChild.remove();
  inventoryTileType = 0;
  currentTileType = 0;
  currentTool = '';
  for (let i = invElements.length-1; i > 0; i--) {
      const clone = invElements[i-1].firstElementChild.cloneNode(true);
      invElements[i].appendChild(clone);
      invElements[i-1].removeChild(invElements[i-1].firstElementChild);
  }
}





/*
(e) => {
  currentTool = e.currentTarget.children[0].dataset.toolName;
  e.currentTarget.dataset.toolStatus = 'active';
  console.log(e.currentTarget);
  // console.log(e.currentTarget.children[0].dataset.toolName);
} 

function chooseTool(e) {
  currentTool = e.currentTarget;
  console.log(currentTool);
} */




// - - - - - - - menu buttons - - - - - - - - //

document.querySelector('#reset-btn').addEventListener('click', () => {
  deleteWorldMatrix(worldMatrix)
  initWorldMatrix(worldMatrix);
});

document.querySelector('#exit-btn').addEventListener('click', () => location.href = "./index.html"
);