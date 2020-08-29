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
      tile.dataset.tileCoordinates = `[${row}][${col}]`;
      document.querySelector('.world-matrix').appendChild(tile);
    }
  }
}

//  - - - - - - - - - - - - - //

const toolElements = document.querySelectorAll('.tool');
const tileElements = document.querySelectorAll('.tile');
const invElements = document.querySelectorAll('.inventory-item-wrapper');
let currentTool = '';
let currentTileType = 0;




toolElements.forEach(tool => tool.addEventListener('click', chooseTool));
tileElements.forEach(tile => tile.addEventListener('click', chooseTile));




// when a tool is clicked, sets the current tool to be the tool name (ex.currentTool='axe')
// sets this tool to be active, and other tools must be not active
function chooseTool(e) {
  currentTool = e.currentTarget.children[0].dataset.toolName;
  setAllToolsNotActive();
  e.currentTarget.dataset.toolStatus = 'active';
}

function setAllToolsNotActive() {
  toolElements.forEach(tool => {
    tool.dataset.toolStatus = 'not-active';
  });
} 

// when a tile is clicked, sets the current tileType to be the tileType number (ex.currentTileType='2')
// checks if the tool that is was clicked with is matching
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
    removeTile(e.currentTarget);
    pushToInventory(currentTileType);
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

function removeTile(tileDivToRemove) {
  tileDivToRemove.dataset.tileType = '0';
}

// every node element if is not empty (if has a child), clones the child to the element before and removes it's child. 
// for the first Node element, just removes the child.
// push the new tile element as a child to the last element of our node list.
function pushToInventory(tileTypeToPush) {
  let pushedTile = document.createElement('div');
  pushedTile.dataset.tileType = tileTypeToPush;
  if(invElements[0].hasChildNodes()) {
    invElements[0].firstElementChild.remove();
  }
  for (let i = 1; i < invElements.length; i++) {
    if(invElements[i].hasChildNodes()) {
      const clone = invElements[i].firstElementChild.cloneNode(true);
      invElements[i-1].appendChild(clone);
      invElements[i].removeChild(invElements[i].firstElementChild);
      console.log(invElements[i]);
    }
  }
  invElements[4].appendChild(pushedTile);
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