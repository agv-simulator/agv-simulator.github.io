velocityRun = 10;
function agvControl(){
    // Get line sensor position
    sensorPos = getLineSensorPosition();
    // Check intersect of line sensor with line map
    lineGroup = document.getElementById('lineGroup');
    lineCount = lineGroup.childElementCount;
    for(i = 0; i < lineCount; i++){
        result = checkLineIntersection(sensorPos[0], sensorPos[1], sensorPos[2], sensorPos[3], 
            lineGroup.children[i].x1.baseVal.value, lineGroup.children[i].y1.baseVal.value,
            lineGroup.children[i].x2.baseVal.value, lineGroup.children[i].y2.baseVal.value);
            
        if(result.onLine1&&result.onLine2){
            //console.log(result);
            distance = math.distance({pointOneX: sensorPos[0], pointOneY: sensorPos[1]}, {pointTwoX: result.x, pointTwoY: result.y})
            //console.log(distance);
            agvSetVelocity(velocityRun + distance - 3, velocityRun - distance + 3);            
        }
    }    

    
    setTimeout(agvControl, 10);
}

function setVelocity(value){
    velocityRun = value;
}