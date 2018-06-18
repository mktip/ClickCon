//Simple map file to keep the runner thing less messy.
function testMap(){
	var map = [new planeto(1, 50, 50, '#f00', 10, [1,2,3]),
			new planeto(0, 200, 50, '#fff', 10, [0,3]),
			new planeto(1, 50, 200, '#f00', 10, [0,3]),
			new planeto(2, 200, 200, '#00f', 10, [0,1,2]),
			new planeto(2, 200, 300, '#00f', 10, [2,3]),
			new planeto(2, 50, 300, '#00f', 10, [2,4])];
	return map;
}
function prettySym(){
	var map = [new planeto(0, 1075,754, '#fff', 10, [4,36,56]), //0
			new planeto(0, 265,82, '#fff',  10, [5,37,57]),
			new planeto(0, 1075,82, '#fff',  10, [6,38,58]),
			new planeto(0, 265,754, '#fff',  10, [7,39,59]),
			new planeto(0, 987,740, '#fff',  10, [0,8,44,56,60]),
			new planeto(0, 353,96, '#fff',  10, [1,9,45,57,61]), //5
			new planeto(0, 987,96, '#fff',  10, [2,10,46,58,62]),
			new planeto(0, 353,740, '#fff',  10, [3,11,47,59,63]),
			new planeto(0, 912,716, '#fff',  10, [4,12,60]),
			new planeto(0, 428,120, '#fff',  10, [5,13,61]),
			new planeto(0, 912,120, '#fff',  10, [6,14,62]), //10
			new planeto(0, 428,716, '#fff',  10, [7,15,63]),
			new planeto(0, 864,673, '#fff',  10, [8,16,48,60]),
			new planeto(0, 476,163, '#fff',  10, [9,17,49,61]),
			new planeto(0, 864,163, '#fff',  10, [10,18,50,62]),
			new planeto(0, 476,673, '#fff',  10, [11,19,51,63]), //15
			new planeto(0, 791,584, '#fff',  10, [12,20,48,52]),
			new planeto(0, 549,252, '#fff',  10, [13,21,49,53]),
			new planeto(0, 791,252, '#fff',  10, [14,22,50,54]),
			new planeto(0, 549,584, '#fff',  10, [15,23,51,55]),
			new planeto(0, 760,488, '#fff',  10, [16,22,23,24,40,52]), //20
			new planeto(0, 580,348, '#fff',  10, [17,22,23,25,41,53]),
			new planeto(0, 760,348, '#fff',  10, [18,20,21,26,42,54]),
			new planeto(0, 580,488, '#fff',  10, [19,20,21,27,43,55]),
			new planeto(0, 846,460, '#fff',  10, [20,26,28,52]),
			new planeto(0, 494,376, '#fff',  10, [21,27,29,53]), //25
			new planeto(0, 846,376, '#fff',  10, [22,24,30,54]),
			new planeto(0, 494,460, '#fff',  10, [23,25,31,55]),
			new planeto(0, 949,486, '#fff',  10, [24,30,48,52,64]),
			new planeto(0, 391,350, '#fff',  10, [25,31,49,53,65]),
			new planeto(0, 949,350, '#fff',  10, [26,28,50,54,66]), //30
			new planeto(0, 391,486, '#fff',  10, [27,29,51,55,67]),
			new planeto(0, 1059,569, '#fff',  10, [36,44,64]),
			new planeto(0, 281,267, '#fff',  10, [37,45,65]),
			new planeto(0, 1059,267, '#fff',  10, [38,46,66]),
			new planeto(0, 281,569, '#fff',  10, [39,47,67]), //35
			new planeto(0, 1109,697, '#fff',  10, [0,32,44,56]),
			new planeto(0, 231,139, '#fff',  10, [1,33,45,57]),
			new planeto(0, 1109,139, '#fff',  10, [2,34,46,58]),
			new planeto(0, 231,697, '#fff',  10, [3,35,47,59]),
			new planeto(0, 696,441, '#fff',  10, [20,42,43]), //40
			new planeto(0, 644,395, '#fff',  10, [21,42,43]),
			new planeto(0, 696,395, '#fff',  10, [22,40,41]),
			new planeto(0, 644,441, '#fff',  10, [23,40,41]),
			new planeto(0, 996,641, '#fff',  10, [4,32,36,56,60,64]),
			new planeto(0, 344,195, '#fff',  10, [5,33,37,57,61,65]), //45
			new planeto(0, 996,195, '#fff',  10, [6,34,38,58,62,66]),
			new planeto(0, 344,641, '#fff',  10, [7,35,39,59,63,67]),
			new planeto(0, 913,568, '#fff',  10, [12,16,28,52,60,64]),
			new planeto(0, 427,268, '#fff',  10, [13,17,29,53,61,65]),
			new planeto(0, 913,268, '#fff',  10, [14,18,30,54,62,66]), //50
			new planeto(0, 427,568, '#fff',  10, [15,19,31,55,63,67]),
			new planeto(0, 832,528, '#fff',  10, [16,20,24,28,48]),
			new planeto(0, 508,308, '#fff',  10, [17,21,25,29,49]),
			new planeto(0, 832,308, '#fff',  10, [18,22,26,30,50]),
			new planeto(0, 508,528, '#fff',  10, [19,23,27,31,51]), //55
			new planeto(0, 1046,704, '#fff',  10, [0,4,36,44]),
			new planeto(0, 294,132, '#fff',  10, [1,5,37,45]),
			new planeto(0, 1046,132, '#fff',  10, [2,6,38,46]),
			new planeto(0, 294,704, '#fff',  10, [3,7,39,47]),
			new planeto(0, 939,646, '#fff',  10, [4,8,12,44,48,64]), //60
			new planeto(0, 401,190, '#fff',  10, [5,9,13,45,49,65]),
			new planeto(0, 939,190, '#fff',  10, [6,10,14,46,50,66]),
			new planeto(0, 401,646, '#fff',  10, [7,11,15,47,51,67]),
			new planeto(0, 974,561, '#fff',  10, [28,32,44,48,60]),
			new planeto(0, 366,275, '#fff',  10, [29,33,45,49,61]), //65
			new planeto(0, 974,275, '#fff',  10, [30,34,46,50,62]),
			new planeto(0, 366,561, '#fff',  10, [31,35,47,51,63])];
	return map;
}
function scatterBlob(){
	var map = [new planeto(0, 196,157, '#fff',  15, [16,19,21,32]),
			new planeto(0, 233,481, '#fff',  15, [16,17,18,21,30]),
			new planeto(0, 454,558, '#fff',  15, [11,23,29,30]),
			new planeto(0, 476,134, '#fff',  15, [19,20,28,32]),
			new planeto(0, 788,73, '#fff',  15, [7,14,15,20]),
			new planeto(0, 659,386, '#fff',  15, [15,22,28,29,31]),
			new planeto(0, 434,341, '#fff',  15, [16,28,29,30,32]),
			new planeto(0, 848,245, '#fff',  15, [4,14,15,27,31]),
			new planeto(0, 1096,231, '#fff',  15, [14,25,27]),
			new planeto(0, 1029,546, '#fff',  15, [12,13,24,25,26]),
			new planeto(0, 726,671, '#fff',  15, [22,23,24,33]),
			new planeto(0, 383,722, '#fff',  15, [2,23,30]),
			new planeto(0, 1075,736, '#fff',  15, [9,24,26]),
			new planeto(0, 913,452, '#fff',  15, [9,22,27,31]),
			new planeto(0, 1018,131, '#fff',  15, [4,7,8,27]),
			new planeto(0, 678,214, '#fff',  15, [4,5,7,20,28]),
			new planeto(0, 279,299, '#fff',  15, [0,1,6,21]),
			new planeto(0, 36,478, '#fff',  15, [1,18,21]),
			new planeto(0, 182,665, '#fff',  15, [1,17]),
			new planeto(0, 348,36, '#fff',  15, [0,3]),
			new planeto(0, 646,39, '#fff',  15, [3,4,15]),
			new planeto(0, 128,322, '#fff',  15, [0,1,16,17]),
			new planeto(0, 745,489, '#fff',  15, [5,10,13,24,29,31]),
			new planeto(0, 591,664, '#fff',  15, [2,10,11,29]),
			new planeto(0, 902,667, '#fff',  15, [9,10,12,22,33]),
			new planeto(0, 1174,430, '#fff',  15, [8,9,27]),
			new planeto(0, 1225,642, '#fff',  15, [9,12]),
			new planeto(0, 961,305, '#fff',  15, [7,8,13,14,25,31]),
			new planeto(0, 582,285, '#fff',  15, [3,5,6,15,29,32]),
			new planeto(0, 566,481, '#fff',  15, [2,5,6,22,23,28]),
			new planeto(0, 350,502, '#fff',  15, [1,2,6,11]),
			new planeto(0, 831,385, '#fff',  15, [5,7,13,22,27]),
			new planeto(0, 418,193, '#fff',  15, [0,3,6,28]),
			new planeto(0, 809,727, '#fff',  15, [10,24])];
	return map;
}