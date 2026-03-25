# Sistema de Análisis de Mercados Financieros

Aplicación web orientada al análisis de mercados financieros, que integra datos en tiempo real, históricos e indicadores técnicos para asistir en la toma de decisiones de inversión.

## 📌 Descripción

El sistema permite visualizar y analizar distintos tipos de activos financieros mediante una interfaz web interactiva. Integra múltiples fuentes de datos, procesa información mediante ETL y genera indicadores y pronósticos para facilitar el análisis financiero.

Está orientado tanto a inversores principiantes como experimentados.

---

## 🚀 Funcionalidades

- Visualización de cotizaciones en tiempo real
- Consulta de datos históricos de activos financieros
- Cálculo de indicadores técnicos:
  - Media Móvil
  - MACD
  - RSI
  - Estocástico
  - CCI
  - ADX
  - ROC
- Generación de pronósticos por panel de activos
- Visualización de datos mediante gráficos interactivos
- Tablas dinámicas con filtros, ordenamiento y paginación

---

## 📊 Activos soportados

- Acciones (Merval, Merval25, Panel General, Burcap)
- Bonos
- CEDEARs
- Dólar (Oficial, MEP, CCL, Blue)
- Criptomonedas

---

## 🔗 Integración de datos

El sistema obtiene información desde APIs externas:

- Invertir Online → acciones y bonos
- DólarApi → cotizaciones del dólar
- CryptoCompare → criptomonedas

La extracción de datos se realiza mediante scripts en Python que consumen estas APIs y procesan la información en formato JSON.

---

## ⚙️ Procesamiento de datos (ETL)

- Implementado con Pentaho Data Integration
- Transformaciones (`.ktr`) para cada indicador técnico
- Jobs (`.kjb`) para integración de procesos
- Generación de pronósticos por panel de activos
- Manejo de errores y control de ejecución

---

## 🛠️ Tecnologías utilizadas

### Backend
- Java (Servlets, JSP)
- Arquitectura MVC
- DAO (Data Access Object)

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap
- AJAX
- DataTables

### Visualización
- Chart.js
- Chart.js Financial
- Luxon
- JustGage.js

### Base de datos
- MySQL / MariaDB
- Stored Procedures

### ETL y datos
- Pentaho Data Integration
- Python (extracción de datos desde APIs)

### Infraestructura
- Apache Tomcat
- XAMPP
- Cloudflare Tunnel

## 📁 Estructura del proyecto
src/ # Código Java (backend)
web/ # Vistas y recursos web
scripts/ # Scripts Python (extracción de datos)
etl/ # Transformaciones y jobs de Pentaho
database/ # Scripts SQL (estructura y procedimientos)
docs/images/ # Imágenes del sistema

## 🌐 Despliegue
El sistema fue desplegado inicialmente en un entorno local con XAMPP y Apache Tomcat.

Posteriormente se implementó **Cloudflare Tunnel**, permitiendo exponer la aplicación a Internet sin abrir puertos, mejorando la seguridad y accesibilidad mediante conexión cifrada (TLS).

---

## ⚠️ Notas

Para su ejecución completa se requiere:
- Configuración de base de datos
- Procesos ETL con Pentaho
- Configuración de scripts Python
- Acceso a APIs externas

Por este motivo, el proyecto no se encuentra listo para ejecución directa sin configuración previa.

---

## 👨‍💻 Autor

Nicolás Bailone  
Ingeniero en Sistemas de Información

