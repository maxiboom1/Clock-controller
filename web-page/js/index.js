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
        console.log("Got from server: ", responseData);
        document.getElementById("clockHost").value = responseData.clockHost;
        document.getElementById("controllerHost").value = responseData.controlDeviceHost;
        
        // Set the Clock Mode
        const clockModeEl = document.getElementById('clockMode');
        Array.from(clockModeEl.options).forEach(option => {
            if (option.textContent === responseData.clockMode) {
                option.selected = true;
            }
        });

        // Set the Controller Type and Input
        const controllerTypeEl = document.getElementById('controllerType');
        Array.from(controllerTypeEl.options).forEach(option => {
            if (option.textContent === responseData.controlDevice) {
                option.selected = true;
            }
        });

        // Update the display based on the selected controller
        handleControllerChange();

        // Wait for the controller type to properly set, then update input and DDR
        setTimeout(() => {
            if (responseData.controlDevice === 'vMix') {
                const vmixInputEl = document.getElementById('vmixInput');
                Array.from(vmixInputEl.options).forEach(option => {
                    if (option.textContent === responseData.controllerInput) {
                        option.selected = true;
                    }
                });
            } else if (responseData.controlDevice === 'Tricaster') {
                const tricasterDDREl = document.getElementById('tricasterDDR');
                Array.from(tricasterDDREl.options).forEach(option => {
                    if (option.textContent === responseData.controllerInput) {
                        option.selected = true;
                    }
                });
            }

            // Set the Timecode Mode
            const tcModeEl = document.getElementById('tcMode');
            Array.from(tcModeEl.options).forEach(option => {
                if (option.textContent === responseData.timecodeMode) {
                    option.selected = true;
                }
            });
        }, 100); // Timeout to ensure DOM updates have occurred
    })  
    .catch(error => {
        console.error('Error:', error);
});



