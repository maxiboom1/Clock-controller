var myTabs = new bootstrap.Tab(document.getElementById('clockConfigTab'));
myTabs.show();

function handleControllerChange(){
    const controllerMode = document.getElementById('controllerMode').value;
    console.log(controllerMode)
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
    
    postData("/api/set-clock-config", clockConfig);

}


function postData(route, data) {
    const host = window.location.host;
    const url = `http://${host}${route}`;
  
    fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(data),})
      .then(response => { if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);} })
      .catch(error => {console.error('Error:', error);});
  }