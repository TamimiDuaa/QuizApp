// let userAnswers=[];
let score =0;
export async function createQuestions(questions){
    
    const carouselInner=document.querySelector(".carousel-inner");
    for(let j=0;j<questions.length;j++){

        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if(j===0){
            carouselItem.classList.add("active");
            
        }
        carouselInner.appendChild(carouselItem);

        let quizCount =document.createElement("span")
        quizCount.classList.add("count")
        quizCount.innerHTML = `${j+1}/${questions.length}`;
        carouselItem.appendChild(quizCount);

        let questionText = document.createElement("h4");
        questionText.innerHTML = questions[j].question;
        questionText.classList.add("question");
        console.log( questions[j].question);
        carouselItem.appendChild(questionText);
    
        let result =  Object.keys(questions[j].answers).map((key) => [key, questions[j].answers[key]]);
        let correctAnswers =  Object.keys(questions[j].correct_answers).map((key) => [key, questions[j].correct_answers[key]]);
        // Create the multiple-choices div
        const multipleChoicesDiv = document.createElement('div');
        multipleChoicesDiv.className = 'multiple-choices';
     
       
        function handleRadioChange(event, choiceDiv, correctAnswer) {
            console.log("hello " + correctAnswer);
            if (correctAnswer === "true") {
                choiceDiv.style.backgroundColor = "rgb(156, 211, 156)"; 
                score ++;
                console.log("correct");
            } else {
                choiceDiv.style.backgroundColor = "rgb(254, 135, 135)"; 
                score--;
                console.log("not correct");
            }
        }

        for(let i=0;i<result.length;i++){
            if(result[i][1]!=null){
    
                console.log(result[i]);
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'choice';
        
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = result[i][0]+questions[j].id;
                input.name = 'answers';
                input.value = result[i][0];
                
                // Bind the event handler to the radio button with the correct parameters
                const boundHandler = (event) => handleRadioChange(event, choiceDiv, correctAnswers[i][1]);
                input.addEventListener("change", boundHandler);

                // Store a reference to the handler so it can be removed later
                input._boundHandler = boundHandler;
                
                const label = document.createElement('label');
                label.htmlFor = result[i][0]+questions[j].id;
                label.textContent = result[i][1];
        
                choiceDiv.appendChild(input);
                choiceDiv.appendChild(label);
                multipleChoicesDiv.appendChild(choiceDiv);
            }
        }

       
        // Create the Next button
        const nextButton = document.createElement('button');
        nextButton.id = 'nextQuestion';
        nextButton.setAttribute('data-bs-target', '#carouselExample');
        nextButton.setAttribute('data-bs-slide', 'next');
        nextButton.textContent = 'Next';

       
        nextButton.addEventListener("click",(event)=>{
            for (let i = 0; i < result.length; i++) {

                if (result[i][1] != null) {
                    const input = document.getElementById(result[i][0]+questions[j].id);
                    if (input && input._boundHandler) {
                        input.removeEventListener("change", input._boundHandler);
                        delete input._boundHandler;
                    }
                }
            }
            
        })
        const prevButton = document.createElement('button');
        prevButton.id = 'prevQuestion';
        prevButton.setAttribute('data-bs-target', '#carouselExample');
        prevButton.setAttribute('data-bs-slide', 'prev');
        prevButton.textContent = 'Previous';
        
        const finishQuiz = document.createElement('button');
        finishQuiz.id = 'finish';
        finishQuiz.setAttribute('data-bs-target', '#carouselExample');
        finishQuiz.setAttribute('data-bs-slide', 'next');
        finishQuiz.textContent = 'Finish Quiz';
       

        carouselItem.appendChild(multipleChoicesDiv);
        if(j!=questions.length-1)
            carouselItem.appendChild(nextButton);

        if(j!=0){
            carouselItem.appendChild(prevButton);
        }
        if(j===questions.length-1){
            carouselItem.appendChild(finishQuiz);
        }

    }
} 