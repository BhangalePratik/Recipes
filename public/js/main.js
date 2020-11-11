
let formElement = document.querySelector('form');
let inputQuery = document.querySelector('#inputQuery');
let inputDiet = document.querySelector('#inputDiet');
let inputCuisine = document.querySelector('#inputCuisine');
let url='http://localhost:3000/recipe?apiKey=28de1c31664a460c8c095de681c38365';

let heading = document.querySelector('#heading');
let msg1 = document.querySelector('#msg1');
let msg2 = document.querySelector('#msg2');



formElement.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    inputQuery.value && (url+=`&query=${inputQuery.value}`);
    // cuisine 
    inputDiet.value && (url+=`&diet=${inputDiet.value}`);
    // query 
    inputCuisine.value && (url+=`&cuisine=${inputCuisine.value}`);

    fetch(url).then(response => response.json().then(data=>{
        console.log(url);
        console.log("Error is ",data);
        if (data.results.length !== 0){
            msg1.textContent = data.results[0].title;
            msg2.src = data.results[0].image;
            
        } else {
            msg1.textContent = data.error;
            msg2.src = "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.fasttrackteam.com%2FData%2FSites%2F1%2F404.png&imgrefurl=http%3A%2F%2Fwww.fasttrackteam.com%2Fhow-to-turn-your-404-not-found-page-into-a-lead-generating-machine.aspx&tbnid=aNidN4PSHU9qcM&vet=12ahUKEwjT29-NxPrsAhV2oUsFHfMbCXQQMygMegUIARC7AQ..i&docid=OjX9Fjqv9XwJ8M&w=395&h=313&q=data%20not%20found&ved=2ahUKEwjT29-NxPrsAhV2oUsFHfMbCXQQMygMegUIARC7AQ";
            console.log(msg1.textContent);
            console.log(msg2.src);
        }
        url='http://localhost:3000/recipe?apiKey=28de1c31664a460c8c095de681c38365';
        // console.log("url is "+url);
        // console.log("input query value is "+inputQuery.value,inputCuisine.value,inputDiet.value);
        
        // data.results=[];
        // data.error='';
        
    }))
})