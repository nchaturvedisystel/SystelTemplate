SELECT * FROM dbo.DBConnectionMaster;

UPDATE dbo.DBConnectionMaster 
SET ServerName = 'KDSRV001\SAPSERVER',
	UserName = 'sa',
	Passwrd = 'ddb727bdde6c77c323ba032390f6ba46',
	DBName = 'KDPL'
WHERE DBConnId = 1;

SELECT * FROM [dbo].[AlertsServiceMaster]

UPDATE [dbo].[AlertsServiceMaster]
SET AttachmentPath = 'D:\Setup\OtherSetupsDoNotDelete\Notifications\EmailNotification\eInvoice-Triplicate-View.rpt',
	EmailTo = '<Email>,noreply@khemanigroup.com',
	CCTo = '',
	BccTo = '',
	ABody = 'This email is not monitered. Please contact on santosh@khemanigroup.com or sandip@khemanigroup.com in case of query.',
	DataSourceDef = 'SELECT TOP 1    (T0.DocEntry), T0.DocNum, T0.CardCode,    ISNULL(T1.E_Mail,''noreply@khemanigroup.com'') AS ''Email''    FROM OINV T0 LEFT JOIN OCRD T1     ON T0.CardCode = T1.CardCode    WHERE T0.U_EmailSent = ''N'' AND T0.DocType = ''I''    AND T0.DocCur = ''INR'' AND T0.CardCode NOT IN (''C0000276'',''C0000212'')',
	PostSendDataSourceDef = 'UPDATE OINV SET U_EmailSent = ''Y'' WHERE DocEntry=''[%0]'' '
WHERE ServiceId = 1;

SELECT * FROM [dbo].[AlertsSchedular]

UPDATE [dbo].[AlertsSchedular]
SET IName = 'Every 1 Minutes',
	ICode = 'E1M',
	IDesc = 'This will run the services as interval of every 1 minutes',
	FrequencyInMinutes = 1
WHERE SchedularId = 1

SELECT * FROM [dbo].[EmailConfig]

UPDATE [dbo].[EmailConfig]
SET IName = 'InvoiceEmail',
	IDesc = 'Send Invoice Email Setup',
	IHost = 'smtp.rediffmailpro.com',
	IPort = 587,
	IFrom = 'noreply@khemanigroup.com',
	IPassword = 'f6fd816c95cbbc23cac26b76ad6a0182'
WHERE EmailConfigId = 1;



INSERT INTO AlertsSchedular 
(IName, ICode, IDesc, FrequencyInMinutes, SchedularType,
IsActive, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
VALUES 
('Every 15 Minutes', 'E15M', 'This will run the services as interval of every 15 minutes',15, 'Recurring',
1, 0, 'SYSTEM', '2023-10-02 12:07:18.693', '1', '2023-10-06 10:27:56.470');



INSERT INTO AlertsServiceMaster
(Title, SDesc, AlertType, HasAttachment, AttachmentType, AttachmentPath, 
AttachmentFileType, OutputFileName, DataSourceType, 
DataSourceDef, 
PostSendDataSourceType, 
PostSendDataSourceDef, 
EmailTo, CCTo, BccTo, ASubject, 
ABody, DBConnid, AlertConfigId, SchedularId, LastExecutedOn, NextExecutionTime,
IsActive, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
VALUES 
('KDPL-Invoices','','Email',1, 'CrystalReport', 'D:\Setup\OtherSetupsDoNotDelete\Notifications\EmailNotification\eInvoice-Triplicate-View.rpt',
'PDF', 'KDPLSalesInvoice_[%1].pdf', 'Query', 

'SELECT TOP 1    (T0.DocEntry), T0.DocNum, T0.CardCode,    
ISNULL(T1.E_Mail,''noreply@khemanigroup.com'') AS ''Email''    
FROM OINV T0 LEFT JOIN OCRD T1     
ON T0.CardCode = T1.CardCode    
WHERE T0.U_EmailSent = ''N'' AND T0.DocType = ''I''    
AND T0.DocCur = ''INR'' AND T0.CardCode NOT IN (''C0000276'',''C0000212'')',

'Query', 

'UPDATE OINV SET U_EmailSent = ''Y'' WHERE DocEntry=''[%0]''',

'<Email>,noreply@khemanigroup.com','','','KDPL Sales Invoice-[%1]',
'This email is not monitered. Please contact on santosh@khemanigroup.com or sandip@khemanigroup.com in case of query.',
1, 1, 1, '2023-09-27 11:58:35.083',	NULL, 1, 0, 'SYSTEM','2023-09-27 11:58:35.083',NULL, '2023-09-27 11:58:35.083');



DECLARE @ServiceId INT  = 1;

INSERT INTO AlertsServiceVariables
(ServiceId, VarInstance, VarValue, VarType, IsActive, IsDeleted)
VALUES 
(@ServiceId, '[%1]', '1', 'INT',	1, 0),
(@ServiceId, '<Email>', 'Email', 'STRING',	1, 0),
(@ServiceId, '[%0]', '0', 'INT',	1, 0);


INSERT INTO AlertsServiceSchedular
(ServiceId, SchedularId, LastExecutionTime, NextExecutionTime, 
StartsFrom, EndsOn, DailyStartOn, DailyEndsOn, IsActive, IsDeleted)
VALUES
(1, 1, '2023-10-18 12:38:57.123',' 2023-10-18 12:38:57.100',
'2023-10-02 12:00:00.003', '2023-10-25 13:55:20.793', '00:00:00.003', '23:59:59.997',1,0)





/*
('KDPL-Outgoing Payment','','Email',1, 'CrystalReport', 'D:\Setup\OtherSetupsDoNotDelete\Notifications\EmailNotification\eInvoice-Triplicate-View.rpt',
'PDF', 'KDPL-Outgoing PaymentInvoice_[%1].pdf', 'Query', 

'SELECT Top 1(T0.DocEntry),T0.DocNum,T0.CardCode, isnull(T1."E_Mail",''noreply@khemanigroup.com'') AS ''Email'' FROM OVPM T0 
LEFT JOIN OCRD T1 ON T0."CardCode"=T1."CardCode"
LEFT JOIN JDT1 T2 ON T0."TransId"=T2."TransId"
WHERE T2."U_BankDate" IS NOT NULL AND T0.DocType IN (''C'',''S'')
AND T0."U_EmailSent"=''N''',

'Query', 

'UPDATE OINV SET U_EmailSent = ''Y'' WHERE DocEntry=''[%0]''',

'<Email>,noreply@khemanigroup.com','','','KDPL Sales Invoice-[%1]',
'This email is not monitered. Please contact on santosh@khemanigroup.com or sandip@khemanigroup.com in case of query.',
1, 1, 1, '2023-09-27 11:58:35.083',	NULL, 1, 0, 'SYSTEM','2023-09-27 11:58:35.083',NULL, '2023-09-27 11:58:35.083')
*/

/*
('KDPL-AR Credit-Item','','Email',1, 'CrystalReport', 'D:\Setup\OtherSetupsDoNotDelete\Notifications\EmailNotification\AR Credit-GST-Service-KDPL.rpt',
'PDF', 'KDPL-AR Credit-Item_[%1].pdf', 'Query', 

'SELECT Top 1(T0.DocEntry),T0.DocNum,T0.CardCode,T0.CardName,ISNULL(T1."E_Mail",''noreply@khemanigroup.com'') AS ''Email'' FROM ORIN T0 LEFT JOIN OCRD T1 ON T0."CardCode"=T1."CardCode"
WHERE T0."U_EmailSent"=''N'' AND T0."DocType"=''I'' AND T0.DocCur=''INR''',


'Query', 

'UPDATE OINV SET U_EmailSent = ''Y'' WHERE DocEntry=''[%0]''',

'<Email>,noreply@khemanigroup.com','','','KDPL-AR Credit-Item-[%1]',
'This email is not monitered. Please contact on santosh@khemanigroup.com or sandip@khemanigroup.com in case of query.',
1, 1, 1, '2023-09-27 11:58:35.083',	NULL, 1, 0, 'SYSTEM','2023-09-27 11:58:35.083',NULL, '2023-09-27 11:58:35.083')
*/