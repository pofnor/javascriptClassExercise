// "use strict";
// ------------------------- Subject = Prototype ----------------
const parent = {
  name : "Ahmad" ,
};
const child = Object.create(parent);

console.groupCollapsed("Prototype");
console.log("child = ",child);
console.log("child.name = ",child.name);

console.log("Object.getPrototypeOf(parent) = ",Object.getPrototypeOf(parent));
console.log("parent.__proto__ = " , parent.__proto__);
console.log("child.__proto__" , child.__proto__);

const parent2 = {
  lastname : "Mokhtari" ,
};

const child2 = Object.create(parent2);
console.log("parent2 test ref : child2.lastname = " , child2.lastname ," and child2.age =" ,child2.age);

parent2.lastname = "Wallex";
child2.age = 25;

console.log("parent2 test ref : child2.lastname = " , child2.lastname ," and child2.age =" ,child2.age);
console.groupEnd("Prototype");

// -----------------------------------------
console.groupCollapsed("Object");
console.log("Object.keys(parent) = " , Object.keys(parent));
console.log("Object.values(parent) = " , Object.values(parent));
console.log("Object.entries(parent) = " , Object.entries(parent)); // only return own property, not any of prototype
console.groupEnd("Object");
// -----------------------------------------

const user1 = {
  username : "user1" ,
  password : "hunter1" ,
};

const user2 = {
  username : "user2" ,
  password : "hunter2" ,
};

console.groupCollapsed("ObjectFreeze");
try{
  // Freeze the object
  const newUser1 = Object.freeze(user1); //newUser1 just a ref to user1 and in fact the 'user1' is freezed.
  console.log("Object.isFrozen(newUser1) = " , Object.isFrozen(newUser1));
  console.log("Object.isFrozen(user1) = " , Object.isFrozen(user1));
  newUser1.password = "PasswordChanged";
  newUser1.active = true ;
  console.log("newUser1 = " , newUser1);  //we get the error when 'use strict' mode 
} 
catch {
  console.log("For see the result, don't 'use strict'");
}
console.groupEnd("ObjectFreeze");

console.groupCollapsed("ObjectSeal");
try{
  // Seal the object
  const newUser2 = Object.seal(user2); //newUser2 just a ref to user2 and in fact the 'user2' is sealed.
  console.log("Object.isSealed(newUser1) = " , Object.isSealed(newUser2));
  console.log("Object.isSealed(user1) = " , Object.isSealed(user2));
  newUser2.password = "PasswordChanged";
  newUser2.active = true ;
  console.log("newUser2 = " , newUser2);  //we get the error when 'use strict' mode 
  console.groupEnd("ObjectSeal");
}
catch {
  console.log("For see the result, don't 'use strict'");
}