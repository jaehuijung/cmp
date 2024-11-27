    
show tables;


delete from line_basic;
delete from equipment_sw_detail ;
delete from equipment_regist_sw;
delete from equipment_regist_hw;
delete from equipment_sw_basic ;
delete from equipment_detail ;
delete from equipment_basic;

/************/

select * from equipment_basic ;
select * from equipment_detail ;
select * from equipment_regist_hw ;
select * from equipment_regist_sw ;
select * from equipment_sw_basic ;
select * from equipment_sw_detail ;
show full columns from equipment_detail;


select * from line_category ;
select * from line_basic ;

select
    lcca.value,
    lcsd.value,
    lccr.value,
    count(*)
from 
    line_basic lb
join
    line_category lcca
    on lcca.category = 1
    and lb.line_category = lcca.id
join
    line_category lcsd
    on lcsd.category = 2
    and lb.line_speed = lcsd.id
join
    line_category lccr
    on lccr.category = 3
    and lb.line_color = lccr.id
group by  lcca.value, lcsd.value, lccr.value
;

select config_id, asset_id , config_category, asset_category 
from equipment_categories 
group by config_id, config_category, asset_category, asset_id 
order by config_id , asset_id ;


select * from equipment_regist_hw;
select * from line_basic ;

select 
lc.id, lc.value, count(lc.id)
from line_basic lb
join line_category lc
on lb.line_category = lc.id 
and lc.category = 1
group by lc.id, lc.value
;

select * from equipment_categories ;
select * from line_category;

create table `line_category`(
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(30) DEFAULT NULL COMMENT '회선분류',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='선번장 회선분류';

CREATE TABLE `line_speed` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `speed` varchar(30) DEFAULT NULL COMMENT '회선속도',
  `color` varchar(30) DEFAULT NULL COMMENT '회선색상',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='선번장 회선속도';

insert into line_category2 (category)
values("광"),("UTF");

insert into line_speed(speed, color)
values("1G", "빨강"), ("10G", "파랑"), ("100G", "초록");

select * from line_category;
select * from line_speed;

select * from line_basic ;

select
            lb.line_manage_id, /* 선번장 케이블 관리번호 */
            lb.qr_image_location, /* 선번장 이미지 */
            /* 출발지 */
            seb.asset_id s_asset_id,                                        /* 자산분류 */
            sec.asset_category s_asset_category  ,                          /* 출발지 자산 카테고리 */
            sed.installation_coordinates s_installation_coordinates,        /* 설치좌표 */
            seb.eqp_manage_id s_eqp_manage_id,                              /* 관리 id */
            seb.eqp_name s_eqp_name ,                                       /* 구성자원명 */
            seb.model_name s_model_name,                                    /* 모델명 */
            seb.host_name s_host_name,                                      /* 호스트명 */
            seb.m_company s_m_company,                                      /* 제조사 */
            lb.start_eqp_port s_port,                                       /* 포트번호 */
            seb.primary_operator s_primary_operator,                        /* 운영담당자 */
            seb.primary_outsourced_operator s_primary_outsourced_operator,  /* 위탁운영담당자 */
            /* 목적지 */
            eeb.asset_id e_asset_id,                                        /* 자산분류 */
            eec.asset_category e_asset_category,                            /* 목적지 자산 카테고리 */
            eed.installation_coordinates e_installation_coordinates,        /* 설치좌표 */
            eeb.eqp_manage_id e_eqp_manage_id,                              /* 관리 id */
            eeb.eqp_name e_eqp_name ,                                       /* 구성자원명 */
            eeb.model_name e_model_name,                                    /* 모델명 */
            eeb.host_name e_host_name,                                      /* 호스트명 */
            eeb.m_company e_m_company,                                      /* 제조사 */
            lb.end_eqp_port e_port,                                         /* 포트번호 */
            eeb.primary_operator e_primary_operator,                        /* 운영담당자 */
            eeb.primary_outsourced_operator e_primary_outsourced_operator,  /* 위탁운영담당자 */
            /* 선번장 회선 */
            lctg.category line_category,    /* 회선구분 */
            lspd.speed line_speed,       /* 회선속도 */
            lspd.color line_color        /* 회선색상 */
        from
            line_basic lb /* 선번장 정보 */
        join
            equipment_basic seb /* 출발지 기본정보 */
            on lb.start_eqp_id = seb.eqp_manage_id
        join
            equipment_detail sed /* 출발지 상세정보 */
            on seb.eqp_manage_id = sed.eqp_manage_id
        join (
            select
                asset_id , asset_category
            from
                equipment_categories
            group by
                asset_id , asset_category
            ) sec /* 출발지 연결정보 */
            on seb.asset_id = sec.asset_id
        join
            equipment_basic eeb /* 목적지 기본정보 */
            on lb.end_eqp_id = eeb.eqp_manage_id
        join
            equipment_detail eed /* 목적지 상세정보 */
            on eeb.eqp_manage_id = eed.eqp_manage_id
        join (
            select
                asset_id , asset_category
            from
                equipment_categories
            group by
                asset_id , asset_category
            ) eec /* 목적지 연결정보 */
            on eeb.asset_id = eec.asset_id
        join
            line_category lctg /* 회선구분 */
            on lb.line_category = lctg.idx
        join
            line_speed lspd /* 회선속도 */
            on lb.line_speed = lspd.idx;
        
select
            idx, category
        from
            line_category2
        order by
            idx            
            ;
select
    idx, speed, color
from
    line_speed
order by
    idx;
  
 select
    id line_id, value line_value
from
    line_category
order by
    id;
            
/* 케이블 포설 현황 */
select 
    sum(case when lc.value = '광' then 1 else 0 end) as 광,
    sum(case when lc.value = 'UTF' then 1 else 0 end) as UTF,
    count(lc.id) as TOTAL
from line_basic lb
join line_category lc
on lb.line_category = lc.id 
where 1=1 
and lc.category = 1
and is_deleted = 'N';

/* 장비 포설 현황 */
CREATE VIEW equipment_view AS
SELECT 
    (SELECT COUNT(eqp_manage_id) FROM equipment_basic) AS hw_cnt,
    (SELECT COUNT(eqp_manage_id) FROM equipment_sw_basic) AS sw_cnt;

select 
    hw_cnt, sw_cnt, hw_cnt + sw_cnt 
from equipment_view;

/* 장비 누적 금액 */
CREATE VIEW equipment_cost_view AS
SELECT 
    (SELECT sum(acquisition_cost) FROM equipment_detail) AS hw_cost,
    (SELECT sum(acquisition_cost) FROM equipment_sw_detail) AS sw_cost;

select
    hw_cost, sw_cost, hw_cost+sw_cost
from equipment_cost_view ;

/* H/W 장비 등록 상세 현황 */
select
   eb.eqp_manage_id, 
   eb.config_id, ec.config_category ,
   eb.asset_id, ec.asset_category ,
   eb.sub_id, ec.sub_category ,
   eb.detail_id, ec.detail_category 
from equipment_basic eb 
join equipment_categories ec
on eb.config_id = ec.config_id 
and eb.asset_id = ec.asset_id 
and eb.sub_id = ec.sub_id 
and eb.detail_id = ec.detail_id ;

select
   ec.config_category ,
   ec.asset_category ,
   ec.sub_category ,
   ec.detail_category 
from equipment_basic eb 
join equipment_categories ec
on eb.config_id = ec.config_id 
and eb.asset_id = ec.asset_id 
and eb.sub_id = ec.sub_id 
and eb.detail_id = ec.detail_id 
group by ec.config_category , ec.asset_category , ec.sub_category , ec.detail_category ;

/* hw 상세 통계 */
select 
    ec.config_category, 
    count(eb.config_id) as config_count,
    ec.asset_category, 
    count(eb.asset_id) as asset_count
from 
    equipment_basic eb
join 
    equipment_categories ec
on 
    eb.config_id = ec.config_id 
    and eb.asset_id = ec.asset_id 
    and eb.sub_id = ec.sub_id 
    and eb.detail_id = ec.detail_id 
group by 
    ec.config_category, ec.asset_category;

/* hw 상세 통계 */
select 
    ec.asset_category, 
    count(eb.asset_id) as asset_count
from 
    equipment_basic eb
join 
    equipment_categories ec
on 
    eb.config_id = ec.config_id 
    and eb.asset_id = ec.asset_id 
    and eb.sub_id = ec.sub_id 
    and eb.detail_id = ec.detail_id 
group by 
    ec.asset_category
with rollup;

/* S/W 장비 등록 상세 현황 */
select * from equipment_regist_sw;
select * from equipment_sw_basic
where dependent_config ='2';

/* sw 상세 통계 */
select 
    ec.config_category, 
    count(eb.config_id) as config_count,
    ec.asset_category, 
    count(eb.asset_id) as asset_count
from 
    equipment_sw_basic eb
join 
    equipment_categories ec
on 
    eb.config_id = ec.config_id 
    and eb.asset_id = ec.asset_id 
    and eb.sub_id = ec.sub_id 
    and eb.detail_id = ec.detail_id 
group by 
    ec.config_category, ec.asset_category;

select
    eb.eqp_manage_id , /* 관리번호 */
    eb.eqp_name , /* 구성자원명 */
    eb.model_name , /* 모델명 */
    eb.host_name , /* 호스트명 */
    eb.m_company , /* 제조사 */
    erh.port_number, /* 포트번호 */
    eb.primary_operator , /* 운영담당자 */
    eb.primary_outsourced_operator , /* 위탁운영담당자 */
    ec.config_category ,  /* 구성분류 */
    ec.asset_category , /* 자산분류 */
    ec.sub_category , /* 자산세부분류 */
    ec.detail_category , /* 자산상세분류 */
    ed.installation_coordinates /* 설치좌표 */
from
    equipment_basic eb
join
    equipment_detail ed
    on eb.eqp_manage_id = ed.eqp_manage_id
join
    equipment_regist_hw erh
    on eb.eqp_manage_id = erh.eqp_link_manage_id
join
    equipment_categories ec
    on eb.config_id = ec.config_id
    and eb.asset_id = ec.asset_id
    and eb.sub_id = ec.sub_id
    and eb.detail_id = ec.detail_id
where 1=1
    and eb.is_deleted = 'N'
    and erh.port_number != ''
ORDER BY eb.eqp_manage_id desc, erh.port_number
;

select * from equipment_regist_hw;
show full columns from equipment_regist_hw;

alter table equipment_regist_hw 
add column eqp_port varchar(30) comment '장비 포트';

alter table equipment_regist_hw 
add column eqp_link_port varchar(30) comment '연결장비 포트';


select
            A.eqp_manage_id ,               /* 관리번호 */
            A.eqp_name ,                    /* 구성자원명 */
            A.model_name ,                  /* 모델명 */
            A.host_name ,                   /* 호스트명 */
            A.m_company ,                   /* 제조사 */
            A.primary_operator ,            /* 운영담당자 */
            A.primary_outsourced_operator , /* 위탁운영담당자 */
            ec.config_category ,            /* 구성분류 */
            ec.asset_category ,             /* 자산분류 */
            ec.sub_category ,               /* 자산세부분류 */
            ec.detail_category ,            /* 자산상세분류 */
            ed.installation_coordinates,    /* 설치좌표 */
            erh.eqp_port,                   /* 장비포트번호 */
            erh.eqp_link_port               /* 연결장비포트번호 */
        from
            equipment_basic A
        join
            equipment_detail ed
            on A.eqp_manage_id = ed.eqp_manage_id
        join
            equipment_categories ec
            on A.config_id = ec.config_id
            and A.asset_id = ec.asset_id
            and A.sub_id = ec.sub_id
            and A.detail_id = ec.detail_id
        join
            equipment_regist_hw erh
            on A.eqp_manage_id = erh.eqp_link_manage_id
        where 1=1
            AND A.is_deleted = 'N'
            AND erh.eqp_manage_id = 'SV20240007'
    ORDER BY
        A.eqp_manage_id, erh.eqp_port, erh.eqp_link_manage_id ;
            
select * from equipment_regist_hw ;


select * from equipment_detail;

select * from equipment_regist_hw ;
select * from equipment_regist_ip;

desc equipment_detail;

select
    eb.eqp_manage_id,
    eb.eqp_name,
    eb.host_name,
    eb.model_name,
    eb.m_company,
    eb.domestic,
    eb.redundancy_config,
    eb.maintenance_contract_target,
    eb.config_id,
    eb.asset_id,
    eb.sub_id,
    eb.detail_id,
    eb.network_operation_type,
    eb.operating_status,
    eb.operating_department,
    eb.primary_operator,
    eb.secondary_operator,
    eb.primary_outsourced_operator,
    eb.secondary_outsourced_operator,
    ed.CPU,
    ed.MEMORY,
    ed.DISK,
    ed.OS,
    ed.acquisition_cost,
    ed.port_cnt,
    ed.installation_coordinates,
    ed.installation_units,
    ed.equipment_size_units,
    ed.dbrain_number,
    ed.serial_number,
    ed.asset_acquisition_date,
    ed.asset_disposal_date,
    ed.eol_status,
    ed.eos_status
from
    equipment_basic eb
join
    equipment_detail ed
    on eb.eqp_manage_id = ed.eqp_manage_id
where 1=1
    and eb.eqp_manage_id = 'SE20240001'
;
select * from equipment_regist_ip;

SELECT
    el.ip,
    eb.eqp_manage_id,
    eb.eqp_name,
    eb.host_name,
    eb.model_name,
    eb.m_company,
    eb.domestic,
    eb.redundancy_config,
    eb.maintenance_contract_target,
    eb.config_id,
    eb.asset_id,
    eb.sub_id,
    eb.detail_id,
    eb.network_operation_type,
    eb.operating_status,
    eb.operating_department,
    eb.primary_operator,
    eb.secondary_operator,
    eb.primary_outsourced_operator,
    eb.secondary_outsourced_operator,
    ed.CPU,
    ed.MEMORY,
    ed.DISK,
    ed.OS,
    ed.acquisition_cost,
    ed.port_cnt,
    ed.installation_coordinates,
    ed.installation_units,
    ed.equipment_size_units,
    ed.dbrain_number,
    ed.serial_number,
    ed.asset_acquisition_date,
    ed.asset_disposal_date,
    ed.eol_status,
    ed.eos_status
FROM
    equipment_basic eb
JOIN
    equipment_detail ed
    ON eb.eqp_manage_id = ed.eqp_manage_id
JOIN (
        SELECT eqp_manage_id, ip
        FROM equipment_regist_ip
        WHERE idx = (
            SELECT MIN(idx)
            FROM equipment_regist_ip
            WHERE eqp_manage_id = equipment_regist_ip.eqp_manage_id
        )
    ) el
    ON eb.eqp_manage_id = el.eqp_manage_id
WHERE
    1=1
    AND eb.eqp_manage_id = 'SE20240001';

/* 상세 ip 첫번째 보여주기 */
SELECT 
    idx,
    eqp_manage_id,
    ip
FROM 
    equipment_regist_ip
WHERE 
    eqp_manage_id = 'SE20240001' AND
    idx = (SELECT MIN(idx) FROM equipment_regist_ip WHERE eqp_manage_id = 'SE20240001');
;

select
            eb.eqp_manage_id,
            eb.eqp_name,
            eb.host_name,
            eb.model_name,
            eb.m_company,
            eb.domestic,
            eb.redundancy_config,
            eb.maintenance_contract_target,
            eb.config_id,
            eb.asset_id,
            eb.sub_id,
            eb.detail_id,
            eb.network_operation_type,
            eb.operating_status,
            eb.operating_department,
            eb.primary_operator,
            eb.secondary_operator,
            eb.primary_outsourced_operator,
            eb.secondary_outsourced_operator,
            ed.CPU,
            ed.MEMORY,
            ed.DISK,
            ed.OS,
            ed.acquisition_cost,
            ed.port_cnt,
            ed.installation_coordinates,
            ed.installation_units,
            ed.equipment_size_units,
            ed.dbrain_number,
            ed.serial_number,
            ed.asset_acquisition_date,
            ed.asset_disposal_date,
            ed.eol_status,
            ed.eos_status,
            el.ip
        from
            equipment_basic eb
        join
            equipment_detail ed
            on eb.eqp_manage_id = ed.eqp_manage_id
        left join (
            select
                eqp_manage_id, ip
            from
                equipment_regist_ip
            where
                idx = (
                    select
                        min(idx)
                    from
                        equipment_regist_ip
                    where
                        eqp_manage_id = equipment_regist_ip.eqp_manage_id
                )
            ) el
            ON eb.eqp_manage_id = el.eqp_manage_id
        where 1=1
            and eb.eqp_manage_id = 'SV20240001'
;


select * from equipment_categories ;
select
    ei.idx,
    ei.eqp_manage_id,
    ei.ip
from
    equipment_regist_ip ei
where 1=1
;

select * from line_category
;

select * from equipment_regist_ip ;

show tables;


select * from line_basic ;

select * from equipment_regist_hw ;


select * from line_basic;
















