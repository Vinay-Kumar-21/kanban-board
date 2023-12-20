let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let addModal = true;

addBtn.addEventListener('click', function () {
    if (addModal) {
        modalCont.style.display = 'flex'
    }
    else {
        modalCont.style.display = 'none'
    }
    addModal = !addModal;
})