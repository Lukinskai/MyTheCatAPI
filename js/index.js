
//creating a footer
const footer = document.createElement("footer");
//footer.textContent = "My Footer";

//get the body element

const body = document.body;

// Append the footer to the body

body.appendChild(footer);

//-----

// Date 
const today = new Date();

//year
const thisYear = today.getFullYear();

//footer from DOM
const footer2 = document.querySelector('footer');

//copyright
const copyright = document.createElement('p');

//name and year

copyright.innerHTML = "Super CAT &copy;" + thisYear;

//append the copy to the footer

footer.appendChild(copyright);

///Skills 

const skills =["CATScript","CTML","CTSS","Cava","Kit"];

const skillsSection = document.getElementById('skills');

const skillsList = skillsSection.querySelector('ul');

for (let i=0; i < skills.length; i++){
    const skill = document.createElement('li');

skill.innerText = skills[i];

skillsList.appendChild(skill);

}

///Message FORM

const messageForm = document.forms.leave_message;


messageForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log('Name:', usersName);
    console.log('Email:', usersEmail);
    console.log('Message:', usersMessage);

    ////

 const messageSection = document.getElementById('messages');


 const messageList = messageSection.querySelector('ul');


 const newMessage = document.createElement('li');


 newMessage.innerHTML = `
     <a href="mailto:${usersEmail}">${usersName}</a>: 
     <span>${usersMessage}</span>`;

 const removeButton = document.createElement('button');

 removeButton.innerText = 'remove';
 removeButton.type = 'button';


 removeButton.addEventListener('click', function() {

     const entry = removeButton.parentNode;
     
     entry.remove();
 });


 newMessage.appendChild(removeButton);


 messageList.appendChild(newMessage);

    ////

     event.target.reset();

});

///lesson-15

// 'MY_GITHUB_USERNAME'
const myUsername = 'Lukinskai';

// Make a GET request to fetch repository data
fetch(`https://api.github.com/users/${myUsername}/repos`)
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok, check Username');
        }

        return response.json();
    })
    .then(data => {
       
        console.log(data);
       
        const repositories = data;
    
        console.log('Repositories:', repositories);

        /// Repos in List
  
        const projectSection = document.getElementById('Projects');
   
        const projectList = projectSection.querySelector('ul');

       
        for (let i = 0; i < repositories.length; i++) {
         
            const project = document.createElement('li');
            
            project.innerText = repositories[i].name;
       
            projectList.appendChild(project);
        }
    })
    .catch(error => {
  
        console.error('Error:', error);
  
        alert('An error occurred. Please try again later.');
    });



    /// TheCATAPI

    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
      });
      
      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };
      
      fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));        
