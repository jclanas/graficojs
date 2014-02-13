CREATE TABLE `analisis` ( 
	`id` INT( 255 ) AUTO_INCREMENT NOT NULL, 
	`descripcion` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`valor1` INT( 255 ) NOT NULL, 
	`valor2` INT( 255 ) NOT NULL, 
	`valor3` INT( 255 ) NOT NULL, 
	`valor4` INT( 255 ) NOT NULL,
	 PRIMARY KEY ( `id` )
 )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
COMMENT '.'
ENGINE = INNODB
AUTO_INCREMENT = 1;
CREATE INDEX `ndx_id` USING BTREE ON `analisis`( `id` )