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
        <div class="input-group input-group-sm mb-1">
            <span class="input-group-text" id="inputGroup-sizing-sm">${index.toString(16)}</span>
            <input id="${index}-inp" value="0" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        `;
        
    }

    function sleepMy(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    var infoText = document.getElementById("info-paragraph");

    var pcInput = document.getElementById("pc-value");
    
    var acInput = document.getElementById("ac-value");

    var irInput = document.getElementById("ir-value");

    var AddInput1 = document.getElementById("add-input-1");

    var AddInput2 = document.getElementById("add-input-2");

    var AddResult = document.getElementById("add-result");




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
        infoText.innerText = "fetch-execute-cycle started."
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
                if (!REG_EXP.test(irValueInStringRaw)){
                    alert('one or more of your inputs is/are 2 incorrect.\n\nNOTE: All your inputs should be in hex value and your instruction inputs greater than one literal');
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
                pcInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                await sleepMy(2000);
                pcInput.style.boxShadow = "";
                document.getElementById(`${irAdressInDecimal}-inp`).style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                await sleepMy(2000);
                irInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                await sleepMy(2000);
                irInput.value = irValueInStringRaw;
                await sleepMy(1000);
                
                irInput.style.boxShadow = "";
                document.getElementById(`${irAdressInDecimal}-inp`).style.boxShadow = "";
                await sleepMy(2000);

                pcInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                await sleepMy(300);
                pcInput.style.boxShadow = "";
                await sleepMy(200);
                pcInput.value = (pcAdressInDecimal+1).toString(16);
                pcInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";

                await sleepMy(1000);
                pcInput.style.boxShadow = "";

                currentOpCode = parseInt(irValueInStringRaw[0]);


                if (currentOpCode == OPCODE_LOAD) {
                    // do loading here...
                    infoText.innerText = `Load AC from Memory`;
                    document.getElementById(`${irRealValue}-inp`).style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(2000);
                    acInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";

                    ValuetoBeLoaded = document.getElementById(`${irRealValue}-inp`).value;
                    await sleepMy(2000);
                    acInput.value = ValuetoBeLoaded;

                    await sleepMy(1000);
                    acInput.style.boxShadow = "";
                    document.getElementById(`${irRealValue}-inp`).style.boxShadow = "";

                    await sleepMy(2000);
                    infoText.innerText = `Next instruction waiting...`;
                }else if (currentOpCode == OPCODE_STORE) {
                    // do storing here...
                    infoText.innerText = `Store AC to Memory`;
                    await sleepMy(2000);
                    acInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(1000);
                    document.getElementById(`${irRealValue}-inp`).style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    ValuetoBeStored = acValueInStringRaw;
                    ElementToStoreValue = document.getElementById(`${irRealValue}-inp`);
                    await sleepMy (2000);
                    ElementToStoreValue.value = ValuetoBeStored;
                    await sleepMy(2000);

                    ElementToStoreValue.style.boxShadow = "";
                    acInput.style.boxShadow = "";

                    infoText.innerText = "Next instruction waiting...";
                }else if (currentOpCode == OPCODE_ADD) {
                    // do adding here...
                    infoText.innerText = `Add to AC from Memory`;
                    await sleepMy(2000);
                    document.getElementById(`${irRealValue}-inp`).style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(1000);
                    AddInput1.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(2000);
                    valuetoBeAdded = document.getElementById(`${irRealValue}-inp`).value;
                    AddInput1.value = valuetoBeAdded;
                    await sleepMy(2000);
                    AddInput1.style.boxShadow = "0 0 2pt 1pt #0000FF";
                    document.getElementById(`${irRealValue}-inp`).style.boxShadow = "";

                    await sleepMy(2000);
                    acInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(1000);
                    AddInput2.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(2000);
                    AddInput2.value = acValueInStringRaw;
                    await sleepMy(2000);
                    AddInput2.style.boxShadow = "0 0 2pt 1pt #0000FF";
                    acInput.style.boxShadow = "";

                    var result = acValueInDecimal + parseInt(valuetoBeAdded, 16);
                    await sleepMy(2000);
                    AddResult.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(2000);
                    AddResult.value = result.toString(16);
                    await sleepMy(1000);
                    AddInput1.style.boxShadow = "";
                    AddInput2.style.boxShadow = "";

                    await sleepMy(2000);
                    acInput.style.boxShadow = "0 0 2pt 1pt #6aeb4a";
                    await sleepMy(2000);
                    acInput.value = AddResult.value;
                    await sleepMy(1000);
                    AddResult.style.boxShadow = "";
                    acInput.style.boxShadow = "";
                    await sleepMy(1000);

                    infoText.innerText = "Next instruction waiting"
                }
                

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
        await sleepMy(1000);
        infoText.innerText = "Cycle has halted. No more instructions to be fetched.";
        await sleepMy(500);
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
