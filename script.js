let mealTypes = [];
let intolerances = [];
let cuisines = [];
let numBtns = 0;
let menuOpen = false;

const filter = document.getElementById('filter')
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')
const allBtns = document.querySelectorAll('.btn'); 

// Display or hide the side menu
function openMenu(){
    menuOpen = true;
    overlay.style.display = 'block'
    sidebar.style.width = '250px'
}
function closeMenu(){
    menuOpen = false;
    overlay.style.display = 'none'
    sidebar.style.width = '0px'
}

//Lets the filter button operate the menu
filter.addEventListener('click', function () {
    if(!menuOpen) {
        openMenu()
    }
    else {
        closeMenu()
    }
})
overlay.addEventListener('click', function () {
    if(menuOpen) {
        closeMenu()
    }
})

// Create the drop-down function for the filter categories
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// Function to fetch elements by the textcontent 
function getElementsByText(str, tag = 'a') {
    return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
  }


// Fetch information from the pressed filter button
function btnClick() {
    var btnText = this.textContent || this.innerText;
    var group = this.parentNode.parentNode.id;    

    if (group === "mealTypes"){
        resetButton(mealTypes, btnText, group);
    }
    else if (group === "intolerances") {
        resetButton(intolerances, btnText, group);
    }
    else if (group === "cuisines") {
        resetButton(cuisines, btnText, group);
    }
}

// Create or remove button from the list of chosen filters
function resetButton(array, btnName, group) {  
    if (array.includes(btnName)) {
        var element = getElementsByText(btnName, 'button');
        var id = element[1].id
        var elm = document.getElementById(id)
        elm.remove();
        const index = array.indexOf(btnName);
        array.splice(index, 1);
    }  
    else {
        createButton(btnName, group)
    }  
}

// Reset chosen filters
function clearFilters() {
    allBtns.forEach(button => {
        var style = getComputedStyle(button);
        var clr = style.backgroundColor;
        if (clr === 'rgb(255, 165, 0)') {
            button.style.backgroundColor = '';
        }        
    })    
    removeFilterButtons(mealTypes);
    removeFilterButtons(intolerances);
    removeFilterButtons(cuisines);
}

// Removes all chosen filters and clears the arrays
function removeFilterButtons(filterArray) {
    for (j = 0; j < filterArray.length; j++ )
    {
        var element = getElementsByText(filterArray[j], 'button');
        var id = element[1].id;
        var elm = document.getElementById(id)
        elm.remove();
    }
    filterArray.length = 0;
}

// Search button. Prints the arrays to the console
function search(){
    mealTypes.forEach(element => console.log(element));
    intolerances.forEach(element => console.log(element));
    cuisines.forEach(element => console.log(element));
}

// Create chosen filter button and add the context to array
function createButton(txt, group) {
    if (group === "mealTypes") {
        mealTypes.push(txt);
    }
    else if (group === "intolerances") {
        intolerances.push(txt);
    }
    else if (group === "cuisines") {
        cuisines.push(txt);
    }
    let knapp = document.createElement("button");
    knapp.className = "knapp";
    knapp.id = "test" +numBtns;
    numBtns++;
    knapp.textContent = txt;
    var div = document.getElementById('val');
    div.appendChild(knapp);
}

// Changes the color of the chosen filter buttons
function changeButtonColor() {
    allBtns.forEach(btn => {
        btn.addEventListener('click', function onClick(){
     
         var style = getComputedStyle(btn);
         var clr = style.backgroundColor;
         let color = btn.style.backgroundColor;
         if (clr === 'rgb(255, 165, 0)') {
             btn.style.backgroundColor = ''; 
         }
         else {
             btn.style.backgroundColor = 'orange'; 
         }         
      })
     })
}
changeButtonColor();

