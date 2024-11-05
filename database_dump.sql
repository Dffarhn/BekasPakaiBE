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
INSERT INTO `keranjang_product` VALUES ('22a10e35-08a1-4920-a3da-24b2593edc91','2024-11-04 07:54:42','2024-11-04 07:54:42','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2');
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
INSERT INTO `ordered_product` VALUES ('11582e5e-6051-4b46-a4bc-ae650a2386e7',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 15:01:31','2024-11-03 15:01:31','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pembatalan','160bc53a-56c0-4a2c-8585-3175c9711d52'),('a628aff9-f3f1-4705-a328-75c8134b2597',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 14:13:12','2024-11-03 14:13:12','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pending','b5a2c666-4cf2-45bf-b968-253c27edbbc5'),('b1fa15cc-0f7e-4771-8f3e-e0ac0af2537e',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 14:11:32','2024-11-03 14:11:32','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pending','52a02782-a2ae-43bf-a9a7-dbc4fb48ace7'),('c90874b4-0259-4688-a405-f54fcc7dcbc2',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 14:09:57','2024-11-03 14:09:57','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pending','2176c540-2105-4edf-a575-9ad22fc7fda3'),('cb0c4860-963a-4021-ad2f-60b9803e8b2b',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 14:04:39','2024-11-03 14:04:39','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pending','5a88676d-01c6-42d3-b658-38df536def38'),('f7a0708c-61c2-4e6e-bd6f-7266c8c7e732',385000,'Lebak Bulus MRT...','Near the gas station','John Doe','088888888888','2024-11-03 13:35:28','2024-11-03 13:35:28','4eeb95e6-0614-42d9-8453-7e22f16a7b8a','08541f50-75b2-400f-b315-a35a63eb57a2','Pending','');
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
  `condition` enum('Baru','Bekas') NOT NULL,
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
  PRIMARY KEY (`id`),
  KEY `jenisId` (`jenisId`),
  KEY `categoryProductId` (`categoryProductId`),
  KEY `penjualId` (`penjualId`),
  CONSTRAINT `product_ibfk_159` FOREIGN KEY (`jenisId`) REFERENCES `jenis_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_160` FOREIGN KEY (`categoryProductId`) REFERENCES `sub_category_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_161` FOREIGN KEY (`penjualId`) REFERENCES `user_bekasku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('08541f50-75b2-400f-b315-a35a63eb57a2','Hoodie GAP','[{\"alt\": \"Image description tesbaju2.webp\", \"key\": \"4903b7ee-77aa-4419-b23a-9b3c873c2b64-j8fk1m.webp\", \"url\": \"https://utfs.io/f/4903b7ee-77aa-4419-b23a-9b3c873c2b64-j8fk1m.webp\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-10-30 01:48:27','2024-10-30 08:00:01','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a'),('30e46571-bc77-487e-9a8d-52ca9cb1ff2d','Hoodie GAP 2 lewat firebase','[{\"alt\": \"Image description tesbaju2.webp\", \"key\": \"uploads/1730277848222_tesbaju2.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730277848222_tesbaju2.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=Fat2JwVwaI8fV4t4ym29wHDso7QwT1LtmhW%2BNXcZoQch43UzTu6aWCbUWVHj6%2BoejzzshnoByE0dcKePXJBPKHSw%2Fob6%2BKe0qOnnwSa4tB2LI4hK5Y4sWX1nyjmpPDGrLtwEb8HMg06VOhQjvcck5wx1UnLF07%2B68c2bgl63axI3qhSZ5TWJ6mFV8oE1in8w7xSOF3uKfFm6G50pOoodgatUQiN8kH%2BH7W%2BaJMNmxm%2FK%2BOQbt4qN3Dk7gOs9H82n16xrBZPlPQ0Jtj68ngkG%2B10Bj6g7F7ThCFH5er%2B%2Bh4Zkik9v5JPpjnTaXMlE1o2iQP7fjvD4oV27EykvMKqyjA%3D%3D\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-10-30 08:44:10','2024-10-30 08:44:10','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a'),('54faf789-d748-4d68-857f-5a6f206da77d','Hoodie GAP 3 lewat firebase','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"uploads/1730277954216_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730277954216_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=Pi5tQGLIT2QnqTHsck3eqsFzyRy3a4dwPh8IHDebHI%2FulRYZRKh61bYGPWIQZ%2Fxby3G%2B%2FTIszQ6v6Zdh4YVftRde9J0r55d8VBGLFGK6EKTyAiHgmiRyYNcQtvHdIPGLnTDV9O%2Bvl6Fl4h%2B0n%2F3spcSXo3th70Pkva844ymXBMo%2B7Iyb1B6ro6QXL5u1KLpjzkD8RpNvsSLfY6aiRtBY4GcgY1TiXTRL4ZtsahGpufBpBlreQ%2BECaVzSyzNKQEAYX9lfrB8ap0tyCli1DdioJUduTHQSKNz0xGSwPtPbLm9orKgtMR5M33V7AOLU%2BRw02G6qNpzjqFTZisZcGvfW%2Fg%3D%3D\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-10-30 08:45:55','2024-10-30 08:45:55','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a'),('6057cffb-6067-49d9-afc0-0dbed2dedf07','Hoodie GAP 3 lewat firebase','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"uploads/1730533836336_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730533836336_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=TQoocSPW41vnBo0UzCymz2WVgr7l3Y0h8u9NQ3AmCjigDtd0YRaUHoVz2XoD%2FPwmoq85cd3j5UmCht%2FcuEdMwN3TzoM0kLAGO6N55AqHX9WzuBZ%2BBnTer3pxXHQCVNJcr5kS3jvgva9zituPsPdc3GWzJrcSbI2RFw6FyXJwDmKr%2FVGegqfg3Ilft9q3vRw%2BhbGsbSvtN26Cgufn8q1mWtn%2FyNlGdUD%2FD5JZuNTZwoUPAeFmOA7BFY0EYd9wbjNRS2bktuKi8R9mbHCGDvTT855Ms3uLLDTnPufxb2CpdjZYMhfXNzBCW6XIGwoXp7U9Iw58mSthJZ4Nhvi9xGmGDw%3D%3D\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-11-02 07:50:37','2024-11-02 07:50:37','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a'),('641f920c-a1a6-4f65-bc09-52ebac0515da','Hoodie GAP 3 lewat firebase','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"uploads/1730533833177_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730533833177_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=V6l0wL5NH87stfxL5fW%2FQb6%2FNfeqtkwlQFw6QD%2F3rGY%2Bi8etvLe%2BtdDPNToWA0reRUAhFnifjsoRP%2FebFPnf%2FfNHuHkfy4dd1eMnMe%2FbqtmdcjVAsvJifwcdRMXcyfia0Twl6ff0PL8GrCZ92Est9NLdLb9N4EmeGigpx1leD78y9yY3Uv80Qsvz6rw%2BiY4RwppIpvg3L1WNLNeVShuSJvzB%2BGEUsL6hAiC7%2FDSAPTHSnLn1by37r6w%2Bcsz7ckaNbDlKax8IXDcUwsOenz4RRKcOYIWrCFj0Q6dfJWAd%2FwbssfBTsswHi2SzLQiKmpLNFl624ho44GwIwtCwuND55A%3D%3D\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-11-02 07:50:34','2024-11-02 07:50:34','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a'),('de5148ef-286e-45da-ab94-ae5344bdb9fb','Hoodie GAP 3 lewat firebase','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"uploads/1730533838779_tesbaju.webp\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730533838779_tesbaju.webp?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=pa0Z1%2FvrPXG%2BklxaINvxPjhiy%2FmJx6R0BW5jsql%2F4YIqIKc3P5HSDbHUpurHgcmaxJ4HZ9xU0RIfzUPgj1qcgLLFwBgPTNwO%2F2IdEJhxnzfRThvwUNabk%2B3gNKHl4mXhyLvS6PJiD7u6MJa5HC27uzN87ESysJ47THvx2MmJbx9G8ZDI2sI9kLSD9YbRVaxwfjdUmq3CNhZb4oAiA0k4803faHpZ1HD1ifT6hyz63tSBllUzJscz%2F3r7LvvsyuLWyHnUNSq3cSnKskOKMwsPxcF6cdc0lwf%2Fx3APDCqNefSJAyzvbpt1NNn0wAHze6ViYOYClcdYw5b3tmVJxw1jJQ%3D%3D\"}]','Baru',1,'This is the product description.',300000,NULL,1,5000,30,20,15,'2024-11-02 07:50:39','2024-11-02 07:50:39','3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f','5df1a752-70bc-4dee-9cfd-788ca941db15','d897aed7-6931-420b-b569-b4d1fddaed2a');
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
INSERT INTO `ulasan_product` VALUES ('07d59055-15c8-4841-acde-21b040a8b33d','bagus njir','4','[{\"alt\": \"Image description tesbaju.webp\", \"key\": \"a4a87a32-9eb3-4fe4-b05d-8c07ddf171a3-nj7m6s.webp\", \"url\": \"https://utfs.io/f/a4a87a32-9eb3-4fe4-b05d-8c07ddf171a3-nj7m6s.webp\"}]',NULL,'2024-10-30 01:55:36','2024-10-30 01:55:36','08541f50-75b2-400f-b315-a35a63eb57a2','d897aed7-6931-420b-b569-b4d1fddaed2a');
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
INSERT INTO `user_bekasku` VALUES ('4eeb95e6-0614-42d9-8453-7e22f16a7b8a','raihan client','daffaraihan2004.work@gmail.com','$2b$10$/t.LFoq7QMdU3qEOSoMt0uObjyb5cSI7VnXz1sYA8RTvrVgnFlNza',NULL,NULL,NULL,NULL,1,'2024-10-30 07:36:24','2024-11-05 02:09:17','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"alt\": \"Image description yumyum.jpg\", \"key\": \"uploads/1730772556161_yumyum.jpg\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730772556161_yumyum.jpg?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=dGt3z91DhsOUaMQGmU7%2BgWr70mSV%2FxdivpXBSWVYY75tchHclDbAkYabuPvgT6mjbBMedBMprBvgyZOcBtbuN7cqLuxR1YSLYCxKwm9IFrss%2FntCw0%2BQeUOAfVZwz4Kzp41mlvGn7Q5%2BZ0wjmUtrP1x3Wa2qTOVsAhv1BNy1L8u19KVoxacCiu1Il%2BpCgm750fxgSfzzUuZ4c1r6%2BSJdx4ikeLC45vtUhrFPrsN257P8HmMSV%2BcG13pt2mCwKoK6uFw3X0tYcgEk2ZYbGQtlOfe3csWuEIVrk2P2a7PloR5c8pXzG0phF4B6NdfaMqyq%2B91dkJhYkhzcDesv5gPoKw%3D%3D\"}',NULL),('53cf15f7-0937-44a1-b563-708df59a4f9f','Zaky Irsyad','zaky.irsyad@gmail.com',NULL,'103154318798336939380',NULL,NULL,NULL,1,'2024-11-04 13:10:10','2024-11-04 13:10:10','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocIkSqzI-Gi_OYrSQkCud72Ftiw0521IR5I63QeSo1KK2xEdL__s=s96-c\"}',NULL),('66db486c-8ac0-40a4-ad6c-6445382a5e84','Zaky Irsyad','zkyxentertain@gmail.com',NULL,'115421417630289739605',NULL,NULL,NULL,1,'2024-11-04 11:51:14','2024-11-04 11:51:14','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,'{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocIg7-47T5TaLpxGvsoRjvCB6v1isPfolkXG0fVsTL2gMLqOBIO1=s96-c\"}',NULL),('70e42a11-d7b9-4870-89af-6ae19a8e50a5','Daffa Raihan','22523184@students.uii.ac.id','$2b$10$BHGxsXP.z9kL1ltL92v0d.vfg66uymBuE3mwEj5pKUsOLvZa14/uy',NULL,'+6282253503356',NULL,NULL,0,'2024-11-04 05:57:55','2024-11-04 05:58:12','0bfe15f3-6031-48c2-8a1b-c08cd61de150',NULL,NULL,NULL,NULL),('d897aed7-6931-420b-b569-b4d1fddaed2a','daffa client','d.raihan2004@gmail.com','$2b$10$Hohf2qosXhDaIJ3/jyRszuL.FaynRgd9uMoKN6E/niH2Y7M/aRelC',NULL,'082253503356',NULL,NULL,1,'2024-10-30 01:38:08','2024-11-04 10:00:34','83da0762-a57a-4125-8ebb-25386cdd0226','1c8b5a5e-6903-4af0-80cc-f8fc77beeb3e',NULL,'{\"alt\": \"Image description yumyum.jpg\", \"key\": \"uploads/1730714433952_yumyum.jpg\", \"url\": \"https://storage.googleapis.com/bekaspakaistorage.appspot.com/uploads/1730714433952_yumyum.jpg?GoogleAccessId=firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com&Expires=1893430800&Signature=eovDgtkN2lkZa44vrHcaTflGIkaiVJzuz5aosKJdlSfAd2yBVxl2ARwsD6NkgyqdPSPyg2XaDhjwav2U7%2F2X939XeSXZwvMzY1C%2Fwgml00yH5h9vcQFW%2BkK7%2FKSXn1u9S3NLrsWtXmGsIwq6yVxV1xottEpFIV%2B9ep4VQ5nZrqBOz3bDxlZsb1g5gHTEALl89xvPXYIf2NnuhsMuSN6hCAiFvE5%2FcuaUeaYtn6T%2Fcd8ukFbEQNhY%2BEFgt9a5z6uXMkW87TRHDJjq5cFhqtXCRrdUiup1ett3086jkWdwm%2F6asOtPjL3n7sD4tYZQCPpxV0G%2FHnTGAyvfsvpmj4UFZA%3D%3D\"}','dapaaa');
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

-- Dump completed on 2024-11-05  9:16:00
