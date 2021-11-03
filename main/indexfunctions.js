var connection = null;


function test(){

    console.log("Working");



}

function level(levelnum){
                             
    levelnum = levelnum.ResponseBody.PropertyValues[0].PropertyValue
    const levels = ["null", "OldWestWorld", "VoxelWorld"]
    
    if(levelnum == 2){
        
        window.location = "voxelworld.html";
    
    
    }else if(levelnum == 1){
        
        window.location = "oldwestworld.html";
        
        
    }
}


function getPresets() {
    if (connection) {
        let input = document.getElementById("in");
        const registerPayload = {
           "MessageName": "http",
            "Parameters": {
            "Url": "/remote/presets/",
            "Verb": "GET",
            "Body": { }
            }
        };
        connection.send(JSON.stringify(registerPayload));
    }
}

function getWorld(){
    
    
    if (connection) {
        const registerPayload = {
           "MessageName": "http",
            "Parameters": {
            "Url": "/remote/preset/ThomasPreset/property/Current World",
            //"Url": "/remote/presets",
            "Verb": "GET",
            "Body": { }
            }
        };
        console.log("Sending: " + JSON.stringify(registerPayload));
        connection.send(JSON.stringify(registerPayload));
    }
    
    
}

window.onload = function connect() {
    console.log("Trying Connection...")
    connection = new WebSocket('ws://130.123.196.122:30020');
   // connectionTwo = new WebSocket('ws://130.123.196.83:30050')
    connection.onopen = function () {
        document.getElementById("status").innerHTML = "Connection Open";
        window.setInterval(getWorld, 1000);
    };
    connection.onerror = function (error) {};
    connection.onmessage = function (message) {
        if (message.data instanceof Blob) {
            reader = new FileReader();
            reader.onload = () => {
                let json = JSON.parse(reader.result);
                const messagedata = JSON.parse(reader.result);
                console.log(messagedata);
                if(messagedata.ResponseBody.PropertyValues != null){
                    
                    level(messagedata);
                    
                }else{
                    
                    console.log("Not World Information Lol")
                    
                }
                
                
            };
            reader.readAsText(message.data);
        } else {}
    };
    connection.onclose = function(event) {

        if(event.code == 1006){

            console.log("No Response, Retying in 1 second...");
            setTimeout(function() {connect(); }, 1000);
        }else if(event.code == 1000 || 1001){

            console.log("Server Shutdown!");
            

        }
      
    };
}

