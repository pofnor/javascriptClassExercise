let slideIndex = 1;

let slideSource = [
  {
    isVideo : true,
    src : "video/TAYLOR-SWIFT-THE-ERAS-TOUR-Concert.mp4",
    poster : "img/taylor-swift-ErasTour.webp",
    caption : "Taylor Swift 'The Eras Tour'",
    modal : "The Eras Tour is the ongoing sixth concert tour by American singer-songwriter Taylor Swift, who described it as a journey through all of her musical 'eras'. An homage to her albums, the Eras Tour is her most expansive tour yet, with 146 dates across five continents.It is her second all-stadium tour after the 2018 Reputation Stadium Tour.",
    modalText : "More...",
    link : "https://www.taylorswift.com/tour-us",
    linkText : "Buy Ticket"    
  },
  {
    src : "img/shakira-healing.jpg",    
    caption : "Shakira Is Making New Music, Healing",
    modal : "Global pop superstar Shakira’s unique blend of Latin pop music infused with the dance moves of her Arabic heritage has blazed a trail in the music industry, bringing joy to millions of her fans around the world and heralding the boom in Latin music.",
    modalText : "More...",
    link : "https://www.elle.com/culture/celebrities/a41296977/shakira-elle-digital-cover-october-2022",
    linkText : "Read News"    
  },
  {
    src : "img/AGT2023.jpg",    
    caption : "America's Got Talent 2023",
    modal : "It showcases winners, finalists, fan favorites, and viral sensations from previous seasons of the mothership series to return to the stage to compete for the All-Star title.",
    modalText : "More...",
    link : "https://www.nbc.com/americas-got-talent",
    linkText : "Vote"        
  }
];

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

function slideShow(slideSource){    
  for(let slide of slideSource){    
    createSlide(slide);    
  }
}

// create slide
function createSlide(slide){
  const parent = document.getElementsByClassName("slideshow")[0];
  const divContainer = document.createElement("div");
  divContainer.className ="Slides fade";  
  const slideNumber = document.createElement("div");
  slideNumber.className = "slideNumber";
  divContainer.appendChild(slideNumber);  
  if(slide.isVideo){
    const video = document.createElement("video");
    video.className = "slideImage";    
    video.setAttribute("poster",slide.poster);    
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.src = slide.src;
    video.textContent = "Your browser does not support the video tag.";
    divContainer.appendChild(video);
  } else {
    const image = document.createElement("img");
    image.className="slideImage";
    image.src = slide.src;
    image.alt = slide.caption;
    divContainer.appendChild(image);
  }  
  if(slide.caption){
    const caption = document.createElement("div");
    caption.className = "slideCaption";
    caption.textContent = slide.caption;
    divContainer.appendChild(caption);
  }
  if(slide.modal){
    const modal1 = document.createElement("div");
    modal1.className = "btnSlide";
    modal1.textContent = slide.modalText;
    modal1.onclick = function(e){modal(1);};
    divContainer.appendChild(modal1);
  }
  if(slide.link){
    const link = document.createElement("div");
    link.className = "btnSlideHref";
    link.textContent = slide.linkText;
    link.onclick = function(e){document.location.href = slide.link;};
    divContainer.appendChild(link);
  }
  parent.appendChild(divContainer);
}

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
