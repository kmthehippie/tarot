import './styles.css'

console.log("Yo, this working like a sexy bay")

const test = document.querySelector(".test")
const div = document.createElement("div")
div.textContent = "Yo, work work working!"
console.log(test);
console.log(div);
test.appendChild(div);
