"use strict";

function login(){
  const result = document.getElementById("result");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  result.textContent = "You click on Login button";
}

function signup(){
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const result = document.getElementById("result");    
  let nameInput = document.createElement("input");
  let mobileInput = document.createElement("input");
  const loginContainer = document.getElementById("loginContainer");  
  nameInput.className="inputText";
  nameInput.id="name";
  nameInput.placeholder="Name and Family";
  mobileInput.className="inputText";
  mobileInput.id="mobile";
  mobileInput.placeholder="Mobile Number";  
  loginContainer.insertBefore(mobileInput,username);
  let mobile = document.getElementById("mobile");
  loginContainer.insertBefore(nameInput,mobile);
  loginBtn.style.display = "none" ;
  signupBtn.textContent = "Sign up";  
  result.textContent = "You click on signup button";
}