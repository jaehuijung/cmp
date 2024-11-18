    
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


/* 케이블 포설 현황 */
select 
    sum(case when lc.value = '광' then 1 else 0 end) as 광,
    sum(case when lc.value = 'UTF' then 1 else 0 end) as UTF,
    count(lc.id) as TOTAL
from line_basic lb
join line_category lc
on lb.line_category = lc.id 
where lc.category = 1;

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
































