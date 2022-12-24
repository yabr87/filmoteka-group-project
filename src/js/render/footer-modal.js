const openBtnEl = document.querySelector(".footer__button")
const closeBtnEl = document.querySelector(".modal-title")
const modalOurTeamEl = document.querySelector(".backdrop-team")
const backdrop = document.querySelector(".backdrop-team")
openBtnEl.addEventListener("click", openModal)
function openModal() {
    modalOurTeamEl.classList.remove("hidden") 
    closeBtnEl.addEventListener("click", closeModal)
    backdrop.addEventListener("click",event=>{
        if(event.target===backdrop)
        {
            return closeModal()   
        }
    })
}
function closeModal(){
    modalOurTeamEl.classList.add("hidden")
    closeBtnEl.removeEventListener("click",closeModal)
   
}

openBtnEl.addEventListener("click", e => {
    
})