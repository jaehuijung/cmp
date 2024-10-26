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
INSERT INTO `equipment_basic` VALUES ('NW20240001','장비연결소프트웨어등록테스트6','','','','1','1','1','1','103','10301','1030101','1','1','','','','','','2024-10-26 08:35:40',NULL,NULL,'Y'),('SV20210001','개인정보비식별화 WEB서버#01','pbbweb01','PRIMERGY RX2540 M5','FUJITSU','1','1','1','1','101','10101','','1','1','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:03:34',NULL,NULL,'N'),('SV20210002','개인정보비식별화 WEB서버#02','pbbweb02','PRIMERGY RX2540 M5','FUJITSU','2','1','2','1','101','10102','','1','2','세종자율주행 기술지원 1팀','김강현','김강현','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210003','개인정보비식별화 WEB서버#03','pbbweb03','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','101','10102','','3','2','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210004','개인정보비식별화 WEB서버#04','pbbweb04','PRIMERGY RX2540 M5','FUJITSU','1','1','2','1','101','10102','','2','1','세종자율주행 기술지원 1팀','박준호','박준호','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210005','개인정보비식별화 WEB서버#05','pbbweb05','PRIMERGY RX2540 M5','FUJITSU','2','2','1','1','102','10204','','1','2','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210006','개인정보비식별화 WEB서버#06','pbbweb06','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','102','10208','','1','1','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210007','개인정보비식별화 WEB서버#07','pbbweb07','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','102','10204','','1','1','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210008','개인정보비식별화 WEB서버#08','pbbweb08','PRIMERGY RX2540 M5','FUJITSU','2','1','1','1','102','10202','','2','1','세종자율주행 기술지원 1팀','박준호','박준호','김강현','김강현','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210009','개인정보비식별화 WEB서버#09','pbbweb09','PRIMERGY RX2540 M5','FUJITSU','2','1','2','1','101','10101','','1','1','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210010','개인정보비식별화 WEB서버#10','pbbweb10','PRIMERGY RX2540 M5','FUJITSU','2','1','2','1','101','10101','','3','1','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210011','개인정보비식별화 WEB서버#11','pbbweb11','PRIMERGY RX2540 M5','FUJITSU','2','1','1','1','101','10101','','1','1','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210012','개인정보비식별화 WEB서버#12','pbbweb12','PRIMERGY RX2540 M5','FUJITSU','1','1','2','1','103','10301','1030104','1','1','세종자율주행 기술지원 1팀','엄태건','엄태건','김강현','김강현','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210013','개인정보비식별화 WEB서버#13','pbbweb13','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','101','10101','','1','2','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210014','개인정보비식별화 WEB서버#14','pbbweb14','PRIMERGY RX2540 M5','FUJITSU','1','1','1','1','103','10301','1030101','3','1','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210015','개인정보비식별화 WEB서버#15','pbbweb15','PRIMERGY RX2540 M5','FUJITSU','2','1','1','1','101','10101','','1','1','세종자율주행 기술지원 1팀','김강현','김강현','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210016','개인정보비식별화 WEB서버#16','pbbweb16','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','101','10101','','1','1','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210017','개인정보비식별화 WEB서버#17','pbbweb17','PRIMERGY RX2540 M5','FUJITSU','1','1','1','1','103','10301','1030102','3','2','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210018','개인정보비식별화 WEB서버#18','pbbweb18','PRIMERGY RX2540 M5','FUJITSU','1','1','2','1','103','10303','1030301','2','1','세종자율주행 기술지원 1팀','김강현','김강현','박준호','박준호','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210019','개인정보비식별화 WEB서버#19','pbbweb19','PRIMERGY RX2540 M5','FUJITSU','2','2','2','1','101','10101','','1','1','세종자율주행 기술지원 1팀','박준호','박준호','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20210020','개인정보비식별화 WEB서버#20','pbbweb20','PRIMERGY RX2540 M5','FUJITSU','1','2','1','1','102','10212','','2','2','세종자율주행 기술지원 1팀','김강현','김강현','엄태건','엄태건','2024-10-24 13:31:53',NULL,NULL,'N'),('SV20240001','장비연결소프트웨어등록테스트1','','','','1','1','1','1','101','10102','','1','1','','','','','','2024-10-25 22:58:49',NULL,NULL,'Y'),('SV20240002','장비연결소프트웨어등록테스트2','','','','1','1','1','1','101','10102','','1','1','','','','','','2024-10-26 07:29:54',NULL,NULL,'Y'),('SV20240003','장비연결소프트웨어등록테스트2','','','','1','1','1','1','101','10102','','1','1','','','','','','2024-10-26 07:30:05',NULL,NULL,'Y'),('SV20240004','장비연결소프트웨어등록테스트3','','','','1','1','1','1','101','10101','','1','1','','','','','','2024-10-26 07:31:28',NULL,NULL,'Y'),('SV20240005','test1','','','','1','1','1','1','101','10101','','1','1','','','','','','2024-10-26 09:23:44',NULL,NULL,'Y'),('SV20240006','test1','','','','1','1','1','1','101','10101','','1','1','','','','','','2024-10-26 09:27:45',NULL,NULL,'N'),('SV20240007','test2','','','','1','1','1','1','101','10102','','1','1','','','','','','2024-10-26 09:35:53',NULL,NULL,'N'),('SV20240008','test3','','','','1','1','1','1','101','10102','','1','1','','','','','','2024-10-26 09:43:58',NULL,NULL,'N');
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
INSERT INTO `equipment_detail` VALUES ('NW20240001','','','','0.0.0.0','',0,'',0,0,'','rawer','2024-10-25',NULL,'2024-10-25','2024-10-25'),('SV20210001','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','1TB','10.100.40.111','centos 7.8',1700000,'A-1',12,1,'','MASQ016677','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210002','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','128GB','2TB','10.100.40.102','centos 7.8',1500000,'A-2',1,2,'','MASQ016602','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210003','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','1TB','10.100.40.103','centos 7.8',1000000,'C-5',2,5,'','MASQ016603','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210004','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','128GB','6TB','10.100.40.104','centos 7.8',1000000,'G-4',16,2,'','MASQ016604','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210005','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','128GB','1TB','10.100.40.105','centos 7.8',120000,'G-6',55,2,'','MASQ016605','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210006','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','500GB','10.100.40.106','centos 7.8',700000,'G-7',16,4,'','MASQ016606','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210007','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','1TB','10.100.40.107','centos 7.8',840000,'H-2',16,15,'','MASQ016607','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210008','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','16GB','1TB','10.100.40.108','centos 7.8',9000000,'H-6',8,2,'','MASQ016608','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210009','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','256GB','100GB','10.100.40.109','centos 7.8',14000000,'B-2',8,7,'','MASQ016609','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210010','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','1TB','10.100.40.110','centos 7.8',400000,'B-4',6,8,'','MASQ016610','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210011','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','2TB','10.100.40.111','centos 7.8',990000,'D-1',16,2,'','MASQ016611','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210012','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','256GB','6TB','10.100.40.112','centos 7.8',120000,'D-2',16,8,'','MASQ016612','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210013','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','256GB','1TB','10.100.40.113','centos 7.8',1000000,'D-3',27,2,'','MASQ016613','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210014','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','100GB','10.100.40.114','centos 7.8',230000,'I-5',16,9,'','MASQ016614','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210015','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','16GB','1TB','10.100.40.115','centos 7.8',5500000,'I-6',4,2,'','MASQ016615','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210016','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','16GB','500GB','10.100.40.116','centos 7.8',9500000,'I-7',46,7,'','MASQ016616','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210017','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','500GB','10.100.40.117','centos 7.8',12000000,'J-1',16,9,'','MASQ016617','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210018','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','256GB','500GB','10.100.40.118','centos 7.8',7700000,'J-2',33,6,'','MASQ016618','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210019','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','64GB','500GB','10.100.40.119','centos 7.8',600000,'J-3',23,11,'','MASQ016619','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20210020','Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz','16GB','1TB','10.100.40.120','centos 7.8',4570000,'J-4',7,8,'','MASQ016620','2021-01-01',NULL,'2024-10-24','2024-10-24'),('SV20240001','','','','0.0.0.0','',0,'',0,0,'','14ㅁ','2024-10-25',NULL,'2024-10-25','2024-10-25'),('SV20240002','','','','0.0.0.0','',0,'',0,0,'','1235a','2024-10-25',NULL,'2024-10-25','2024-10-25'),('SV20240003','','','','0.0.0.0','',0,'',0,0,'','1235a','2024-10-25',NULL,'2024-10-25','2024-10-25'),('SV20240004','','','','0.0.0.0','',0,'',0,0,'','a532','2024-10-25',NULL,'2024-10-25','2024-10-25'),('SV20240005','','','','0.0.0.0','',0,'',0,0,'','124','2024-10-26',NULL,'2024-10-26','2024-10-26'),('SV20240006','','','','0.0.0.0','',0,'',0,0,'','a43','2024-10-26',NULL,'2024-10-26','2024-10-26'),('SV20240007','','','','0.0.0.0','',0,'',0,0,'','a324','2024-10-26',NULL,'2024-10-26','2024-10-26'),('SV20240008','','','','0.0.0.0','',0,'',0,0,'','5a3','2024-10-26',NULL,'2024-10-26','2024-10-26');
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
INSERT INTO `equipment_regist_hw` VALUES ('SV20240006','SV20210018','1'),('SV20240006','SV20210016','2'),('SV20240006','SV20210014',''),('SV20240006','SV20210012','4'),('SV20240007','SV20210014','f7'),('SV20240007','SV20210016',''),('SV20240007','SV20210019','f4'),('SV20240007','SV20210020','f3'),('SV20240007','SV20210018','f5'),('SV20240007','SV20210017','f6'),('SV20240008','SV20210002','a1'),('SV20240008','SV20210001',''),('SV20240008','SV20210009','a56'),('SV20240008','SV20210007','a4'),('SV20240008','SV20210005','a76'),('SV20240008','SV20210003','a67');
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
INSERT INTO `equipment_regist_sw` VALUES (41,'SV20240006','SW20240026'),(42,'SV20240006','SW20240023'),(43,'SV20240006','SW20240021'),(44,'SV20240006','SW20240015'),(45,'SV20240006','SW20240016'),(46,'SV20240006','SW20240014'),(47,'SV20240006','SW20240007'),(48,'SV20240006','SW20240005'),(49,'SV20240006','SW20240004'),(50,'SV20240007','SW20240026'),(51,'SV20240007','SW20240024'),(52,'SV20240007','SW20240022'),(53,'SV20240007','SW20240023'),(54,'SV20240007','SW20240025'),(55,'SV20240008','SW20240008'),(56,'SV20240008','SW20240006'),(57,'SV20240008','SW20240007'),(58,'SV20240008','SW20240005'),(59,'SV20240008','SW20240004'),(60,'SV20240008','SW20240003'),(61,'SV20240008','SW20240002'),(62,'SV20240008','SW20240001');
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
INSERT INTO `equipment_sw_basic` VALUES ('SW20240001','소프트웨어관리테스트01','s/w host1','s/w model1','s/w company1','2','2','2','2','207','20702','','3','1','세종자율주행센터 기술지원 1팀','김강현','엄태건','엄태건','김강현','2024-10-23 17:35:43',NULL,NULL,'N'),('SW20240002','소프트웨어관리테스트02','s/w host02','s/w model02','s/w company02','1','2','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240003','소프트웨어관리테스트03','s/w host03','s/w model03','s/w company03','1','1','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','박준호','김강현','김강현','박준호','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240004','소프트웨어관리테스트04','s/w host04','s/w model04','s/w company04','1','1','1','2','203','20301','','1','1','세종자율주행센터 기술지원 1팀','박준호','김강현','김강현','박준호','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240005','소프트웨어관리테스트05','s/w host05','s/w model05','s/w company05','1','1','1','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240006','소프트웨어관리테스트06','s/w host06','s/w model06','s/w company06','1','1','1','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240007','소프트웨어관리테스트07','s/w host07','s/w model07','s/w company07','1','1','1','2','204','20401','','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240008','소프트웨어관리테스트08','s/w host08','s/w model08','s/w company08','2','1','2','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240009','소프트웨어관리테스트09','s/w host09','s/w model09','s/w company09','2','2','1','2','201','20102','2010203','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240010','소프트웨어관리테스트10','s/w host10','s/w model10','s/w company10','2','2','1','2','201','20102','2010203','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240011','소프트웨어관리테스트11','s/w host11','s/w model11','s/w company11','2','1','2','2','207','20702','','3','1','세종자율주행센터 기술지원 1팀','김강현','엄태건','엄태건','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240012','소프트웨어관리테스트12','s/w host12','s/w model12','s/w company12','1','1','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240013','소프트웨어관리테스트13','s/w host13','s/w model13','s/w company13','1','2','1','2','201','20102','2010203','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240014','소프트웨어관리테스트14','s/w host14','s/w model14','s/w company14','1','1','1','2','205','20501','','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240015','소프트웨어관리테스트15','s/w host15','s/w model15','s/w company15','1','1','1','2','202','20202','','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240016','소프트웨어관리테스트16','s/w host16','s/w model16','s/w company16','1','2','1','2','202','20201','','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240017','소프트웨어관리테스트17','s/w host17','s/w model17','s/w company17','1','2','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240018','소프트웨어관리테스트18','s/w host18','s/w model18','s/w company18','1','2','1','2','201','20101','2010102','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240019','소프트웨어관리테스트19','s/w host19','s/w model19','s/w company19','2','1','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240020','소프트웨어관리테스트20','s/w host20','s/w model20','s/w company20','1','2','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240021','소프트웨어관리테스트21','s/w host21','s/w model21','s/w company21','2','1','2','2','207','20702','','3','1','세종자율주행센터 기술지원 1팀','박준호','엄태건','엄태건','박준호','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240022','소프트웨어관리테스트22','s/w host22','s/w model22','s/w company22','2','1','1','2','201','20102','2010203','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240023','소프트웨어관리테스트23','s/w host23','s/w model23','s/w company23','1','1','2','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240024','소프트웨어관리테스트24','s/w host24','s/w model24','s/w company24','1','1','2','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','김강현','엄태건','엄태건','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240025','소프트웨어관리테스트25','s/w host25','s/w model25','s/w company25','1','1','2','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','박준호','엄태건','엄태건','박준호','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240026','소프트웨어관리테스트26','s/w host26','s/w model26','s/w company26','1','1','2','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240027','소프트웨어관리테스트27','s/w host27','s/w model27','s/w company27','1','2','1','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','김강현','박준호','박준호','김강현','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240028','소프트웨어관리테스트28','s/w host28','s/w model28','s/w company28','2','2','2','2','201','20102','2010202','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240029','소프트웨어관리테스트29','s/w host29','s/w model29','s/w company29','1','1','1','2','201','20102','2010201','1','1','세종자율주행센터 기술지원 1팀','엄태건','박준호','박준호','엄태건','2024-10-24 11:11:12',NULL,NULL,'N'),('SW20240030','소프트웨어관리테스트30','s/w host30','s/w model30','s/w company30','2','1','1','2','201','20102','2010203','1','1','세종자율주행센터 기술지원 1팀','김강현','엄태건','엄태건','김강현','2024-10-24 11:11:12',NULL,NULL,'N');
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
INSERT INTO `equipment_sw_detail` VALUES ('SW20240001','우분투',10090000,1,'','software license1','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240002','우분투',10090000,1,'','software license02','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240003','우분투',90000,10,'','software license03','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240004','우분투',990000,7,'','software license04','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240005','우분투',1000000,3,'','software license05','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240006','우분투',170000,2,'','software license06','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240007','우분투',880000,6,'','software license07','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240008','우분투',110000,1,'','software license08','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240009','우분투',59000,1,'','software license09','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240010','우분투',166000,1,'','software license10','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240011','우분투',230000,2,'','software license11','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240012','우분투',475000,2,'','software license12','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240013','우분투',990000,1,'','software license13','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240014','우분투',11000,10,'','software license14','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240015','우분투',1000000,1,'','software license15','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240016','우분투',110000,1,'','software license16','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240017','우분투',95000,9,'','software license17','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240018','우분투',1000000,1,'','software license18','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240019','우분투',940000,4,'','software license19','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240020','우분투',75000,4,'','software license20','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240021','우분투',700000,1,'','software license21','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240022','우분투',120000,3,'','software license22','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240023','우분투',550000,1,'','software license23','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240024','우분투',66000,2,'','software license24','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240025','우분투',1100000,1,'','software license25','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240026','우분투',59000,1,'','software license26','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240027','우분투',99000,1,'','software license27','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240028','우분투',1000000,2,'','software license28','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240029','우분투',1009000,2,'','software license29','2015-10-23',NULL,'2021-10-23','2027-10-23'),('SW20240030','우분투',45000,1,'','software license30','2015-10-23',NULL,'2021-10-23','2027-10-23');
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
INSERT INTO `line_basic` VALUES ('20201024-00001','SV20210020','SV20210019','1','1','1',NULL,NULL,'2020-10-24','\\images\\qr\\Fr9XWKgo8ni1x-2PcOeg3A==.jpg','2024-10-24 19:21:49',NULL,'N'),('20201024-00002','SV20210018','SV20210017','1','1','1',NULL,NULL,'2020-10-24','\\images\\qr\\NkTCYKA7EPQH0aRVounHIg==.jpg','2024-10-24 19:23:06',NULL,'N'),('20211024-00001','SV20210019','SV20210017','1','1','1',NULL,NULL,'2021-10-24','\\images\\qr\\vnFHkweysId9_6UX5dEIZw==.jpg','2024-10-24 19:22:00',NULL,'N'),('20211024-00002','SV20210018','SV20210017','1','1','1',NULL,NULL,'2021-10-24','\\images\\qr\\0VDLntiTy6tRkheINXdAKQ==.jpg','2024-10-24 19:22:52',NULL,'N'),('20231024-00001','SV20210012','SV20210019','1','1','1',NULL,NULL,'2023-10-24','\\images\\qr\\0pXp7OUbuydg5cP8utnJAg==.jpg','2024-10-24 19:22:42',NULL,'N'),('20241024-00001','SV20210018','SV20210017','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\4mlsC7Cjx5wQMJ9ogznbgA==.jpg','2024-10-24 19:23:41',NULL,'N'),('20241024-00002','SV20210018','SV20210017','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\Wm-kA4TIjB9DjH9whKfQBQ==.jpg','2024-10-24 19:23:47',NULL,'N'),('20241024-00003','SV20210017','SV20210016','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\97Lbqz8PZY9Su3HXlc4wvA==.jpg','2024-10-24 19:23:54',NULL,'N'),('20241024-00004','SV20210017','SV20210016','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\YyeHiWcUjUS36wJ1t62PbA==.jpg','2024-10-24 19:24:02',NULL,'N'),('20241024-00005','SV20210017','SV20210016','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\GJUMCyInq_jJ9wxXTk9JcQ==.jpg','2024-10-24 19:24:05',NULL,'N'),('20241024-00006','SV20210020','SV20210016','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\_TR0gtt-gLO3vwpY-7hc5g==.jpg','2024-10-24 19:24:12',NULL,'N'),('20241024-00007','SV20210020','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\bYsXmE0Z5jXCYf2YaOnmsg==.jpg','2024-10-24 19:24:16',NULL,'N'),('20241024-00008','SV20210020','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\UYrypQtGI1lVU6xDntAeXQ==.jpg','2024-10-24 19:25:20',NULL,'N'),('20241024-00009','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\U1nSBVg-IJtJhmEBs8GPFA==.jpg','2024-10-24 21:24:05',NULL,'N'),('20241024-00010','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\5NNUt7r2N8japbam4STeCw==.jpg','2024-10-24 21:24:07',NULL,'N'),('20241024-00011','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\83I0GUtmH7VHWA2lpD94-Q==.jpg','2024-10-24 21:24:09',NULL,'N'),('20241024-00012','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\JSjcL-4I6o7kNltJKbCA8A==.jpg','2024-10-24 21:24:11',NULL,'N'),('20241024-00013','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:24:13',NULL,'N'),('20241024-00014','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00015','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00016','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00017','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00018','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00019','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00020','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00021','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00022','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00023','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00024','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00025','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00026','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00027','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00028','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00029','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00030','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00031','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00032','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00033','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00034','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00035','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00036','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00037','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00038','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00039','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00040','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00041','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00042','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00043','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00044','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00045','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00046','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00047','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00048','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00049','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00050','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00051','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00052','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00053','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00054','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00055','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00056','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00057','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00058','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00059','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00060','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00061','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00062','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00063','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00064','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00065','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00066','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00067','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00068','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00069','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00070','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00071','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00072','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00073','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00074','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00075','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00076','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00077','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00078','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00079','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00080','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00081','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00082','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00083','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00084','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00085','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00086','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00087','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00088','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00089','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00090','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00091','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00092','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00093','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00094','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00095','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00096','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00097','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00098','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00099','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00100','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00101','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00102','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00103','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00104','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00105','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00106','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00107','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00108','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00109','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00110','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00111','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00112','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00113','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00114','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00115','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00116','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00117','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00118','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00119','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00120','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00121','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00122','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00123','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00124','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00125','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00126','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00127','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00128','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00129','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00130','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00131','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00132','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00133','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00134','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00135','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00136','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00137','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00138','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N'),('20241024-00139','SV20210017','SV20210018','1','1','1',NULL,NULL,'2024-10-24','\\images\\qr\\RpBg45whaDUjg_0CoZKSEw==.jpg','2024-10-24 21:27:49',NULL,'N');
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
INSERT INTO `menu` VALUES ('00000000','#','HOME','/main/dashboard','/main/dashboard/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('10000000','00000000','메인','/main/dashboard','/main/dashboard/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('10000001','10000000','대시보드','/main/dashboard','/main/dashboard/view',2,'MAIN_DASHBOARD','/images/icon/menu/dashboard.svg','N','2024-09-29 19:27:32'),('10000002','10000000','공지사항','/main/notice','/main/notice/view',2,'MAIN_NOTICE','/images/icon/menu/notice.svg','N','2024-09-29 19:27:32'),('10000003','10000000','보고/통계','/main/statistics','/main/statistics/view',2,'MAIN_STATISTICS','/images/icon/menu/statistics.svg','N','2024-09-29 19:27:32'),('20000000','00000000','선번장관리','/rack/line','/rack/line/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('20000001','20000000','선번장관리','/rack/line','/rack/line/view',2,'RACK_LINE','/images/icon/menu/line.svg','N','2024-09-29 19:27:32'),('30000000','00000000','장비관리','/eqp/hw','/eqp/hw/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('30000001','30000000','H/W관리','/eqp/hw','/eqp/hw/view',2,'EQP_HW','/images/icon/menu/equipment_hw.svg','N','2024-09-29 19:27:32'),('30000002','30000000','S/W관리','/eqp/sw','/eqp/sw/view',2,'EQP_SW','/images/icon/menu/equipment_sw.svg','N','2024-09-29 19:27:32'),('40000000','00000000','네트워크관리','/network/portmap','/network/portmap/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('40000001','40000000','포트맵관리','/network/portmap','/network/portmap/view',2,'NETWORK_PORTMAP','/images/icon/menu/network.svg','N','2024-09-29 19:27:32'),('50000000','00000000','환경설정','/settings/auth','/settings/user/view',1,NULL,NULL,'N','2024-09-29 19:27:32'),('50000001','50000000','사용자관리','/settings/user','/settings/user/view',2,'SETTINGS_USER','/images/icon/menu/user-settings.svg','N','2024-09-29 19:27:32'),('50000002','50000000','권한관리','/settings/auth','/settings/auth/view',2,'SETTINGS_AUTH','/images/icon/menu/lock.svg','N','2024-09-29 19:27:32');
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

-- Dump completed on 2024-10-26 10:03:14
