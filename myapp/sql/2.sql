BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.tabla1
	(
	id_proyecto int NOT NULL,
    entorno_empresarial text NULL,
	situacion_actual text NULL,
	identificacion_mercado text NULL,
	competidores text NULL,
	modelo_negocio text NULL,
	capacidad_financiera text NULL,
	rentabilidad_econimica text NULL,
	problemas_identificados text NULL,
	consecuencias_efectos text NULL,
	causas text NULL,
	tipo_innovacion int NULL,
	funcion_innovacion text NULL,
	tecnologia text NULL,
	forma_resultado text NULL,
	antecedentes text NULL,
	tipo_conocimiento text NULL,
	c41og_1 text NULL,
	c41og_2 text NULL,
	c41og_3 text NULL,
	c41oe_1_1 text NULL,
	c41oe_2_1 text NULL,
	c41oe_3_1 text NULL,
	c41oe_1_2 text NULL,
	c41oe_2_2 text NULL,
	c41oe_3_2 text NULL,
	c41oe_1_3 text NULL,
	c41oe_2_3 text NULL,
	c41oe_3_3 text NULL,
	c41oe_1_4 text NULL,
	c41oe_2_4 text NULL,
	c41oe_3_4 text NULL,
	c41oe_1_5 text NULL,
	c41oe_2_5 text NULL,
	c41oe_3_5 text NULL,
	plan_metodologico text NULL,
	propiedad_intelectual text NULL,
	impactos_economicos text NULL,
	impactos_sociales text NULL,
	impactos_formacion text NULL,
	potencialidad text NULL,
	impactos_tecnologico text NULL,
	impactos_ambientales text NULL,
	medidas_mitigacion text NULL,
	impactos_empresa text NULL,
	c8_1_1 text NULL,
	c8_2_1 text NULL,
	c8_3_1 text NULL,
	c8_4_1 text NULL,
	c8_5_1 text NULL,
	c8_6_1 text NULL,
	c8_7_1 text NULL,
	c8_8_1 text NULL,
	c8_9_1 text NULL,
	c8_10_1 text NULL,
	c8_11_1 text NULL,
	c8_1_2 text NULL,
	c8_2_2 text NULL,
	c8_3_2 text NULL,
	c8_4_2 text NULL,
	c8_5_2 text NULL,
	c8_6_2 text NULL,
	c8_7_2 text NULL,
	c8_8_2 text NULL,
	c8_9_2 text NULL,
	c8_10_2 text NULL,
	c8_11_2 text NULL,
	c8_1_3 text NULL,
	c8_2_3 text NULL,
	c8_3_3 text NULL,
	c8_4_3 text NULL,
	c8_5_3 text NULL,
	c8_6_3 text NULL,
	c8_7_3 text NULL,
	c8_8_3 text NULL,
	c8_9_3 text NULL,
	c8_10_3 text NULL,
	c8_11_3 text NULL,
	c8_1_4 text NULL,
	c8_2_4 text NULL,
	c8_3_4 text NULL,
	c8_4_4 text NULL,
	c8_5_4 text NULL,
	c8_6_4 text NULL,
	c8_7_4 text NULL,
	c8_8_4 text NULL,
	c8_9_4 text NULL,
	c8_10_4 text NULL,
	c8_11_4 text NULL,
	c8_1_5 text NULL,
	c8_2_5 text NULL,
	c8_3_5 text NULL,
	c8_4_5 text NULL,
	c8_5_5 text NULL,
	c8_6_5 text NULL,
	c8_7_5 text NULL,
	c8_8_5 text NULL,
	c8_9_5 text NULL,
	c8_10_5 text NULL,
	c8_11_5 text NULL,
	tipo_moneda int NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
COMMIT