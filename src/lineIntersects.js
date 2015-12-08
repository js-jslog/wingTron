define(function () {
	var isIntersection = function isIntersection(l1,l2) {

	    var s1_x, s1_y, s2_x, s2_y, s, t;
	    s1_x = l1[1][0] - l1[0][0];
	    s1_y = l1[1][1] - l1[0][1];
	    s2_x = l2[1][0] - l2[0][0];
	    s2_y = l2[1][1] - l2[0][1];

	    s = (-s1_y * (l1[0][0] - l2[0][0]) + s1_x * (l1[0][1] - l2[0][1])) / (-s2_x * s1_y + s1_x * s2_y);
	    t = ( s2_x * (l1[0][1] - l2[0][1]) - s2_y * (l1[0][0] - l2[0][0])) / (-s2_x * s1_y + s1_x * s2_y);

	    if (s > 0 && s < 1 && t > 0 && t < 1) {
	        return true;
	    }

	    return false;
	};
	return {isIntersection: isIntersection};
});