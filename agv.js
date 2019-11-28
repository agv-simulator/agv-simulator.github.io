var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";

vLeft = 5;
vRight = 10;
angle = 0;
L = 48;
timeUpdateAGV = 50;  // 50ms
// Line sensor position
lineSensorPos = [0,0,0,0];

function agvInit(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#agvObject");

  group_.appendChild(useElem);
}
function rotatePointInit(){
  var group_ = document.getElementById('pointGroup');

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", 10);
  useElem.setAttributeNS(null, "y", 10);
  scale_str = 'scale('+ 1 + ')';
  useElem.setAttributeNS(null, "transform", scale_str);
  useElem.setAttributeNS(null, "opacity", 1);
  useElem.setAttributeNS(xlinkns, "xlink:href", "#rotatePoint");

  group_.appendChild(useElem);
}

function agvSetAngle(value){
  angle = value%360;
  agv.setAttribute("transform", "rotate(" + angle + "," + agv.x.baseVal.value + "," + agv.y.baseVal.value +")");
}

function agvSetVelocity(left, right){
  vLeft = left;
  vRight = right;
}
step = 0;
function displayRotatePoint(){
  if((vLeft > 0)||(vRight > 0)){
    if(vLeft != vRight){
      r = Math.abs((L/2)*((vLeft + vRight)/(vLeft - vRight)));
      if(vLeft > vRight){
        x = agv.x.baseVal.value - Math.sin(deg2reg(angle))*r;
        y = agv.y.baseVal.value + Math.cos(deg2reg(angle))*r;

        pointRotate.x.baseVal.value = x;
        pointRotate.y.baseVal.value = y;
      }
      else{
        x = agv.x.baseVal.value + Math.sin(deg2reg(angle))*r;
        y = agv.y.baseVal.value - Math.cos(deg2reg(angle))*r;

        pointRotate.x.baseVal.value = x;
        pointRotate.y.baseVal.value = y;
      }
    }
    else{

    }
  }

  setTimeout(displayRotatePoint, 10);
}

function getLineSensorPosition(){
  return lineSensorPos;
}

function agvUpdate(){
  if((vLeft > 0)||(vRight > 0)){
    if(vLeft != vRight){
      r = Math.abs((L/2)*((vLeft + vRight)/(vLeft - vRight)));
      if(vLeft > vRight){
        x = agv.x.baseVal.value - Math.sin(deg2reg(angle))*r;
        y = agv.y.baseVal.value + Math.cos(deg2reg(angle))*r;
      }
      else{
        x = agv.x.baseVal.value + Math.sin(deg2reg(angle))*r;
        y = agv.y.baseVal.value - Math.cos(deg2reg(angle))*r;
      }
    }
    else{

    }
  }
  if(vLeft > vRight){
    vtb = (vLeft + vRight)/2;
    s = vtb*(timeUpdateAGV/1000);
    cv = 2*r*Math.PI;
    gocQuay = (s/cv)*(2*Math.PI);
    gocQuayDeg = gocQuay*360/(2*Math.PI);

    xAGV = (agv.x.baseVal.value - x)*Math.cos(-gocQuay) + (agv.y.baseVal.value - y)*Math.sin(-gocQuay) + x;
    yAGV = (agv.x.baseVal.value - x)*Math.sin(gocQuay) + (agv.y.baseVal.value - y)*Math.cos(gocQuay) + y;

    agv.x.baseVal.value = xAGV;
    agv.y.baseVal.value = yAGV;   

    agvSetAngle(angle + gocQuayDeg);

    // Update line sensor position
    lineX0 = 40;
    lineY0 = 5;
    lineX1 = 40;
    lineY1 = 11;
    lineX0agv = (lineX0)*Math.cos(-deg2reg(angle)) + (lineY0)*Math.sin(-deg2reg(angle)) + agv.x.baseVal.value;
    lineY0agv = (lineX0)*Math.sin(deg2reg(angle)) + (lineY0)*Math.cos(deg2reg(angle)) + agv.y.baseVal.value;
    lineX1agv = (lineX1)*Math.cos(-deg2reg(angle)) + (lineY1)*Math.sin(-deg2reg(angle)) + agv.x.baseVal.value;
    lineY1agv = (lineX1)*Math.sin(deg2reg(angle)) + (lineY1)*Math.cos(deg2reg(angle)) + agv.y.baseVal.value;
  }
  else if(vLeft < vRight){
    vtb = (vLeft + vRight)/2;
    s = vtb*(timeUpdateAGV/1000);
    cv = 2*r*Math.PI;
    gocQuay = (s/cv)*(2*Math.PI);
    gocQuayDeg = gocQuay*360/(2*Math.PI);

    xAGV = (agv.x.baseVal.value - x)*Math.cos(gocQuay) + (agv.y.baseVal.value - y)*Math.sin(gocQuay) + x;
    yAGV = (agv.x.baseVal.value - x)*Math.sin(-gocQuay) + (agv.y.baseVal.value - y)*Math.cos(-gocQuay) + y;

    agv.x.baseVal.value = xAGV;
    agv.y.baseVal.value = yAGV;
    
    agvSetAngle(angle - gocQuayDeg);

    // Update line sensor position
    lineX0 = 40;
    lineY0 = 5;
    lineX1 = 40;
    lineY1 = 11;
    lineX0agv = (lineX0)*Math.cos(-deg2reg(angle)) + (lineY0)*Math.sin(-deg2reg(angle)) + agv.x.baseVal.value;
    lineY0agv = (lineX0)*Math.sin(deg2reg(angle)) + (lineY0)*Math.cos(deg2reg(angle)) + agv.y.baseVal.value;
    lineX1agv = (lineX1)*Math.cos(-deg2reg(angle)) + (lineY1)*Math.sin(-deg2reg(angle)) + agv.x.baseVal.value;
    lineY1agv = (lineX1)*Math.sin(deg2reg(angle)) + (lineY1)*Math.cos(deg2reg(angle)) + agv.y.baseVal.value;
    
  }
  lineSensor = document.getElementById('lineSensorGroup');
  lineSensor.children[0].x1.baseVal.value = lineX0agv;
  lineSensor.children[0].y1.baseVal.value = lineY0agv;
  lineSensor.children[0].x2.baseVal.value = lineX1agv;
  lineSensor.children[0].y2.baseVal.value = lineY1agv;
  lineSensorPos[0] = lineX0agv;
  lineSensorPos[1] = lineY0agv;
  lineSensorPos[2] = lineX1agv;
  lineSensorPos[3] = lineY1agv;

  setTimeout(agvUpdate, 10);
}

