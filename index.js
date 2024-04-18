let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


let xml = new XMLHttpRequest() ; 
let current=0  ;
let score = 0 ; 

function getQuestions() {
    xml.open("GET","quiz.json", true);
    xml.send() ; 
    xml.onreadystatechange = function() {
        if(xml.status ===200 && xml.readyState === 4) {
            let data = JSON.parse(xml.responseText) ; 
            let numberQuestions = data.length ;
            
        

            createBullets(numberQuestions) ; 
            console.log(data) ; 
            startTimer(data); 
            updateBullets(current); 

            addQuestion(data);
            submitButton.addEventListener("click",function() {
               let v =  document.getElementsByClassName("input") ;
                let rightA = data[current]["right_answer"]; 
                for(let i = 0 ; i < v.length ;i++) {
                    if (v[i].checked) { 
                      if (v[i].getAttribute("singsing") === rightA) {
                        score++;
                        console.log(score); 
                      }
                    }

            
                }


                nextAnswer(data);
                startTimer(data); 

                
               
                });
            
        }}}
getQuestions();

function createBullets(numberQuestions)  {
    for(let i = 0 ; i < numberQuestions ; i++) {
        let bullet = document.createElement("span") ; 
        bullet.classList.add("bullet") ; 
        
        if(i===0) {
            bullet.classList.add("on") ; 
        }

        
        bulletsSpanContainer.appendChild(bullet); 
    }
}

function addQuestion(data) {
    let title = document.createElement("h2") ;
    title.innerText = data[current].title ;
    quizArea.appendChild(title) ;
    data1 = data[current] ; 

    for(let i = 1 ; i <= 4 ; i++) {
     let answer = document.createElement("div");
     answer.classList.add("answer");
    let answers = document.createElement("input") ;
    answers.setAttribute("type","radio") ; 
    answers.setAttribute("id",`answer${i}`) ;
    answers.setAttribute("name",`question`) ;
    answers.setAttribute("singsing",data[current][`answer_${i}`]) ;
    answers.classList.add("input") ; 
    let label = document.createElement("label") ; 
    label.setAttribute("for",`answer${i}`);
    label.textContent = data[current][`answer_${i}`];
    
    answer.appendChild(answers) ;
    answer.appendChild(label) ;
    answersArea.appendChild(answer) ;

   

    

    }
}

function nextAnswer(data) {
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";


    addQuestion(data) ;
    console.log(data) ; 
    updateBullets(current);
}


function updateBullets(current) {
  let a = bulletsSpanContainer.getElementsByTagName("span") ; 
  for(let i = 0 ; i < a.length ; i++) {
      a[i].classList.remove("on") ; 
  }

  a[current].classList.add("on") ;
  console.log(current) ;



}

function startTimer(data) {
    let time = document.createElement("span") ;
    time.innerHTML = "5" ; 
    countdownElement.appendChild(time) ; 
    let a = setInterval(function() {
        let time = document.querySelector(".countdown span") ; 
        time.innerHTML = parseInt(time.innerHTML) - 1 ;
        if(parseInt(time.innerHTML) === 0) {
            submitButton.click() ; 
            time.innerHTML="" ; 
            clearInterval(a) ;           

        }
    
    },1000);



}