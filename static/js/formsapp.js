qcount = document.getElementById("Qcount")


function hidemobnav(){
    var x = document.getElementById("mob-navbar-links")
    var y = document.getElementById("mob-nav-link-hide")
    x.style.display = "none"
    y.style.display = "none"
}
function showmobnav(){
    var x = document.getElementById("mob-navbar-links")
    var y = document.getElementById("mob-nav-link-hide")
    x.style.display = "block"
    y.style.display = "block"
}



function clock(minutes){
    var min = minutes
    var seconds = minutes % 60
    var clock = document.getElementById("clock")
    // clock.innerhtml = 
}



function createq(x){
    qcount.value++
    const forms = document.querySelector(".forms")
    const form = document.createElement("div")
    form.classList.value = "form"
    form.id = "form-"+x
    //question
    const qfield = document.createElement("div")
    qfield.classList.value = "input-fields"
    const qfieldlb = document.createElement("label")
    qfieldlb.id = "qlabel-"+x
    qfieldlb.htmlFor="question-"+x
    qfieldlb.innerHTML = "Question No."+x
    qfield.appendChild(qfieldlb)
    const textarea = document.createElement("textarea")
    textarea.name = "question"
    textarea.id = "question-"+x
    textarea.cols="30"
    textarea.rows="3"
    qfield.appendChild(textarea)
    form.appendChild(qfield)

    // Single or multiple
    const qtfield = document.createElement("div")
    qtfield.classList.value = "input-fields"
    qtfield.style.textAlign = "center"
    const qt1= document.createElement("input")
    qt1.type = "radio"
    qt1.name = "question-type-"+x
    qt1.classList.value = "question-type"
    qt1.value = "Single"
    qt1.checked = "checked"
    qt1.id = "question-type-"+x+"-1"
    qtfield.appendChild(qt1)

    const qtlb1 = document.createElement("label")
    qtlb1.innerHTML = "&nbsp Single Answer &nbsp"
    qtfield.appendChild(qtlb1)

    const qt2= document.createElement("input")
    qt2.type = "radio"
    qt2.name = "question-type-"+x
    qt2.id = "question-type-"+x+"-2"
    qt2.classList.value = "question-type"
    qt2.value = "Multiple"
    qtfield.appendChild(qt2)

    const qtlb2 = document.createElement("label")
    qtlb2.innerHTML = "&nbsp Multiple Answers &nbsp"
    qtfield.appendChild(qtlb2)

    form.appendChild(qtfield)

    // Yes or no required
    const reqf = document.createElement("div")
    reqf.classList.value = "input-fields"
    reqf.style.textAlign = "center"

    const divf = document.createElement("div")
    divf.innerHTML = "Required answer or not? : &nbsp"

    const in1= document.createElement("input")
    in1.type = "radio"
    in1.name = "required-"+x
    in1.classList.value = "req"
    in1.value = "yes"
    in1.id = "req-"+x+"-1"
    in1.checked="checked"
    divf.appendChild(in1)

    const inlb1 = document.createElement("label")
    inlb1.innerHTML = "&nbsp Yes &nbsp"
    divf.appendChild(inlb1)

    const in2= document.createElement("input")
    in2.type = "radio"
    in2.name = "required-"+x
    in2.id = "req-"+x+"-2"
    in2.classList.value = "req"
    in2.value = "no"
    divf.appendChild(in2)

    const inlb2 = document.createElement("label")
    inlb2.innerHTML = "&nbsp No &nbsp"
    divf.appendChild(inlb2)


    reqf.appendChild(divf)
    form.appendChild(reqf)

    // Option -1 
    const options = document.createElement("div")
    options.classList.value = "input-fields options-"+x
    options.id = "options-"+x

    const oplabel = document.createElement("label")
    oplabel.innerHTML = "Option-1"
    oplabel.id = "label-"+x+"-1"
    options.appendChild(oplabel)

    const opinput = document.createElement("input")
    opinput.type = "text"
    opinput.name = "option-"+x
    opinput.classList.value = "option-"+x
    opinput.id = "option-"+x+"-1"
    opinput.value = "Option-1"
    options.appendChild(opinput)

    form.appendChild(options)

    const br1 = document.createElement("br")
    form.appendChild(br1)

    // add and remove buttons

    const addop = document.createElement("button")
    addop.id = "addop-"+x
    addop.type = "button"
    addop.setAttribute("onclick","createop("+x+",2)")
    addop.style.width = "47%"
    addop.innerHTML = "Add an Option"
    form.appendChild(addop)

    const delop = document.createElement("button")
    delop.id = "delop-"+x
    delop.type = "button"
    delop.setAttribute("onclick","deleteop("+x+",1)")
    delop.style.width = "47%"
    delop.innerHTML = "Delete Option"
    form.appendChild(delop)

    // Correct answer

    const correct = document.createElement("div")
    correct.classList.value = "input-fields correct"
    const crtlabel = document.createElement("label")
    crtlabel.innerHTML = "Enter Correct answer(Separate with '|' for many answers)"
    correct.appendChild(crtlabel)

    const crctin = document.createElement("input")
    crctin.type = "text"
    crctin.name = "correct"
    crctin.value = "null"
    crctin.id = "correct-"+x
    correct.appendChild(crctin)


    form.appendChild(correct)

    // Delete question

    const delq = document.createElement("button")
    delq.type = "button"
    delq.id = "delq-"+x
    delq.style.width = "97%"
    delq.setAttribute("onclick","deleteq("+x+")")
    delq.innerHTML = "Delete Question"

    form.appendChild(delq)

    // changing add form button

    const addq = document.getElementById("addQ")
    addq.setAttribute("onclick","createq("+(x+1)+")")

    forms.appendChild(form)
    const addbtn = document.getElementById('addQ')
    addbtn.setAttribute("onclick","createq("+(x+1)+")")

}

function createop(x,y){
    
    const options = document.querySelector(".options-"+x)
    const label = document.createElement("label")
    label.id = "label-"+x+"-"+y
    label.innerHTML = "Option-"+y
    options.appendChild(label)
    const op = document.createElement("input")
    op.type = "text"
    op.name = "option-"+x
    op.value = "Option-"+y
    op.classList.value = "option-"+x
    op.id = "option-"+x+"-"+y
    
    options.appendChild(op)
    const btn = document.getElementById("addop-"+x)
    const ny = y+1
    btn.setAttribute('onclick',"createop("+x+","+ny+")")
    const del = document.getElementById("delop-"+x)
    del.setAttribute('onclick',"deleteop("+x+","+y+")")
}

function deleteop(x,y){
    console.log("check")
    const op = document.getElementById("option-"+x+"-"+y)
    op.remove()
    const label = document.getElementById("label-"+x+"-"+y)
    label.remove()
    const ny = y-1
    const btn = document.getElementById("addop-"+x)
    btn.setAttribute("onclick","createop("+x+","+y+")")
    const del = document.getElementById("delop-"+x)
    del.setAttribute('onclick',"deleteop("+x+","+ny+")")
}

function deleteq(x){
    
    const form = document.getElementById("form-"+x)
    form.remove()
    const btn = document.getElementById("addQ")
    const btnvalue = parseInt(qcount.value)
    btn.setAttribute("onclick","createq("+(btnvalue)+")")
    console.log(btn)
    change(x,qcount.value)
    qcount.value--
}

function change(x,y){

    console.log("change")
    for(i=x+1;i<=y;i++){
        
        form = document.getElementById("form-"+i)
        form.id = "form-"+(i-1)

        qlabel = document.getElementById("qlabel-"+i)
        qlabel.id = "qlabel-"+(i-1)
        qlabel.htmlFor = "question-"+(i-1)
        qlabel.innerHTML = "Question No."+(i-1)

        question = document.getElementById("question-"+i)
        question.id = "question-"+(i-1)

        const qt1 = document.getElementById("question-type-"+i+"-1")
        qt1.id = "question-type-"+(i-1)+"-1"
        qt1.name = "question-type-"+(i-1)

        const qt2 = document.getElementById("question-type-"+i+"-2")
        qt2.id = "question-type-"+(i-1)+"-2"
        qt2.name = "question-type-"+(i-1)

        const req1 = document.getElementById("req-"+i+"-1")
        req1.id = "req-"+(i-1)+"-1"
        req1.name = "required-"+(i-1)

        const req2 = document.getElementById("req-"+i+"-2")
        req2.id = "req-"+(i-1)+"-2"
        req2.name = "required-"+(i-1)

        const options = document.getElementById("options-"+i)
        options.classList.value = "input-fields options-"+(i-1)
        options.id = "options-"+(i-1)

        const opc = options.children
        var opcount =1
        for(j=0;j<opc.length;j++){
            
            if(j%2==0){
                opc[j].id = "label-"+(i-1)+"-"+opcount
                
            }
            else{
                
                opc[j].name = "option-"+(i-1)
                opc[j].classList.value = "option-"+(i-1)
                opc[j].id = "option-"+(i-1)+"-"+opcount
                opcount++
            }
        }
        console.log(opcount)
        // const option = document.getElementsByClassName("option-"+i)
        // console.log(option)
        // for(j=0;j<option.length;j++){
        //     option[j].classList.value = "option-"+(i-1)
        //     option[j].setAttribute("name","option-"+(i-1))
        //     const opid = document.getElementById("option-"+i+"-"+(j+1))
        //     opid.id = "option-"+(i-1)+"-"+(j+1)
        //     const oplb = document.getElementById("label-"+i+"-"+(j+1))
        //     oplb.id = "label-"+(i-1)+"-"+(j+1)
        // }

        const addop = document.getElementById("addop-"+i)
        console.log(addop)
        addop.id = "addop-"+(i-1)
        addop.setAttribute("onclick","createop("+(i-1)+","+(opcount)+")")

        const delop = document.getElementById("delop-"+i)
        delop.id = "delop-"+(i-1)
        delop.setAttribute("onclick","deleteop("+(i-1)+","+(opcount-1)+")")

        const delq = document.getElementById("delq-"+i)
        delq.id = "delq-"+(i-1)
        delq.setAttribute("onclick","deleteq("+(i-1)+")")





    }
    
}



function abled(){
    const un = document.getElementById("username")
    const em = document.getElementById("email")
    const np = document.getElementById("password")
    const cp = document.getElementById("confirm")
    const btn = document.getElementById("save")
    const cpdiv = document.getElementById("confp")
    un.disabled = false
    em.disabled = false
    np.disabled = false
    cp.disabled = false
    cpdiv.style.display = "block"
    btn.disabled = false
}