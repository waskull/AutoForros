-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-02-2020 a las 15:30:33
-- Versión del servidor: 10.4.12-MariaDB-1:10.4.12+maria~bionic
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `AutoFDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Automoviles`
--

CREATE TABLE `Automoviles` (
  `idAutomovil` int(255) UNSIGNED NOT NULL,
  `idCliente` int(255) UNSIGNED NOT NULL,
  `placa` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `year` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Automoviles`
--

INSERT INTO `Automoviles` (`idAutomovil`, `idCliente`, `placa`, `marca`, `modelo`, `year`, `fecha`) VALUES
(3, 34, 'ASD-QWE-123', 'NISSAN', 'SPORT GT', '2011', '2019-12-12 18:13:41'),
(5, 34, 'GG-325-ASDG', 'TOYOTA', 'MITSUBISHI', '1999', '2019-12-09 18:13:41'),
(6, 34, 'XXCCVASCD', 'RENAULT', 'PEUGEUT', '2001', '2019-11-12 18:13:41'),
(7, 33, 'CCC-XX_VOEE', 'Ferrari', 'FUT', '1999', '2019-12-04 18:13:41'),
(9, 35, '434234-FGE', 'FERRARI', 'ENZO', '2018', '2019-12-13 03:08:42'),
(10, 36, 'PPPP_AAAA-VE', 'BMW', 'i3', '2019', '2019-12-20 23:44:56'),
(11, 35, 'RM434-GE-XXM', 'Audi', 'R8', '2018', '2019-12-20 23:47:08'),
(15, 40, 'TTT-01', 'TESLA', '12345', '2020', '2020-01-24 19:42:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Bancos`
--

CREATE TABLE `Bancos` (
  `codbanco` int(255) UNSIGNED NOT NULL,
  `_nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Bancos`
--

INSERT INTO `Bancos` (`codbanco`, `_nombre`) VALUES
(175, 'BANCO BICENTENARIO'),
(102, 'BANCO DE VENEZUELA'),
(105, 'BANCO MERCANTIL C.A'),
(116, 'BANCO OCCIDENTAL DE DESCUENTO'),
(108, 'BANCO PROVINCIAL BBVA'),
(134, 'BANESCO BANCO UNIVERSAL'),
(1, 'N/A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Bordados`
--

CREATE TABLE `Bordados` (
  `idBordado` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `img_url` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Bordados`
--

INSERT INTO `Bordados` (`idBordado`, `descripcion`, `img_url`) VALUES
(1, 'Bordado por defecto de la Marca', 'bordado.png'),
(2, 'Bordado H', 'bordadoh.jpg'),
(3, 'Ferrari', 'ferrari.jpg'),
(4, 'Hello Kitty', 'kitty.jpg'),
(5, 'Lobo', 'lobo.jpg'),
(6, 'Mariposa', 'mariposa.jpg'),
(7, 'Pantera', 'pantera.jpg'),
(8, 'Spiderman', 'spiderman.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Colores`
--

CREATE TABLE `Colores` (
  `idColor` int(255) UNSIGNED NOT NULL,
  `descripcion` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Colores`
--

INSERT INTO `Colores` (`idColor`, `descripcion`) VALUES
(13, 'Amarillo'),
(12, 'Aquamarina'),
(5, 'Azul'),
(6, 'Gris'),
(2, 'Marron'),
(8, 'Naranja'),
(1, 'Negro'),
(11, 'Purpura'),
(9, 'Rojo'),
(10, 'Vinotinto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Costura`
--

CREATE TABLE `Costura` (
  `idc` int(255) UNSIGNED NOT NULL,
  `texto` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Costura`
--

INSERT INTO `Costura` (`idc`, `texto`) VALUES
(2, 'Negro en lo Negro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Inventario`
--

CREATE TABLE `Inventario` (
  `cod` int(255) UNSIGNED NOT NULL,
  `id_material` int(255) UNSIGNED NOT NULL,
  `cantidadStock` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Inventario`
--

INSERT INTO `Inventario` (`cod`, `id_material`, `cantidadStock`) VALUES
(5, 9, 8),
(6, 10, 99),
(8, 11, 98),
(9, 17, 10),
(11, 26, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Materiales`
--

CREATE TABLE `Materiales` (
  `idMaterial` int(255) UNSIGNED NOT NULL,
  `idTipo` int(255) UNSIGNED NOT NULL,
  `color` int(255) UNSIGNED NOT NULL,
  `url_img` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Materiales`
--

INSERT INTO `Materiales` (`idMaterial`, `idTipo`, `color`, `url_img`) VALUES
(9, 1, 1, 'cuero_negro.png'),
(10, 2, 6, 'semi_cuero_gris.png'),
(11, 2, 2, 'semi_cuero_marron.png'),
(12, 1, 2, 'cuero_marron.png'),
(17, 2, 5, 'semi_cuero_azul.png'),
(19, 2, 8, 'semi_cuero_naranja.png'),
(21, 1, 13, 'cuero_amarillo.png'),
(22, 1, 12, 'cuero_aquamarina.png'),
(24, 1, 11, 'cuero_purpura.png'),
(25, 1, 9, 'cuero_rojo.png'),
(26, 1, 10, 'cuero_vinotinto.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Metodos`
--

CREATE TABLE `Metodos` (
  `idpago` int(255) UNSIGNED NOT NULL,
  `descPago` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Metodos`
--

INSERT INTO `Metodos` (`idpago`, `descPago`) VALUES
(2, 'Deposito'),
(3, 'Pago no Registrado'),
(1, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pagos`
--

CREATE TABLE `Pagos` (
  `idPago` int(255) UNSIGNED NOT NULL,
  `idSoli` int(255) UNSIGNED NOT NULL,
  `tipo` int(255) UNSIGNED NOT NULL,
  `referencia` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco` int(255) UNSIGNED DEFAULT NULL,
  `monto` double DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Pagos`
--

INSERT INTO `Pagos` (`idPago`, `idSoli`, `tipo`, `referencia`, `banco`, `monto`, `fecha`) VALUES
(2, 4, 1, '5465465465464', 105, 100, '2019-12-14 08:40:10'),
(3, 3, 2, 'hndhjndhjj', 108, 555, '2019-12-14 09:16:33'),
(4, 5, 3, NULL, 105, 0, '2019-12-14 09:23:45'),
(5, 6, 3, NULL, 175, 0, '2019-12-14 09:41:46'),
(6, 14, 1, '054534543543', 175, 20, '2019-12-14 19:54:17'),
(7, 15, 3, '', 1, 0, '2019-12-14 17:25:51'),
(8, 16, 1, 'LKJG934543543', 175, 50, '2019-12-14 19:56:00'),
(9, 19, 3, '', 1, 0, '2019-12-14 21:03:18'),
(10, 20, 1, 'fghsdhdfsh', 105, 500, '2019-12-14 21:07:21'),
(11, 21, 2, 'hgdghdgh', 175, 55, '2019-12-15 05:19:23'),
(12, 22, 1, '50434566', 108, 20, '2019-12-15 22:53:24'),
(13, 23, 1, '56456546456', 102, 123, '2019-12-16 05:22:19'),
(14, 24, 2, 'hhsthrt', 175, 55, '2019-12-16 05:59:53'),
(15, 25, 1, '12345', 108, 30, '2019-12-20 23:46:22'),
(16, 26, 1, '654654654', 175, 55, '2020-01-06 17:05:18'),
(17, 27, 2, 'fgdsgf', 175, 25, '2020-01-06 20:12:08'),
(18, 28, 2, '65454gdfgsdfg', 175, 20, '2020-01-09 21:21:56'),
(19, 29, 2, 'dgjgdjdg', 175, 20, '2020-01-10 02:41:32'),
(20, 30, 1, 'fgds', 175, 40, '2020-01-12 08:04:54'),
(21, 31, 2, '12345', 175, 100, '2020-01-15 05:13:15'),
(22, 32, 1, '1', 175, 10, '2020-01-15 20:49:12'),
(23, 33, 2, '4534543', 134, 20, '2020-01-15 20:55:17'),
(24, 34, 1, '54543534', 116, 10, '2020-01-15 20:56:40'),
(25, 35, 2, 'gfhfdhf', 116, 40, '2020-01-18 14:15:31'),
(26, 36, 1, 'gfdghsdfhfshsdfh', 102, 20, '2020-01-18 14:26:45'),
(27, 37, 1, 'fjd35435345', 105, 20, '2020-01-20 20:49:13'),
(28, 38, 1, '123', 116, 20, '2020-01-24 16:44:44'),
(29, 39, 3, '', 1, 0, '2020-01-24 17:00:46'),
(30, 40, 2, '434234', 175, 20, '2020-01-24 19:12:29'),
(31, 41, 2, '2312324434', 134, 20, '2020-01-24 19:43:08'),
(32, 42, 1, '54534543', 108, 20, '2020-01-29 16:59:50'),
(33, 43, 1, 'fghfghhfd343434', 116, 20, '2020-02-01 18:21:07'),
(34, 44, 2, 'hghgfhfg', 102, 20, '2020-02-04 00:39:33'),
(35, 45, 3, '', 1, 0, '2020-02-04 20:13:01'),
(36, 46, 1, '10000gfdgsfdg34', 116, 100, '2020-02-07 21:00:44'),
(37, 47, 1, '043403434343', 105, 40, '2020-02-07 22:06:53'),
(38, 48, 3, '', 1, 0, '2020-02-07 22:20:53'),
(39, 49, 1, '12345', 102, 20, '2020-02-08 19:03:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos`
--

CREATE TABLE `Pedidos` (
  `idPedido` int(255) UNSIGNED NOT NULL,
  `id_empleado` int(255) UNSIGNED NOT NULL,
  `id_proveedor` int(255) UNSIGNED NOT NULL,
  `idproducto` int(255) UNSIGNED NOT NULL,
  `cantidad` int(255) UNSIGNED NOT NULL,
  `costo` double UNSIGNED NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Pedidos`
--

INSERT INTO `Pedidos` (`idPedido`, `id_empleado`, `id_proveedor`, `idproducto`, `cantidad`, `costo`, `fecha`) VALUES
(1, 33, 2, 9, 51, 100, '2019-12-10 20:50:11'),
(2, 33, 2, 10, 20, 50, '2019-12-11 07:01:22'),
(3, 33, 2, 9, 5, 10, '2019-12-11 07:02:22'),
(4, 33, 2, 10, 1, 5, '2019-12-11 07:06:08'),
(5, 33, 2, 10, 1, 5, '2019-12-11 07:19:11'),
(6, 33, 2, 10, 50, 100, '2019-12-12 22:46:24'),
(7, 33, 2, 9, 1, 5, '2019-12-12 22:57:39'),
(8, 33, 2, 9, 10, 50, '2019-12-12 22:59:11'),
(9, 33, 2, 10, 100, 500, '2019-12-12 22:59:34'),
(10, 33, 2, 11, 100, 100, '2020-01-14 16:35:42'),
(11, 33, 3, 11, 10, 10, '2020-01-14 16:37:00'),
(12, 33, 3, 11, 100, 100, '2020-01-15 07:41:51'),
(13, 33, 3, 11, 1, 10, '2020-01-15 07:42:19'),
(14, 33, 3, 17, 10, 100, '2020-02-07 20:10:13'),
(15, 33, 2, 26, 1, 10, '2020-02-07 20:10:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Procesos`
--

CREATE TABLE `Procesos` (
  `idProceso` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Procesos`
--

INSERT INTO `Procesos` (`idProceso`, `descripcion`) VALUES
(8, 'Bordado'),
(1, 'Cancelado'),
(2, 'Cancelado por la Gerencia'),
(10, 'Completado'),
(6, 'Corte'),
(7, 'Costura'),
(4, 'Desemsamblaje'),
(5, 'Diseño'),
(9, 'Ensamblado'),
(3, 'Esperando confirmacion de Pago');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Produccion`
--

CREATE TABLE `Produccion` (
  `idReg` int(255) UNSIGNED NOT NULL,
  `solicitud` int(255) UNSIGNED NOT NULL,
  `vendedor` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `emsamblador` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `bordador` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `designer` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `costurero` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cortador` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Produccion`
--

INSERT INTO `Produccion` (`idReg`, `solicitud`, `vendedor`, `emsamblador`, `bordador`, `designer`, `costurero`, `cortador`, `fecha`) VALUES
(7, 23, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2019-12-16 05:48:15'),
(8, 24, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2019-12-16 06:02:56'),
(9, 25, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2019-12-20 23:49:45'),
(10, 26, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-12 16:52:06'),
(11, 27, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-07 17:33:34'),
(12, 28, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-12 08:04:12'),
(13, 29, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-13 16:52:09'),
(14, 30, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-24 19:21:42'),
(15, 31, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', NULL),
(16, 32, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-15 20:55:57'),
(17, 33, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', NULL),
(18, 34, 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', 'Martin Castillo', '2020-01-24 19:17:23'),
(26, 35, 'Martin Castillo', 'Martin Castillo', NULL, 'Cesar Estaba', NULL, NULL, NULL),
(27, 36, 'Martin Castillo', 'Frank Diaz', NULL, 'Martin Castillo', NULL, NULL, NULL),
(28, 37, 'Martin Castillo', 'Martin Castillo', NULL, 'Martin Castillo', NULL, NULL, NULL),
(29, 38, 'Martin Castillo', 'Martin Castillo', NULL, NULL, NULL, NULL, NULL),
(30, 40, 'Martin Castillo', 'Martin Castillo', NULL, 'Martin Castillo', NULL, 'Martin Castillo', NULL),
(31, 41, 'Martin Castillo', 'Martin Castillo', NULL, NULL, NULL, NULL, NULL),
(32, 42, 'Martin Castillo', 'Martin Castillo', NULL, 'Martin Castillo', NULL, NULL, NULL),
(33, 43, 'Yeisland Rodriguez', 'Martin Castillo', NULL, NULL, NULL, NULL, NULL),
(34, 46, 'Martin Castillo', NULL, NULL, NULL, NULL, NULL, NULL),
(35, 47, 'Martin Castillo', 'Martin Castillo', NULL, NULL, NULL, NULL, NULL),
(36, 49, 'Martin Castillo', 'Martin Castillo', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proveedores`
--

CREATE TABLE `Proveedores` (
  `idProveedor` int(255) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `sector` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Proveedores`
--

INSERT INTO `Proveedores` (`idProveedor`, `nombre`, `direccion`, `telefono`, `ciudad`, `sector`) VALUES
(2, 'POLAR S.A', 'fdhdfghdfsgh', '3432423432', 'sfgsdfg', 'sdfgsdfx'),
(3, 'CUEROSLOCOS C.A', 'asd', '434245', 'Stormwind', 'Casco Antiguo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `idTipo` int(10) UNSIGNED NOT NULL,
  `Descripcion` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`idTipo`, `Descripcion`) VALUES
(1, 'Administrador'),
(6, 'Bordador'),
(9, 'Cortador'),
(8, 'Costurero'),
(7, 'Diseñador'),
(5, 'Emsamblador'),
(2, 'Gerente'),
(3, 'Usuario'),
(4, 'Vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Solicitudes`
--

CREATE TABLE `Solicitudes` (
  `idSolicitud` int(255) UNSIGNED NOT NULL,
  `idUsuario` int(255) UNSIGNED NOT NULL,
  `idVehiculo` int(255) UNSIGNED NOT NULL,
  `id_material` int(255) UNSIGNED NOT NULL,
  `id_color` int(10) UNSIGNED NOT NULL,
  `id_bordado` int(10) UNSIGNED NOT NULL,
  `cantidad` int(100) UNSIGNED NOT NULL,
  `costura` int(255) UNSIGNED DEFAULT NULL,
  `fechaSolicitud` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaTentativa` timestamp NULL DEFAULT NULL,
  `fase` int(10) UNSIGNED DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Solicitudes`
--

INSERT INTO `Solicitudes` (`idSolicitud`, `idUsuario`, `idVehiculo`, `id_material`, `id_color`, `id_bordado`, `cantidad`, `costura`, `fechaSolicitud`, `fechaTentativa`, `fase`) VALUES
(2, 35, 9, 2, 1, 1, 2, 2, '2019-12-13 20:41:54', '2019-12-15 20:41:54', 2),
(3, 34, 3, 1, 2, 1, 5, 2, '2019-12-13 21:44:03', '2019-12-15 20:41:54', 10),
(4, 34, 5, 2, 1, 1, 3, 2, '2019-12-14 02:00:34', '2019-12-15 20:41:54', 10),
(5, 34, 5, 2, 1, 1, 55, 2, '2019-12-14 09:21:53', '2019-12-16 20:41:54', 2),
(6, 35, 9, 1, 2, 1, 5, 2, '2019-12-14 09:39:23', '2019-12-16 20:41:54', 2),
(9, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:05:01', '2019-12-16 20:41:54', 3),
(10, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:05:40', '2019-12-16 20:41:54', 3),
(11, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:06:00', '2019-12-16 20:41:54', 3),
(12, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:07:59', '2019-12-16 10:06:00', 3),
(13, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:09:52', '2019-12-16 10:06:00', 3),
(14, 35, 9, 1, 1, 1, 5, 2, '2019-12-14 10:10:08', '2019-12-16 10:06:00', 2),
(15, 34, 3, 1, 2, 1, 1, 2, '2019-12-14 17:25:51', '2019-12-16 10:06:00', 2),
(16, 34, 5, 2, 1, 1, 3, 2, '2019-12-14 17:27:55', '2019-12-16 10:06:00', 10),
(17, 35, 9, 1, 2, 1, 3, 2, '2019-12-14 20:40:23', '2019-12-16 10:06:00', 3),
(18, 35, 9, 1, 2, 1, 1, 2, '2019-12-14 20:53:55', '2019-12-16 20:53:55', 3),
(19, 35, 9, 1, 1, 1, 1, 2, '2019-12-14 21:03:18', '2019-12-16 21:53:55', 2),
(20, 35, 9, 1, 2, 1, 5, 2, '2019-12-14 21:07:03', '2019-12-14 22:54:55', 2),
(21, 35, 9, 2, 2, 1, 22, 2, '2019-12-14 23:20:29', '2019-12-14 23:53:55', 10),
(22, 35, 9, 1, 1, 1, 4, 2, '2019-12-15 22:53:08', '2019-12-16 20:53:55', 10),
(23, 35, 9, 2, 1, 5, 1, 2, '2019-12-16 05:22:02', '2019-12-18 20:53:55', 10),
(24, 34, 5, 1, 1, 3, 1, 2, '2019-12-16 05:59:45', '2019-12-18 21:53:55', 10),
(25, 36, 10, 2, 1, 5, 5, 2, '2019-12-20 23:45:31', '2019-12-21 21:53:55', 10),
(26, 35, 11, 1, 1, 1, 1, 2, '2019-12-20 23:47:39', '2019-12-22 21:53:55', 10),
(27, 34, 3, 1, 2, 1, 5, 2, '2020-01-06 20:11:52', '2020-01-08 20:11:52', 10),
(28, 34, 6, 2, 1, 5, 1, 2, '2020-01-09 21:21:36', '2020-01-10 20:11:52', 10),
(29, 34, 3, 1, 2, 1, 1, 2, '2020-01-10 02:41:19', '2020-01-11 20:11:52', 10),
(30, 36, 10, 2, 1, 8, 2, 2, '2020-01-12 08:04:44', '2020-01-13 20:11:52', 10),
(31, 36, 10, 1, 1, 7, 3, 2, '2020-01-17 06:12:52', '2020-01-17 06:13:52', 9),
(32, 34, 5, 1, 1, 1, 1, 2, '2020-01-15 20:48:58', '2020-01-16 22:11:52', 10),
(33, 34, 5, 2, 6, 1, 1, 2, '2020-01-15 20:55:04', '2020-01-16 23:11:52', 9),
(34, 34, 6, 1, 2, 1, 1, 2, '2020-01-15 20:56:28', '2020-01-19 00:11:52', 10),
(35, 36, 10, 1, 2, 1, 2, 2, '2020-01-18 14:12:52', '2020-01-28 14:26:03', 6),
(36, 36, 10, 1, 1, 7, 1, 2, '2020-01-18 14:26:31', '2020-01-31 14:26:53', 5),
(37, 34, 3, 2, 2, 1, 1, 2, '2020-01-20 20:48:53', '2020-02-09 16:03:13', 6),
(38, 35, 11, 2, 2, 1, 1, 2, '2020-01-24 16:44:31', '2020-02-11 16:44:59', 5),
(39, 34, 5, 2, 2, 1, 1, 2, '2020-01-24 17:00:46', NULL, 2),
(40, 34, 3, 2, 6, 7, 1, 2, '2020-01-24 19:12:01', '2020-02-12 23:14:13', 7),
(41, 40, 15, 2, 6, 5, 1, 2, '2020-01-24 19:42:56', '2020-02-12 03:43:20', 5),
(42, 40, 15, 2, 2, 1, 1, 2, '2020-01-29 16:59:33', '2020-02-19 01:00:00', 6),
(43, 36, 10, 1, 2, 1, 1, 2, '2020-02-01 18:17:07', '2020-02-23 06:21:12', 5),
(44, 40, 15, 2, 6, 7, 1, 2, '2020-02-04 00:39:07', NULL, 2),
(45, 40, 15, 1, 1, 1, 1, 2, '2020-02-04 20:13:01', NULL, 2),
(46, 34, 6, 1, 1, 1, 1, 2, '2020-02-04 20:16:16', '2020-03-01 13:00:52', 4),
(47, 40, 15, 2, 5, 8, 2, 2, '2020-02-07 22:06:38', '2020-03-03 14:09:19', 5),
(48, 34, 5, 2, 2, 6, 1, 2, '2020-02-07 22:20:53', NULL, 2),
(49, 40, 15, 2, 8, 2, 1, 2, '2020-02-08 19:03:03', '2020-03-04 07:03:38', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipos`
--

CREATE TABLE `Tipos` (
  `idTipo` int(255) UNSIGNED NOT NULL,
  `descrip` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Tipos`
--

INSERT INTO `Tipos` (`idTipo`, `descrip`) VALUES
(1, 'Cuero'),
(2, 'SemiCuero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `idUsuario` int(255) UNSIGNED NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `sexo` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `nivelAcceso` int(10) UNSIGNED NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `fechaInscripcion` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`idUsuario`, `nombre`, `apellido`, `correo`, `sexo`, `clave`, `nivelAcceso`, `direccion`, `telefono`, `fechaInscripcion`) VALUES
(33, 'Martin', 'Castillo', 'cbmj@gmail.com', 'Hombre', '$2a$10$yixpKD6j2sTuSThpAUwdAO.nzyeRitpU7cxneQQSuaPD3z3UXsApG', 1, 'bf', 'qwe', '2019-12-07 23:41:14'),
(34, 'Waskll', 'Qwerty', 'cbmj92@gmail.com', 'Hombre', '$2a$10$segKeHw3YXmi/Hws4HYZOe.YRxQv6vVAmo10wGZgq6feN.XiydcHi', 3, 'qwe', '123456789', '2019-11-07 23:56:13'),
(35, 'Rommel', 'Guevara', 'rommel@gmail.com', 'Hombre', '$2a$10$iMAUVL3ZIHgHRMq0qJ/3eOHHQTMeRE.HFLh2o4wYQ/U4OkRUooz7m', 3, '12345', '12345', '2019-12-13 03:07:27'),
(36, 'Pepe', 'Aguilar', 'pepe@gmail.com', 'Hombre', '$2a$10$UKp8tMOBPR9lViQO99OvvuIvM.4Ag8CH13Um1sXnltCVNK12pLfzu', 3, 'asd', '545345', '2019-12-20 07:29:00'),
(40, 'Elon', 'Musk', 'cbmj00@gmail.com', 'Hombre', '$2a$10$PIcKJVqmKJl.uXBTEIvP0uD.9mnSrMGXCG86Posc5TyP5chhS9DI2', 3, 'USA', '000000', '2020-01-24 18:50:43'),
(41, 'Frank', 'Diaz', 'frank@gmail.com', 'Hombre', '$2a$10$ElTI89l/Wox.Cie.Voki3eonSBAMYa0MSGK00cg.xDPBmsGhYT/Zq', 5, '123', '123', '2020-02-01 17:55:10'),
(42, 'Yeisland', 'Rodriguez', 'yeisland@gmail.com', 'Mujer', '$2a$10$ynRNnhmAZ4rd9wD7Re3AYuVi6BhxpZgVanMPSTwxPUmR9jHDS0RSW', 4, 'asd', 'qwe', '2020-02-01 18:08:24'),
(43, 'Cesar', 'Estaba', 'cesar@gmail.com', 'Hombre', '$2a$10$KdpD59NxdV.uhFD.85/AAuIS6NVRJGD1MmL7DGhIQ5vI19i3nYCq2', 9, 'ASD', 'dfg', '2020-02-01 18:33:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ventas`
--

CREATE TABLE `Ventas` (
  `idVenta` int(255) UNSIGNED NOT NULL,
  `id_solicitud` int(255) UNSIGNED NOT NULL,
  `pago` int(255) UNSIGNED NOT NULL,
  `fecha_pago` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `Ventas`
--

INSERT INTO `Ventas` (`idVenta`, `id_solicitud`, `pago`, `fecha_pago`) VALUES
(6, 4, 2, '2019-12-14 08:58:45'),
(7, 3, 3, '2019-12-14 09:16:50'),
(10, 16, 8, '2019-12-14 20:28:15'),
(11, 4, 2, '2019-12-15 04:54:40'),
(12, 21, 11, '2019-12-15 05:19:47'),
(13, 22, 12, '2019-12-15 22:53:29'),
(14, 23, 13, '2019-12-16 05:22:38'),
(15, 24, 14, '2019-12-16 06:00:02'),
(16, 25, 15, '2019-12-20 23:48:43'),
(17, 26, 16, '2020-01-06 20:12:33'),
(18, 27, 17, '2020-01-07 04:05:41'),
(19, 28, 18, '2020-01-09 21:51:08'),
(20, 29, 19, '2020-01-10 02:41:39'),
(21, 30, 20, '2020-01-12 08:05:02'),
(22, 31, 21, '2020-01-15 05:13:27'),
(23, 32, 22, '2020-01-15 20:55:36'),
(24, 33, 23, '2020-01-15 20:55:38'),
(25, 34, 24, '2020-01-15 20:56:44'),
(33, 35, 25, '2020-01-18 14:26:03'),
(34, 36, 26, '2020-01-18 14:26:53'),
(35, 37, 27, '2020-01-24 16:03:13'),
(36, 38, 28, '2020-01-24 16:44:59'),
(37, 40, 30, '2020-01-24 19:14:13'),
(38, 41, 31, '2020-01-24 19:43:20'),
(39, 42, 32, '2020-01-29 17:00:00'),
(40, 43, 33, '2020-02-01 18:21:12'),
(41, 46, 36, '2020-02-07 21:00:52'),
(42, 47, 37, '2020-02-07 22:09:20'),
(43, 49, 39, '2020-02-08 19:03:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Automoviles`
--
ALTER TABLE `Automoviles`
  ADD PRIMARY KEY (`idAutomovil`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `Bancos`
--
ALTER TABLE `Bancos`
  ADD PRIMARY KEY (`codbanco`),
  ADD UNIQUE KEY `_nombre` (`_nombre`);

--
-- Indices de la tabla `Bordados`
--
ALTER TABLE `Bordados`
  ADD PRIMARY KEY (`idBordado`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Indices de la tabla `Colores`
--
ALTER TABLE `Colores`
  ADD PRIMARY KEY (`idColor`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Indices de la tabla `Costura`
--
ALTER TABLE `Costura`
  ADD PRIMARY KEY (`idc`),
  ADD UNIQUE KEY `texto` (`texto`);

--
-- Indices de la tabla `Inventario`
--
ALTER TABLE `Inventario`
  ADD PRIMARY KEY (`cod`),
  ADD UNIQUE KEY `id_material` (`id_material`);

--
-- Indices de la tabla `Materiales`
--
ALTER TABLE `Materiales`
  ADD PRIMARY KEY (`idMaterial`),
  ADD KEY `color` (`color`),
  ADD KEY `Material_ibfk_2` (`idTipo`);

--
-- Indices de la tabla `Metodos`
--
ALTER TABLE `Metodos`
  ADD PRIMARY KEY (`idpago`),
  ADD UNIQUE KEY `tipo` (`descPago`);

--
-- Indices de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `Pago_ibfk_3` (`banco`),
  ADD KEY `Pago_ibfk_1` (`idSoli`);

--
-- Indices de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `Compra_ibfk_2` (`id_empleado`),
  ADD KEY `Compra_ibfk_1` (`id_proveedor`),
  ADD KEY `Pedido_ibfk_3` (`idproducto`);

--
-- Indices de la tabla `Procesos`
--
ALTER TABLE `Procesos`
  ADD PRIMARY KEY (`idProceso`),
  ADD UNIQUE KEY `descripcion` (`descripcion`);

--
-- Indices de la tabla `Produccion`
--
ALTER TABLE `Produccion`
  ADD PRIMARY KEY (`idReg`),
  ADD KEY `vendedor` (`vendedor`),
  ADD KEY `costurero` (`costurero`),
  ADD KEY `emsamblador` (`emsamblador`),
  ADD KEY `bordador` (`bordador`),
  ADD KEY `designer` (`designer`),
  ADD KEY `cortador` (`cortador`),
  ADD KEY `solicitud` (`solicitud`);

--
-- Indices de la tabla `Proveedores`
--
ALTER TABLE `Proveedores`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`idTipo`),
  ADD UNIQUE KEY `Descripcion` (`Descripcion`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `Solicitudes`
--
ALTER TABLE `Solicitudes`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idVehiculo` (`idVehiculo`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `Solicitud_ibfk_4` (`id_material`),
  ADD KEY `fase` (`fase`),
  ADD KEY `id_bordado` (`id_bordado`),
  ADD KEY `costura` (`costura`);

--
-- Indices de la tabla `Tipos`
--
ALTER TABLE `Tipos`
  ADD PRIMARY KEY (`idTipo`),
  ADD UNIQUE KEY `descrip` (`descrip`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `nivelAcceso` (`nivelAcceso`);

--
-- Indices de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `id_solicitud` (`id_solicitud`),
  ADD KEY `pago` (`pago`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Automoviles`
--
ALTER TABLE `Automoviles`
  MODIFY `idAutomovil` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `Bordados`
--
ALTER TABLE `Bordados`
  MODIFY `idBordado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Colores`
--
ALTER TABLE `Colores`
  MODIFY `idColor` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `Costura`
--
ALTER TABLE `Costura`
  MODIFY `idc` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `Inventario`
--
ALTER TABLE `Inventario`
  MODIFY `cod` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Materiales`
--
ALTER TABLE `Materiales`
  MODIFY `idMaterial` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `Metodos`
--
ALTER TABLE `Metodos`
  MODIFY `idpago` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  MODIFY `idPago` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  MODIFY `idPedido` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `Procesos`
--
ALTER TABLE `Procesos`
  MODIFY `idProceso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `Produccion`
--
ALTER TABLE `Produccion`
  MODIFY `idReg` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `Proveedores`
--
ALTER TABLE `Proveedores`
  MODIFY `idProveedor` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `idTipo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Solicitudes`
--
ALTER TABLE `Solicitudes`
  MODIFY `idSolicitud` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `Tipos`
--
ALTER TABLE `Tipos`
  MODIFY `idTipo` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `idUsuario` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  MODIFY `idVenta` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Automoviles`
--
ALTER TABLE `Automoviles`
  ADD CONSTRAINT `Automoviles_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `Usuarios` (`idUsuario`);

--
-- Filtros para la tabla `Inventario`
--
ALTER TABLE `Inventario`
  ADD CONSTRAINT `Inventario_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `Materiales` (`idMaterial`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Materiales`
--
ALTER TABLE `Materiales`
  ADD CONSTRAINT `Materiales_ibfk_1` FOREIGN KEY (`color`) REFERENCES `Colores` (`idColor`),
  ADD CONSTRAINT `Materiales_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `Tipos` (`idTipo`);

--
-- Filtros para la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD CONSTRAINT `Pagos_ibfk_1` FOREIGN KEY (`idSoli`) REFERENCES `Solicitudes` (`idSolicitud`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pagos_ibfk_2` FOREIGN KEY (`tipo`) REFERENCES `Metodos` (`idpago`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pagos_ibfk_3` FOREIGN KEY (`banco`) REFERENCES `Bancos` (`codbanco`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD CONSTRAINT `Pedidos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `Proveedores` (`idProveedor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pedidos_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `Usuarios` (`idUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pedidos_ibfk_3` FOREIGN KEY (`idproducto`) REFERENCES `Materiales` (`idMaterial`);

--
-- Filtros para la tabla `Produccion`
--
ALTER TABLE `Produccion`
  ADD CONSTRAINT `Produccion_ibfk_1` FOREIGN KEY (`solicitud`) REFERENCES `Solicitudes` (`idSolicitud`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Solicitudes`
--
ALTER TABLE `Solicitudes`
  ADD CONSTRAINT `Solicitudes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_2` FOREIGN KEY (`idVehiculo`) REFERENCES `Automoviles` (`idAutomovil`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_4` FOREIGN KEY (`id_material`) REFERENCES `Tipos` (`idTipo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_5` FOREIGN KEY (`id_color`) REFERENCES `Colores` (`idColor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_6` FOREIGN KEY (`fase`) REFERENCES `Procesos` (`idProceso`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_7` FOREIGN KEY (`id_bordado`) REFERENCES `Bordados` (`idBordado`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Solicitudes_ibfk_8` FOREIGN KEY (`costura`) REFERENCES `Costura` (`idc`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`nivelAcceso`) REFERENCES `Roles` (`idTipo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD CONSTRAINT `Ventas_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `Solicitudes` (`idSolicitud`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Ventas_ibfk_2` FOREIGN KEY (`pago`) REFERENCES `Pagos` (`idPago`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
