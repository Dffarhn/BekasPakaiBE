-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bekaspakaidb2
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` json NOT NULL,
  `condition` enum('Baru dan Tersegel','Baru Dibuka','Sekali Pakai','Jarang Dipakai','Pemakaian Rutin','Sesuai Foto') DEFAULT NULL,
  `garansi` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `discount` float DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT '1',
  `weight` int DEFAULT '1',
  `volumePanjang` int DEFAULT '1',
  `volumeLebar` int DEFAULT '1',
  `volumeTinggi` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `jenisId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `categoryProductId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `penjualId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `minimumPrice` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jenisId` (`jenisId`),
  KEY `categoryProductId` (`categoryProductId`),
  KEY `penjualId` (`penjualId`),
  CONSTRAINT `product_ibfk_192` FOREIGN KEY (`jenisId`) REFERENCES `jenis_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_193` FOREIGN KEY (`categoryProductId`) REFERENCES `sub_category_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_194` FOREIGN KEY (`penjualId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('224d9e2b-8c59-4854-81c7-0ec34ef6e512','Donasi HoodieGap','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"product/1730906336086_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730906336086_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=fNT8PIV9bVkGjTvuHrqYLso4R30yauDCi0tYsJXlKgtD%2FdGlgaYfqtcHFoinTHge5MENVTUrPq1okGPyP1pzdiTxM1sM%2FkfzhHhRYIBTgXFn3eW5FKp6ShwcVZsqYyXe87hMEABZmyIsTNzB%2FfVrearYhTZkq0C5JZ3cqulENcnllhHePeu9X4gVtqELC0MNv14NfZZcCTNW0SsV5laDcaAKdpF7bJQouoWXd305%2Ff%2BeLkESq%2Fi7vfHZFm4Qy%2BF9yiv%2Fp3fOWUoLRMx14HaNle%2BL3p%2BrZnaesLDogIxtn0XuO9k%2FBHmtFLm4ig7ukazBF69lQsRbx%2BvSGjMWzNWARA%3D%3D\"}]','Pemakaian Rutin',1,'This is the product description.',10000,NULL,0,500,30,20,15,'2024-11-06 15:18:57','2024-11-06 15:18:57','9153c3c9-958b-408e-a236-b93e354f01ce','ec780443-b92b-4b37-b29a-f3373387c4b2','5ca876ee-3672-4cfc-ac31-87949970e062',0),('3c4728d9-318d-4751-b325-56f8e75df79f','Jual Cup Kopi','[{\"alt\": \"Image description mesinKopi.webp\", \"key\": \"product/1730801053723_mesinKopi.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730801053723_mesinKopi.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=MbJgXHjtqJk3EyqVy9hKLxK0B5zWpJiYfwW7wOI%2But8Ykt3T8lDnp0zAbPQHYtG%2BR8qHb2KukHWXrUO6A4o9fIWILTZzaRNwJoSENbUNCyb5Wt0AyPRKsR3ubqk8NXmeY2EO0fk7s4dP%2Bru0iuH3RDVagyMhbrQr1VeH9kq1nUz%2BikyBXZSkXcfbz%2FpiZ1m5jrYcHbXHzaEqfYEtrCJHjJfiopvXpMwkrcF1A7%2FpfCTi5knpuboacY%2BMHuimhZe7ZMJO9R8Bk1ma8hUGLv3dHo07OgHw7eArF%2FhW2h%2BElBkpm2ACDQIUBpxGmU6hfFpb1l0Qj6aHNAiQdOz55hB2dg%3D%3D\"}, {\"alt\": \"Image description kopicup.webp\", \"key\": \"product/1730801053725_kopicup.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730801053725_kopicup.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=dwqk%2Fk%2FS0L2y7cl2arPPOHSnDYaQeD6uBdxB5Xv05evLUXtTY%2Bb21MmfF6cpRgRNVwIPDgyZA8w0exFidJ5HE%2FLXtwDfeTQ75eLQOJPEhl%2FTPDnK0b%2FZxBfkVopy1aLCLKTzwYoBciJlVDFwHVZtgDI8Rzh2ur%2BrvnFhewzNQqUKy9kWoOGYfKeMxW0yTcdwVCTGH2n9DNqlNHcdP2xycG7e%2B%2Fbz95eDnCW0SK%2Bwc%2Fg%2BJoT7yL2k8WMuy6umF1UDE3WuF4%2FMupliyiT9BlVJYJWfluO%2F95jHeivh1wdIacmW7NJ93EtVFOz0p93nDfv7v4Rg%2Ft4hP4L6mVpuTGKMPQ%3D%3D\"}]','Baru dan Tersegel',1,'This is the product description.',10000,NULL,1,5000,30,20,15,'2024-11-05 10:04:14','2024-11-05 10:04:14','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a',0),('44469535-7aed-406b-9706-558ae301ce09','Donasi Mesin Kopi','[{\"alt\": \"Image description 2.webp\", \"key\": \"product/1730800951724_2.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730800951724_2.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=C7J9d2h4kVip%2BPEWxOenzVlSu0ZSI5mi5vVuUiVK54BckFOTZ5ZIiQ3qfFYEGZVN4d75xkXAcq4jEA7B1KnGCrTH4MQOpHj5L6%2FT%2Fn7OsDojhi0yuroNTvSC8LwaCIY7hQSwq%2FUvQ77xhQ73C28lSImf2ElyYkzLMYp2hrio8WuTLTltOOlfdIc8zrIYb4H7LyPSdrIf8rH2BNnBE8TxJmAKi2NS6vs7%2FIJg05vtWHmSVlBKIb4H5II%2F6E6bA%2FRcV4sL5aojxWJnbNq3ZrlPHvp1I9u4hRc5iuTzjWd%2FUwA41vCBS2Sc4SiZy8fiVDuNgRB5ekkK0ypXk094CgmEBw%3D%3D\"}]','Sekali Pakai',1,'This is the product description.',0,NULL,0,5000,30,20,15,'2024-11-05 10:02:32','2024-11-05 10:02:32','9153c3c9-958b-408e-a236-b93e354f01ce','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a',0),('573f0211-ca85-4e38-98b4-b7264b343ec5','Donasi HoodieGap tes','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"product/1730982799082_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730982799082_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=UY55GbIC%2FYMW%2BdwhkCAsyxvHHZUa0lGaE2bf3%2FpeMjOmqZS%2B1RVygJPU0BqNFInjYRF3metkZ0ufLZy1FCKKlThL20ZH2jmzwXPGO6Lvs9laxkCjoWAv2%2FeXZhOdHOI%2FvYaNUzS2v7JLYwpKERvE9mF%2FHbZSMJ2f6tUlR78Sw9OAJvDMUIc9rzYj6AFUSMXsAszQvS%2FFPByjxJMHWb9bi7UQx2qDpY%2FfxSroZuZcibqxNvqpNrys9JzftdK7XyY7HM15qOGolGRwzRObx8ozcZW5YsoW3SxJPZeYpLGCtTMkJ2kFcMZKFLU9UD3Mc5CLPPtCjeT9aS1eWnxJ9qaibw%3D%3D\"}]','Pemakaian Rutin',1,'This is the product description.',10000,10,1,500,30,20,15,'2024-11-07 12:33:20','2024-11-07 12:33:20','9153c3c9-958b-408e-a236-b93e354f01ce','ec780443-b92b-4b37-b29a-f3373387c4b2','d897aed7-6931-420b-b569-b4d1fddaed2a',0),('59979c79-c361-4f22-a4e3-e7c4df51e5db','Jual HoodieGap','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"product/1730906275683_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730906275683_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=DQ%2F2ZUZMvAiqB0zoUaFVkX9dGf7Qq6vE1NAEig8BnKZFYNLiHYJyfYAWG3ZVWhzXoojHysbDXBz73nPF6PWk8dLT9WecWVL8Z8Vyr40FnGXWL587Zh2VzvF1h0atWH0sRLUdAYzLAHugnN8Lxz88Ai80GzeZp3h0KRcQbsSj3Bdxa1huirN5ENZnMt1n9cbe9%2F%2FiRpUZ%2F3DNpgytx2Ch9Z%2BaHbdA9quoPfo2prheCusSMkf6pdoY6ECX7Jlkm6qc28sQFoSkD1JGAresEzs2l7eOa0cmos9SS8c8ulSOkDCF5QkuhndN41ssmzhDb6VlxI9T6tk26j3CpQrQ2jii%2Fw%3D%3D\"}]','Jarang Dipakai',1,'This is the product description.',10000,NULL,0,500,30,20,15,'2024-11-06 15:17:57','2024-11-06 15:17:57','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','ec780443-b92b-4b37-b29a-f3373387c4b2','5ca876ee-3672-4cfc-ac31-87949970e062',0),('7836ffd1-28b2-42f2-bf93-15ab8980a4f0','Donasi HoodieGap tes','[{\"alt\": \"Image description 20180502_094413.webp\", \"key\": \"product/1730984349508_20180502_094413.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730984349508_20180502_094413.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=o6VMLPde9OFc4BumlNgyM9swWcIMKvd7EhKRzX0NVgkYwCdkvY%2BgKtycbq%2BWPfBbr2tj6HmwKuIv09tZ2sjCKobPisrOCGWBFmO7493skfyXXApM%2BSxQupBwu8IXSt6XKh%2BSc450LwhgvX%2FwMqHOKS3%2B1%2F%2FAP66NVeMM%2F%2FMy8RFUXFy2CysQXE0QjRLibPlZOVa%2Bs6dTqB2ItChFpa2lVnE2Vjx8tkqEWmzXi8JinBt9PvT7suMb4awZjNXHSY8gybwIgOw8NQRFVberki0FX2rkgmKeBNx60fwKOL1qZAyrgbKUWMFLl%2B7EAMJioFJYUvo3m6W3g5St0FXIO%2Br4TQ%3D%3D\"}, {\"alt\": \"Image description tesbaju.webp\", \"key\": \"product/1730984349523_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730984349523_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=uNaSdcSMLn1ZPiHqkRjDhv4Un%2BPR9HdXX8VatcYyadZONKkbMhafR9AWeGdkyxqRIt0P3qz7xI84qh5WOyPUPg2VMk6Z%2Boe%2BrX52vpLht0d88FSId0dG3REjkl6oqzysTEnpzpIDcNlFuDTBv8TNybn6ym%2Fds896OOZsL3qexboBGe%2FSDAsVbapO6E6mVu3%2BE7N6DPzEtc8Syam0O2nsaMB4vkmNgYT2564VYD%2FJ5dgfVnFheKvxAn0U7gBywQDJgeL9JVX1BMXrTir0OEZTnZYyA3y7gTHgfu6q3bRRYC0M0pt7XxjH3z0pDLUvIq3UAh48QBBW9VRTAHxHx7D0SQ%3D%3D\"}]','Pemakaian Rutin',1,'This is the product description.',10000,10,1,500,30,20,15,'2024-11-07 12:59:11','2024-11-07 12:59:11','9153c3c9-958b-408e-a236-b93e354f01ce','ec780443-b92b-4b37-b29a-f3373387c4b2','d897aed7-6931-420b-b569-b4d1fddaed2a',0),('9f77b3db-3b3e-484d-91a5-9884f9d1578f','Jual Mesin Kopi','[{\"alt\": \"Image description mesinKopi.webp\", \"key\": \"product/1730800981035_mesinKopi.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/product/1730800981035_mesinKopi.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=E79qHpg9V6HqjXCBTmMjXOLqZrsLgn6gxgIRHuBX0%2BGEfPgLP5e%2BKuA8V3DQRoa531wfkYtUBwSt0WJEsu4vvVexJr39X%2FDNIT6mkRRGYmmBlTkUvX7Hdpn3esr4osOQTSoxAVXcVhDO3%2FQNSSOYA5wWudcM2Gc4LiYezordy7GXxKJBpH1s3ai5mlRc0p5XTaAWpuX7pv1ui%2BodUgxme9n8e0wzErL%2FvCd7KRaVkLCDfk%2B1I3YD50xoxaDHWMnGgYnyN6Ttv3qoyn1bEDFjtajXR8OwqL9jwnKAWiBDnK9siy9%2FmlUurl4hBORr%2F%2FU7pdP8j93ndjfGIxYNTZXeyw%3D%3D\"}]','Baru dan Tersegel',1,'This is the product description.',0,NULL,1,5000,30,20,15,'2024-11-05 10:03:01','2024-11-05 10:03:01','9153c3c9-958b-408e-a236-b93e354f01ce','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-10 12:21:54
