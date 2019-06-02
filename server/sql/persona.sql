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
CREATE TABLE `tags` (
  `tag_id` int(5) AUTO_INCREMENT,
  `tag_name` char(100) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

# 创建tag_relationship表
#标签与文章的对应关系
CREATE TABLE `tag_relationship` (
  `id` int(5) AUTO_INCREMENT,
  `tag_id` int(5) NOT NULL,
  `article_id` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

# 创建articles表
CREATE TABLE `articles` (
  `article_id` int(5) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) NOT NULL,
  `create_time` varchar(20) NOT NULL,
  `modify_time` varchar(20) NOT null,
  PRIMARY KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

# 添加用户
grant all privileges on persona.* to personaAdmin@localhost identified by '000000';
