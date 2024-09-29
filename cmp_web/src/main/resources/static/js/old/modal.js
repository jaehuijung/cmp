// modal 구조 make12345
const makeModal = (modalID, modalTitle, btnTextLeft, btnTextRight) => {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = modalID;
  modal.innerHTML = `
  <div class="modal-content">
    <div class="modal-header">
      <h2>${modalTitle}</h2>
      <button class="close ${modalID}" id="modalClose" onclick="modalClose(event)"></button>
    </div>
    <div class="modal-body">
    </div>
    <div class="modal-footer">
      <button class="close ${modalID}" onclick="modalClose(event)">${btnTextLeft}</button>
      <button class="default" onclick="modalOK(event)">${btnTextRight}</button>
    </div>
  </div>
  `;
  return modal;
};

// modal rendering
const renderModal = (modalID, modalTitle, url, btnTextLeft, btnTextRight, callback) => {
  const body = document.body;
  const id = document.querySelector(`#${modalID}`);
  if (id) {
    body.removeChild(id);
  }

  body.appendChild(makeModal(modalID, modalTitle, btnTextLeft, btnTextRight, callback));
  const ftBtn = document.querySelector(".modal-footer .default");
  ftBtn.addEventListener('click', () => {
	const targetId = document.querySelector(`#${modalID}`)	;
	if(callback) callback();
	if (targetId) {
	    body.removeChild(targetId);
	}
	window.location.reload();
  })

  // madal main body 호출
  // 서버 호출 시 data 주석 제거 후 param 지정 |
  $.ajax({
    url: url,
    type: "GET",
    //data: JSON.stringify(param),
    contentType: "application/json",
    success: function (res) {
      $(".modal-body").html(res);
    },
  });
};

const modalOK = (event) => {
    let url = urlPre+'/api/qr/insertqr';

    let sRackNumber = document.getElementById("sRackNumber").value;
    let sRackLocation = document.getElementById("sRackLocation").value;
    let sServerName = document.getElementById("sServerName").value;
    let sPortNumber = document.getElementById("sPortNumber").value;
    let eRackNumber = document.getElementById("eRackNumber").value;
    let eRackLocation = document.getElementById("eRackLocation").value;
    let eServerName = document.getElementById("eServerName").value;
    let ePortNumber = document.getElementById("ePortNumber").value;

    //실패 없이 빈값이면 무조건 아래 값 적용
	if (sRackNumber == ""){
		sRackNumber = "1"
	}
	if (sRackLocation == ""){
		sRackLocation = "2"
	}
	if (sServerName == ""){
		sServerName = "3"
	}
	if (sPortNumber == ""){
		sPortNumber = "4"
	}
	if (eRackNumber == ""){
		eRackNumber = "5"
	}
	if (eRackLocation == ""){
		eRackLocation = "6"
	}
	if (eServerName == ""){
		eServerName = "7"
	}
	if (ePortNumber == ""){
		ePortNumber = "8"
	}

/*
    document.getElementById("sRackNumber").value = '';
    document.getElementById("sRackLocation").value = '';
    document.getElementById("sServerName").value = '';
    document.getElementById("sPortNumber").value = '';
    document.getElementById("eRackNumber").value = '';
    document.getElementById("eRackLocation").value = '';
    document.getElementById("eServerName").value = '';
    document.getElementById("ePortNumber").value = '';
*/

	axios.get( url, {params:{ sRackNumber : sRackNumber,
                              sRackLocation : sRackLocation,
                              sServerName : sServerName,
                              sPortNumber : sPortNumber,
                              eRackNumber : eRackNumber,
                              eRackLocation : eRackLocation,
                              eServerName : eServerName,
                              ePortNumber : ePortNumber }})
    .then(response => {
        console.log('Response:', response.data);
        modalClose(event);
    })
    .catch(error => {
        console.log('error!');
    });
};

const modalClose = (e) => {
  const target = e.target.className;
  const idExt = target.replace("close ", "");
  const idTarget = document.querySelector(`#${idExt}`);
  idTarget.classList.add("close");
  idTarget.firstElementChild.classList.add("close");
  setTimeout(() => {
    idTarget.remove();
  }, 300);
};

window.onclick = (e) => {
  const modal = document.querySelector(".modal");

  if (e.target == modal) {
    const idGet = modal.getAttribute("id");
    const id = document.querySelector(`#${idGet}`);
    modal.classList.add("close");
    modal.firstElementChild.classList.add("close");
    setTimeout(() => {
      id.remove();
    }, 300);
  }
};
