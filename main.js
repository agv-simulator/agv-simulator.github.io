var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";

x = 0;
$(document).ready(function() {
    agvInit(300,300,"objectGroup", 1);
    rotatePointInit();

    agv = document.getElementById('objectGroup').children[0];
    pointRotate = document.getElementById('pointGroup').children[0];
    //agv.setAttribute("transform", "rotate(10)");
    //setTimeout(run, 50);

    // Update agv position
    setTimeout(agvUpdate, 10);
    //setTimeout(displayRotatePoint, 10);

    // Control AGV
    setTimeout(agvControl, 10);

    // Init map
    lineInit();
});

function run(){    
    agv.setAttribute("x", x);
    agv.setAttribute("transform", "rotate(0)");
    x++;
    setTimeout(run, 50);
    console.log('run');
}

