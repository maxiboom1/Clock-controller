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