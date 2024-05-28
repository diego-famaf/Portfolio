const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

const clickSound = new Audio('assets/sounds/Switch.mp3');

const toggleColors = document.getElementById("toggle-colors");

const rootStyles = document.documentElement.style;

const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML =texts[section][value];
  }
};


toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (toggleIcon.src.includes("moon.svg")) {
    toggleIcon.src = "assets/icons/sun.svg";
    toggleText.textContent = "Light Mode";
    clickSound.play();

  } else {
    toggleIcon.src = "assets/icons/moon.svg";
    toggleText.textContent = "Dark Mode";
    clickSound.play();
  }
});

toggleColors.addEventListener("click", (e) => {
  rootStyles.setProperty("--primary-color", e.target.dataset.color);
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/words.json")
    .then(response => response.json())
    .then(data => {
      const words = data.words; 
      const dynamicWordsContainer = document.getElementById('dynamic-words');
      let currentIndex = 0;

      const showWord = () => {
        
        dynamicWordsContainer.innerHTML = '';
        
        const wordItem = document.createElement('li');
        wordItem.textContent = words[currentIndex];
        dynamicWordsContainer.appendChild(wordItem);

        
        requestAnimationFrame(() => {
          wordItem.style.opacity = 1;
        });

        
        setTimeout(() => {
          wordItem.style.opacity = 0;
          currentIndex = (currentIndex + 1) % words.length;
          setTimeout(showWord, 2500); 
        }, 2000); 
      };

      showWord();
    })
    .catch(error => console.error('Error fetching the JSON:', error));
});


// document.addEventListener("DOMContentLoaded", function() {
//   var palabras = Array.from(document.querySelectorAll("#lista-palabras li"));
//   var indice = 0;

//   function mostrarSiguientePalabra() {
//     palabras.forEach(function(palabra) {
//       palabra.style.display = "none"; // Oculta todas las palabras
//     });
    
//     indice = (indice + 1) % palabras.length;
//     palabras[indice].style.display = "block"; // Muestra la siguiente palabra
//     setTimeout(mostrarSiguientePalabra, 5000); // Cambia cada 2 segundos
//   }

//   mostrarSiguientePalabra();
// });

