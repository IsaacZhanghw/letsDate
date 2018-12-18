/*
Navicat MySQL Data Transfer

Source Server         : localhost_3309
Source Server Version : 50617
Source Host           : localhost:3309
Source Database       : an_ju_ke

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-01-05 22:47:51
*/

-- SET FOREIGN_KEY_CHECKS=0;

-- -- ----------------------------
-- -- Table structure for admin_table
-- -- password 123
-- -- ----------------------------
-- DROP TABLE IF EXISTS `admin_table`;
-- CREATE TABLE `admin_table` (
--   `ID` varchar(32) NOT NULL,
--   `weichatid` varchar(32) NOT NULL,
--   `password` varchar(32) NOT NULL,
--   `creatTime` varchar(32) NOT NULL,
--   PRIMARY KEY (`ID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_table
-- password 123
-- ----------------------------

DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `ID` varchar(32) NOT NULL,
  `openid` varchar(32) NOT NULL,
  `nick_name` varchar(32) NOT NULL,
  `head_img` varchar(255) NOT NULL,
  `gender` varchar(32) NOT NULL,
  `creatTime` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
