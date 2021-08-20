document.addEventListener("DOMContentLoaded", function(){
    const OPCODE_ADD = 5;
    const OPCODE_LOAD = 1;
    const OPCODE_STORE = 2;
    const REG_EXP = new RegExp(/^[a-fA-F0-9]*$/);

    const sleepMy = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    var delayMilliseconds = 1000; //other values - 200(fast) and 500(medium)
    var generalShadow = "0 0 2pt 1pt #6aeb4a";
    var currentOpCode;

    const MemoryContainer = document.getElementById("ram");
    for (let index = 0; index < 201; index++) {
        MemoryContainer.innerHTML += 
        `
        <div class="input-group input-group-sm mb-1">
            <span class="input-group-text" id="inputGroup-sizing-sm">${index.toString(16)}</span>
            <input id="${index}-inp" value="0" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        `;
        
    }
    



    var infoText = document.getElementById("info-paragraph");

    var pcInput = document.getElementById("pc-value");
    
    var acInput = document.getElementById("ac-value");

    var irInput = document.getElementById("ir-value");

    var AddInput1 = document.getElementById("add-input-1");

    var AddInput2 = document.getElementById("add-input-2");

    var AddResult = document.getElementById("add-result");    
    
    var speedSelector = document.getElementById("speed-selector");

    
    

    const playButton = document.getElementById('play-button');
    document.getElementById('play-button').addEventListener("click", async () =>{

        // Reset and initialize the simulation
        playButton.setAttribute("disabled", "disabled");
        infoText.innerText = "fetch-execute-cycle started."
        pcInput.value = "0";
        irInput.value = "0";
        acInput.value = "0";
        var toBeLoaded;
        var toBeStored;
        delayMilliseconds = parseInt(speedSelector.value);
        var pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
        var irAdressInDecimal = parseInt(document.getElementById("ir-value").value, 16);
        var irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
        var irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
        var irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);

        // Validate instruction inputs
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

        // validate memory inputs
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

        // Get input values for simulation process
        pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
        irAdressInDecimal = parseInt(document.getElementById("ir-value").value, 16);
        irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
        irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
        irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);
        var acValueInStringRaw = document.getElementById('ac-value').value;
        var acValueInDecimal = parseInt(document.getElementById("ac-value").value, 16);
        while (irValue > 0) {
            await sleepMy(2*delayMilliseconds);
            pcInput.style.boxShadow = generalShadow;
            await sleepMy(2*delayMilliseconds);
            pcInput.style.boxShadow = "";
            document.getElementById(`${irAdressInDecimal}-inp`).style.boxShadow = generalShadow;
            await sleepMy(2*delayMilliseconds);
            irInput.style.boxShadow = generalShadow;
            await sleepMy(2*delayMilliseconds);
            irInput.value = irValueInStringRaw;
            await sleepMy(delayMilliseconds);
            
            irInput.style.boxShadow = "";
            document.getElementById(`${irAdressInDecimal}-inp`).style.boxShadow = "";
            await sleepMy(2*delayMilliseconds);

            pcInput.style.boxShadow = generalShadow;
            await sleepMy(300);
            pcInput.style.boxShadow = "";
            await sleepMy(200);
            pcInput.value = (pcAdressInDecimal+1).toString(16);
            pcInput.style.boxShadow = generalShadow;

            await sleepMy(delayMilliseconds);
            pcInput.style.boxShadow = "";

            currentOpCode = parseInt(irValueInStringRaw[0]);


            if (currentOpCode == OPCODE_LOAD) {
                // do loading here...
                infoText.innerText = `Load AC from Memory`;
                document.getElementById(`${irRealValue}-inp`).style.boxShadow = generalShadow;
                await sleepMy(2*delayMilliseconds);
                acInput.style.boxShadow = generalShadow;

                ValuetoBeLoaded = document.getElementById(`${irRealValue}-inp`).value;
                await sleepMy(2*delayMilliseconds);
                acInput.value = ValuetoBeLoaded;

                await sleepMy(delayMilliseconds);
                acInput.style.boxShadow = "";
                document.getElementById(`${irRealValue}-inp`).style.boxShadow = "";

                await sleepMy(2*delayMilliseconds);
                infoText.innerText = `Next instruction waiting...`;
            }else if (currentOpCode == OPCODE_STORE) {

                // do storing here...
                infoText.innerText = `Store AC to Memory`;
                await sleepMy(2*delayMilliseconds);
                acInput.style.boxShadow = generalShadow;
                await sleepMy(delayMilliseconds);
                document.getElementById(`${irRealValue}-inp`).style.boxShadow = generalShadow;
                ValuetoBeStored = acValueInStringRaw;
                ElementToStoreValue = document.getElementById(`${irRealValue}-inp`);
                await sleepMy (2*delayMilliseconds);
                ElementToStoreValue.value = ValuetoBeStored;
                await sleepMy(2*delayMilliseconds);

                ElementToStoreValue.style.boxShadow = "";
                acInput.style.boxShadow = "";

                infoText.innerText = "Next instruction waiting...";
            }else if (currentOpCode == OPCODE_ADD) {

                // do adding here...
                infoText.innerText = `Add to AC from Memory`;
                await sleepMy(2*delayMilliseconds);
                document.getElementById(`${irRealValue}-inp`).style.boxShadow = generalShadow;
                await sleepMy(delayMilliseconds);
                AddInput1.style.boxShadow = generalShadow;
                await sleepMy(2*delayMilliseconds);
                valuetoBeAdded = document.getElementById(`${irRealValue}-inp`).value;
                AddInput1.value = valuetoBeAdded;
                await sleepMy(2*delayMilliseconds);
                AddInput1.style.boxShadow = "0 0 2pt 1pt #0000FF";
                document.getElementById(`${irRealValue}-inp`).style.boxShadow = "";

                await sleepMy(2*delayMilliseconds);
                acInput.style.boxShadow = generalShadow;
                await sleepMy(delayMilliseconds);
                AddInput2.style.boxShadow = generalShadow;
                await sleepMy(2*delayMilliseconds);
                AddInput2.value = acValueInStringRaw;
                await sleepMy(2*delayMilliseconds);
                AddInput2.style.boxShadow = "0 0 2pt 1pt #0000FF";
                acInput.style.boxShadow = "";

                var result = acValueInDecimal + parseInt(valuetoBeAdded, 16);
                await sleepMy(2*delayMilliseconds);
                AddResult.style.boxShadow = generalShadow;
                await sleepMy(2*delayMilliseconds);
                AddResult.value = result.toString(16);
                await sleepMy(delayMilliseconds);
                AddInput1.style.boxShadow = "";
                AddInput2.style.boxShadow = "";

                await sleepMy(2*delayMilliseconds);
                acInput.style.boxShadow = generalShadow;
                await sleepMy(2*delayMilliseconds);
                acInput.value = AddResult.value;
                await sleepMy(delayMilliseconds);
                AddResult.style.boxShadow = "";
                acInput.style.boxShadow = "";
                await sleepMy(delayMilliseconds);

                infoText.innerText = "Next instruction waiting..."
            }
            

            // update variables with the new input values
            irAdressInDecimal++;
            pcAdressInDecimal = parseInt(document.getElementById("pc-value").value, 16);
            irValue = parseInt(document.getElementById(`${irAdressInDecimal}-inp`).value);
            irValueInStringRaw = document.getElementById(`${irAdressInDecimal}-inp`).value;
            irRealValue = parseInt(irValueInStringRaw.replace(irValueInStringRaw[0], ""), 16);
            acValueInStringRaw = document.getElementById('ac-value').value;
            acValueInDecimal = parseInt(document.getElementById("ac-value").value, 16);
        }
        // Exit simulation(Exit Condition)
        await sleepMy(delayMilliseconds);
        infoText.innerText = "Cycle has halted. No more instructions to be fetched.";
        await sleepMy(delayMilliseconds);
        playButton.removeAttribute("disabled");
    });

});

// End of line