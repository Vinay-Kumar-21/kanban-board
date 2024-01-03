let addBtn = document.querySelector(".add-btn");//select add btn
let modalCont = document.querySelector(".modal-cont");//select modal container
let delBtn = document.querySelector(".remove-btn");//select remove btn
let textArea = document.querySelector("textarea");//select text area
let mainContainer = document.querySelector(".main-cont");//select container
let addModal = true;
let delBtnClicked = false;


var uid = new ShortUniqueId();//generate UID


let allModalColor = document.querySelectorAll(".modal-color");
let priorityColor = 'red';


let color = ["red", "blue", "gray", "green"];

//storing data of each ticket in the form of object
let ticketArr = [];

if (localStorage.getItem('TaskArr')) {
    let ticketArrStr = localStorage.getItem("TaskArr");
    ticketArr = JSON.parse(ticketArrStr);
    for (let i = 0; i < ticketArr.length; i++) {
        let ticket = ticketArr[i];
        createTicket(ticket.value, ticket.color, ticket.id);
    }
}

for (let i = 0; i < allModalColor.length; i++) {
    allModalColor[i].addEventListener('click', function () {
        //console.log(allModalColor[i].classList[1]);

        for (let j = 0; j < allModalColor.length; j++) {
            allModalColor[j].classList.remove('active');
        }

        allModalColor[i].classList.add('active');

        //update priority color
        priorityColor = allModalColor[i].classList[1];
        createTicket(textArea.value, priorityColor);
        modalCont.style.display = 'none'

        //empty txt area value
        textArea.value = "";
    })
}



addBtn.addEventListener('click', function () {
    if (addModal) {
        modalCont.style.display = 'flex'
    }
    else {
        modalCont.style.display = 'none'
    }
    addModal = !addModal;
})


delBtn.addEventListener('click', function () {
    if (!delBtnClicked) {
        delBtn.style.color = 'red';
        alert('click on ticket it will delete until bin is red');
    }
    else {
        delBtn.style.color = 'black';
    }
    delBtnClicked = !delBtnClicked;
})

textArea.addEventListener('keydown', function (e) {
    let key = e.key;
    if (key == "Enter") {
        //generate ticket
        createTicket(textArea.value, priorityColor);
        modalCont.style.display = 'none'
        //empty txt area value
        textArea.value = "";

    }
})

function createTicket(task, priorityColor, ticketId) {

    let id;
    if (ticketId) { // id is there it means we are creating from localstorage.
        id = ticketId
    } else { // else we are creating from UI. 
        id = uid.rnd();
    }

    let tickCont = document.createElement("div");
    tickCont.className = "ticket-cont";
    tickCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div> 
                            <div class="ticket-id">#${id}</div> 
                            <div class="ticket-area"> ${task}</div>
                            <div class="lock-unlock-btn"><i class="fa-solid fa-lock"></i></div>`;

    // console.log(ticketCont);
    if (!ticketId) { // only make changes in the array when ticketId is not passed. or 
        // we can say it is created with UI and not from the localStorage.
        ticketArr.push({ id: id, color: priorityColor, value: task });
        // console.log(ticketArr);

        updateLocalStorage();
    }

    mainContainer.appendChild(tickCont);

    tickCont.addEventListener('click', function () {
        if (delBtnClicked) {
            tickCont.remove();
            let ticketIndex = ticketArr.findIndex(function (ticketObj) {
                return ticketObj.id = id;
            })
            ticketArr.splice(ticketIndex, 1);
            updateLocalStorage();
            console.log(ticketArr);
        }

    })

    //functinality to lock & unlock btn
    let lockUnlockBtn = tickCont.querySelector(".lock-unlock-btn i");
    //console.log(lockUnlockBtn);

    let tickArea = tickCont.querySelector('.ticket-area');

    lockUnlockBtn.addEventListener('click', function () {
        if (lockUnlockBtn.classList.contains('fa-lock')) {
            lockUnlockBtn.classList.remove('fa-lock');
            lockUnlockBtn.classList.add('fa-lock-open');
            tickArea.setAttribute('contenteditable', 'true');
        }
        else {
            lockUnlockBtn.classList.remove('fa-lock-open');
            lockUnlockBtn.classList.add('fa-lock');
            tickArea.setAttribute('contenteditable', 'false');
        }
    })

    //cyclic method for ticket color
    let ticketColor = tickCont.querySelector(".ticket-color");
    ticketColor.addEventListener('click', function () {
        let currColor = ticketColor.classList[1];
        let idx = color.findIndex(function (col) {
            return col == currColor;
        })

        let nextIdx = (idx + 1) % color.length;
        let nxtColor = color[nextIdx];

        ticketColor.classList.remove(currColor);
        ticketColor.classList.add(nxtColor);

        let ticketIndex = ticketArr.findIndex(function (ticketObj) {
            return ticketObj.id == id;
        })
        ticketArr[ticketIndex].color = nextColor;
        updateLocalStorage();
    })
}

function updateLocalStorage() {
    let ticketArrStr = JSON.stringify(ticketArr);
    localStorage.setItem("TaskArr", ticketArrStr);
}

