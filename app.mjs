

import { difficulty, category } from "./Modules/fetchQuestion.mjs";

import { getQuestions } from "./Modules/fetchQuestion.mjs";


document.getElementById("start").addEventListener("click",(event)=>{
    document.getElementById("quizParent").classList.remove("active");

    getQuestions(category, difficulty);

})
console.log(difficulty+"  Hello "+category);
