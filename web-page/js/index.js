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
          
    const tcModeEl = document.getElementById("tcMode");
    const tcModeValue = tcModeEl.value;
    const tcModeOptions = Array.from(tcModeEl.options).find(option => option.value === tcModeValue);
    
    const controllerConfig={
        controllerHost: controllerHost.value,
        controllerType:selectedOption.textContent,
        controllerInput: controllerInput,
        controllerTcMode: tcModeOptions.textContent
    }
    console.log(controllerConfig);
    postData("/api/set-controller", controllerConfig);

}

function postData(route, data) {
    const host = window.location.host;
    const url = `http://${host}${route}`;
  
    fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(data),})
      .then(response => { if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);} })
      .catch(error => {console.error('Error:', error);});
}

async function getData(route) {
    const host = window.location.host;
    const url = `http://${host}${route}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

getData('/api/status')
    .then(responseData => {
        console.log(responseData);
        document.getElementById("clockHost").value = responseData.clockHost;
        document.getElementById("controllerHost").value = responseData.controlDeviceHost;
        
        const controllerTypeEl = document.getElementById('controllerType');
        const controllerTypeOption = Array.from(controllerTypeEl.options).find(option => option.textContent === responseData.controlDevice);
        if (controllerTypeOption) {controllerTypeOption.selected = true;}
        handleControllerChange();
    })  
    .catch(error => {
        // Handle the error
    });


