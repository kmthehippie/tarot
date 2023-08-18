

export const closeFn = function(div){
    const closeDiv = div.querySelector(".close");
    let mininavBtns = document.querySelectorAll(".mininav")
    mininavBtns.forEach(btn=>{
        btn.classList.remove("active")
    })
    closeDiv.addEventListener("click", ()=>{
        let cardModal = div.querySelector(".card-modal")
        console.log(cardModal);
        div.removeChild(cardModal)
    })
}


export const keyPress = function (modal, nav) {
    document.addEventListener("keydown", (e) => {
        if (document.querySelector(modal) !== null){
            let parent = document.querySelector(modal).parentElement;
            let child = document.querySelector(modal)
            let navbtns = document.querySelectorAll(nav)
            navbtns.forEach(btn=>{
                btn.classList.remove("active")
            })
            if (e.key === "Escape"){
                parent.removeChild(child)
            }
        } else {
            console.log("No modal");
        }
    });

}

export const keyPressModal = function (modal) {
    document.addEventListener("keydown", (e) => {
        let mod = document.querySelectorAll(modal)        
        if (e.key === "Escape"){
            mod.forEach( i => {
                if (i.classList.length !== 4){
                    i.classList.add("inactive")
                }
            })  
        }
    });

}