import { createQuestions } from "./Questions.mjs";
let category ="";
let difficulty="";

const apiKEY = "fdFdRhOqSOSwGFl2JmtG1SsptuhJvHUxRFHKVxfR";
document.querySelectorAll(".category-div").forEach((element)=>{
    element.addEventListener("click",(event)=>{
        category=element.getAttribute("id");
        document.getElementById("categoryText").innerHTML = `Category: ${category}`;
    })
})

document.querySelectorAll(".level").forEach((element)=>{
    element.addEventListener("click",(event)=>{
        difficulty=element.getAttribute("id");
        document.getElementById("difficultyText").innerHTML = `Difficulty: ${difficulty}`;
    })
})

export async function getQuestions(category, difficulty) {
    let url = `https://quizapi.io/api/v1/questions?apiKey=${apiKEY}&category=${category.toLowerCase()}&difficulty=${difficulty.toLowerCase()}&limit=20`
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        createQuestions(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export {category, difficulty}