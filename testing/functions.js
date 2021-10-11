var connection = null;


function test(){

    console.log("Working");



}

function level(levelnum){
                             
    levelnum = levelnum.ResponseBody.PropertyValues[0].PropertyValue
    const levels = ["null", "OldWestWorld", "VoxelWorld"]
    
    if(levelnum == 2 && thisLevelIs != "VoxelWorld"){
        
        
        window.location = "voxelworld.html";
    
    
    }else if(levelnum == 1 && thisLevelIs != "OldWest"){
        
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
        //console.log("Sending: " + JSON.stringify(registerPayload));
        connection.send(JSON.stringify(registerPayload));
    }
    
    
}

function updateSpeed(speed, name){
    
    var float = parseFloat(speed);
    var string = name;
    console.log(name);
    
     if (connection) {
        const registerPayload = {
           "MessageName": "http",
            "Parameters": {
            //"Url": "/remote/object/property",
            "Url": "/remote/preset/ThomasPreset/property/"+name,
            //"Url": "/remote/presets",
            "Verb": "PUT",
            "Body": {
                    "PropertyValue" : float,
                    "GenerateTransaction" : true
                    }
        }
        };
        console.log("Sending: " + JSON.stringify(registerPayload));
        connection.send(JSON.stringify(registerPayload));
    }
    
}

window.onload = function connect() {
    console.log("Reconnecting...")
    connection = new WebSocket('ws://127.0.0.1:30020');
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
                console.log(reader.result);
                
                if(messagedata.ResponseBody != null){
                    if(messagedata.ResponseBody.PropertyValues != null){

                        level(messagedata);

                    }else{

                        console.log("Not World Information Lol")

                    }
                }
                
                
            };
            reader.readAsText(message.data);
        } else {}
    };
    connection.onclose = function(event) {

        if(event.code == 1006){

            console.log("Server Broke... Redirecting");
            window.location = "index.html";
            
        }else if(event.code == 1000 || 1001){

            console.log("Server Shutdown!");
            window.location = "index.html";
            

        }
      
    };
}

