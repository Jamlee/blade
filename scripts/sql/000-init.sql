/*
* 创建基本的数据表结构 
* 20181129
*
* 约定：
* 1. 字段名必须采用 “驼峰法” 命名，方便与程序开发保持一致
* 2. bool 至采用 tinyint(1) 表示
*
*/

create database if not exists blade;
use blade;


drop table if exists blade_user;
create table blade_user (
  `id` char(36) not null primary key comment '用户 uuid',
  `username` varchar(255) not null comment '用户登录名',
  `passwordHash` varchar(255) not null comment '用户登录名',
  `avatar` varchar(255) comment '头像地址',
  `email` varchar(255) not null comment '邮箱',
  `emailVerfied` tinyint(1) not null comment '邮箱是否验证',
  `phone` varchar(14) not null comment '手机号码',
  `phoneVerfied` tinyint(1) not null comment '手机号码是否验证',
  `sex` tinyint(2) not null default 0 comment '0 未知 1 男 2 女'
) default character set=utf8;

drop table if exists blade_token;
create table blade_token (
  `id` char(36) not null primary key comment 'token 的 uuid',
  `tokenVaule` varchar(255) not null comment 'token 的值',
  `belongTo` varchar(255) not null comment 'token 属于哪个用户账户或者应用账户',
  `expiredAt` timestamp not null comment '过期时间',
  `isExpired` tinyint(1) not null comment '是否过期'
) default character set=utf8;

