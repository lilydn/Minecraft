# Landing page
- css backgroud 
- minecraft heading logo 
- start button (if there are more worlds add more buttons)

# World page
## HTML TASKS
two main divs:
- menu - will hold:
  - a reset button
  - an exit button (which leads back to the landing page)
  - tools area. Each tool will have:
    - a class of tool (basic tool css)
  - inventory area: include an empty div for one tile <br> // to do - expand the inventory
- world zone - a 2D matrix of numbers, each number represents a tile type: 
  - 0 - for sky 
  - 1 - for cloud
  - 2 - for soil 
  - 3 - for soil with grass
  - 4 - for stone
  - 5 - for tree trunk
  - 6 - for tree leaves


## JS TASKS
### variables:
- `currentTool` - holds what is the current tool the user holds
- `currentTileType` - holds what tile type is the last one clicked by the user
### functions:
- `initWorldMatrix()` - create the tile html elements 
- `renderWorld()` - go over each tile with 2 for loops, give each tile number a class of tile - which will determine basic tile css <br> and a data attribute of it's tile type, which will determine it's backround picture. <br> (data attributes)

  ```
  const tile = querySelectorAll("???");
  tile.setAttribute("data-type", "someType";
  or
  Using the dataset Property
  tile.dataset.tileType = matrix[row][col];
  ```
- `renderToolbox()` - give each tool box it's specific data attribute which will determine the tool. example:
  - data-tool-type: "axe"
  - data-tool-status: 
    -  => not active
    -  => active. the tool is chosen. blue background.
    -  =>  the red background for wrong tool will be set dynamicly  with JS and brought back to blue with setTimeout method.
- `chooseTool()` - when a tool is clicked: 
  - update `currentTool`.
  - set the attribute of 'data-tool-status'.
- `chooseTile()` - when a tile is clicked: 
  - if there is no current tool, do nothing.
  - if there is a current tool, update `currentTileType` and call the function `applyTool()`
- `applyTool()`:
  - if the current tile type does not match the current tool, blink the background of the tool red.
  - else, if the current tile type matches the current tool, call the function `removeTile()` and `pushToInventory()`



- `removeTile()`: set the tile type to be 0 
- `pushToInventory()`: the inventory works like a stack, and we always push to the end in this case. Every Node element if is not empty (if has a child) we clone the child to the element before it and remove it's child. For the first Node element we will just remove the child. <br> Then we push our new element as a child to the last element of our Node list.











