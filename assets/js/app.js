document.addEventListener("DOMContentLoaded", function(){
    alert("first load");
    const OPCODE_ADD = 5;
    const OPCODE_LOAD = 1;
    const OPCODE_STORE = 2;
    const REG_EXP = new RegExp(/^[a-fA-F0-9]*$/);
    const EXIT = 1;

    var currentOpCode;

    const elemnt = document.getElementById("ram");
    for (let index = 0; index < 201; index++) {
        elemnt.innerHTML += 
        `
        <div class="input-group input-group-sm">
            <span class="input-group-text" id="inputGroup-sizing-sm">${index.toString(16)}</span>
            <input id="${index}-inp" value="0" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        `;
        
    }

    function sleepMy(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }





    var pcInput = document.getElementById("pc-value");
    
    var acInput = document.getElementById("ac-value");

    var irInput = document.getElementById("ir-value");




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
    document.getElementById('play-button').addEventListener("click", async () =>{
        playButton.setAttribute("disabled", "disabled");
        pcInput.value = "0";
        irInput.value = "0";
        acInput.value = "0";
        var toBeLoaded;
        var toBeStored;
        var pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
        var pcAdressInStringRaw = document.getElementById(`${pcAdressInDecimal}-inp`).value;
        var irAdressInDecimal = parseInt(document.getElementById("ir-value").value, 16);
        var irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
        var irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
        var irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);

        
        while (irAdressInDecimal < 200) {
            irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
            irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
            if (irValue != 0) {
                if (!REG_EXP.test(irValueInStringRaw) || irValueInStringRaw.length < 2){
                    alert('one or more of your inputs is/are incorrect.\n\nNOTE: All your inputs should be in hex value and your instruction inputs greater than one literal');
                    playButton.removeAttribute("disabled");
                    return;
                }
                if (irValueInStringRaw[0] === "1" || irValueInStringRaw[0] === "2" || irValueInStringRaw[0] === "5") {
                    console.log('passed');
                }else{
                    console.log(irValueInStringRaw[0]);
                    alert("The first literal of the hex vlaue of your instructions inputs can only be 1, 2 or 5.");
                    playButton.removeAttribute("disabled");
                    return;
                }  
                if (irRealValue > 200) {
                    alert(`Memmory address at ${irAdressInDecimal} not available.`);
                    playButton.removeAttribute("disabled");
                    return;
                }
            }
            irAdressInDecimal++;
            if (irValue == 0) {
                break;
            }
        }

        while (irAdressInDecimal < 200) {
            irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
            irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
            if (irValue != 0) {
                if (!REG_EXP.test(irValueInStringRaw) || irValueInStringRaw.length < 2){
                    alert('one or more of your inputs incorrect.\n\nNOTE: All your inputs should be in hex value and your instruction inputs greater than one literal');
                    playButton.removeAttribute("disabled");
                    return;
                }
            }
            irAdressInDecimal++;
        }

        pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
        irAdressInDecimal = parseInt(document.getElementById("ir-value").value, 16);
        irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
        irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
        irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);
        var acValueInStringRaw = document.getElementById('ac-value').value;
        var acValueInDecimal = parseInt(document.getElementById("ac-value").value, 16);
        // try {
            while (irValue > 0) {
                await sleepMy(2000);
                irInput.value = irValueInStringRaw;
                await sleepMy(2000);
                pcInput.value = (pcAdressInDecimal+1).toString(16);
                currentOpCode = parseInt(irValueInStringRaw[0]);


                if (currentOpCode == OPCODE_LOAD) {
                    // do addition here...
                    ValuetoBeLoaded = document.getElementById(`${irRealValue}-inp`).value;
                    await sleepMy(2000);
                    acInput.value = ValuetoBeLoaded;
                }else if (currentOpCode == OPCODE_STORE) {
                    // do loading here...
                    ValuetoBeStored = acValueInStringRaw;
                    ElementToStoreValue = document.getElementById(`${irRealValue}-inp`);
                    ElementToStoreValue.value = ValuetoBeStored;
                }
                // else if (currentOpCode == OPCODE_STORE) {
                //     // do storing here...
                // }



                irAdressInDecimal++;
                pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
                irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
                irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
                irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);
                acValueInStringRaw = document.getElementById('ac-value').value;
                acValueInDecimal = parseInt(document.getElementById("ac-value").value, 16);
            }
        // } catch (error) {
        //     alert(error.value);
        // }
        await sleepMy(2000);
        playButton.removeAttribute("disabled");
    });

});





// out of DOM
































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
