"use strict";

let isSignup = false; //is the user goto Create account page or not
let validateName = false; //Validate name
let validateMobile = false; //Validate mobile number
let validateUsername = false; //Validate username
let validatePassword = false; //Validate password 
let isUnique = true; //Unique ID for post into Database
let postMethod = 0;  // 1 for axios, 2 for async and 3 for fetch

// --------------------- Hide and Show Loader ------------------------------------------------------
function showLoader(isShow){
  if(isShow) document.getElementById("loader").style.display="block"; // Show Loader
  else document.getElementById("loader").style.display="none"; // Hide Loader
}

// --------------------- Hide and Show input element to force user for select Post method ----------
function hide(){
  document.getElementById("postMethodButton").style.visibility="hidden";
}
function show(state){
  if(state===1){    
    document.getElementById("postMethodButton").style.visibility="visible";
    document.getElementById("name").style.visibility="hidden";
    document.getElementById("mobile").style.visibility="hidden";
    document.getElementById("username").style.visibility="hidden";
    document.getElementById("password").style.visibility="hidden";
    document.getElementById("result").style.visibility="hidden";
  }
  if(state===2){
    document.getElementById("postMethodButton").style.visibility="hidden";
    document.getElementById("name").style.visibility="visible";
    document.getElementById("mobile").style.visibility="visible";
    document.getElementById("username").style.visibility="visible";
    document.getElementById("password").style.visibility="visible";
    document.getElementById("result").style.visibility="visible";
   }
}

// ------------------------------------------- Select Post Method ---------------------------------
function selectPostMethod(name){
  if(name==='axios'){
    postMethod = 1;
    document.getElementById("postMethod").textContent = "((Axios))";
    document.getElementById("postMethodButton").style.display="none"; 
    show(2);
  }
  if(name==='async'){
    postMethod = 2;
    document.getElementById("postMethod").textContent = "((Axios with Async))";
    document.getElementById("postMethodButton").style.display="none";   
    show(2);
  }
  if(name==='fetch'){
    postMethod = 3;
    document.getElementById("postMethod").textContent = "((Fetch with Async))";
    document.getElementById("postMethodButton").style.display="none";   
    show(2);
  }
}

// ----------------------------------------------- Login ------------------------------------------
function login(){
  const result = document.getElementById("result");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  showLoader(true);
  axios.get("http://localhost:3000/account")
  .then((response) => {
    for (let index in response.data){
      if ((response.data[index].username === username.value.trim()) &&
      (response.data[index].password === password.value)){
        showLoader(false);
        result.innerHTML = "Welcome <span>" + response.data[index].name + "</span><br>" + "You have successfully logged in";
        username.style.display = "none";
        password.style.display = "none";
        document.getElementById("signupBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("loginHeader").style.display = "none";
        document.getElementById("postMethod").style.display = "none";
        break;
      } else {
        showLoader(false);
        result.textContent = "Wrong Username or Password";
      }
    }
  })
  .catch(error => {
    showLoader(false);
    result.innerHTML = error.message + "<br>" + error.config.url;
  })
}

// ----------------------------------------------- POST1 ------------------------------------------
// make it by axios with .then and .catch 
function post1(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");  
  isUnique = true; //for run again the function, set it again to true
  
  // check the username is unique  
  axios.get("http://localhost:3000/account")
  .then((response)=>{
    showLoader(false);
    for(let data of response.data){
      if (data.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      }       
    }  
    if(isUnique){
      // get last ID from database
      let lastId = response.data[response.data.length-1].id;                
      // Add new user
      const newId = +lastId + 1;
      showLoader(true);
      axios.post("http://localhost:3000/account",{
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)
      })
      .then((response) => {
        showLoader(false);
        if(response.status === 201){
          result.textContent = "Your Account has successfully created";
          setTimeout(()=>{document.location.reload()},3000);
        } else {
          result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.message + "<br>" + response.config.url;
        }
      }, (reject) => {
        showLoader(false);
        result.innerHTML = "<span>" + "Error :" + "</span><br>" + reject.message + "<br>" + reject.config.url;
        document.getElementById("buttonContainer").style.display="none";
        setTimeout(()=>{document.location.reload()},5000);
      });  
    } 
  })
  .catch((reject)=>{
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + reject.message + "<br>" + reject.config.url;
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  });
}  

// ----------------------------------------------- POST2 ------------------------------------------
// make it by async and await and axios
async function post2(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");
  isUnique = true; //for run again the function, set it again to true  
  try{
    // check the username is unique  
    const datas = await axios.get("http://localhost:3000/account");
    showLoader(false);
    for(let data of datas.data){
      if (data.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      } 
    }
    if(isUnique){
      // get last ID from database
      const lastId = datas.data[datas.data.length-1].id;      
      // Add new user
      const newId = +lastId + 1;
      showLoader(true);
      const post = await axios.post("http://localhost:3000/account",{
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)
      });
      showLoader(false);
      if(post.status === 201){
        result.textContent = "Your Account has successfully created";
        setTimeout(()=>{document.location.reload()},3000);
      } else {
        result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.message + "<br>" + response.config.url;
        setTimeout(()=>{document.location.reload()},5000);
      }      
    }                  
  }
  catch(error){
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    setTimeout(()=>{document.location.reload()},5000);
  }
}  

// ----------------------------------------------- POST3 ------------------------------------------
// make it by fetch with async and await
async function postJSON(data) {
  showLoader(true);
  const result = document.getElementById("result");
  try {
    const response = await fetch("http://localhost:3000/account", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    showLoader(false);

    // const result1 = await response.json();
    if(response.status===201){
      result.textContent = "Your Account has successfully created";
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    } else {
      result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.statusText + "<br>" + response.status + "<br>" + response.url;
      document.getElementById("buttonContainer").style.display="none";
      setTimeout(()=>{document.location.reload()},5000);
    }
  } catch (error) {
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  }
}
 
async function post3(name,mobile,username,password){
  showLoader(true);
  const result = document.getElementById("result");
  isUnique = true; //for run again the function, set it again to true  
  try{
    // check the username is unique  
    const accounts = await fetch("http://localhost:3000/account");
    showLoader(false);
    let accountsJson = await accounts.json();          
    for(let account of accountsJson){
      if (account.username === username) {
        result.innerHTML = "username " + "<span>" + username + "</span>" + " is already taken";        
        isUnique = false;                
        isSignup = true;
        break;
      } 
    }
    if(isUnique){
      // get last ID from database
      const lastId = accountsJson[accountsJson.length-1].id;      
      // Add new user
      const newId = +lastId + 1;    
      const data = {
          "id": String(newId),
          "name": String(name),
          "mobile": String(mobile),
          "username": String(username),
          "password": String(password)        
        };
        postJSON(data);
    }
  }
  catch(error){
    showLoader(false);
    result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
    document.getElementById("buttonContainer").style.display="none";
    setTimeout(()=>{document.location.reload()},5000);
  }
}          

// ----------------------------------------------- Sign up ------------------------------------------
function signup(){  
  const loginHeader = document.getElementById("loginHeader");
  const username = document.getElementById("username");  
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");      
  const loginContainer = document.getElementById("loginContainer");    
  if (!isSignup){
    isSignup = true;
    username.value = ""  ;
    password.value = ""  ;    
    let nameInput = document.createElement("input");
    let mobileInput = document.createElement("input");
    nameInput.className="inputText";
    nameInput.id="name";
    nameInput.placeholder="Name and Family";
    nameInput.setAttribute("autocomplete","off");
    mobileInput.className="inputText";
    mobileInput.id="mobile";
    mobileInput.placeholder="Mobile Number";  
    mobileInput.setAttribute("autocomplete","off");
    loginContainer.insertBefore(mobileInput,username);
    let mobile = document.getElementById("mobile");    
    loginContainer.insertBefore(nameInput,mobile);
    loginBtn.style.display = "none" ;
    loginHeader.textContent = "Create New Account";
    signupBtn.textContent = "Sign up";
    document.getElementById("buttonContainer").style.visibility="hidden";
    document.getElementById("result").textContent = "Complete all the Items to create an Account";

    // AddEventListener for validate
    document.getElementById("name").addEventListener("keyup",function(e){validate(e)});
    mobile.addEventListener("keyup",function(e){validate(e)});
    username.addEventListener("keyup",function(e){validate(e)});
    password.addEventListener("keyup",function(e){validate(e)});        

    // wait for select post method
    show(1);

  } else if (isSignup){
    isSignup = false;
    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    switch (postMethod){
      case 1:
        post1(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
        break;
      case 2:
        post2(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
        break;
      case 3:
        post3(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
    }
  } 
}

// ---------------------------------------- Validate ------------------------------------------------
function validate(element){  
  if(element.target.id === "name"){
    if(element.target.value.length===0){
      validateName = false;      
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      validateName = true;
    };
  }
  if(element.target.id === "mobile"){
    if(element.target.value.length===0){
      validateMobile = false;
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      const mobileRegExp = /^\d+$/;
      if(element.target.value.match(mobileRegExp)){
        element.target.style.backgroundColor = "";
        validateMobile = true;
      } else {
        validateMobile = false;
        element.target.style.backgroundColor = "red";
        document.getElementById("buttonContainer").style.visibility="hidden";
        document.getElementById("result").textContent = "Just Numbers are Allowed";
      }         
    };
  }
  if(element.target.id === "username"){
    if(element.target.value.length===0){
      validateUsername = false;
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      validateUsername = true;
    };
  }
  if(element.target.id === "password"){
    if(element.target.value.length===0){
      validatePassword = false;      
      document.getElementById("buttonContainer").style.visibility="hidden";
      document.getElementById("result").textContent = "Complete all the Items to create an Account";
    } else {
      const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g ;
      if(element.target.value.match(passRegExp)){
        element.target.style.backgroundColor = "";
        validatePassword = true;
      } else {
        validatePassword = false; 
        element.target.style.backgroundColor = "red";
        document.getElementById("buttonContainer").style.visibility="hidden";
        document.getElementById("result").innerHTML = "Your password must have at least 8 characters,"+ "<br>"
                    +"at least an upper case letter, an lowercase letter, a number and a symbol";
      }      
    };
  }
  if(validateName && validateMobile && validateUsername && validatePassword){
    document.getElementById("buttonContainer").style.visibility="visible";
    document.getElementById("result").textContent = "";
  }  
}