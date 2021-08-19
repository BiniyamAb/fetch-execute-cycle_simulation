document.addEventListener("DOMContentLoaded", function(){
    alert("first load");

    const elemnt = document.getElementById("ram");

    for (let index = 0; index < 300; index++) {
        elemnt.innerHTML += 
        `
        <div id="${index}-inp" class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">${index}</span>
            <input value="0000" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
        `;
        
    }
    

    











    
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
    

