
const output = document.getElementById('output');
const info = document.getElementById('info');
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

if('connection' in navigator) { 
    // Output values
    output.innerHTML += `<strong>Downlink</strong>: ${JSON.stringify(connection.downlink)}<br>`;
    output.innerHTML += `<strong>downlinkMax</strong>: ${JSON.stringify(connection.downlinkMax)}<br>`;
    output.innerHTML += `<strong>effectiveType</strong>: ${JSON.stringify(connection.effectiveType)}<br>`;
    output.innerHTML += `<strong>rtt</strong>: ${JSON.stringify(connection.rtt)}<br>`;
    output.innerHTML += `<strong>saveData</strong>: ${JSON.stringify(connection.saveData)}<br>`;
    output.innerHTML += `<strong>type</strong>: ${JSON.stringify(connection.type)}<br>`;

    // Display info at beginning
    if(connection.effectiveType == "2g" || connection.effectiveType == "slow-2g" || connection.rtt > 650) {
        info.classList.add("visible");
    }

    // Listen to connection change
    connection.onchange = checkConnection;
    function checkConnection(e) {
        console.log(`effectiveType: ${e.target.effectiveType}`);
        console.log(`rtt: ${e.target.rtt}`);
        if(e.target.effectiveType == "2g" || e.target.effectiveType == "slow-2g" || navigator.onLine == false || e.target.rtt > 650) { // remove "|| navgiator.onLine == false" when using event listeners below
            info.classList.add("visible");
        }
        else {
            info.classList.remove("visible");
        }
    }

}
else {
    output.textContent = "Your browser doesn't seem to support the Network Information API.";
}


window.onoffline = () => {
    info.classList.add("visible");
}
window.ononline = () => {
    if('connection' in navigator) {
        if(connection.effectiveType == "3g" || connection.effectiveType == "4g"){
            info.classList.remove("visible");
        }
    }
    else {
        info.classList.remove("visible");
    }
}


