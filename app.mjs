
document.querySelectorAll(".category-div").forEach((element)=>{
    element.addEventListener("click",(event)=>{
        const category=element.getAttribute("id");
        setCategory(category);

    })
})

document.querySelectorAll(".level").forEach((element)=>{
    element.addEventListener("click",(event)=>{
        const level=element.getAttribute("id");
        console.log(level);

        document.getElementById("difficultyText").innerHTML = `Difficulty: ${level}`;
    })
})
console.log(level);


function setCategory(categoryParam){
    let category = categoryParam;
    return category;
}