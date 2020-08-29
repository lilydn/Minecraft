let currentTool = '';
let currentTileType = 0;
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
      document.querySelector('.world-matrix').appendChild(tile);
    }
  }
}