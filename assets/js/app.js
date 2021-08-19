document.addEventListener("DOMContentLoaded", function(){
    alert("first load");
    const OPCODE_ADD = 5;
    const OPCODE_LOAD = 1;
    const OPCODE_STORE = 2;

    

    const elemnt = document.getElementById("ram");

    for (let index = 0; index < 201; index++) {
        elemnt.innerHTML += 
        `
        <div class="input-group input-group-sm">
            <span class="input-group-text" id="inputGroup-sizing-sm">${index.toString(16)}</span>
            <input id="${index}-inp" value="0" type="number" min="10" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        `;
        
    }





    var pcAdress = parseInt(document.getElementById("pc-value").value);
    
    var acValue = parseInt(document.getElementById("ac-value").value);




    // alert(`pc value: ${pcValue}\nirvalue: ${irValue}\n acvalue: ${acValue}`);

       

    // while (icValue > 0) {
    //     console.log(icValue); 
    //     irAdress++;
    //     icValue = parseInt(document.getElementById(`${irAdress}-inp`).value);  
    // }
    // if (icValue == 0) {
    //     console.log("finished.");
    // }




    // setTimeout(() => {
    //     var irAdress = parseInt(document.getElementById("ir-value").value, 16);
    //     var icValue = parseInt(document.getElementById(`${irAdress}-inp`).value);
    //     while (icValue > 0) {
    //         console.log(icValue); 
    //         irAdress++;
    //         icValue = parseInt(document.getElementById(`${irAdress}-inp`).value);
            
    //     }
    // }, 1000);
    
    

    


    const playButton = document.getElementById('play-button');
    document.getElementById('play-button').addEventListener("click", () =>{
        playButton.setAttribute("disabled", "disabled");
        var irAdressInDecimal = parseInt(document.getElementById("ir-value").value, 16);
        var irValue = parseInt(document.getElementById(`${irAdress}-inp`).value);
        while (irAdressInDecimal < 0) {
            irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
            if (irValue != 0) {
                var control = document.getElementById('');
                var regExp = new RegExp(/^0x[0-9A-F]{1,4}$/i);
                if (!regExp.test(control))
                    alert('one of your inputs is/are incorrect');
            }
            irAdressInDecimal++;
        }
        var irValue = parseInt(document.getElementById(`${irAdress}-inp`).value);
        try {
            console.log(irValue);
            while (irValue > 0) {



                if (currentOpCode == OPCODE_ADD) {
                    // do addition here...
                }else if (currentOpCode == OPCODE_LOAD) {
                    // do loading here...
                }else if (currentOpCode == OPCODE_STORE) {
                    // do storing here...
                }


                irAdressInDecimal++;
                irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
            }
        } catch (error) {
            alert(error.value);
        }
        playButton.removeAttribute("disabled");
    });









    // setTimeout(() => {
    //     window.location.replace("#6-inp");
    // }, 5000);
});




// function onInputChange(num) {
//     var newNum;
//     if(num == undefined) num = "0";
//     num = typeof(num) === String ? num : num.tostring();
//     while (num.length < 4) {
//        newNum = "0" + num;
//     }

//     return newNum

// }



    
// var control = document.getElementById('');
// var regExp = new RegExp(/^0x[0-9A-F]{1,4}$/i);
// if (!regExp.test(control))
//     alert('invalid');
