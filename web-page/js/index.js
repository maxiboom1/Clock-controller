var myTabs = new bootstrap.Tab(document.getElementById('clockConfigTab'));
myTabs.show();

document.addEventListener('DOMContentLoaded', function () {
    const clockConfigForm = document.getElementById('clockConfigForm');

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

function setClockConfig(){  
    const clockModeElement = document.getElementById("clockMode");
    const selectedValue = clockModeElement.value;
    const selectedOption = Array.from(clockModeElement.options).find(option => option.value === selectedValue);
    
    const clockConfig={
        clockHost: document.getElementById("clockHost").value,
        clock2Host: document.getElementById("clock2Host").value,
        clockMode: selectedOption.textContent
    }
    
    postData("/api/set-config", clockConfig);

}

function setControllerConfig(){
    
    const controllerHost = document.getElementById("controllerHost");
    const tcModeEl = document.getElementById("tcMode");
    const tcModeValue = tcModeEl.value;
    const tcModeOptions = Array.from(tcModeEl.options).find(option => option.value === tcModeValue);
    
    const controllerConfig={
        controlDeviceHost: controllerHost.value,
        controlDevice:"Tricaster",
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

// Get initial data
getData('/api/get-config')
.then(responseData => {
        console.log("Got from server: ", responseData);
        document.getElementById("clockHost").value = responseData.clockHost;
        document.getElementById("clock2Host").value = responseData.clock2Host;
        document.getElementById("controllerHost").value = responseData.controlDeviceHost;
        
        // Set the Clock Mode ==> time mode/ controller mode
        const clockModeEl = document.getElementById('clockMode');
        Array.from(clockModeEl.options).forEach(option => {
            if (option.textContent === responseData.clockMode) {
                option.selected = true;
            }
        });

        // Wait for the controller type to properly set, then update input and DDR
        setTimeout(() => {

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



