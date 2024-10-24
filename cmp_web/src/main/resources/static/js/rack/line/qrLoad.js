
// pdf 저장 버튼
function QRPrintFunction() {
	let QRPrintHead = document.getElementById("QRPrintHead");
	QRPrintHead.style.display = 'none';

	window.print();
	QRPrintHead.style.display = 'block';
}

let zoom = 1;
let QRPrintTable = document.getElementById("QRPrintWrap");

// pdf 확대/축소 스크롤
function QRPlusMinusFunction(values){
	zoom = values;
	QRPrintTable.style.zoom = zoom;
}

// pdf 확대 버튼
function QRPlusFunction(){
	zoom = Number(zoom) + 0.25;

	if((3 < zoom) && (zoom <= 3.25)){
		zoom = 3;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}

// pdf 축소 버튼
function QRMinusFunction(){
	zoom = Number(zoom) - 0.25;

	if ((0.75 <= zoom) && (zoom < 1)){
		zoom = 1;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}