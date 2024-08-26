export async function createQuestions(questions){
    
    const carouselInner=document.querySelector(".carousel-inner");
    for(let j=0;j<questions.length;j++){

        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if(j===0){
            carouselItem.classList.add("active");
            
        }
        carouselInner.appendChild(carouselItem);
    
        let questionText = document.createElement("h4");
        questionText.innerHTML = questions[j].question;
        questionText.classList.add("question");
        console.log( questions[j].question);
        carouselItem.appendChild(questionText);
    
        let result =  Object.keys(questions[j].answers).map((key) => [key, questions[j].answers[key]]);
    
        // Create the multiple-choices div
        const multipleChoicesDiv = document.createElement('div');
        multipleChoicesDiv.className = 'multiple-choices';
    
    
        for(let i=0;i<result.length;i++){
            if(result[i][1]!=null){
    
                console.log(result[i]);
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'choice';
        
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = result[i];
                input.name = 'answers';
                input.value = result[i];
        
                const label = document.createElement('label');
                label.htmlFor = result[i];
                label.textContent = result[i][1];
        
                choiceDiv.appendChild(input);
                choiceDiv.appendChild(label);
                multipleChoicesDiv.appendChild(choiceDiv);
            }
        }
        
    
        
    
        // // Create the second choice div
        // const choiceDiv2 = document.createElement('div');
        // choiceDiv2.className = 'choice';
    
        // const input2 = document.createElement('input');
        // input2.type = 'radio';
        // input2.id = 'answer_b';
        // input2.name = 'answers';
        // input2.value = 'CSS';
    
        // const label2 = document.createElement('label');
        // label2.htmlFor = 'css';
        // label2.textContent = questions[0].answers.answer_b;
    
        // choiceDiv2.appendChild(input2);
        // choiceDiv2.appendChild(label2);
    
        // // Create the third choice div
        // const choiceDiv3 = document.createElement('div');
        // choiceDiv3.className = 'choice';
    
        // const input3 = document.createElement('input');
        // input3.type = 'radio';
        // input3.id = 'javascript';
        // input3.name = 'fav_language';
        // input3.value = 'JavaScript';
    
        // const label3 = document.createElement('label');
        // label3.htmlFor = 'javascript';
        // label3.textContent = 'JavaScript';
    
        // choiceDiv3.appendChild(input3);
        // choiceDiv3.appendChild(label3);
    
        // // Append all choice divs to the multiple-choices div
        // multipleChoicesDiv.appendChild(choiceDiv1);
        // multipleChoicesDiv.appendChild(choiceDiv2);
        // multipleChoicesDiv.appendChild(choiceDiv3);
        
        // Create the Next button
        const nextButton = document.createElement('button');
        nextButton.id = 'nextQuestion';
        nextButton.setAttribute('data-bs-target', '#carouselExample');
        nextButton.setAttribute('data-bs-slide', 'next');
        nextButton.textContent = 'Next';

        const prevButton = document.createElement('button');
        prevButton.id = 'prevQuestion';
        prevButton.setAttribute('data-bs-target', '#carouselExample');
        prevButton.setAttribute('data-bs-slide', 'prev');
        prevButton.textContent = 'Previous';
        

       

        carouselItem.appendChild(multipleChoicesDiv);
        if(j!=questions.length-1)
        carouselItem.appendChild(nextButton);

        if(j!=0){
            carouselItem.appendChild(prevButton);
        }

    }
} 