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
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.listItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.itemList.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {

    // add fork based on which button was clicked

    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
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
    editModeSetup(itemIndex);
    $('.js-shopping-list-entry').val(STORE[itemIndex].name);
  });
  console.log('`handleDeleteItemClicked` ran');
}

function handleSaveButtonClicked(){
  $('#editForm').on('click', '#multipurposeButton', event => {
  //  new handle button click
  //    read new name
  //    modify STORE element
  //    change static html back
  //  render

    const itemIndex = $('#js-shopping-list-form').attr('itIdx');
    console.log(itemIndex);
    const newItemName = $('.js-shopping-list-entry').val();

    renderShoppingList();
    addModeSetup();
  });

}

// function editModeSetup(itemIdx){

//   $('#js-shopping-list-form').attr('itIdx', `${itemIdx}`);
// }

// function addModeSetup(){
//   $('#multipurposeLabel').text("Add an item");
//   $('#multipurposeButton').text("Add item");
//   $('#editForm').attr('id', 'js-shopping-list-form');
// }

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
}

$(handleShoppingList);