const images = [
  "./Images/Call Of Duty Black Ops 6.png",
  "./Images/Clair Obscur-Expedition 33.jpg",
  "./Images/Doom The Dark Ages.png",
  "./Images/GOD OF WAR Ragnarok.jpg",
  "./Images/Grand Theft Auto 6.jpg",
  "./Images/Indiana Jones The Golden Circle.png",
  "./Images/Persona 5.jpg",
  "./Images/Red Dead Redemption 2.png",
  "./Images/The Last of Us Part 2.jpg",
  "./Images/Elden Ring Shadow of the Erdtree.jpeg"
];

let current = 0;
const slideshowDiv = document.querySelector('.slideshow');

function changeBackground() {
  slideshowDiv.style.backgroundImage = `url('${images[current]}')`;
  current = (current + 1) % images.length;
}

setInterval(changeBackground, 5000); // every 5 seconds
changeBackground(); // initial load