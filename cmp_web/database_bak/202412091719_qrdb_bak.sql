',
  `sub_id` varchar(5) DEFAULT NULL COMMENT '자산세부  id',
  `detail_category` varchar(30) DEFAULT NULL COMMENT '자산상세분류',
  `detail_id` varchar(7) DEFAULT NULL COMMENT '자산상세 id',
  `categories` varchar(2) DEFAULT NULL COMMENT '장비 구성 키워드',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8 COMMENT='장비 카테고리 그룹';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment_detail`
--

DROP TABLE IF EXISTS `equipment_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_detail` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비 관리번호',
  `CPU` varchar(50) DEFAULT NULL COMMENT 'CPU',
  `MEMORY` varchar(50) DEFAULT NULL COMMENT 'MEMORY',
  `DISK` varchar(50) DEFAULT NULL COMMENT 'DISK',
  `OS` varchar(50) DEFAULT NULL COMMENT 'OS',
  `acquisition_cost` bigint(20) NOT NULL COMMENT '도입금액 (최대 1000억까지)',
  `port_cnt` int(11) DEFAULT NULL,
  `installation_coordinates` varchar(20) NOT NULL COMMENT '설치좌표',
  `installation_units` int(10) unsigned NOT NULL COMMENT '설치좌표 유닛수 (최대 1000까지)',
  `equipment_size_units` int(10) unsigned NOT NULL COMMENT '장비크기 유닛수 (최대 1000까지)',
  `dbrain_number` varchar(20) NOT NULL COMMENT '디브레인번호',
  `serial_number` varchar(50) DEFAULT NULL COMMENT '시리얼번호',
  `asset_acquisition_date` varchar(10) DEFAULT NULL COMMENT '자산취득일자',
  `asset_disposal_date` varchar(10) DEFAULT NULL COMMENT '자산폐기일자',
  `eol_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOL',
  `eos_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOS',
  `remark` text DEFAULT NULL COMMENT '비고',
  PRIMARY KEY (`eqp_manage_id`),
  CONSTRAINT `equipment_detail_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='HW 장비 상세정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment_link`
--

DROP TABLE IF EXISTS `equipment_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비 관리번호',
  `host` varchar(30) DEFAULT NULL COMMENT '호스트명',
  `ip_address` varchar(30) DEFAULT NULL COMMENT 'IP 주소',
  `port` varchar(30) DEFAULT NULL COMMENT '포트명',
  PRIMARY KEY (`id`),
  KEY `equipment_link_ibfk_1` (`eqp_manage_id`),
  CONSTRAINT `equipment_link_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8 COMMENT='장비 연결정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment_regist_hw`
--

DROP TABLE IF EXISTS `equipment_regist_hw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_regist_hw` (
  `idx` int(11) NOT NULL AUTO_INCREMENT COMMENT 'idx',
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `eqp_link_manage_id` varchar(10) NOT NULL COMMENT '장비 연결정보 관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `eqp_port` varchar(30) DEFAULT NULL COMMENT '장비 포트',
  `eqp_link_port` varchar(30) DEFAULT NULL COMMENT '연결장비 포트',
  PRIMARY KEY (`idx`),
  KEY `equipment_regist_hw_ibpk_1` (`idx`),
  KEY `equipment_regist_hw_ibfk_1` (`eqp_manage_id`),
  KEY `equipment_regist_hw_ibfk_2` (`eqp_link_manage_id`),
  CONSTRAINT `equipment_regist_hw_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`),
  CONSTRAINT `equipment_regist_hw_ibfk_2` FOREIGN KEY (`eqp_link_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) !40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment_sw_detail`
--

DROP TABLE IF EXISTS `equipment_sw_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_sw_detail` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비 관리번호',
  `OS` varchar(50) DEFAULT NULL COMMENT 'OS',
  `acquisition_cost` bigint(20) NOT NULL COMMENT '도입금액 (최대 1000억까지)',
  `amount` int(11) unsigned NOT NULL COMMENT '수량 (최대 1000까지)',
  `dbrain_number` varchar(20) NOT NULL COMMENT '디브레인번호',
  `LICENSE_NUMBER` varchar(100) DEFAULT NULL COMMENT '라이센스번호',
  `asset_acquisition_date` varchar(10) DEFAULT NULL COMMENT '자산취득일자',
  `asset_disposal_date` varchar(10) DEFAULT NULL COMMENT '자산폐기일자',
  `eol_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOL',
  `eos_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOS',
  `remark` text DEFAULT NULL COMMENT '비고',
  `chk_status` varchar(1) DEFAULT NULL COMMENT '상위 장비여부 (등록:Y, 미등록:N)',
  PRIMARY KEY (`eqp_manage_id`),
  CONSTRAINT `equipment_sw_detail_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_sw_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='SW 장비 상세정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '그룹 id',
  `group_name` varchar(50) DEFAULT NULL COMMENT '그룹명',
  PRIMARY KEY (`group_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='사용자 그룹';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_basic`
--

DROP TABLE IF EXISTS `line_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_basic` (
  `line_manage_id` varchar(14) NOT NULL COMMENT '선번장 관리번호(포설년도월일-포설일련번호 1~9999)',
  `start_eqp_id` varchar(10) DEFAULT NULL COMMENT '출발지 장비 관리번호',
  `end_eqp_id` varchar(10) DEFAULT NULL COMMENT '목적지 장비 관리번호',
  `line_speed` varchar(10) DEFAULT NULL COMMENT '회선 속도',
  `line_category` varchar(10) DEFAULT NULL COMMENT '회선 구분',
  `line_color` varchar(10) DEFAULT NULL COMMENT '회선 색상',
  `start_eqp_port` varchar(30) DEFAULT NULL COMMENT '출발지 포트번호',
  `end_eqp_port` varchar(30) DEFAULT NULL COMMENT '목적지 포트번호',
  `installation_year` varchar(10) DEFAULT NULL COMMENT '선번장 포설년도',
  `qr_image_location` varchar(1000) DEFAULT NULL COMMENT 'qr image 경로',
  `created_at` datetime DEFAULT NULL COMMENT '생성일',
  `updated_at` datetime DEFAULT NULL COMMENT '수정일',
  `is_deleted` varchar(1) DEFAULT NULL COMMENT '삭제여부',
  PRIMARY KEY (`line_manage_id`),
  KEY `line_basic_ibfk_1` (`start_eqp_id`),
  KEY `line_basic_ibfk_2` (`end_eqp_id`),
  CONSTRAINT `line_basic_ibfk_1` FOREIGN KEY (`start_eqp_id`) REFERENCES `equipment_basic` (`eqp_manage_id`),
  CONSTRAINT `line_basic_ibfk_2` FOREIGN KEY (`end_eqp_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='선번장 기본정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_category`
--

DROP TABLE IF EXISTS `line_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_category` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(30) DEFAULT NULL COMMENT '회선분류',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='선번장 회선분류';
/*!40101 SET character_set_client ` (`group`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`department_idx`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`position`) REFERENCES `position` (`position_idx`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`group`) REFERENCES `group` (`group_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='사용자 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'qrdb'
--
