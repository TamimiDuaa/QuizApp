// let userAnswers=[];
export async function createQuestions(questions){
    let score =0;

    const carouselInner=document.querySelector(".carousel-inner");
    for(let j=0;j<questions.length;j++){
        console.log(score);
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if(j===0){
            carouselItem.classList.add("active");
            
        }
        carouselInner.appendChild(carouselItem);

        let quizInfo = document.createElement("div");
        quizInfo.classList.add("quiz-info");

        let quizCount =document.createElement("span")
        quizCount.classList.add("count")
        quizCount.innerHTML = `${j+1}/${questions.length}`;
        quizInfo.appendChild(quizCount);

        
        let scoreText =document.createElement("span")
        scoreText.classList.add("score")
        scoreText.innerHTML = `your Score = ${score}`;

        quizInfo.appendChild(scoreText);

        carouselItem.appendChild(quizInfo);
        let questionText = document.createElement("label");
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
                score+=1;
                scoreText.innerHTML = `your Score = ${score}`;

                console.log("correct");
            } else {
                choiceDiv.style.backgroundColor = "rgb(254, 135, 135)"; 
                score-=1;
                scoreText.innerHTML = `your Score = ${score}`;

                console.log("not correct");
            }
            scoreText.innerHTML = `Your Score = ${score}`;
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

       
        nextButton.addEventListener("click",()=>{

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
        
        finishQuiz.textContent = 'Finish Quiz';
       
        finishQuiz.addEventListener("click",()=>{
            let lastDiv = document.createElement("div");
            lastDiv.classList.add("carousel-item");
            lastDiv.classList.add("active");
            console.log("hello");
            carouselInner.appendChild(lastDiv);

            let scoreHeader = document.createElement("h1");
            scoreHeader.innerHTML = `Your Score is ${score}`;

            lastDiv.appendChild(scoreHeader);
            if(score > questions.length/2){
                let winImg = document.createElement("img");
                winImg.src="https://i.pinimg.com/originals/de/38/61/de386180de84192a63b1c6186bd6e46c.gif";
                lastDiv.appendChild(winImg);

            }
            else{
                //
                let loseImg = document.createElement("img");
                loseImg.src="https://cdn.pixabay.com/animation/2023/11/23/04/15/04-15-08-729_512.gif";
                lastDiv.appendChild(loseImg);
            }
            finishQuiz.setAttribute('data-bs-target', '#carouselExample');
            finishQuiz.setAttribute('data-bs-slide', 'next');
        })
      
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