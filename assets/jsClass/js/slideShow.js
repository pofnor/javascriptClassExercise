let slideIndex = 1;

// Add href to every slides
function openPage(slideNumber){
  switch (slideNumber) {
    case 1:
      document.getElementById("slide1").addEventListener("click",function(e){
      document.location.href = 
      "https://www.taylorswift.com/tour-us";
      });
      break;
    case 2:
      document.getElementById("slide2").addEventListener("click",function(e){
      document.location.href = 
      "https://www.elle.com/culture/celebrities/a41296977/shakira-elle-digital-cover-october-2022";
      });
      break;
    case 3:
      document.getElementById("slide3").addEventListener("click",function(e){
      document.location.href = 
      "https://www.nbc.com/americas-got-talent";
      });
  }
}


// Next/previous controls
function plusSlides(n) {  
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {  
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("Slides");  
  let dots = document.getElementsByClassName("dot");  
  
  // Rotate
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  // Hide All Slide
  for (let slide of slides){
    slide.style.display = "none";
  }
  for (let dot of dots) {
    dot.className = dot.className.replace(" dotActive", "");
  }

  // Show the Selected Slide
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " dotActive";
}

// Modal
function modal(slideNumber){
  let modal = document.getElementsByClassName("modal")[0];
  let closeButton = document.getElementsByClassName("modalClose")[0];
  let modalText = document.getElementById("modalText");  
  switch (slideNumber) {
    case 1 :
      modalText.textContent = "The Eras Tour is the ongoing sixth concert tour by American singer-songwriter Taylor Swift, who described it as a journey through all of her musical 'eras'. An homage to her albums, the Eras Tour is her most expansive tour yet, with 146 dates across five continents.It is her second all-stadium tour after the 2018 Reputation Stadium Tour.";
      break;
    case 2 :
      modalText.textContent = "Global pop superstar Shakira’s unique blend of Latin pop music infused with the dance moves of her Arabic heritage has blazed a trail in the music industry, bringing joy to millions of her fans around the world and heralding the boom in Latin music.";
      break;
    case 3 :
      modalText.textContent = "It showcases winners, finalists, fan favorites, and viral sensations from previous seasons of the mothership series to return to the stage to compete for the All-Star title.";
  }

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  closeButton.addEventListener("click",function(e){
    modal.style.display = "none";
  });  
}