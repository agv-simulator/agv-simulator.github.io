var lineArr = [
    [400,200,900,200],
    [900,200,1000,300],
    [1000,300,1000,600],
    [1000,600,900,700],
    [900,700,400,700],
    [400,700,300,600],
    [300,600,300,300],
    [300,300,400,200],
];

function lineInit(){
    strLine = "<line x1=\"0\" y1=\"0\" x2=\"200\" y2=\"200\" style=\"stroke:rgb(155,150,0);stroke-width:2\"/>";
    lineGroup = document.getElementById('lineGroup');
    for(i = 0; i < lineArr.length; i++){
        lineGroup.innerHTML += strLine;
        lineGroup.children[i].x1.baseVal.value = lineArr[i][0];
        lineGroup.children[i].y1.baseVal.value = lineArr[i][1];
        lineGroup.children[i].x2.baseVal.value = lineArr[i][2];
        lineGroup.children[i].y2.baseVal.value = lineArr[i][3];
    }
}