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

for (let i = 0; i < allModalColor.length; i++) {
    allModalColor[i].addEventListener('click', function () {
        //console.log(allModalColor[i].classList[1]);

        for (let j = 0; j < allModalColor.length; j++) {
            allModalColor[j].classList.remove('active');
        }

        allModalColor[i].classList.add('active');

        //update priority color
        priorityColor = allModalColor[i].classList[1];
        createTicket(textArea.value);
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
        createTicket(textArea.value);
        modalCont.style.display = 'none'

        //empty txt area value
        textArea.value = "";

    }
})

function createTicket(task) {
    let tickCont = document.createElement("div");
    tickCont.className = "ticket-cont";
    tickCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div> 
                            <div class="ticket-id">#${uid.rnd()}</div> 
                            <div class="ticket-area"> ${task}</div>
                            <div class="lock-unlock-btn"><i class="fa-solid fa-lock"></i></div>`;
    mainContainer.appendChild(tickCont);

    tickCont.addEventListener('click', function () {
        if (delBtnClicked) {
            tickCont.remove();
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

    //cyclic method of ticket colors
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
    })

}

