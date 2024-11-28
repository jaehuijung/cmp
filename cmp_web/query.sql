    
show tables;


delete from line_basic;
delete from equipment_sw_detail ;
delete from equipment_regist_sw;
delete from equipment_regist_hw;
delete from equipment_sw_basic ;
delete from equipment_detail ;
delete from equipment_basic;

/************/

select * from line_basic;
select * from line_category;
select * from line_speed;
select * from equipment_basic ;
select * from equipment_detail ;
select * from equipment_regist_hw ;
select * from equipment_regist_sw ;
select * from equipment_sw_basic ;
select * from equipment_sw_detail ;
show full columns from equipment_detail;

select * from MENU;
select * from equipment_categories ;

/* 케이블 포설 현황 */
select
    lc.category, count(lc.category)
from 
    line_basic lb
join 
    line_category lc
    on lb.line_category = lc.idx
where 1=1 
    and is_deleted = 'N'
group by 
    lc.category
with rollup;

/* 케이블 포설 상세현황 */
/* 광 */
select
    *
from(
    select
        ifnull(ls.speed, 'total') as speed,
        count(lc.idx)
    from 
        line_basic lb
    join 
        line_category lc
        on lb.line_category = lc.idx
    join
        line_speed ls
        on lb.line_speed = ls.idx
    where 1=1 
        and is_deleted = 'N'
        and lc.idx = '1'
    group by 
        ls.speed
    with rollup
) fiber
order by speed desc;

/* utp */
select
    ls.speed, count(lc.idx)
from 
    line_basic lb
join 
    line_category lc
    on lb.line_category = lc.idx
join
    line_speed ls
    on lb.line_speed = ls.idx
where 1=1 
    and is_deleted = 'N'
    and lc.idx = '2'
group by 
    ls.speed
with rollup;

/* hw 상세 통계 */
select
    *
from(
    select 
        ifnull(ec.asset_category, 'total') hw,
        count(eb.asset_id) cnt
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
    with rollup
) hw
order by
    hw desc;

/* sw 상세 통계 */
select
    *
from(    
    select
        ifnull(ec.asset_category, 'total') sw,
        count(eb.asset_id) cnt
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
        ec.asset_category
    with rollup
) sw
order by
    sw desc;


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
















