"use strict";
let isAscendingSort = true;
let searchCategory = "company";
let lastElement ;
let buyElement = [];
let result = [];
let sumPrice = 0;

const carsDB = [
  {company : "Toyota"  , model : "Corolla" , color : "Blue"   , capacity : "4" , price : "22000$" , year : "2018" , gear : "Automatic" , fuel : "Gas"},
  {company : "Benz"    , model : "S500"    , color : "Black"  , capacity : "4" , price : "35000$" , year : "2023" , gear : "Automatic" , fuel : "Hybrid"},
  {company : "Ford"    , model : "Mustang" , color : "Silver" , capacity : "2" , price : "45000$" , year : "2002" , gear : "manual"    , fuel : "Gas"},
  {company : "Ferrari" , model : "Enzo"    , color : "Yellow" , capacity : "2" , price : "80000$" , year : "2011" , gear : "Automatic" , fuel : "Gas"},
  {company : "Fiat"    , model : "Panda"   , color : "White"  , capacity : "2" , price : "12000$" , year : "2016" , gear : "Automatic" , fuel : "Gas"},
  {company : "BMW"     , model : "X4"      , color : "Black"  , capacity : "4" , price : "32000$" , year : "2013" , gear : "Automatic" , fuel : "Gas"},
  {company : "Ford"    , model : "Shelby"  , color : "Red"    , capacity : "2" , price : "57000$" , year : "1970" , gear : "Automatic" , fuel : "Gas"},    
  {company : "BMW"     , model : "X6"      , color : "Black"  , capacity : "6" , price : "33000$" , year : "2016" , gear : "Automatic" , fuel : "Gas"},
  {company : "Honda"   , model : "Civic"   , color : "White"  , capacity : "4" , price : "27000$" , year : "2022" , gear : "Automatic" , fuel : "Gas"},
  {company : "BMW"     , model : "760Li"   , color : "Black"  , capacity : "4" , price : "41000$" , year : "2023" , gear : "Automatic" , fuel : "Hybrid"},
];

function showCars(cars,isBuy=false) {
  let listParent;
  if(isBuy){
    listParent = document.getElementById("buyItem");
  } else {
    listParent = document.getElementById("list");
  }
  
  let td, tr; // table tags
  for (let car of cars) {
    tr = document.createElement("tr");
    if(!isBuy){
      tr.addEventListener("click",function(e){
        let row = this.rowIndex - 1;
        let selectObj;
        if(result.length === 0){
          // not use search, then use cars
          selectObj = cars[row];
        } else {
          selectObj = result[row];
        }
        
        let tempObj = {
          company : selectObj.company ,
          model : selectObj.model ,
          color : selectObj.color ,
          capacity : selectObj.capacity,
          price : selectObj.price ,
          year : selectObj.year ,
          gear : selectObj.gear ,
          fuel : selectObj.fuel,
        };        
        buyElement.push(tempObj);        
        // remove $ and add price to sumPrice       
        sumPrice += +(tempObj.price.slice(0,tempObj.price.length-1)); 
        remove();        
        showCars(cars);        
        showCars(buyElement,true);
      });
    }else if(isBuy){
      tr.addEventListener("click",function(e){
        let row = this.rowIndex - 1;
        // remove $ and subtract price from sumPrice       
        sumPrice -= +(buyElement[row].price.slice(0,buyElement[row].price.length-1));
        buyElement.splice(row,1); //remove select item from buy        
        remove();
        showCars(carsDB);        
        showCars(buyElement,true);
      });
    }
    for (let property in car) {      
      td = document.createElement("td");
      td.textContent = car[property];
      tr.appendChild(td);
    }
    listParent.appendChild(tr);
  }

  // show Total prices
  let totalPrices = sumPrice.toLocaleString("en-US"); //number formatted with commas
  if(isBuy){    
    document.getElementById("totalPrices").innerHTML = 
      `Total Prices = <span>${totalPrices}</span>$`;
  }
}

function remove(){  
  let tableRows = document.querySelectorAll("tr");
  let tableHeader = document.querySelectorAll("#tableHeader");  
  for (let tableRow of tableRows){
    if(tableRow != tableHeader[0]) tableRow.remove();
  }
  buyHeader();
}

function setSearchCategory(category,element){  
  searchCategory = category;
  let searchbar = document.getElementById("searchbar");
  if(lastElement) lastElement.classList.toggle("selectTh");
  element.classList.toggle("selectTh");
  lastElement = element;    
  searchbar.value = "";
  search(category = searchCategory); //for solve problem when click on another Header,when searching
  remove();
  showCars(carsDB);
  showCars(buyElement,true);
  searchbar.setAttribute("placeholder",`Search on ${category}`);
}

function search(category = searchCategory) {
  result = [];
  const searchItem = document.getElementById("searchbar").value.toLowerCase();  
  for (let car of carsDB) {    
    if (car[category].toLowerCase().includes(searchItem)){      
      result.push(car);
    }
  }
  remove();
  showCars(result);
  showCars(buyElement,true);
}

function sortPrice() {
  let searchbar = document.getElementById("searchbar");
  searchbar.value = "";
  let priceArrow = document.getElementById("priceBtn");
  if(isAscendingSort){
    isAscendingSort = false;
    priceArrow.innerHTML = "Price Sort &uarr;"
    //ascending order
    carsDB.sort((car1, car2) => {
      if (car1.price < car2.price) return 1;
      else if (car1.price > car2.price) return -1;
      else return 0;
    //  (car1.price < car2.price) ? 1 : (car1.price > car2.price) ? -1 : 0);
    })
  }else{
    isAscendingSort = true;
    priceArrow.innerHTML = "Price Sort &darr;"
    //descending order
    carsDB.sort((car1, car2) => {
      if (car1.price > car2.price) return 1;
      else if (car1.price < car2.price) return -1;
      else return 0;
    })
  }  
  remove();
  showCars(carsDB);
  showCars(buyElement,true);  
}
// shop
function buyHeader(){
  let table = document.getElementById("buyItem");
  let tr = document.createElement("tr");
  const headerNames = ['Company','Model','Color','Capacity','Price','Year','Gear','Fuel'];
  for(let header of headerNames){
    let th = document.createElement("th");
    th.textContent = header;
    tr.appendChild(th);
  }
  table.appendChild(tr);  
}

function checkout(){
  let text = "Click OK to confirm the shopping cart and transfer to the payment page, otherwise click Cancel to continue shopping.";
  if(confirm(text)){
    if(sumPrice === 0){
      alert("your shopping cart is empty");
    } else {
    window.location.reload();
    }
  }
}