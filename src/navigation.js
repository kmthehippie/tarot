import { cardsArr } from "./cardsData.js";
import { Card } from "./card.js";
import { keyPress, keyPressModal } from "./general.js";


const body = document.querySelector(".body");
const allModal = document.querySelectorAll(".modal")

export const navigation = {
    renderHomePage: ()=>{
        // Render template for home page
        const homeTemp = document.getElementById("home-template");
        const homeDiv = homeTemp.content.cloneNode(true);
        body.appendChild(homeDiv)
        navigation.navBtnFn()
        navigation.cardBtnFn()
    },
    navBtnFn: () => {
        //for each nav button add ability to show modal
        const nav = document.querySelectorAll(".nav")
        nav.forEach( btn => {
            btn.addEventListener("click", ()=>{
                let div = btn.nextElementSibling;
                allModal.forEach(modal => {
                    if (modal === div) {
                        if (div.classList[3] === "inactive"){
                            div.classList.remove("inactive")
                        } else {
                            div.classList.add('inactive')
                        }
                    }else {
                        if(modal.classList.length !== 4){
                            modal.classList.add("inactive");
                        }
                    }
                    keyPressModal(".modal")
                })
            })
        })
    },
    cardBtnFn: () => {
        //for each li, render a card.
        const allCardBtn = document.querySelectorAll(".card-btn");
        allCardBtn.forEach(li =>{
            li.addEventListener("click", () => {
                const homePage = document.querySelector(".home-page");
                if(homePage !== null){
                    homePage.remove();
                }

                Card.removeCard();
                
                let a = li.innerText;
                a = a.toLowerCase().split(" ").join("");

                cardsArr.forEach( card => {
                    let c = card.cardTitle
                    c = c.toLowerCase().split(" ").join("");
                    if (a === c) {
                        Card.render(card)
                        return
                    }
                }) 
    
            })
        })
    }
}