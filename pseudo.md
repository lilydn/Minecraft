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
  ??
  Using the dataset Property
  ```
- `renderToolbox()` - give each tool box it's specific data attribute which will determine the tool. example:
  - data-tool-type: "axe"
  - data-tool-state: 
    - 0 => not active
    - 1 => active. the tool is chosen. blue background.
    - 2 => wrong. red background. <br> ~~To check: how to make it blink maybe better to dynamicly change with JS rather than CSS?~~
- `chooseTool()` - when a tool is clicked: 
  - update `currentTool` to e.
  - set the attribute of 'data-tool-state'.
- `chooseTile()` - when a tile is clicked: 
  - if there is no current tool, do nothing.
  - if there is a current tool, update `currentTileType` and call the function `applyTool()`
- `applyTool()`:
  - if the current tile type matches the current tool, call the function `removeTile()` and `addTileToInventory()`
  - else: call the function `wrongTool()`
- `wrongTool()`: ~~find a way to make the background blink red~~
- `removeTile()`: set the tile 
- `addTileToInventory()`:









