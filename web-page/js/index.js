var myTabs = new bootstrap.Tab(document.getElementById('clockConfigTab'));
myTabs.show();

document.addEventListener('DOMContentLoaded', function () {
    const clockConfigForm = document.getElementById('clockConfigForm');
    const enableClock2Checkbox = document.getElementById('enableClock2');
    const clock2HostInput = document.getElementById('clock2Host');

    // Enable or disable Clock-2 IP address field based on checkbox
    enableClock2Checkbox.addEventListener('change', function() {
        clock2HostInput.disabled = !this.checked;
        if(this.checked){clock2HostInput.required = true;} // Require input if Clock-2 is enabled
    });

    clockConfigForm.addEventListener('submit', function (event) {
        
        event.preventDefault(); // Prevent the default form submission

        if (!clockConfigForm.checkValidity()) {
            event.stopPropagation(); // Stop propagation if the form is not valid
            clockConfigForm.classList.add('was-validated'); // Bootstrap validation class
            return; // Exit the function if validation fails
        }

        // Your existing logic to collect form data
        setClockConfig();
    });
});

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
        clock2Host: document.getElementById("clock2Host").value,
        clockMode: selectedOption.textContent,
        clock2Enabled: document.getElementById('enableClock2').checked
    }
    
    postData("/api/set-config", clockConfig);

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
        controlDeviceHost: controllerHost.value,
        controlDevice:selectedOption.textContent,
        controllerInput: controllerInput,
        timecodeMode: tcModeOptions.textContent
    }
    postData("/api/set-config", controllerConfig);

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

    return fetch(url, {method: 'GET',headers: {'Content-Type': 'application/json',},})
    .then(response => {
        if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);}
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

getData('/api/get-config')
    .then(responseData => {
        console.log("Got from server: ", responseData);
        document.getElementById("clockHost").value = responseData.clockHost;
        document.getElementById("clock2Host").value = responseData.clock2Host;
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



