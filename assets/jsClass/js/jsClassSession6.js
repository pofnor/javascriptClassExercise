"use strict";
// ------------------------------------------ Lesson ------------------------------------------
console.groupCollapsed("Lesson");

// ----- rest parameters and spread operator ----
console.groupCollapsed("Rest&Spread");
// rest
// In array, names can be different
// Array Object Destructuring
let people = ["steve","Pete","Mike","Nick"];
let [Doctor,Lawyer,...students] = people;
console.log("Doctor = ",Doctor);
console.log("Lawyer = ",Lawyer);
console.log("students = ",students);
// In the object, the names must be the same
// Object Destructuring
const {surname,age,...otherDetails} = {
  surname : "steve",
  age : 19,
  place : "Romania",
  hobby : "reading"
};
console.log("surname = ",surname);
console.log("age = ",age);
console.log("otherDetails = ",otherDetails);

// Spread
// Make new array from other
let number1 = [1,2];
let number2 = [3,4];
let newNumber = [...number1,...number2,5,6];
console.log(newNumber);
// Copy array
let scores = [80,70,90];
let copiedScores = [...scores];
console.log(copiedScores);
// Spread and String
let chars = ['A',...'BC','D'];
console.log(chars);




console.groupEnd("Rest&Spread");

console.groupEnd("Lesson");

// ------------------------------------------ Exercise ------------------------------------------
console.groupCollapsed("Exercise");

/* Write a function that takes a number(n) and  
return an array that output values are from 1 to n.(while) */
function makeArrayOfNumber(n){  
  let i = 1;
  let array = []; array.length
  while(i<=n){
    array.push(i);
    i++;
  }
  return array;
}
const result = makeArrayOfNumber(10);
console.log("makeArrayOfNumber(10) = ",result);


/* Use the above output array and slice it by three and 
use rest and spread operator to move the pieces. */

/* Slice(0,5) gives from zero to 5. 
Do not forget that the last element is not inside. */
function slice3(result){
  let sliceSize = Math.trunc(+(result.length) / 3);  
  let s1 = result.slice(0,sliceSize);  
  let s2 = result.slice(sliceSize,sliceSize*2);
  let s3 = result.slice(sliceSize*2);
  
  let x = Math.floor((Math.random() * 3) + 1);
  let output;
  switch(x){
    case 1 : 
      output = [...s1,...s3,...s2];
      break;    
    case 2 :
      output = [...s2,...s1,...s3];
      break;
    case 3 :
      output = [...s3,...s2,...s1];      
  }
  return output;
}

console.log(slice3(result));

console.groupEnd("Exercise");