/*CREATE DATABASE seckill;*/
use seckill;
// https://stackoverflow.com/questions/39545124/error-1067-42000-invalid-default-value-for-end-time
set @@session.explicit_defaults_for_timestamp=on;
CREATE TABLE seckill(
	`seckill_id` bigint NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
	`name` VARCHAR(120) NOT NULL COMMENT '商品名称',
	`number` INT NOT NULL COMMENT '库存',
	`start_time` TIMESTAMP NOT NULL COMMENT '秒杀开启时间',
	`end_time` TIMESTAMP NOT NULL COMMENT '秒杀结束时间',
	`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	PRIMARY KEY (`seckill_id`),
	key idx_satrt_time(start_time),
	key idx_end_time(end_time),
	key idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';


insert into 
	seckill(name, number, start_time, end_time)
values ('1000元秒杀iphone X', 100, '2017-12-01 00:00:00', '2017-12-02 00:00:00'),
	('500元秒杀ipad', 200, '2017-12-01 00:00:00', '2017-12-02 00:00:00'),
	('300元秒杀Apple Watch', 300, '2017-12-01 00:00:00', '2017-12-02 00:00:00'),
	('400元秒杀小米4', 400, '2017-12-01 00:00:00', '2017-12-02 00:00:00'),
	('1000元秒杀戴尔外星人', 50, '2017-12-01 00:00:00', '2017-12-02 00:00:00');

CREATE TABLE success_killed(
	`seckill_id` bigint NOT NULL COMMENT '秒杀商品id',
	`user_phone` bigint NOT NULL COMMENT '用户手机号',
	`state` TINYINT NOT NULL DEFAULT -1 COMMENT '状态标识 -1无效 0：成功 1：已付款 2：已发货',
	`create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
	PRIMARY KEY (seckill_id, user_phone),
	key idx_create_time(create_time)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
