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
-- Table structure for table `auth_penjual`
--

DROP TABLE IF EXISTS `auth_penjual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_penjual` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `namaRekening` varchar(255) NOT NULL,
  `nomorRekening` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `kodePos` varchar(255) NOT NULL,
  `negara` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `codeBank` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_penjual`
--

LOCK TABLES `auth_penjual` WRITE;
/*!40000 ALTER TABLE `auth_penjual` DISABLE KEYS */;
INSERT INTO `auth_penjual` VALUES ('1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e','Muhammad Daffa Raihan','8695123660','Yogyakarta Sendangadi Mlati Sleman','55285','Indonesia','2024-10-30 01:39:28','2024-10-30 01:39:28','ID_BCA');
/*!40000 ALTER TABLE `auth_penjual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
INSERT INTO `category_product` VALUES ('2d6feb73-8b05-49cb-a489-651a1866242f','Mainan dan Permainan Papan','2024-10-30 01:30:21','2024-10-30 01:30:21'),('991c711a-d63a-4e9c-b7be-0ea784e8d27f','Fashion','2024-10-30 01:30:09','2024-10-30 01:30:09');
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `chatText` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roomId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `senderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  KEY `senderId` (`senderId`),
  CONSTRAINT `chat_ibfk_91` FOREIGN KEY (`roomId`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_92` FOREIGN KEY (`senderId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES ('0ceb067f-5108-4811-855b-ea31c2945bc0','mantap','2024-10-30 14:32:10','2024-10-30 14:32:10','cb078f00-20c3-4670-89b3-ee9969161506','d897aed7-6931-420b-b569-b4d1fddaed2a'),('6e168ae1-4a77-44c7-8afe-850fb64daa67','Ya ga siuh','2024-10-30 14:32:06','2024-10-30 14:32:06','cb078f00-20c3-4670-89b3-ee9969161506','4eeb95e6-0614-42d9-8453-7e22f16a7b8a'),('6f0b3082-1df5-41a7-9fd4-cd84dbb7f7ed','csacsa','2024-10-30 14:30:22','2024-10-30 14:30:22','cb078f00-20c3-4670-89b3-ee9969161506','4eeb95e6-0614-42d9-8453-7e22f16a7b8a'),('84f2099a-66e9-41b0-840d-5c39e718c305','csacsacsa','2024-10-30 14:43:07','2024-10-30 14:43:07','cb078f00-20c3-4670-89b3-ee9969161506','d897aed7-6931-420b-b569-b4d1fddaed2a'),('92ac7bd7-d517-4043-8495-659ed1e7b55b','iya ada apa ya?','2024-10-30 15:28:31','2024-10-30 15:28:31','cb078f00-20c3-4670-89b3-ee9969161506','4eeb95e6-0614-42d9-8453-7e22f16a7b8a'),('b32b5a33-5300-4a4d-a6a9-a6534469796c','halo admin saya butuh tau branag ini','2024-10-30 15:28:22','2024-10-30 15:28:22','cb078f00-20c3-4670-89b3-ee9969161506','d897aed7-6931-420b-b569-b4d1fddaed2a'),('ec7a06f1-934b-4a7b-b56a-ec3ca857ef2d','cascsacsa','2024-10-30 14:30:34','2024-10-30 14:30:34','cb078f00-20c3-4670-89b3-ee9969161506','d897aed7-6931-420b-b569-b4d1fddaed2a'),('f21f77cb-2b0a-4dd6-a1f3-14c6f56dcf32','csacsa','2024-10-30 14:30:30','2024-10-30 14:30:30','cb078f00-20c3-4670-89b3-ee9969161506','d897aed7-6931-420b-b569-b4d1fddaed2a'),('ff8fb051-94bf-4ad7-aa7d-c01a7487b5fb','cascsacsa','2024-10-30 14:30:32','2024-10-30 14:30:32','cb078f00-20c3-4670-89b3-ee9969161506','4eeb95e6-0614-42d9-8453-7e22f16a7b8a');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sellerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `buyerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sellerId` (`sellerId`),
  KEY `buyerId` (`buyerId`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`buyerId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES ('cb078f00-20c3-4670-89b3-ee9969161506','2024-10-30 14:03:25','2024-10-30 14:03:25','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','d897aed7-6931-420b-b569-b4d1fddaed2a');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jenis_product`
--

DROP TABLE IF EXISTS `jenis_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jenis_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jenis_product`
--

LOCK TABLES `jenis_product` WRITE;
/*!40000 ALTER TABLE `jenis_product` DISABLE KEYS */;
INSERT INTO `jenis_product` VALUES ('3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','Jual Beli','2024-10-30 01:29:54','2024-10-30 01:29:54'),('9153c3c9-958b-408e-a236-b93e354f01ce','Donasi','2024-10-30 01:30:01','2024-10-30 01:30:01');
/*!40000 ALTER TABLE `jenis_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keranjang_product`
--

DROP TABLE IF EXISTS `keranjang_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keranjang_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  KEY `productId` (`productId`),
  CONSTRAINT `keranjang_product_ibfk_95` FOREIGN KEY (`customerId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keranjang_product_ibfk_96` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keranjang_product`
--

LOCK TABLES `keranjang_product` WRITE;
/*!40000 ALTER TABLE `keranjang_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `keranjang_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kurir_penjual`
--

DROP TABLE IF EXISTS `kurir_penjual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kurir_penjual` (
  `id` varchar(100) NOT NULL,
  `layananKurirId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `KurirPenjualId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `layananKurirServiceId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KurirPenjualId` (`KurirPenjualId`),
  CONSTRAINT `kurir_penjual_ibfk_1` FOREIGN KEY (`KurirPenjualId`) REFERENCES `auth_penjual` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kurir_penjual`
--

LOCK TABLES `kurir_penjual` WRITE;
/*!40000 ALTER TABLE `kurir_penjual` DISABLE KEYS */;
INSERT INTO `kurir_penjual` VALUES ('7f9bc06a-7ac5-4ab6-9177-e76dc0a3f939','jne','2024-11-03 13:28:10','2024-11-03 13:28:10','1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e','reg'),('849766cd-a235-40ff-8280-900dea46386f','gojek','2024-11-01 03:18:19','2024-11-01 03:18:19','1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e','instant'),('c366c749-37b2-4547-b35f-f59d8618f9e1','grab','2024-11-01 03:18:19','2024-11-01 03:18:19','1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e','same_day');
/*!40000 ALTER TABLE `kurir_penjual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offered_product`
--

DROP TABLE IF EXISTS `offered_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offered_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `priceOffer` bigint NOT NULL,
  `isAgree` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `buyerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyerId` (`buyerId`),
  KEY `productId` (`productId`),
  CONSTRAINT `offered_product_ibfk_91` FOREIGN KEY (`buyerId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offered_product_ibfk_92` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offered_product`
--

LOCK TABLES `offered_product` WRITE;
/*!40000 ALTER TABLE `offered_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `offered_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordered_product`
--

DROP TABLE IF EXISTS `ordered_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordered_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` bigint NOT NULL,
  `address` text NOT NULL,
  `notes` text,
  `receivedName` varchar(255) DEFAULT NULL,
  `receivednoHandphone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `buyerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('Pending','Pengiriman','Berhasil','Pengembalian','Pembatalan') NOT NULL DEFAULT 'Pending',
  `id_shipment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buyerId` (`buyerId`),
  KEY `productId` (`productId`),
  CONSTRAINT `ordered_product_ibfk_93` FOREIGN KEY (`buyerId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ordered_product_ibfk_94` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordered_product`
--

LOCK TABLES `ordered_product` WRITE;
/*!40000 ALTER TABLE `ordered_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordered_product` ENABLE KEYS */;
UNLOCK TABLES;


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

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('0bfe15f3-6031-48c2-8a1b-c08cd61de150','Customer','2024-10-30 01:31:26','2024-10-30 01:31:26'),('3a7b6030-2bfa-4fdc-83df-c1fba7256e0c','Admin','2024-10-30 01:31:21','2024-10-30 01:31:21'),('83da0762-a57a-4125-8ebb-25386cdd0226','Toko','2024-10-30 01:31:13','2024-10-30 01:31:13');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category_product`
--

DROP TABLE IF EXISTS `sub_category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `sub_category_product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category_product`
--

LOCK TABLES `sub_category_product` WRITE;
/*!40000 ALTER TABLE `sub_category_product` DISABLE KEYS */;
INSERT INTO `sub_category_product` VALUES ('5df1a752-70bc-4dee-9cfd-788ca941db15','Celana','2024-10-30 01:30:54','2024-10-30 01:30:54','991c711a-d63a-4e9c-b7be-0ea784e8d27f'),('ec780443-b92b-4b37-b29a-f3373387c4b2','Baju','2024-10-30 01:30:47','2024-10-30 01:30:47','991c711a-d63a-4e9c-b7be-0ea784e8d27f');
/*!40000 ALTER TABLE `sub_category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ulasan_product`
--

DROP TABLE IF EXISTS `ulasan_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ulasan_product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ulasan` text,
  `rating` enum('1','2','3','4','5') NOT NULL,
  `pictures` json DEFAULT NULL,
  `ulasan_owner` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reviewer` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `reviewer` (`reviewer`),
  CONSTRAINT `ulasan_product_ibfk_97` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ulasan_product_ibfk_98` FOREIGN KEY (`reviewer`) REFERENCES `user_bekasku` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ulasan_product`
--

LOCK TABLES `ulasan_product` WRITE;
/*!40000 ALTER TABLE `ulasan_product` DISABLE KEYS */;
INSERT INTO `ulasan_product` VALUES ('24500fae-f5d4-4550-b537-7e636a42b973','bagus njir','4','[{\"alt\": \"Image description kopicup.webp\", \"key\": \"ulasan/1730803684651_kopicup.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/ulasan/1730803684651_kopicup.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=E3gDuOiY37UfR0UBjBj2sWCWfbhw9g1DNxdzJCyen5eEgL0jCzdq2qXIT0Tixd5999STFjkWmmsE59ftgboCsUDYWdxM3GVvkpX%2B2Pm57lScdQDsIVC1HBlHP60IGuZ%2B%2FN2NlOJar17Km0FWom8KnH1QXqr%2BUi%2Bqy4Q9iwZDKDiXd6KVLAh3lR9MST9SzCKQS3zAWuLOITzerTVTCNWVpzs%2BsQj8pkLMRmVhOz4KnyHG10kr6f%2FwbtuAxkmg48KS78eWtklnE0BIO8Wikx68n5nOs%2Fik1mvzjE6Zo%2Fnv0EaLcIZdFOGLm%2FMhszdwJTfw9iRhjxCN%2Bp%2FWY%2Febo5%2FiDQ%3D%3D\"}]','mantap gasih','2024-11-05 10:48:05','2024-11-05 10:57:37','3c4728d9-318d-4751-b325-56f8e75df79f','4eeb95e6-0614-42d9-8453-7e22f16a7b8a');
/*!40000 ALTER TABLE `ulasan_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_bekasku`
--

DROP TABLE IF EXISTS `user_bekasku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_bekasku` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `noHandphone` varchar(255) DEFAULT NULL,
  `tanggalLahir` datetime DEFAULT NULL,
  `jenisKelamin` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '82d9fe96-c96a-411d-b151-8c6dca7b3541',
  `AuthPenjualId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `banner_profile_picture` json DEFAULT NULL,
  `profile_picture` json DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  KEY `roleId` (`roleId`),
  KEY `AuthPenjualId` (`AuthPenjualId`),
  CONSTRAINT `user_bekasku_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_108` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_110` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_112` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_114` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_116` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_118` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_120` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_122` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_bekasku_ibfk_123` FOREIGN KEY (`AuthPenjualId`) REFERENCES `auth_penjual` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_bekasku`
--

LOCK TABLES `user_bekasku` WRITE;
/*!40000 ALTER TABLE `user_bekasku` DISABLE KEYS */;
INSERT INTO `user_bekasku` VALUES ('4eeb95e6-0614-42d9-8453-7e22f16a7b8a','raihan client','daffaraihan2004.work@gmail.com','$2b$10$/t.LFoq7QMdU3qEOSoMt0uObjyb5cSI7VnXz1sYA8RTvrVgnFlNza',NULL,NULL,NULL,NULL,1,'2024-10-30 07:36:24','2024-11-05 02:09:17','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"alt\": \"Image description yumyum.jpg\", \"key\": \"uploads/1730772556161_yumyum.jpg\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730772556161_yumyum.jpg?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=dGt3z91DhsOUaMQGmU7%2BgWr70mSV%2FxdivpXBSWVYY75tchHclDbAkYabuPvgT6mjbBMedBMprBvgyZOcBtbuN7cqLuxR1YSLYCxKwm9IFrss%2FntCw0%2BQeUOAfVZwz4Kzp41mlvGn7Q5%2BZ0wjmUtrP1x3Wa2qTOVsAhv1BNy1L8u19KVoxacCiu1Il%2BpCgm750fxgSfzzUuZ4c1r6%2BSJdx4ikeLC45vtUhrFPrsN257P8HmMSV%2BcG13pt2mCwKoK6uFw3X0tYcgEk2ZYbGQtlOfe3csWuEIVrk2P2a7PloR5c8pXzG0phF4B6NdfaMqyq%2B91dkJhYkhzcDesv5gPoKw%3D%3D\"}',NULL),('53cf15f7-0937-44a1-b563-708df59a4f9f','Zaky Irsyad','zaky.irsyad@gmail.com',NULL,'103154318798336939380',NULL,NULL,NULL,1,'2024-11-04 13:10:10','2024-11-04 13:10:10','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocIkSqzI-Gi_OYrSQkCud72Ftiw0521IR5I63QeSo1KK2xEdL__s=s96-c\"}',NULL),('66db486c-8ac0-40a4-ad6c-6445382a5e84','Zaky Irsyad','zkyxentertain@gmail.com',NULL,'115421417630289739605',NULL,NULL,NULL,1,'2024-11-04 11:51:14','2024-11-04 11:51:14','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocIg7-47T5TaLpxGvsoRjvCB6v1isPfolkXG0fVsTL2gMLqOBIO1=s96-c\"}',NULL),('70e42a11-d7b9-4870-89af-6ae19a8e50a5','Daffa Raihan','22523184@students.uii.ac.id','$2b$10$BHGxsXP.z9kL1ltL92v0d.vfg66uymBuE3mwEj5pKUsOLvZa14/uy',NULL,'+6282253503356',NULL,NULL,0,'2024-11-04 05:57:55','2024-11-04 05:58:12','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,NULL,NULL),('d897aed7-6931-420b-b569-b4d1fddaed2a','daffa client','d.raihan2004@gmail.com','$2b$10$Hohf2qosXhDaIJ3/jyRszuL.FaynRgd9uMoKN6E/niH2Y7M/aRelC',NULL,'082253503356',NULL,NULL,1,'2024-10-30 01:38:08','2024-11-05 09:36:35','83da0762-a57a-4125-8ebb-25386cdd0226','1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e',NULL,'{\"alt\": \"Image description mwehehe.png\", \"key\": \"userProfile/1730799388203_mwehehe.png\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/userProfile/1730799388203_mwehehe.png?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=LshXt6Qao0c1t0pzTaul0M8lIs7cUmgSSP1MMoEGOHZXg47p2RZpRg6yHxF66iXLsbE%2B33iDUUt9w8Ir2k3qD83vzY0pU6S9zA59pNsiNuCJGuSwGlvgebJHZAYeHtst6ZcEuRZYoYtMefWlRy16o6n2FLTzjjrs1JUUQrj4bOha2RB7hKQkRzcOkZz0%2BhZ2lWQsfgxabt7HDrBM1UI5D0wt02NqE49w%2BEOxjPibFctF%2FpeieRS8GBTR73EZn292GNmlCkJFB5NQyJH2GG7VMHNBcZgEQpZ3j%2FIfgBW4jUqZ96AWCkHDuncfqBh%2BWd9Ir%2F9G0vZna0HqxQeZ6eEa7w%3D%3D\"}','dapaaa');
/*!40000 ALTER TABLE `user_bekasku` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-05 18:25:23
