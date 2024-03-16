let body = document.body;

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   searchForm.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('.side-bar .close-side-bar').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(InputNumber => {
   InputNumber.oninput = () =>{
      if(InputNumber.value.length > InputNumber.maxLength) InputNumber.value = InputNumber.value.slice(0, InputNumber.maxLength);
   }
});

window.onscroll = () =>{
   profile.classList.remove('active');
   searchForm.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }

}

let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enabelDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enabelDarkMode();
}

toggleBtn.onclick = (e) =>{
   let darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enabelDarkMode();
   }else{
      disableDarkMode();
   }
}


const allCourses = [
  
  { name: "Ba Ba Black Sheep", languages: ["English poems"] },
  { name: "The Lion and the Unicorn", languages: ["English poems"] },
  { name: "Twinkle Twinkle Little Star", languages: ["English poems"] },
  { name: "Clap your hands", languages: ["English poems"] },
  { name: "Wash your hands", languages: ["English poems"] },

  { name: "Articles", languages: ["English grammar"] },
  { name: "Punctuations", languages: ["English grammar"] },
  { name: "vowels", languages: ["English grammar"] },

  { name: "Addition", languages: ["Maths"] },
  { name: "Subtraction", languages: ["Maths"] },
  { name: "Division", languages: ["Maths"] },
  { name: "Multiplication", languages: ["Maths"] },
  { name: "Count up to Ten", languages: ["Maths"] },
  { name: "Basic Shapes", languages: ["Maths"] },
  { name: "Addition of double numbers", languages: ["Maths"] },

  { name: "The History Of India", languages: ["History"] },
  { name: "The History Of India Part-1", languages: ["History"] },
  { name: "The History Of India Part-2", languages: ["History"] },


  { name: "Good and Bad manners in Hindi", languages: ["Hindi"] },
  { name: "Indian Freedom Fighters in Hindi", languages: ["Hindi"] },
  { name: "How to greet elders in Hindi?", languages: ["Hindi"] },


  { name: "The Solar System", languages: ["Geography"] },
  { name: "Indian Freedom Fighters in Hindi", languages: ["Geography"] },
  { name: "How to greet elders in Hindi?", languages: ["Geography"] },



  
  // Add more course data
];

function jaccardSimilarity(userLanguages, courseLanguages) {
  const intersection = userLanguages.filter(language => courseLanguages.includes(language));
  const union = [...new Set([...userLanguages, ...courseLanguages])];
  return intersection.length / union.length;
}

function recommendCourses(userLanguages) {
  return allCourses
    .map(course => ({
      ...course,
      similarity: jaccardSimilarity(userLanguages, course.languages),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3); // Recommend top 3 courses
}

function getRecommendations() {
  const userSelectedLanguages = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  
  const recommendedCourses = recommendCourses(userSelectedLanguages);

  const recommendationsContainer = document.getElementById("recommendations");
  recommendationsContainer.innerHTML = ""; // Clear previous recommendations

  recommendedCourses.forEach(course => {
    const courseElement = document.createElement("div");
    courseElement.className = "course";
    courseElement.textContent = course.name;
    recommendationsContainer.appendChild(courseElement);
  });
}