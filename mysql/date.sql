/*
Navicat MySQL Data Transfer

Source Server         : localhost_3309
Source Server Version : 50617
Source Host           : localhost:3309
Source Database       : user_table

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-01-05 19:42:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `openid` varchar(32) NOT NULL,
  `nick_name` varchar(32) NOT NULL,
  `head_img` varchar(255) NOT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_table` VALUES ('oBg2Z0XFXuiv7ahMSfYx3YghhPes', '星辰', 'http://thirdwx.qlogo.cn/mmopen/vi_32/BUcfMPzbCZSMZ4uvcyXkLW60l23Qa36lfv2eEPyYDiaUSWq7BKb89QqKVd3PyXKD4FplO713MtrVJv2HHHUNLDA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0V0OPSx73idxA3fx-JDkjkE', '吕蓥', 'http://thirdwx.qlogo.cn/mmopen/vi_32/icXe4via54eslyhG54401sVBsWl1Y2nhcBpAwPzfnReH4PoxHa6grOvCCFlvibtbI2teqOxoO6GvGHMxLuYrd4EkA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0bc0guDB5tWxOhf3au8wY4Q', 'Tracy Zou', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJxtUicJoIA9XQakEnn5bcHzMUZraRlFLZL09QDRsR2yuIhrPWfvCDNOpiabV7aMdHHCIiadxDarRudQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0UoTJ6xT6tgl7tn6NO85Xwk', '康师傅', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercVkzicWGRqePCDLOZddoncJPam9ze2NMgbNAVdR6PdiaA9dCaHzFIY7JoyKD0Jaxaq5TzuCdylInw/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0e5iWAsDhAmWh4Gozuy-68I', 'oO～', 'http://thirdwx.qlogo.cn/mmopen/vi_32/fU0lSlGh1icbicibiaIVB8Fu5zeTdnRgjC5micWJjatWhS2NITib7vALrwOjRZM7QKyZd0Xy6m2z2APQIwhzAOAxwLVA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0S4AooGiuM40o2MYiwVBKls', '斯与', 'http://thirdwx.qlogo.cn/mmopen/vi_32/207SGpo7UictSbc96eCdsicPEOEcefWymaWy7OEPfo8M9AFER6jSicn7oRFQSibf4ETM2icYajic4hzgGHFnbnAxyqicA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0f_fWd7cUsrAywiAOdvVqtY', 'Tier', 'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELNKFvVxRHy2tiafkuoGUxdNLNXoxNrJd2Ra9AKZv9PBDnQKWWyMW82u3kHTp2uSvKWxyJLUDGzTHA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0QsrK5z_SeH_wikddwhHSp8', 'Chen', 'http://thirdwx.qlogo.cn/mmopen/vi_32/8sDmOyt5lVHLpXMuaqcibxrOF8QBXohFQbA4XiaLh7b366Ehph1ZBnEqF6ujZ0P57QsgvS3jrVdmerQTLouZnbicQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0ewWV_ax1Nl2eZarV6qeJqY', 'TAO', 'http://thirdwx.qlogo.cn/mmopen/vi_32/3IunQ6WrbZiatDYPwCkWiamFbkfWwqPTRqx8iaic7k5QqJEYKcnxkEYibFictV4lPcuA6lBaOfibQ9j29iaGA8KZzMwDXA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0RgYLWq3-tSO-nnUNEZVm-I', 'Lin', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ergLvMjtFF5MMXSpHU0ibqcPtDIo0FIy6uEfnGib1xAFS0sWvPhaohib4iavwAXWJhFAEQ2mgnLbcpD3Q/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0a-9debK--ulD2ggMgK0J1o', 'Desiree', 'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIUDjC3oelg8wJssleJTLtZrsLpeCYvZV6078iad7egvJmapvfjQLUSt7uEXiahJRgszg9uSgaLHXicQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0bHGE7PHlNYV7mkN6W0phI4', '戴着镣铐跳舞', 'http://thirdwx.qlogo.cn/mmopen/vi_32/jicgtv1vSxiciaFOfFawfe83iavjENrtN7UTPujg6IuFWX6HnCeFhpvXTFzuCnL6SCMQPzJibTRt09DZia3LJxmCypcQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0YvFVkai4COYfveM14QSTlc', '本颖', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCmh47BiaM2AXRYU4Sc8kIu1ANqPPuk25Nj1ic5xib0b8NIRpdjQ9NuiaicLL9UjJFAr3GL0ib9kKAFzCw/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0csBEd4q3RziHJSO7Un6xMQ', 'Weiyong', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTert9cibjuuvbj31NCgumgmntgWY4l7OA2LOicCnrImBg5Scic7oIBJbEiaAWwGMxibODG9hPsQMedmA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0Q91IAl4WV5t7Er0T8jjQJk', 'MOLLY', 'http://thirdwx.qlogo.cn/mmopen/vi_32/ZG0tmpOI1yhRibMAiacvgpz66gW1tQhXMH4MHZSM9vu55DKkgfgh95d1QbkIacTxPCxxYP8xdC4rNyRmuUib7bdJg/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0Y31GPrXLnCrBYuhdCoIfA4', '伊人', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLe00c7whq5qDsHydo5U0685F5Gan1wkfWbNuMo7vTiaDrg0jlib506rkhW43QMTOkRs3qiazzkfreRQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0YBl-A2xoYYY7JX88ObiOCg', 'howard xu', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKzXP3Z2VoWfTeZg6WcfmrZvpia1RYzZz0y1n1rjYJibIHhcTGK9ApcktDlFrklAFNOF4DzpriaaxPcA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0RDHUcdnuBdkDw4zvaBdPLQ', 'Faye', 'http://thirdwx.qlogo.cn/mmopen/vi_32/wFicWuCl1JHJjspsjth1NsQsNdXJuUI4AicsRVEBwXjicFJXMCytbOM26TD1AcMaHjIoWB22iaN6JW85NneJ7SyNuQ/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0dBlvJU48i6scqZ5hI3hBco', '大燕燕', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLfjvHgUrN1G8ia0TmsmoicvsJ4gttskEvZH1BQPFLUpIT2jicrrhIrhezicScgV7e8foSfFupm873ZMA/132');
INSERT INTO `user_table` VALUES ( 'oBg2Z0dixsPzH85cOJWjAiHnidSw', '偏偏', 'http://thirdwx.qlogo.cn/mmopen/vi_32/xpuK3CoPDFtaIX2f8yGcI4qtD9N7RAvWvtHtq6slfLMfk2wVcaRdVJ2beKibGMupqiaiaCHCecPkK2qicBPXwIBK0A/132');
INSERT INTO `user_table` VALUES ( 'ogdsY48SFFnroEZhvG9OnxTTPg1Y', '刘绍川', 'https://wx.qlogo.cn/mmopen/vi_32/iaZ2PQFuHU9OJ2ibGlQtofRW7gEcuXSTWpiagwGRvtEhQnhBzyFjFqIib0BYBMs7gP7UktakrEO5JrqRvD6BlBChyQ/132');
INSERT INTO `user_table` VALUES ( 'ogdsY47VufK5fs6h-jrT5-OhuWaw', 'Care#Quickly', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIhXibVTuCiaFaCHHeBdicfjddE7Qq2uwRWSibtAwayV01TjQrg3T1EeDxS5B133ibicwRqPwhQO9z3bcrA/132');
INSERT INTO `user_table` VALUES ( 'ogdsY47VufK5fs6h-jrT5-OhuWaw', '啊你', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIhXibVTuCiaFaCHHeBdicfjddE7Qq2uwRWSibtAwayV01TjQrg3T1EeDxS5B133ibicwRqPwhQO9z3bcrA/132');
INSERT INTO `user_table` VALUES ( 'ogdsY4xL7BcflOHRy3Nheu1FGwvs', '赖丽娜', 'https://wx.qlogo.cn/mmopen/vi_32/jabyoUu9H55h6zJccRwhpWLsyUt44KhN1ULpm8Bveb7dyGlCf5hGdkEuoJQAUUfswMVib1OEY6wIpf7Rd6yL3wg/132');
INSERT INTO `user_table` VALUES ( 'ogdsY4-m-PPgrTdmJaOMv9_WiPZY', '盐分', 'https://wx.qlogo.cn/mmopen/vi_32/rp8FHcNHPMR2YeQAg1xx1XIP8VicG0s9URtWYibCe0ppc7NbdLSxj7RN2WU1K6Zsfgv3h19ANUicTYthGt0Q9CYOg/132');
INSERT INTO `user_table` VALUES ( 'ogdsY4-WvSX8i_tPQnJcJ4bWuvGo', '家玲玲玲', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLBibKcpFUVQqDdElco2hN0ZlDBvVEtTia64ABalaibPp1sfHS4TAoP2CLYNrCI9j2R9MNbnRbY7RwRg/132');
INSERT INTO `user_table` VALUES ( 'ogdsY4_npKphNNZrqMo28r-ywg_c', '康师傅', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJwjXlPib8QlzY8FZZTZLYnJYXwHbEPS063SLxEhlMomxxc3MT6rxCZ4iaWAh6dC8PAJVL1r54yh6w/132');
INSERT INTO `user_table` VALUES ( 'ogdsY4wiahRBGCWixhEeUJ4F_1mw', '毛晓杰', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibBuXQxSoJ9vXhauXiaPXwEs1lcf8U2qYRfz1StrZcD0rXcmhpmZABoEPre6tO7d2ibYde9MtQTicTg/132');
