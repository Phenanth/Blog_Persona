-- MySQL dump 10.13  Distrib 5.6.43, for Win64 (x86_64)
--
-- Host: localhost    Database: persona
-- ------------------------------------------------------
-- Server version	5.6.43-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `article_id` int(5) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) NOT NULL,
  `create_time` varchar(20) NOT NULL,
  `modify_time` varchar(20) NOT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Sample Text','2019-05-24 14:58','2019-5-29 18:48'),(2,'Second (modified)','2019-5-2 10:33','2019-5-29 18:48'),(3,'Third','2019-5-3 11:21','2019-5-29 18:48'),(4,'备忘录（0529更新，读我！）','2019-5-3 13:2','2019-5-29 18:47');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `tag_id` int(5) AUTO_INCREMENT,
  `tag_name` char(100) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO tags (tag_name) VALUES ('能化'),('股市'),('经济'),('公司'),('要闻'),('Java'),('其他');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_relationship`
--

DROP TABLE IF EXISTS `tag_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_relationship` (
  `id` int(5) AUTO_INCREMENT,
  `tag_id` int(5) NOT NULL,
  `article_id` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_relationship`
--

LOCK TABLES `tag_relationship` WRITE;
/*!40000 ALTER TABLE `tag_relationship` DISABLE KEYS */;
INSERT INTO tag_relationship (article_id, tag_id) VALUES (1,7),(2,7);
/*!40000 ALTER TABLE `tag_relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` char(14) NOT NULL,
  `user_password` char(100) NOT NULL,
  `user_sex` char(1) DEFAULT NULL,
  `user_secret` varchar(40) DEFAULT NULL,
  `user_secret_temp` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('alice','6cc7af7f2fbb06fd1701ebcd0497a2c2','F',NULL,NULL),('bob','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('candy','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('darcy','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('dom','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('echo','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('frank','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('gary','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('honey','7396b324b5381ff60222ccda29986f40','F',NULL,NULL),('kiki','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('miotokyo','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL),('nina','6cc7af7f2fbb06fd1701ebcd0497a2c2','M',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-29 18:55:35
