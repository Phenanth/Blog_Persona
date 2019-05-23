# 添加数据库
create database persona;

# 创建user表
# 和GA-Login一样
CREATE TABLE `user` (
  `user_id` char(14) NOT NULL,
  `user_password` char(100) NOT NULL,
  `user_sex` char(1) DEFAULT NULL,
  `user_secret` varchar(40) DEFAULT NULL,
  `user_secret_temp` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;


# 创建tags表
# 还没有写tags功能，表结构有待创建


# 添加用户
grant all privileges on persona.* to personaAdmin@localhost identified by '000000';
