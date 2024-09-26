package sl.qr.mh.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.cableService;
import sl.qr.mh.service.qrService;
import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class cableController {
	
	private final cableService cableservice;
	private final qrService qrService;

	public cableController(qrService qrService, cableService cableservice) {
		this.cableservice = cableservice;
		this.qrService = qrService;
	}

	/*
	// 선번장관리
	// cable > cableManageController로 이동
	@GetMapping("/cablelist")
	public String test(HttpSession session, HttpServletRequest request) {
		// return "new/table";
		return "views/table";

	}

	@GetMapping("/cableregister")
	public String getcableRegister(HttpSession session, HttpServletRequest request) {
		// return "new/cableregister";
		return "views/cableregister";

	}

	@PostMapping("/cable/insert")
	public String cableinsert(Cable vo, HttpServletRequest request) {
		log.info("cable insert~~~~~ start hostname~~ : " + vo.getS_hostname());
		log.info("cable insert~~~~~ end hostname~~ : " + vo.getE_hostname());

		cableservice.insertCable(vo);

		// return "new/table";
		return "views/table";
	}
	 */

	/*
	// 지우기
	@GetMapping("/test")
	public String getcableList(HttpSession session, HttpServletRequest request) {
		return "test";

	}
	 */

	/*
	// 장비관리
	// eqp > eqpManageController로 이동
	@GetMapping("/eqplist")
	public String geteqpList(HttpSession session, HttpServletRequest request) {
		// return "new/eqplist";
		return "views/eqplist";

	}


	@GetMapping("/eqpregister")
	public String geteqpRegister(HttpSession session, HttpServletRequest request) {
		// return "new/eqpregister";
		return "views/eqpregister";

	}

	@GetMapping("/eqp/detail")
	public String geteqpDetailform(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {

		vo = cableservice.selectDetailEqp(vo);
		model.addAttribute("Equipment", vo);

		// return "new/eqpdetail";
		return "views/eqpdetail";

	}

	@GetMapping("/eqp/update")
	public String geteqpUpateform(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {

		vo = cableservice.selectupdateEqp(vo);
		model.addAttribute("Equipment", vo);
		// return "new/eqpupdate";
		return "views/eqpupdate";

	}

	@PostMapping("/eqp/update")
	public String geteqpUpate(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {

		cableservice.updateEqp(vo);
		// return "new/eqplist";
		return "views/eqplist";

	}

	@PostMapping("/eqp/delete")
	public String eqpDelete(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {

		cableservice.deleteEqp(vo);
		// return "new/eqplist";
		return "views/eqplist";

	}

	@GetMapping("/eqpinsert")
	public String geteqpInsert(HttpSession session, HttpServletRequest request) {
		return "eqpinsert";

	}

	@PostMapping("/eqp/insert")
	public String eqpinsert(Equipment vo, HttpServletRequest request) {

		cableservice.insertEqp(vo);
		// return "new/eqplist";
		return "views/eqplist";
	}
*/

	@GetMapping(value = "/eqp/exceldown")
	public void exceldown(HttpSession session, HttpServletRequest request, HttpServletResponse response, Equipment vo)
			throws NumberFormatException, IOException {

		List<Equipment> list = cableservice.selectSearchEqp(vo);
		Workbook wb = qrService.EqpExcel(list);
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment;filename=exceldown.xlsx");

		wb.write(response.getOutputStream());
		wb.close();
	}




}
