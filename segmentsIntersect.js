function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

// const sameSign = (a, b) => (a * b) > 0;
// function intersect(x1, y1, x2, y2, x3, y3, x4, y4){
// 	var a1, a2, b1, b2, c1, c2;
// 	var r1, r2 , r3, r4;
// 	var denom, offset, num;

// 	// Compute a1, b1, c1, where line joining points 1 and 2
// 	// is "a1 x + b1 y + c1 = 0".
// 	a1 = y2 - y1;
// 	b1 = x1 - x2;
// 	c1 = (x2 * y1) - (x1 * y2);

// 	// Compute r3 and r4.
// 	r3 = ((a1 * x3) + (b1 * y3) + c1);
// 	r4 = ((a1 * x4) + (b1 * y4) + c1);

// 	// Check signs of r3 and r4. If both point 3 and point 4 lie on
// 	// same side of line 1, the line segments do not intersect.
// 	if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)){
// 		return 0; //return that they do not intersect
// 	}

// 	// Compute a2, b2, c2
// 	a2 = y4 - y3;
// 	b2 = x3 - x4;
// 	c2 = (x4 * y3) - (x3 * y4);

// 	// Compute r1 and r2
// 	r1 = (a2 * x1) + (b2 * y1) + c2;
// 	r2 = (a2 * x2) + (b2 * y2) + c2;

// 	// Check signs of r1 and r2. If both point 1 and point 2 lie
// 	// on same side of second line segment, the line segments do
// 	// not intersect.
// 	if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))){
// 		return 0; //return that they do not intersect
// 	}

// 	//Line segments intersect: compute intersection point.
// 	denom = (a1 * b2) - (a2 * b1);

// 	if (denom === 0) {
// 		return 1; //collinear
// 	}

// 	// lines_intersect
// 	return 1; //lines intersect, return true
// }