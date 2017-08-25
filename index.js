'use strict';

const STORE = {
  listItems: 
  [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ], 
  editItem: null
};

function generateItemElement(item, itemIndex, template) {
  
  let elementString = ''
  if(STORE.editItem === null){
    elementString =`<button class='shopping-item-toggle js-item-toggle'>
                        <span class='button-label'>check</span>
                      </button>
                      <button class='shopping-item-edit js-item-edit'>
                      <span class="button-label">edit</span>
                      </button>
                      <button class='shopping-item-delete js-item-delete'>
                        <span class='button-label'>delete</span>
                      </button>`;
    $('#multipurposeLabel').text("Add an item");
    $('#multipurposeButton').text("Add item");
  }
  else {
    $('.js-shopping-list-entry').val(STORE.listItems[STORE.editItem].name);
    $('#multipurposeLabel').text("Edit name");
    $('#multipurposeButton').text("Save");
  }
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">`


          +
          elementString

          +

       `</div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element" + shoppingList);

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran'+ STORE.listItems[STORE.editItem]);
  // console.log(STORE.editItem);
  const tempSL = STORE.listItems 
  const shoppingListItemsString = STORE.editItem === null ? generateShoppingItemsString(STORE.listItems) : generateShoppingItemsString([STORE.listItems[STORE.editItem]]);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.itemList.push({name: itemName, checked: false});
}

function alterItemOnShoppingList(itemName) {
  console.log(`Editing "${itemName}" on shopping list`);
  STORE.listItems[STORE.editItem].name = itemName; 
  STORE.editItem = null; 
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    // add fork based on which button was clicked
      event.preventDefault();
    if(STORE.editItem === null){
      console.log('`handleNewItemSubmit` ran');
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      addItemToShoppingList(newItemName);
      renderShoppingList();
    }
    else {
      const editedItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      alterItemOnShoppingList(editedItemName); 
      renderShoppingList();
    }
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.listItems[itemIndex].checked = !STORE.listItems[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
  // delete it
  // get id
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // remove from STORE
    STORE.listItems.splice(itemIndex,1);
    // render
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}

function handleEditItemClicked() {
  // Listen for when users want to edit an item and 
  $('.js-shopping-list').on('click', `.js-item-edit`, event => {
   // get id
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.editItem = itemIndex; 
    renderShoppingList();

    // edit object within store 
    // set editItem to null
    // remove selected input
    // render list
  });
  console.log('`handleDeleteItemClicked` ran');
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
}

$(handleShoppingList);