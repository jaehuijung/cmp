-- MySQL dump 10.19  Distrib 10.2.44-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: qrdb
-- ------------------------------------------------------
-- Server version	10.2.44-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `department_idx` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) DEFAULT NULL COMMENT '부서명',
  PRIMARY KEY (`department_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='부서테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0,'선택'),(1,'일반'),(2,'기술지원 1팀'),(3,'기술지원 2팀'),(4,'기술지원 3팀');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_basic`
--

DROP TABLE IF EXISTS `equipment_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_basic` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `eqp_name` varchar(30) NOT NULL COMMENT '장비명',
  `host_name` varchar(30) DEFAULT NULL COMMENT '호스트명',
  `model_name` varchar(30) DEFAULT NULL COMMENT '모델명',
  `m_company` varchar(30) DEFAULT NULL COMMENT '제조사',
  `domestic` varchar(1) NOT NULL COMMENT '국산여부(Y:국산, N:외산)',
  `redundancy_config` varchar(1) NOT NULL COMMENT '이중화구성여부(Y:이중화, N:단일)',
  `maintenance_contract_target` varchar(1) NOT NULL COMMENT '유지관리계약대상여부(Y, N)',
  `config_id` varchar(1) DEFAULT NULL COMMENT '구성분류',
  `asset_id` varchar(3) DEFAULT NULL COMMENT '자산분류',
  `sub_id` varchar(5) DEFAULT NULL COMMENT '자산세부분류',
  `detail_id` varchar(7) DEFAULT NULL COMMENT '자산상세분류',
  `network_operation_type` varchar(1) DEFAULT NULL COMMENT '네트워크 운영구분(I: 인터넷망, B: 업무망, O : 운영망)',
  `operating_status` varchar(1) NOT NULL COMMENT '운영상태(Y: 사용, N: 정지)',
  `operating_department` varchar(30) DEFAULT NULL COMMENT '운영부서',
  `primary_operator` varchar(20) DEFAULT NULL COMMENT '운영담당자(정)',
  `secondary_operator` varchar(20) DEFAULT NULL COMMENT '운영담당자(부)',
  `primary_outsourced_operator` varchar(20) DEFAULT NULL COMMENT '위탁운영사용자(정)',
  `secondary_outsourced_operator` varchar(20) DEFAULT NULL COMMENT '위탁운영사용자(부)',
  `created_at` datetime NOT NULL COMMENT '생성일',
  `updated_at` datetime DEFAULT NULL COMMENT '수정일',
  `creator` varchar(20) DEFAULT NULL COMMENT '등록자',
  `is_deleted` varchar(1) DEFAULT NULL COMMENT '삭제여부',
  PRIMARY KEY (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='HW 장비 기본정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_basic`
--

LOCK TABLES `equipment_basic` WRITE;
/*!40000 ALTER TABLE `equipment_basic` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_categories`
--

DROP TABLE IF EXISTS `equipment_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_category` varchar(30) DEFAULT NULL COMMENT '구성분류',
  `config_id` varchar(1) DEFAULT NULL COMMENT '구성 id',
  `asset_category` varchar(30) DEFAULT NULL COMMENT '자산분류',
  `asset_id` varchar(3) DEFAULT NULL COMMENT '자산 id',
  `sub_category` varchar(30) DEFAULT NULL COMMENT '자산세부분류',
  `sub_id` varchar(5) DEFAULT NULL COMMENT '자산세부  id',
  `detail_category` varchar(30) DEFAULT NULL COMMENT '자산상세분류',
  `detail_id` varchar(7) DEFAULT NULL COMMENT '자산상세 id',
  `categories` varchar(2) DEFAULT NULL COMMENT '장비 구성 키워드',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8 COMMENT='장비 카테고리 그룹';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_categories`
--

LOCK TABLES `equipment_categories` WRITE;
/*!40000 ALTER TABLE `equipment_categories` DISABLE KEYS */;
INSERT INTO `equipment_categories` VALUES (1,'하드웨어(H/W)','1','서버','101','x86 서버','10101',NULL,'','SV'),(2,'하드웨어(H/W)','1','서버','101','단순 서버','10102',NULL,'','SV'),(3,'하드웨어(H/W)','1','서버','101','통합 서버','10103',NULL,'','SV'),(4,'하드웨어(H/W)','1','보안장비','102','방화벽(Firewall)','10201',NULL,'','SE'),(5,'하드웨어(H/W)','1','보안장비','102','침입탐지(IDS)','10202',NULL,'','SE'),(6,'하드웨어(H/W)','1','보안장비','102','침입방지(IPS)','10203',NULL,'','SE'),(7,'하드웨어(H/W)','1','보안장비','102','가상사설망(VPN)','10204',NULL,'','SE'),(8,'하드웨어(H/W)','1','보안장비','102','DDoS 대응장비','10205',NULL,'','SE'),(9,'하드웨어(H/W)','1','보안장비','102','웹 방화벽(WAF)','10206',NULL,'','SE'),(10,'하드웨어(H/W)','1','보안장비','102','시스템접근제어','10207',NULL,'','SE'),(11,'하드웨어(H/W)','1','보안장비','102','네트워크 접근제어(NAC)','10208',NULL,'','SE'),(12,'하드웨어(H/W)','1','보안장비','102','통합로그관리(SiEM)','10209',NULL,'','SE'),(13,'하드웨어(H/W)','1','보안장비','102','통합보안관리(TMS)','10210',NULL,'','SE'),(14,'하드웨어(H/W)','1','보안장비','102','망연계솔류션','10211',NULL,'','SE'),(15,'하드웨어(H/W)','1','보안장비','102','자료유출방지(DLP)','10212',NULL,'','SE'),(16,'하드웨어(H/W)','1','보안장비','102','기타','10213',NULL,'','SE'),(17,'하드웨어(H/W)','1','네트워크','103','스위치','10301','L2스위치','1030101','NW'),(18,'하드웨어(H/W)','1','네트워크','103','스위치','10301','L3스위치','1030102','NW'),(19,'하드웨어(H/W)','1','네트워크','103','스위치','10301','L4스위치','1030103','NW'),(20,'하드웨어(H/W)','1','네트워크','103','스위치','10301','L7스위치','1030104','NW'),(21,'하드웨어(H/W)','1','네트워크','103','스위치','10301','데이터센터스위치','1030105','NW'),(22,'하드웨어(H/W)','1','네트워크','103','라우터','10302',NULL,'','NW'),(23,'하드웨어(H/W)','1','네트워크','103','가속기','10303','WEB 가속기','1030301','NW'),(24,'하드웨어(H/W)','1','네트워크','103','가속기','10303','SSL 가속기','1030302','NW'),(25,'하드웨어(H/W)','1','네트워크','103','IP 수집기','10304',NULL,'','NW'),(26,'하드웨어(H/W)','1','네트워크','103','광 네트워크 전송장비','10305',NULL,'','NW'),(27,'하드웨어(H/W)','1','네트워크','103','기타','10306',NULL,'','NW'),(28,'하드웨어(H/W)','1','스토리지 장비','104','스토리지 장치','10401',NULL,'','ST'),(29,'하드웨어(H/W)','1','스토리지 장비','104','SAN 스위치','10402',NULL,'','ST'),(30,'하드웨어(H/W)','1','스토리지 장비','104','NAS Gateway','10403',NULL,'','ST'),(31,'하드웨어(H/W)','1','백업장비','105','PTL 백업','10501',NULL,'','BA'),(32,'하드웨어(H/W)','1','백업장비','105','VTL 백업','10502',NULL,'','BA'),(33,'하드웨어(H/W)','1','기타장비','106','데스크탑','10601',NULL,'','ET'),(34,'하드웨어(H/W)','1','기타장비','106','노트북','10602',NULL,'','ET'),(35,'하드웨어(H/W)','1','기타장비','106','KVM','10603',NULL,'','ET'),(36,'하드웨어(H/W)','1','기타장비','106','콘솔','10604',NULL,'','ET'),(37,'하드웨어(H/W)','1','기타장비','106','외장백업','10605',NULL,'','ET'),(38,'하드웨어(H/W)','1','기타장비','106','기타','10606',NULL,'','ET'),(39,'소프트웨어(S/W)','2','시스템 S/W','201','운영체제','20101','유닉스','2010101','SW'),(40,'소프트웨어(S/W)','2','시스템 S/W','201','운영체제','20101','리눅스','2010102','SW'),(41,'소프트웨어(S/W)','2','시스템 S/W','201','운영체제','20101','윈도우','2010103','SW'),(42,'소프트웨어(S/W)','2','시스템 S/W','201','운영체제','20101','클라우드 OS','2010104','SW'),(43,'소프트웨어(S/W)','2','시스템 S/W','201','HA용 SW','20102','OS 클러스터','2010201','SW'),(44,'소프트웨어(S/W)','2','시스템 S/W','201','HA용 SW','20102','DB 클러스터','2010202','SW'),(45,'소프트웨어(S/W)','2','시스템 S/W','201','HA용 SW','20102','스토리지공유솔류션','2010203','SW'),(46,'소프트웨어(S/W)','2','미들웨어','202','WEB','20201',NULL,'','SW'),(47,'소프트웨어(S/W)','2','미들웨어','202','WAS','20202',NULL,'','SW'),(48,'소프트웨어(S/W)','2','미들웨어','202','TP 모니터','20203',NULL,'','SW'),(49,'소프트웨어(S/W)','2','미들웨어','202','연계통합솔류션(EAI)','20204',NULL,'','SW'),(50,'소프트웨어(S/W)','2','DB관리','203','DBMS','20301',NULL,'','SW'),(51,'소프트웨어(S/W)','2','DB관리','203','DB도구','20302',NULL,'','SW'),(52,'소프트웨어(S/W)','2','백업관리','204','데이터 백업','20401',NULL,'','SW'),(53,'소프트웨어(S/W)','2','백업관리','204','OS 전용 백업','20402',NULL,'','SW'),(54,'소프트웨어(S/W)','2','백업관리','204','복제 전용','20403',NULL,'','SW'),(55,'소프트웨어(S/W)','2','백업관리','204','아카이브관리','20404',NULL,'','SW'),(56,'소프트웨어(S/W)','2','정보보호','205','문서보안','20501',NULL,'','SW'),(57,'소프트웨어(S/W)','2','정보보호','205','서버보안','20502',NULL,'','SW'),(58,'소프트웨어(S/W)','2','정보보호','205','DB보안','20503',NULL,'','SW'),(59,'소프트웨어(S/W)','2','정보보호','205','백신','20504',NULL,'','SW'),(60,'소프트웨어(S/W)','2','정보보호','205','스팸차단','20505',NULL,'','SW'),(61,'소프트웨어(S/W)','2','정보보호','205','개인정보보호','20506',NULL,'','SW'),(62,'소프트웨어(S/W)','2','정보보호','205','입력보안','20507',NULL,'','SW'),(63,'소프트웨어(S/W)','2','정보보호','205','저장매체보안','20508',NULL,'','SW'),(64,'소프트웨어(S/W)','2','정보보호','205','사이버침해분석','20509',NULL,'','SW'),(65,'소프트웨어(S/W)','2','정보보호','205','망간연동','20510',NULL,'','SW'),(66,'소프트웨어(S/W)','2','정보보호','205','비밀번호관리','20511',NULL,'','SW'),(67,'소프트웨어(S/W)','2','정보보호','205','위변조차단','20512',NULL,'','SW'),(68,'소프트웨어(S/W)','2','정보보호','205','접속인증','20513',NULL,'','SW'),(69,'소프트웨어(S/W)','2','관제','206','SMS','20601',NULL,'','SW'),(70,'소프트웨어(S/W)','2','관제','206','NMS','20602',NULL,'','SW'),(71,'소프트웨어(S/W)','2','관제','206','ESM','20602',NULL,'','SW'),(72,'소프트웨어(S/W)','2','관제','206','APM','20603',NULL,'','SW'),(73,'소프트웨어(S/W)','2','관제','206','DPM','20604',NULL,'','SW'),(74,'소프트웨어(S/W)','2','가상화 SW','207','서버가상화 SW','20701',NULL,'','SW'),(75,'소프트웨어(S/W)','2','가상화 SW','207','저장장치 가상화 SW','20702',NULL,'','SW'),(76,'소프트웨어(S/W)','2','가상화 SW','207','보안 가상화 SW','20703',NULL,'','SW'),(77,'소프트웨어(S/W)','2','가상화 SW','207','네트워크 가상화 SW','20704',NULL,'','SW'),(78,'소프트웨어(S/W)','2','응용 SW','208','업무관리','20801',NULL,'','SW'),(79,'소프트웨어(S/W)','2','응용 SW','208','데이터관리','20802',NULL,'','SW'),(80,'소프트웨어(S/W)','2','응용 SW','208','AP 개발도구','20803',NULL,'','SW'),(81,'소프트웨어(S/W)','2','응용 SW','208','기타','20804',NULL,'','SW'),(82,'소프트웨어(S/W)','2','개발 SW','209','개발 SW','20901',NULL,'','SW'),(83,'하드웨어(H/W)','1','전산기반시설','107','영상/음향/교환','10701',NULL,'','FC'),(84,'하드웨어(H/W)','1','전산기반시설','107','보안설비','10702',NULL,'','FC'),(85,'하드웨어(H/W)','1','전산기반시설','107','소방설비','10703',NULL,'','FC'),(86,'하드웨어(H/W)','1','전산기반시설','107','전원설비','10704',NULL,'','FC'),(87,'하드웨어(H/W)','1','전산기반시설','107','공조설비','10705',NULL,'','FC');
/*!40000 ALTER TABLE `equipment_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_detail`
--

DROP TABLE IF EXISTS `equipment_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_detail` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비 관리번호',
  `CPU` varchar(50) DEFAULT NULL COMMENT 'CPU',
  `MEMORY` varchar(50) DEFAULT NULL COMMENT 'MEMORY',
  `DISK` varchar(20) NOT NULL COMMENT 'DISK',
  `ip_address` varchar(40) NOT NULL COMMENT 'IP ADDRESS',
  `OS` varchar(20) NOT NULL COMMENT 'OS',
  `acquisition_cost` bigint(20) NOT NULL COMMENT '도입금액 (최대 1000억까지)',
  `installation_coordinates` varchar(20) NOT NULL COMMENT '설치좌표',
  `installation_units` int(10) unsigned NOT NULL COMMENT '설치좌표 유닛수 (최대 1000까지)',
  `equipment_size_units` int(10) unsigned NOT NULL COMMENT '장비크기 유닛수 (최대 1000까지)',
  `dbrain_number` varchar(20) NOT NULL COMMENT '디브레인번호',
  `serial_number` varchar(20) NOT NULL COMMENT '시리얼번호',
  `asset_acquisition_date` varchar(10) DEFAULT NULL COMMENT '자산취득일자',
  `asset_disposal_date` varchar(10) DEFAULT NULL COMMENT '자산폐기일자',
  `eol_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOL',
  `eos_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOS',
  PRIMARY KEY (`eqp_manage_id`),
  CONSTRAINT `equipment_detail_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='HW 장비 상세정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_detail`
--

LOCK TABLES `equipment_detail` WRITE;
/*!40000 ALTER TABLE `equipment_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_regist_hw`
--

DROP TABLE IF EXISTS `equipment_regist_hw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_regist_hw` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `eqp_link_manage_id` varchar(10) NOT NULL COMMENT '장비 연결정보 관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `port_number` varchar(30) DEFAULT NULL,
  KEY `equipment_connect_ibfk_1` (`eqp_manage_id`),
  KEY `equipment_connect_ibfk_2` (`eqp_link_manage_id`),
  CONSTRAINT `equipment_regist_hw_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`),
  CONSTRAINT `equipment_regist_hw_ibfk_2` FOREIGN KEY (`eqp_link_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='장비 연결정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_regist_hw`
--

LOCK TABLES `equipment_regist_hw` WRITE;
/*!40000 ALTER TABLE `equipment_regist_hw` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_regist_hw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_regist_sw`
--

DROP TABLE IF EXISTS `equipment_regist_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_regist_sw` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `hw_manage_id` varchar(10) NOT NULL COMMENT 'HW 장비 관리번호',
  `sw_manage_id` varchar(10) NOT NULL COMMENT 'SW 장비 관리번호',
  PRIMARY KEY (`idx`),
  KEY `equipment_regist_sw_ibfk_1` (`hw_manage_id`),
  KEY `equipment_regist_sw_ibfk_2` (`sw_manage_id`),
  CONSTRAINT `equipment_regist_sw_ibfk_1` FOREIGN KEY (`hw_manage_id`) REFERENCES `equipment_basic` (`eqp_manage_id`),
  CONSTRAINT `equipment_regist_sw_ibfk_2` FOREIGN KEY (`sw_manage_id`) REFERENCES `equipment_sw_basic` (`eqp_manage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COMMENT='HW 장비에 등록된 SW장비 정보 ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_regist_sw`
--

LOCK TABLES `equipment_regist_sw` WRITE;
/*!40000 ALTER TABLE `equipment_regist_sw` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_regist_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_sw_basic`
--

DROP TABLE IF EXISTS `equipment_sw_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_sw_basic` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비관리번호 (장비구분2 + 포설년도4 + 일련번호4)',
  `eqp_name` varchar(30) NOT NULL COMMENT '구성자원명',
  `host_name` varchar(30) DEFAULT NULL COMMENT '호스트명',
  `model_name` varchar(30) DEFAULT NULL COMMENT '모델명',
  `m_company` varchar(30) DEFAULT NULL COMMENT '제조사',
  `domestic` varchar(1) NOT NULL COMMENT '국산여부(Y:국산, N:외산)',
  `dependent_config` varchar(1) NOT NULL COMMENT '종속 SW 여부(1: 공개, 2: 상용)',
  `maintenance_contract_target` varchar(1) NOT NULL COMMENT '유지관리계약대상여부(Y, N)',
  `config_id` varchar(1) DEFAULT NULL COMMENT '구성분류',
  `asset_id` varchar(3) DEFAULT NULL COMMENT '자산분류',
  `sub_id` varchar(5) DEFAULT NULL COMMENT '자산세부분류',
  `detail_id` varchar(7) DEFAULT NULL COMMENT '자산상세분류',
  `network_operation_type` varchar(1) DEFAULT NULL COMMENT '네트워크 운영구분(I: 인터넷망, B: 업무망, O : 운영망)',
  `operating_status` varchar(1) NOT NULL COMMENT '운영상태(Y: 사용, N: 정지)',
  `operating_department` varchar(30) DEFAULT NULL COMMENT '운영부서',
  `primary_operator` varchar(20) DEFAULT NULL COMMENT '운영담당자(정)',
  `secondary_operator` varchar(20) DEFAULT NULL COMMENT '운영담당자(부)',
  `primary_outsourced_operator` varchar(20) DEFAULT NULL COMMENT '위탁운영사용자(정)',
  `secondary_outsourced_operator` varchar(20) DEFAULT NULL COMMENT '위탁운영사용자(부)',
  `created_at` datetime NOT NULL COMMENT '생성일',
  `updated_at` datetime DEFAULT NULL COMMENT '수정일',
  `creator` varchar(20) DEFAULT NULL COMMENT '등록자',
  `is_deleted` varchar(1) DEFAULT NULL COMMENT '삭제여부',
  PRIMARY KEY (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='SW 장비 기본정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_sw_basic`
--

LOCK TABLES `equipment_sw_basic` WRITE;
/*!40000 ALTER TABLE `equipment_sw_basic` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_sw_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_sw_detail`
--

DROP TABLE IF EXISTS `equipment_sw_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_sw_detail` (
  `eqp_manage_id` varchar(10) NOT NULL COMMENT '장비 관리번호',
  `OS` varchar(20) NOT NULL COMMENT 'OS',
  `acquisition_cost` bigint(20) NOT NULL COMMENT '도입금액 (최대 1000억까지)',
  `amount` int(11) unsigned NOT NULL COMMENT '수량 (최대 1000까지)',
  `dbrain_number` varchar(20) NOT NULL COMMENT '디브레인번호',
  `license_number` varchar(20) NOT NULL COMMENT '라이센스번호',
  `asset_acquisition_date` varchar(10) DEFAULT NULL COMMENT '자산취득일자',
  `asset_disposal_date` varchar(10) DEFAULT NULL COMMENT '자산폐기일자',
  `eol_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOL',
  `eos_status` varchar(10) DEFAULT NULL COMMENT '단종상태 EOS',
  PRIMARY KEY (`eqp_manage_id`),
  CONSTRAINT `equipment_sw_detail_ibfk_1` FOREIGN KEY (`eqp_manage_id`) REFERENCES `equipment_sw_basic` (`eqp_manage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='SW 장비 상세정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_sw_detail`
--

LOCK TABLES `equipment_sw_detail` WRITE;
/*!40000 ALTER TABLE `equipment_sw_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment_sw_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `group_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '그룹 id',
  `group_name` varchar(50) DEFAULT NULL COMMENT '그룹명',
  PRIMARY KEY (`group_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='사용자 그룹';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'관리자'),(2,'일반 사용자');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_basic`
--

DROP TABLE IF EXISTS `line_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Dumping data for table `line_basic`
--

LOCK TABLES `line_basic` WRITE;
/*!40000 ALTER TABLE `line_basic` DISABLE KEYS */;
/*!40000 ALTER TABLE `line_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_category`
--

DROP TABLE IF EXISTS `line_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_category` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) DEFAULT NULL COMMENT '회선구분(1:구분, 2:속도, 3:색상)',
  `id` int(11) DEFAULT NULL COMMENT '회선정보 id',
  `value` varchar(30) DEFAULT NULL COMMENT '회선정보',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='선번장 회선정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_category`
--

LOCK TABLES `line_category` WRITE;
/*!40000 ALTER TABLE `line_category` DISABLE KEYS */;
INSERT INTO `line_category` VALUES (28,1,1,'광'),(29,1,2,'UTF'),(30,2,1,'100Mbps'),(31,2,2,'1Gbps'),(32,2,3,'10Gbps'),(33,2,4,'100Gbps'),(34,3,1,'흰색'),(35,3,2,'주황색'),(36,3,3,'초록색'),(37,3,4,'파란색'),(38,3,5,'갈색');
/*!40000 ALTER TABLE `line_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `menu_id` varchar(15) NOT NULL COMMENT '메뉴 ID',
  `parent_menu_id` varchar(15) DEFAULT NULL COMMENT '상위 메뉴 ID',
  `menu_name` varchar(30) NOT NULL COMMENT '메뉴 이름',
  `menu_role` varchar(100) NOT NULL COMMENT '시큐리티 엔드포인트 규칙',
  `url` varchar(100) NOT NULL COMMENT '엔드포인트 URL',
  `menu_order` int(11) NOT NULL COMMENT '메뉴 순서',
  `menu_auth` varchar(20) DEFAULT NULL COMMENT '메뉴권한 코드',
  `icon` varchar(50) DEFAULT NULL COMMENT '메뉴 아이콘',
  `is_deleted` varchar(1) DEFAULT NULL COMMENT '메뉴 사용여부',
  `created_at` datetime DEFAULT NULL COMMENT '생성 시각',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('00000000','#','HOME','/main/dashboard','/main/dashboard/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('10000000','00000000','메인','/main/dashboard','/main/dashboard/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('10000001','10000000','대시보드','/main/dashboard','/main/dashboard/view',2,'MAIN_DASHBOARD','/images/icon/menu/dashboard.svg','N','2024-09-29 19:27:32'),('10000002','10000000','공지사항','/main/notice','/main/notice/view',2,'MAIN_NOTICE','/images/icon/menu/notice.svg','N','2024-09-29 19:27:32'),('10000003','10000000','보고/통계','/main/statistics','/main/statistics/view',2,'MAIN_STATISTICS','/images/icon/menu/statistics.svg','N','2024-09-29 19:27:32'),('20000000','00000000','선번장관리','/rack/line','/rack/line/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('20000001','20000000','선번장관리','/rack/line','/rack/line/view',2,'RACK_LINE','/images/icon/menu/line.svg','N','2024-09-29 19:27:32'),('30000000','00000000','장비관리','/eqp/hw','/eqp/hw/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('30000001','30000000','H/W관리','/eqp/hw','/eqp/hw/view',2,'EQP_HW','/images/icon/menu/equipment_hw.svg','N','2024-09-29 19:27:32'),('30000002','30000000','S/W관리','/eqp/sw','/eqp/sw/view',2,'EQP_SW','/images/icon/menu/equipment_sw.svg','N','2024-09-29 19:27:32'),('30000003','30000000','연결정보 관리','/eqp/connect','/eqp/connect/view',2,'EQP_SW','/images/icon/menu/equipment_sw.svg','N','2024-09-29 19:27:32'),('40000000','00000000','네트워크관리','/network/portmap','/network/portmap/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('40000001','40000000','포트맵관리','/network/portmap','/network/portmap/view',2,'NETWORK_PORTMAP','/images/icon/menu/network.svg','N','2024-09-29 19:27:32'),('50000000','00000000','환경설정','/settings/auth','/settings/user/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('50000001','50000000','사용자관리','/settings/user','/settings/user/view',2,'SETTINGS_USER','/images/icon/menu/user-settings.svg','N','2024-09-29 19:27:32'),('50000002','50000000','권한관리','/settings/auth','/settings/auth/view',2,'SETTINGS_AUTH','/images/icon/menu/lock.svg','N','2024-09-29 19:27:32');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_auth`
--

DROP TABLE IF EXISTS `menu_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_auth` (
  `group_idx` int(11) DEFAULT NULL COMMENT '사용자 그룹',
  `menu_id` varchar(15) DEFAULT NULL COMMENT '메뉴 id',
  `create` varchar(1) DEFAULT NULL COMMENT '등록권한',
  `read` varchar(1) DEFAULT NULL COMMENT '조회권한',
  `update` varchar(1) DEFAULT NULL COMMENT '수정권한',
  `delete` varchar(1) DEFAULT NULL COMMENT '삭제권한',
  KEY `menu_auth_ibfk_1` (`group_idx`),
  KEY `menu_auth_ibfk_2` (`menu_id`),
  CONSTRAINT `menu_auth_ibfk_1` FOREIGN KEY (`group_idx`) REFERENCES `group` (`group_idx`),
  CONSTRAINT `menu_auth_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='그룹별 메뉴 접근권한';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_auth`
--

LOCK TABLES `menu_auth` WRITE;
/*!40000 ALTER TABLE `menu_auth` DISABLE KEYS */;
INSERT INTO `menu_auth` VALUES (1,'10000000','Y','Y','Y','Y'),(1,'10000001','Y','Y','Y','Y'),(1,'10000002','Y','Y','Y','Y'),(1,'10000003','Y','Y','Y','Y'),(1,'20000000','Y','Y','Y','Y'),(1,'20000001','Y','Y','Y','Y'),(1,'30000000','Y','Y','Y','Y'),(1,'30000001','Y','Y','Y','Y'),(1,'30000002','Y','Y','Y','Y'),(1,'40000001','Y','Y','Y','Y'),(1,'50000001','Y','Y','Y','Y'),(1,'50000002','Y','Y','Y','Y'),(2,'10000000','N','Y','N','N'),(2,'10000001','N','Y','N','N'),(2,'10000002','N','Y','N','N'),(2,'10000003','N','Y','N','N'),(2,'20000000','N','Y','N','N'),(2,'20000001','N','Y','N','N'),(2,'30000000','N','Y','N','N'),(2,'30000001','N','Y','N','N'),(2,'30000002','N','Y','N','N'),(2,'40000001','N','Y','N','N'),(2,'50000001','N','Y','N','N'),(2,'50000002','N','Y','N','N');
/*!40000 ALTER TABLE `menu_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `position_idx` int(11) NOT NULL AUTO_INCREMENT,
  `position_name` varchar(50) DEFAULT NULL COMMENT '직책명',
  PRIMARY KEY (`position_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='직책 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (0,'선택'),(1,'대표'),(2,'전무'),(3,'상무'),(4,'이사'),(5,'부장'),(6,'과장'),(7,'대리'),(8,'사원');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(30) DEFAULT NULL COMMENT '사용자 아이디',
  `password` varchar(1000) DEFAULT NULL COMMENT '사용자 비밀번호',
  `name` varchar(30) DEFAULT NULL COMMENT '사용자 이름',
  `email` varchar(100) DEFAULT NULL COMMENT '사용자 이메일',
  `phone` varchar(20) DEFAULT NULL COMMENT '사용자 전화번호',
  `department` int(11) DEFAULT NULL COMMENT '사용자 부서',
  `position` int(11) DEFAULT NULL COMMENT '사용자 직책',
  `group` int(11) DEFAULT NULL COMMENT '사용자 그룹',
  `created_at` datetime DEFAULT NULL COMMENT '생성일',
  `updated_at` datetime DEFAULT NULL COMMENT '수정일',
  `is_deleted` varchar(1) DEFAULT NULL COMMENT '삭제여부',
  PRIMARY KEY (`idx`),
  KEY `user_ibfk_1` (`department`),
  KEY `user_ibfk_2` (`position`),
  KEY `user_ibfk_3` (`group`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`department_idx`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`position`) REFERENCES `position` (`position_idx`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`group`) REFERENCES `group` (`group_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='사용자 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a','$2a$10$kBxdoonGkp0NDTznGNhblucqhKNYtnmOfg.QxUqwhyqZO7BaOfsDe','test1','a@wear.awer','010-1111-2222',1,1,1,'2024-10-14 20:02:16',NULL,'N'),(5,'test','$2a$10$qCYT5mm987C8SfjB6WT1DublmOTObzdD9fZjaksUXIkyf71/E6XVW','명회','abc@def.ggg','010-9999-1111',1,2,1,'2024-10-14 20:16:58',NULL,'Y'),(6,'test2','$2a$10$BKdv7gcs9WcLgKupNOkbhu7evTed.1ZmbMpN50WizVthZebG3P2Fe','aa','gaw','2123',2,2,1,'2024-10-14 20:37:57',NULL,'Y'),(7,'test1111','$2a$10$B80b01bBULusFqsbejrfxe4j4Yk8Z12xIQGJuexQdU3wrwnejKRw6','명회','abc@def.ggg','010-9999-1111',1,2,1,'2024-10-14 21:29:12',NULL,'Y'),(8,'test12345','$2a$10$fKx5VfFkE89tfner7Jow/eCVivbT6FzaP0T94uTvEii0fVY2Ksc0y','명회','abc@def.ggg','010-9999-1111',1,2,1,'2024-10-14 21:29:21',NULL,'Y'),(9,'test12345','$2a$10$t4hb0KNZb5sqYdA43cSYI.Nm9cMlOfXs0gHKAd9/VLupzRxHVaarC','명회','abc@def.ggg','010-9999-1111',4,8,2,'2024-10-14 21:29:30',NULL,'Y'),(10,'test1','$2a$10$wwssJ1pesW406MOKJO7RcOTrilGvVy28/NT0J0DEG6HjJeedj2YB.','','','',0,0,1,'2024-10-14 22:23:05',NULL,'N'),(11,'test2','$2a$10$fFlyUkJmsbnlD.O27RQBzedUJV2UVbto8x4rH6Fop/rYauBZZJaYy','','','',0,0,1,'2024-10-15 09:09:40',NULL,'N'),(12,'abb','$2a$10$2gmGMlNZ6EL.4ZaCrflBO.zif4Vs1vaiozpdA4DpiIzk7cqaQ92Fq','test1','a@wear.awer','010-1111-2222',1,1,1,'2024-10-18 21:16:28',NULL,'N'),(13,'bab','$2a$10$BR/xa9u1f/cY7u56hY4TbuXBoHDpz6SQY4FXK8ymx2qrQ.Po3CiYu','','','',0,0,1,'2024-10-18 21:16:50',NULL,'N'),(14,'babba','$2a$10$kIpcz3BgYG3xfo.IcRiuo.ac7EqB1i8TMN1zKrBELiMVIgZliy7UK','','','',0,0,1,'2024-10-18 21:17:00',NULL,'Y');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'qrdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 11:24:06
