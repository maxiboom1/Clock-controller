var myTabs = new bootstrap.Tab(document.getElementById('clockConfigTab'));
myTabs.show();

function handleControllerChange(){
    const controllerMode = document.getElementById('controllerType').value;
    if(controllerMode === "1"){
        document.getElementById('tricasterContainer').style.display = 'none';
        document.getElementById('vmixContainer').style.display = 'block';
    } else if (controllerMode === "2"){
        document.getElementById('tricasterContainer').style.display = 'block';
        document.getElementById('vmixContainer').style.display = 'none';
    }
}

function setClockConfig(){
    
    const clockModeElement = document.getElementById("clockMode");
    const selectedValue = clockModeElement.value;
    const selectedOption = Array.from(clockModeElement.options).find(option => option.value === selectedValue);
    
    const clockConfig={
        clockHost: document.getElementById("clockHost").value,
        clockMode: selectedOption.textContent
    }
    
    postData("/api/set-clock", clockConfig);

}

function setControllerConfig(){
    
    const controllerHost = document.getElementById("controllerHost");
    
    const controllerType = document.getElementById("controllerType");
    const selectedValue = controllerType.value;
    const selectedOption = Array.from(controllerType.options).find(option => option.value === selectedValue);
    
    let controllerInput = "";

    switch (selectedOption.textContent) {
        case 'vMix':
            const vmixInput = document.getElementById("vmixInput");
            controllerInput = Array.from(vmixInput.options).find(option => option.value === vmixInput.value).innerText;
            break;
        case 'Tricaster':
            const tricasterInput = document.getElementById("tricasterDDR");
            controllerInput = Array.from(tricasterInput.options).find(option => option.value === tricasterInput.value).innerText;
            break;
        default:
            console.log(`Sorry, no controller selected`);
        }
          
    const controllerConfig={
        controllerHost: controllerHost.value,
        controllerType:selectedOption.textContent,
        controllerInput: controllerInput
    }
    postData("/api/set-controller", controllerConfig);

}

function postData(route, data) {
    const host = window.location.host;
    const url = `http://${host}${route}`;
  
    fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(data),})
      .then(response => { if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);} })
      .catch(error => {console.error('Error:', error);});
  }