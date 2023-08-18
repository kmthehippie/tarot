import { cardsArr } from "./cardsData.js";
import { closeFn, keyPress } from "./general.js";



export const Card = {
    render: (cardName)=>{
        const allModal = document.querySelectorAll(".modal");
        allModal.forEach(modal => {
            if (modal.classList.length !== 4) {
                modal.classList.add("inactive")
            }
        })

        const bod = document.querySelector(".body");     
        const cardTemplate = document.getElementById("card-template");
        const div = cardTemplate.content.cloneNode(true);
        div.querySelector(".card-title").textContent = cardName.cardTitle
        const cardBody = div.querySelector(".card-body");
        cardName.images.forEach(item => {
            let cardImgs = div.querySelector(".card-images")
            const createCardImg = document.createElement("div");
            createCardImg.classList.add("card-image");
            createCardImg.innerHTML = item.img;
            cardImgs.appendChild(createCardImg);

            let cardBy = div.querySelector(".card-bys");
            const createCardBy = document.createElement("div");
            createCardBy.classList.add("card-by");
            createCardBy.innerHTML = item.imgText;
            cardBy.appendChild(createCardBy)

            
            let circle = document.createElement("div");
            circle.classList.add("circle");
            div.querySelector(".image-nav-btns").appendChild(circle)
            
            if (item.imgText.includes("Waite")){ 
                circle.classList.add("active");
                createCardBy.classList.add("active");
                createCardImg.classList.add("active");
            }


        })

        const mininavBtns = div.querySelectorAll(".mininav");
        mininavBtns.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (document.querySelector(".card-modal") !== null){
                    let parent = document.querySelector(".card-modal").parentElement;
                    let child = document.querySelector(".card-modal")
                    parent.removeChild(child)
                }
                mininavBtns.forEach(btn=>{
                    btn.classList.remove("active")
                })
                if(btn.classList[0] === "keywords"){
                    Card.modalKW(cardName);
                    btn.classList.add("active")
                } else {
                    Card.modal(btn.classList[0], cardName);
                    btn.classList.add("active")
                }
            })
        })
        
        bod.appendChild(div);
        Card.carousel()
        Card.suitCarousel(cardName)
    },
    carousel: ()=> {
        const btns = document.querySelectorAll(".carousel-btn")
        const div = document.querySelectorAll(".card-image")
        const circles = document.querySelectorAll(".circle")
        const cardBy = document.querySelectorAll(".card-by")
        let currentIndex = 0;

        btns.forEach(btn => {
            btn.addEventListener("click", ()=> {
                cardBy[currentIndex].classList.remove("active");
                div[currentIndex].classList.remove("active");
                circles[currentIndex].classList.remove("active");
                if(btn.classList[0] === "rightbtn"){
                    if (currentIndex >= div.length-1){
                        currentIndex = 0;
                    } else {
                        currentIndex++;
                    }
                }else if (btn.classList[0] === "leftbtn"){
                    if (currentIndex <= 0) {
                        currentIndex = div.length-1;
                    }else {
                        currentIndex --
                    }
                }
                div[currentIndex].classList.add("active")
                cardBy[currentIndex].classList.add("active");
                circles[currentIndex].classList.add("active");
            })
        })
    },
    modalKW: (cardName)=> {
        const cardPg = document.querySelector(".card-page");
        const modalTemp = document.getElementById("template-kw-card-modal")
        const modalDiv = modalTemp.content.cloneNode(true);

        const keywordsUl = modalDiv.querySelector(".keywords-list");
        let kw = cardName.keyWords;
        kw.forEach(k => {
            const createLi = document.createElement("li");
            createLi.textContent = k;
            keywordsUl.appendChild(createLi);
        })
        
        cardPg.appendChild(modalDiv)
        closeFn( cardPg );
        keyPress(".card-modal", ".mininav");
    },
    modal: (btn, cardName) => {
        const cardPg = document.querySelector(".card-page");
        console.log(btn);
        const modalTemp = document.getElementById("template-other-card-modal")
        const modalDiv = modalTemp.content.cloneNode(true);
        const modalText = modalDiv.querySelector(".modal-text");
        const modalHeader= modalDiv.querySelector(".modal-text-header")
        if(btn === "general"){
            modalHeader.textContent = "General"
            modalText.innerHTML = cardName.general;
        } else if (btn === "career"){
            modalHeader.textContent = "Career & Finances"
            modalText.innerHTML = cardName.career;
        }else if (btn === "love"){
            modalHeader.textContent = "Love & Relationship"
            modalText.innerHTML = cardName.love;
        }else if (btn === "spirituality"){
            modalHeader.textContent = "Spirituality"
            modalText.innerHTML = cardName.spirituality;
        }else if (btn === "img-desc"){
            modalHeader.textContent = "Image Description"
            modalText.innerHTML = cardName.cardDesc;
        }
        
        cardPg.appendChild(modalDiv);
        closeFn( cardPg );
        keyPress(".card-modal", ".mininav");
    },
    removeCard: ()=>{
        const bod = document.querySelector(".body");
                if (bod.children.length >= 1){
                    let el = bod.children[0];
                    el.remove();
                }

    },
    suitCarousel: (cardName) => {
        let currentIndex;
        console.log(cardName.cardTitle);
        for(let i = 0; i < cardsArr.length; i++){
            if (cardName.cardTitle === cardsArr[i].cardTitle){
                currentIndex = i;
            }
        }
        const btns = document.querySelectorAll(".card-np-btn")
        btns.forEach(btn => {
            btn.addEventListener("click", ()=>{
                if (btn.classList[0] === "rightbtn"){
                    currentIndex++
                    if (currentIndex > cardsArr.length-1){
                        currentIndex = 0;
                    }
                    Card.removeCard()
                    Card.render(cardsArr[currentIndex])
                } else if (btn.classList[0] === "leftbtn"){
                    currentIndex--
                    if (currentIndex < 0){
                        currentIndex = cardsArr.length-1
                    }
                    Card.removeCard()
                    Card.render(cardsArr[currentIndex])
                }
            })
        })
    }
}
