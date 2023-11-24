
/****** Object:  Schema [ana]    Script Date: 10/14/2023 11:13:38 AM ******/
CREATE SCHEMA [ana]
GO
/****** Object:  Schema [ann]    Script Date: 10/14/2023 11:13:38 AM ******/
CREATE SCHEMA [ann]
GO
/****** Object:  Schema [audit]    Script Date: 10/14/2023 11:13:38 AM ******/
CREATE SCHEMA [audit]
GO
/****** Object:  UserDefinedTableType [dbo].[typNotificationMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
CREATE TYPE [dbo].[typNotificationMaster] AS TABLE(
	[NotificationId] [bigint] NULL,
	[NType] [varchar](100) NULL,
	[NSubject] [varchar](500) NULL,
	[NContent] [nvarchar](max) NULL,
	[NTo] [varchar](100) NULL,
	[NCc] [varchar](100) NULL,
	[NBcc] [varchar](100) NULL,
	[IsDeleted] [int] NULL,
	[NStatus] [varchar](50) NULL,
	[Remarks] [varchar](500) NULL,
	[ScheduledDate] [datetime] NULL,
	[AttachmentPath] [varchar](1000) NULL,
	[RetryCount] [int] NULL,
	[PostSendDataSourceType] [varchar](30) NULL,
	[PostSendDataSourceDef] [nvarchar](4000) NULL,
	[DBConnId] [int] NULL,
	[CreatedBy] [varchar](50) NULL
)
GO
/****** Object:  Table [audit].[UserMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[UserMaster](
	[UserId] [int] NOT NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[DOB] [datetime] NULL,
	[MobileNo] [varchar](50) NULL,
	[EmailId] [varchar](50) NULL,
	[Designation] [varchar](50) NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
	[ProfileImage] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlertsSchedular]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlertsSchedular](
	[SchedularId] [int] IDENTITY(1,1) NOT NULL,
	[IName] [varchar](200) NULL,
	[ICode] [varchar](10) NULL,
	[IDesc] [varchar](1000) NULL,
	[FrequencyInMinutes] [int] NULL,
	[SchedularType] [varchar](100) NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[SchedularId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlertsServiceMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlertsServiceMaster](
	[ServiceId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NULL,
	[SDesc] [varchar](1000) NULL,
	[AlertType] [varchar](20) NULL,
	[HasAttachment] [int] NULL,
	[AttachmentType] [varchar](100) NULL,
	[AttachmentPath] [varchar](500) NULL,
	[AttachmentFileType] [varchar](50) NULL,
	[OutputFileName] [varchar](100) NULL,
	[DataSourceType] [varchar](30) NULL,
	[DataSourceDef] [nvarchar](4000) NULL,
	[PostSendDataSourceType] [varchar](30) NULL,
	[PostSendDataSourceDef] [nvarchar](4000) NULL,
	[EmailTo] [varchar](200) NULL,
	[CCTo] [varchar](1000) NULL,
	[BccTo] [varchar](1000) NULL,
	[ASubject] [varchar](1000) NULL,
	[ABody] [nvarchar](max) NULL,
	[DBConnid] [int] NULL,
	[AlertConfigId] [int] NULL,
	[SchedularId] [int] NULL,
	[LastExecutedOn] [datetime] NULL,
	[NextExecutionTime] [datetime] NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK__AlertsSe__C51BB00A1387CD04] PRIMARY KEY CLUSTERED 
(
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlertsServiceSchedular]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlertsServiceSchedular](
	[MappperId] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NULL,
	[SchedularId] [int] NULL,
	[LastExecutionTime] [datetime] NULL,
	[NextExecutionTime] [datetime] NULL,
	[StartsFrom] [datetime] NULL,
	[EndsOn] [datetime] NULL,
	[DailyStartOn] [time](3) NULL,
	[DailyEndsOn] [time](3) NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatebBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK__AlertsSe__04097AC7109B07EF] PRIMARY KEY CLUSTERED 
(
	[MappperId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlertsServiceVariables]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlertsServiceVariables](
	[VariableId] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NULL,
	[VarInstance] [varchar](100) NULL,
	[VarValue] [varchar](100) NULL,
	[VarType] [varchar](50) NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[VariableId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DBConnectionMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DBConnectionMaster](
	[DBConnId] [int] IDENTITY(1,1) NOT NULL,
	[ConnName] [varchar](100) NULL,
	[ServerName] [nvarchar](200) NULL,
	[UserName] [varchar](100) NULL,
	[Passwrd] [varchar](200) NULL,
	[DBName] [varchar](100) NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[DBConnId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailConfig]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailConfig](
	[EmailConfigId] [int] IDENTITY(1,1) NOT NULL,
	[IName] [varchar](100) NULL,
	[IDesc] [varchar](1000) NULL,
	[IHost] [varchar](500) NULL,
	[IPort] [varchar](10) NULL,
	[IFrom] [varchar](100) NULL,
	[IPassword] [varchar](100) NULL,
	[IEnableSsl] [bit] NULL,
	[IsBodyHtml] [bit] NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmailConfigId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuMaster](
	[MenuId] [int] IDENTITY(1,1) NOT NULL,
	[MenuName] [varchar](50) NULL,
	[MenuCode] [varchar](10) NULL,
	[MenuDesc] [varchar](500) NULL,
	[DisplayOrder] [int] NULL,
	[ParentMenuId] [int] NULL,
	[DefaultChildMenuId] [int] NULL,
	[MenuIconUrl] [varchar](500) NULL,
	[TemplatePath] [varchar](500) NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MenuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationHistory]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationHistory](
	[NotificationId] [bigint] NOT NULL,
	[NType] [varchar](100) NULL,
	[NSubject] [varchar](500) NULL,
	[NContent] [nvarchar](max) NULL,
	[NTo] [varchar](100) NULL,
	[NCc] [varchar](100) NULL,
	[NBcc] [varchar](100) NULL,
	[IsDeleted] [int] NULL,
	[NStatus] [varchar](50) NULL,
	[Remarks] [varchar](500) NULL,
	[ScheduledDate] [datetime] NULL,
	[AttachmentPath] [varchar](1000) NULL,
	[RetryCount] [int] NULL,
	[RetryDate] [datetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationMaster](
	[NotificationId] [bigint] IDENTITY(1,1) NOT NULL,
	[NType] [varchar](100) NULL,
	[NSubject] [varchar](500) NULL,
	[NContent] [nvarchar](max) NULL,
	[NTo] [varchar](100) NULL,
	[NCc] [varchar](100) NULL,
	[NBcc] [varchar](100) NULL,
	[IsDeleted] [int] NULL,
	[NStatus] [varchar](50) NULL,
	[Remarks] [varchar](500) NULL,
	[ScheduledDate] [datetime] NULL,
	[AttachmentPath] [varchar](1000) NULL,
	[RetryCount] [int] NULL,
	[RetryDate] [datetime] NULL,
	[PostSendDataSourceType] [varchar](30) NULL,
	[PostSendDataSourceDef] [nvarchar](4000) NULL,
	[DBConnId] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK__Notifica__20CF2E12D3DC5AB9] PRIMARY KEY CLUSTERED 
(
	[NotificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](50) NULL,
	[RoleCode] [varchar](10) NULL,
	[RoleDesc] [varchar](500) NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceCommunication]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceCommunication](
	[MapperId] [int] NULL,
	[ServiceId] [int] NULL,
	[EmailConfigId] [int] NULL,
	[SMSConfigId] [int] NULL,
	[WhatsAppConfigId] [int] NULL,
	[IsActive] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubRoles]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubRoles](
	[SubRoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NULL,
	[SubRoleName] [varchar](50) NULL,
	[SubRoleCode] [varchar](10) NULL,
	[SubRoleDesc] [varchar](500) NULL,
	[MenuId] [int] NULL,
	[DisplayOrder] [int] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[SubRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroup]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroup](
	[GroupId] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [varchar](50) NULL,
	[GroupCode] [varchar](20) NULL,
	[GroupDesc] [varchar](500) NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
 CONSTRAINT [PK__UserGrou__149AF36A96041685] PRIMARY KEY CLUSTERED 
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroupMapping]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroupMapping](
	[MappingId] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NULL,
	[UserId] [int] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
 CONSTRAINT [PK_UserGroupMapping] PRIMARY KEY CLUSTERED 
(
	[MappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogin]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogin](
	[LoginId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[UserName] [varchar](50) NULL,
	[UserPassword] [varchar](500) NULL,
	[FailedLoginAttempt] [int] NULL,
	[LastLoggedDate] [datetime] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[LoginId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLoginLog]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLoginLog](
	[LogId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[UserName] [varchar](50) NULL,
	[UserPassword] [varchar](500) NULL,
	[LoggedTime] [datetime] NULL,
	[LogDescription] [varchar](500) NULL,
	[LogStatus] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserMaster](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[DOB] [datetime] NULL,
	[MobileNo] [varchar](50) NULL,
	[EmailId] [varchar](50) NULL,
	[Designation] [varchar](50) NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
	[ProfileImage] [varchar](255) NULL,
 CONSTRAINT [PK__UserMast__1788CC4C5AD04CEF] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[UserRoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NULL,
	[UserId] [int] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTimeTracking]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTimeTracking](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[PageCode] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
	[Duration] [int] NOT NULL,
	[LogTime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserWorkCenter]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserWorkCenter](
	[UserWorkCenterId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[WorkCenterId] [int] NOT NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserWorkCenterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkCenterMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkCenterMaster](
	[WorkCenterId] [bigint] IDENTITY(1,1) NOT NULL,
	[WorkCenterName] [varchar](50) NULL,
	[WorkCenterCode] [varchar](20) NULL,
	[WorkCenterDesc] [varchar](500) NULL,
	[DisplaySeq] [int] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
 CONSTRAINT [PK__Workflow__D8D1575CF3C59914] PRIMARY KEY CLUSTERED 
(
	[WorkCenterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkCenterStepsMaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkCenterStepsMaster](
	[StepId] [bigint] IDENTITY(1,1) NOT NULL,
	[WorkCenterId] [bigint] NULL,
	[StepName] [varchar](200) NULL,
	[StepCode] [varchar](20) NULL,
	[StepDesc] [varchar](1000) NULL,
	[DisplaySeq] [int] NULL,
	[IsActive] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[IsDeleted] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StepId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [audit].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (1, N'Full', N'', N'Access', CAST(N'2023-08-01T00:00:00.000' AS DateTime), N'123456', N'full@gmail.com', N'User', 1, N'98', CAST(N'2023-08-31T09:52:27.413' AS DateTime), NULL, NULL, 0, NULL)
GO
SET IDENTITY_INSERT [dbo].[AlertsSchedular] ON 
GO
INSERT [dbo].[AlertsSchedular] ([SchedularId], [IName], [ICode], [IDesc], [FrequencyInMinutes], [SchedularType], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, N'Every 5 Minutes', N'E5M', N'This will run the services as interval of every 5 minutes', 5, N'Recurring', 1, 0, N'SYSTEM', CAST(N'2023-10-02T12:07:18.693' AS DateTime), N'1', CAST(N'2023-10-06T10:27:56.470' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[AlertsSchedular] OFF
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceMaster] ON 
GO
INSERT [dbo].[AlertsServiceMaster] ([ServiceId], [Title], [SDesc], [AlertType], [HasAttachment], [AttachmentType], [AttachmentPath], [AttachmentFileType], [OutputFileName], [DataSourceType], [DataSourceDef], [PostSendDataSourceType], [PostSendDataSourceDef], [EmailTo], [CCTo], [BccTo], [ASubject], [ABody], [DBConnid], [AlertConfigId], [SchedularId], [LastExecutedOn], [NextExecutionTime], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, N'KDPL-Invoices', N'', N'Email', 1, N'CrystalReport', N'D:\ClientData\Punditz\AutoEmail\eInvoice-Triplicate-View.rpt', N'PDF', N'KDPLSalesInvoice_[%1].pdf', N'Query', N'SELECT TOP 1
		(T0.DocEntry), T0.DocNum, T0.CardCode,
		ISNULL(T1.E_Mail,''rahul@punditz.in'') AS ''Email''
		FROM OINV T0 LEFT JOIN OCRD T1 
		ON T0.CardCode = T1.CardCode
		WHERE T0.U_EmailSent = ''N'' AND T0.DocType = ''I''
		AND T0.DocCur = ''INR'' AND T0.CardCode NOT IN (''C0000276'',''C0000212'')', N'Query', N'UPDATE OINV SET U_EmailSent = ''Y'' WHERE DocEntry=''[%0]''', N'<Email>,rahul@punditz.in', N'', N'rahul@punditz.in', N'KDPL Sales Invoice-[%1]', N'This email is not monitored. Please contact on neeraj@punditz.in in case of any query', 1, 1, 1, CAST(N'2023-09-27T11:58:35.083' AS DateTime), NULL, 1, 0, N'SYSTEM', CAST(N'2023-09-27T11:58:35.083' AS DateTime), NULL, CAST(N'2023-09-27T11:58:35.083' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceSchedular] ON 
GO
INSERT [dbo].[AlertsServiceSchedular] ([MappperId], [ServiceId], [SchedularId], [LastExecutionTime], [NextExecutionTime], [StartsFrom], [EndsOn], [DailyStartOn], [DailyEndsOn], [IsActive], [IsDeleted], [CreatebBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, 1, 1, CAST(N'2023-10-14T11:06:48.833' AS DateTime), CAST(N'2023-10-14T11:11:48.833' AS DateTime), CAST(N'2023-10-02T12:00:00.003' AS DateTime), CAST(N'2023-10-25T13:55:20.793' AS DateTime), CAST(N'00:00:00.0030000' AS Time), CAST(N'23:59:59.9970000' AS Time), 1, 0, N'SYSTEM', CAST(N'2023-10-02T12:17:37.493' AS DateTime), N'SYSTEM', CAST(N'2023-10-02T12:17:37.493' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceSchedular] OFF
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceVariables] ON 
GO
INSERT [dbo].[AlertsServiceVariables] ([VariableId], [ServiceId], [VarInstance], [VarValue], [VarType], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, 1, N'[%1]', N'1', N'INT', 1, 0, NULL, NULL, N'1', CAST(N'2023-10-12T14:19:07.903' AS DateTime))
GO
INSERT [dbo].[AlertsServiceVariables] ([VariableId], [ServiceId], [VarInstance], [VarValue], [VarType], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (2, 1, N'<Email>', N'Email', N'STRING', 1, 0, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[AlertsServiceVariables] ([VariableId], [ServiceId], [VarInstance], [VarValue], [VarType], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (3, 1, N'[%0]', N'0', N'INT', 1, 0, NULL, NULL, N'1', CAST(N'2023-10-12T14:25:19.627' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[AlertsServiceVariables] OFF
GO
SET IDENTITY_INSERT [dbo].[DBConnectionMaster] ON 
GO
INSERT [dbo].[DBConnectionMaster] ([DBConnId], [ConnName], [ServerName], [UserName], [Passwrd], [DBName], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, N'INMUM-Dev', N'INMUM-DEV-01\SQLEXPRESS', N'full', N'fb2c0d2cc14b79c178e89cf7437bee73', N'Test', 1, 0, N'SYSTEM', CAST(N'2023-09-27T11:33:12.760' AS DateTime), NULL, CAST(N'2023-09-27T11:33:12.760' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[DBConnectionMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[EmailConfig] ON 
GO
INSERT [dbo].[EmailConfig] ([EmailConfigId], [IName], [IDesc], [IHost], [IPort], [IFrom], [IPassword], [IEnableSsl], [IsBodyHtml], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn]) VALUES (1, N'NeerajEmail', N'Test Setup', N'smtp.gmail.com', N'587', N'neeraj.systel@gmail.com', N'1f9e6bccbf37c925118f7eba008581841b249b8e40b0a875c4abd6804cab55ab', 0, 1, 1, 0, N'SYSTEM', CAST(N'2023-09-21T15:29:30.523' AS DateTime), N'SYSTEM', CAST(N'2023-09-21T15:29:30.523' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[EmailConfig] OFF
GO
SET IDENTITY_INSERT [dbo].[MenuMaster] ON 
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, N'Users', N'USR', N'Parent Menu for managing Users', 1, 0, 0, N'<i class="fa fa-user me-2" aria-hidden="true"></i>', N'/html/users/base.html', 1, N'system', CAST(N'2023-06-06T13:53:09.223' AS DateTime), N'6', CAST(N'2023-08-24T04:09:04.730' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (3, N'User List', N'USRL', N'List of all Users', 2, 1, 0, N'<i class="fa fa-th me-2">', N'/html/users/viewAllUsers.html', 1, N'system', CAST(N'2023-06-06T13:54:54.240' AS DateTime), NULL, CAST(N'2023-06-06T13:54:54.240' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (4, N'Dashboard', N'DB', N'Dashboard for logged in User', 2, 0, 0, N'<i class="fa fa-tachometer me-2" aria-hidden="true"></i>', N'/html/dashboard/base.html', 1, N'system', CAST(N'2023-06-06T13:58:55.737' AS DateTime), NULL, CAST(N'2023-06-06T13:58:55.737' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (5, N'Profile', N'PDB', N'Profile of Logged in User', 1, 4, 0, N'<i class="fa fa-th me-2">', N'', 1, N'system', CAST(N'2023-06-06T13:58:55.737' AS DateTime), NULL, CAST(N'2023-06-06T13:58:55.737' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (6, N'WorkList', N'WDB', N'Worklist or Daybook of logged in User', 6, 4, 0, N'<i class="fa fa-th me-2">', N'/html/dashboard/dashboardWorkList.html', 1, N'system', CAST(N'2023-06-06T13:58:55.737' AS DateTime), NULL, CAST(N'2023-06-06T13:58:55.737' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (7, N'Admin', N'ADM', N'Admin section for company level settings', 3, 0, 0, N'<i class="fa fa-id-card me-2" aria-hidden="true"></i>', N'/html/admin/base.html', 1, N'system', CAST(N'2023-06-06T14:03:10.563' AS DateTime), NULL, CAST(N'2023-06-06T14:03:10.563' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (8, N'Manage Menus', N'MAD', N'Menu management Single Page', 5, 7, 0, NULL, N'/html/admin/manageMenu.html', 1, N'system', CAST(N'2023-06-06T14:03:10.567' AS DateTime), N'1', CAST(N'2023-09-26T08:26:30.750' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (9, N'Manage Roles', N'RAD', N'Roles Management Single Page', 2, 7, 0, N'<i class="fa fa-th me-2">', N'/html/admin/ManageRoles.html', 1, N'system', CAST(N'2023-06-06T14:03:10.567' AS DateTime), NULL, CAST(N'2023-06-06T14:03:10.567' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (10, N'Manage Subroles', N'SAD', N'SubRoles Management Single Page', 3, 7, 0, N'<i class="fa fa-th me-2">', N'/html/admin/ManageSubRoles.html', 1, N'system', CAST(N'2023-06-06T14:03:10.567' AS DateTime), N'system', CAST(N'2023-07-25T06:28:24.763' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (11, N'User Roles', N'URAD', N'User Role Mapping De Mapping', 4, 7, 0, N'<i class="fa fa-th me-2">', N'', 0, N'system', CAST(N'2023-06-06T14:03:10.567' AS DateTime), N'6', CAST(N'2023-08-02T02:56:59.920' AS DateTime), 1)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (18, N'Value List', N'VAD', N'Value List for settings and dynamic dropdowns', 5, 7, 0, N'<i class="fa fa-th me-2">', N'', 0, N'system', CAST(N'2023-06-06T14:56:55.607' AS DateTime), N'6', CAST(N'2023-08-24T03:42:05.133' AS DateTime), 1)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (20, N'Manage UserGroup', N'UGAD', N'User Group Management Single Page', 6, 7, 0, N'<i class="fa fa-th me-2">', N'/html/admin/ManageUserGroup.html', 1, N'Sumeet', CAST(N'2023-07-10T05:19:04.573' AS DateTime), NULL, CAST(N'2023-07-10T05:19:04.573' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (22, N'Alerts', N'ANN', N'This will help in setting alerts and notifications', 4, 0, 0, N'<i class="fa fa-id-card me-2" aria-hidden="true"></i>', N'/html/alerts/base.html', 1, N'1', CAST(N'2023-09-27T14:43:35.180' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (23, N'DBConfig', N'DBANN', N'This page will allow users to store their DB configurations for different setups', 1, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/dBConfig.html', 1, N'1', CAST(N'2023-09-27T14:47:52.370' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (24, N'EmailConfig', N'ECANN', N'This page will allow to create email config', 2, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/emailConfig.html', 1, N'1', CAST(N'2023-09-27T14:51:20.760' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (25, N'SMSConfig', N'SANN', N'This page will allow to create sms config', 3, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/smsConfig.html', 1, N'1', CAST(N'2023-09-27T14:51:50.287' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (26, N'WhatsAppConfig', N'WAANN', N'This page will allow to create Whatsappconfig', 4, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/WAConfig.html', 1, N'1', CAST(N'2023-09-27T14:52:17.557' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (27, N'ServiceConfig', N'SCANN', N'This page will allow to create Service config', 5, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/ServiceConfig.html', 1, N'1', CAST(N'2023-09-27T14:52:52.330' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (28, N'SchedularConfig', N'SRANN', N'This page will allow to create Schedular config', 6, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/SchedularConfig.html', 1, N'1', CAST(N'2023-09-27T14:53:20.117' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (29, N'ServiceVariables', N'SVANN', N'This page will allow to create Service Variables', 7, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/servicevariables.html', 1, N'1', CAST(N'2023-09-27T14:53:20.117' AS DateTime), NULL, CAST(N'2023-10-10T15:18:00.360' AS DateTime), 0)
GO
INSERT [dbo].[MenuMaster] ([MenuId], [MenuName], [MenuCode], [MenuDesc], [DisplayOrder], [ParentMenuId], [DefaultChildMenuId], [MenuIconUrl], [TemplatePath], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (30, N'ServiceSchedular', N'SSANN', N'This page will allow to create Service Schedular', 8, 22, 0, N'<i class="fa fa-th me-2">', N'/html/alerts/ServiceSchedular.html', 1, N'1', CAST(N'2023-09-27T14:53:20.117' AS DateTime), NULL, CAST(N'2023-10-10T15:18:00.360' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[MenuMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([RoleId], [RoleName], [RoleCode], [RoleDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, N'Administrator', N'ADMIN', N'Admin having full access to the system', 1, N'system', CAST(N'2023-06-06T13:42:43.790' AS DateTime), NULL, CAST(N'2023-06-06T13:42:43.790' AS DateTime), 0)
GO
INSERT [dbo].[Roles] ([RoleId], [RoleName], [RoleCode], [RoleDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (2, N'Supervisor', N'SPR', N'This is supervisor role', 0, N'3', CAST(N'2023-09-26T10:13:32.340' AS DateTime), N'1', CAST(N'2023-10-13T12:23:06.463' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[SubRoles] ON 
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, N'Users', N'USR', N'Parent Menu for managing Users', 1, 1, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'1', CAST(N'2023-09-26T11:13:20.150' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (2, 1, N'Create New', N'CUSR', N'Will allow to create new User', 2, 1, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'98', CAST(N'2023-09-04T04:11:53.687' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (3, 1, N'List All', N'USRL', N'List of all Users', 3, 2, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'1', CAST(N'2023-09-26T11:13:20.153' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (4, 1, N'Dashboard', N'DB', N'Dashboard for logged in User', 4, 2, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'1', CAST(N'2023-10-13T12:39:59.617' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (5, 1, N'Profile', N'PDB', N'Profile of Logged in User', 5, 1, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'1', CAST(N'2023-10-13T12:40:25.320' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (6, 1, N'WorkList', N'WDB', N'Worklist or Daybook of logged in User', 6, 2, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'1', CAST(N'2023-10-13T12:35:43.670' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (7, 1, N'Admin', N'AD', N'Admin section for company level settings', 7, 3, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), NULL, CAST(N'2023-06-06T15:19:30.323' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (8, 1, N'Manage Menus', N'MAD', N'Menu management Single Page', 8, 1, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), NULL, CAST(N'2023-06-06T15:19:30.323' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (9, 1, N'Manage Roles', N'RAD', N'Roles Management Single Page', 9, 2, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), NULL, CAST(N'2023-06-06T15:19:30.323' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (10, 1, N'Manage Subroles', N'SAD', N'SubRoles Management Single Page', 10, 3, 1, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), NULL, CAST(N'2023-06-06T15:19:30.323' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (11, 1, N'User Roles', N'URAD', N'User Role Mapping De Mapping', 11, 4, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'6', CAST(N'2023-08-24T03:42:29.000' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (18, 1, N'Value List', N'VAD', N'Value List for settings and dynamic dropdowns', 18, 5, 0, N'system', CAST(N'2023-06-06T15:19:30.323' AS DateTime), N'6', CAST(N'2023-08-24T03:42:34.093' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (37, 1, N'Manage User Group', N'UGAD', N'User Group Management Single Page', 20, 6, 0, N'Sumeet', CAST(N'2023-07-10T05:37:46.270' AS DateTime), N'1', CAST(N'2023-10-13T10:24:04.760' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (53, 1, N'ShowAll', N'SHAL', N'This is Show all page which will show  All Suggestion for the input in SearchBar ', 123, 0, 0, N'6', CAST(N'2023-08-10T06:15:56.050' AS DateTime), N'6', CAST(N'2023-08-11T07:14:01.463' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (54, 2, N'User List', N'USRL', N'List of all Users', 3, 2, 0, N'1', CAST(N'2023-09-26T10:18:57.350' AS DateTime), N'1', CAST(N'2023-09-26T10:20:24.730' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (55, 2, N'Users', N'USR', N'Parent Menu for managing Users', 1, 1, 0, N'1', CAST(N'2023-09-26T10:18:58.753' AS DateTime), N'1', CAST(N'2023-09-26T10:20:24.727' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (56, 1, N'New', N'NW', N'', 21, 3, 0, N'1', CAST(N'2023-09-26T11:14:50.930' AS DateTime), N'1', CAST(N'2023-09-26T11:17:19.613' AS DateTime), 1)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (57, 1, N'Alerts', N'ANN', N'This will help in setting alerts and notifications', 22, 4, 1, N'1', CAST(N'2023-09-27T14:44:34.203' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (58, 1, N'DBConfig', N'DBANN', N'This page will allow users to store their DB configurations for different setups', 23, 1, 1, N'1', CAST(N'2023-09-27T14:48:01.577' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (59, 1, N'EmailConfig', N'ECANN', N'This page will allow to create email config', 24, 2, 1, N'1', CAST(N'2023-09-27T14:54:01.307' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (60, 1, N'SMSConfig', N'SANN', N'This page will allow to create sms config', 25, 3, 1, N'1', CAST(N'2023-09-27T14:54:04.500' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (61, 1, N'WhatsAppConfig', N'WAANN', N'This page will allow to create Whatsappconfig', 26, 4, 1, N'1', CAST(N'2023-09-27T14:54:07.097' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (62, 1, N'ServiceConfig', N'SCANN', N'This page will allow to create Service config', 27, 5, 1, N'1', CAST(N'2023-09-27T14:54:11.663' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (63, 1, N'SchedularConfig', N'SRANN', N'This page will allow to create Schedular config', 28, 6, 1, N'1', CAST(N'2023-09-27T14:54:16.890' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (64, 1, N'Service Variables', N'SVANN', N'This page will allow to create Service Variables', 29, 7, 1, N'1', CAST(N'2023-09-27T14:54:16.890' AS DateTime), NULL, CAST(N'2023-10-10T15:21:02.380' AS DateTime), 0)
GO
INSERT [dbo].[SubRoles] ([SubRoleId], [RoleId], [SubRoleName], [SubRoleCode], [SubRoleDesc], [MenuId], [DisplayOrder], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (65, 1, N'Service Schedular', N'SSANN', N'This page will allow to create Service Schedular', 30, 8, 1, N'1', CAST(N'2023-09-27T14:54:16.890' AS DateTime), NULL, CAST(N'2023-10-10T15:21:02.380' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[SubRoles] OFF
GO
SET IDENTITY_INSERT [dbo].[UserGroup] ON 
GO
INSERT [dbo].[UserGroup] ([GroupId], [GroupName], [GroupCode], [GroupDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, N'US Employees Only', N'USE', N'Projects can be assigned to only US Employees', 1, N'system', CAST(N'2023-06-12T08:24:42.090' AS DateTime), N'1', CAST(N'2023-09-26T11:15:29.073' AS DateTime), 0)
GO
INSERT [dbo].[UserGroup] ([GroupId], [GroupName], [GroupCode], [GroupDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (2, N'Non-US Employees Only', N'NUSE', N'Projects can be assigned to only Non US Employees', 1, N'system', CAST(N'2023-06-12T08:24:42.090' AS DateTime), NULL, CAST(N'2023-06-12T08:24:42.090' AS DateTime), 0)
GO
INSERT [dbo].[UserGroup] ([GroupId], [GroupName], [GroupCode], [GroupDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (3, N'Any', N'ANY', N'Projects can be assigned to anyone', 1, N'system', CAST(N'2023-06-12T08:24:42.090' AS DateTime), NULL, CAST(N'2023-06-12T08:24:42.090' AS DateTime), 0)
GO
INSERT [dbo].[UserGroup] ([GroupId], [GroupName], [GroupCode], [GroupDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (4, N'US Employees Only', N'USE', N'Projects can be assigned to only US Employees', 0, N'1', CAST(N'2023-09-26T11:15:40.873' AS DateTime), N'1', CAST(N'2023-09-26T11:16:04.577' AS DateTime), 1)
GO
INSERT [dbo].[UserGroup] ([GroupId], [GroupName], [GroupCode], [GroupDesc], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (5, N'US Employees Only11', N'USE', N'Projects can be assigned to only US Employees', 0, N'1', CAST(N'2023-09-26T11:16:14.273' AS DateTime), N'1', CAST(N'2023-09-26T11:16:25.760' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[UserGroup] OFF
GO
SET IDENTITY_INSERT [dbo].[UserGroupMapping] ON 
GO
INSERT [dbo].[UserGroupMapping] ([MappingId], [GroupId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, 1, 1, N'system', CAST(N'2023-06-12T08:36:05.620' AS DateTime), NULL, CAST(N'2023-06-12T08:36:05.620' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[UserGroupMapping] OFF
GO
SET IDENTITY_INSERT [dbo].[UserLogin] ON 
GO
INSERT [dbo].[UserLogin] ([LoginId], [UserId], [UserName], [UserPassword], [FailedLoginAttempt], [LastLoggedDate], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, N'full', N'15b2918e12d3fdc16bf9305bfbd58a85', 0, CAST(N'2023-10-13T16:07:21.087' AS DateTime), 1, N'system', CAST(N'2023-07-11T06:58:06.903' AS DateTime), NULL, CAST(N'2023-07-11T06:58:06.903' AS DateTime), 0)
GO
INSERT [dbo].[UserLogin] ([LoginId], [UserId], [UserName], [UserPassword], [FailedLoginAttempt], [LastLoggedDate], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (2, 2, N'anu', N'15b2918e12d3fdc16bf9305bfbd58a85', NULL, CAST(N'2023-09-26T10:16:58.543' AS DateTime), 1, N'1', CAST(N'2023-09-26T09:32:32.490' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[UserLogin] ([LoginId], [UserId], [UserName], [UserPassword], [FailedLoginAttempt], [LastLoggedDate], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (3, 3, N'cdtar', N'15b2918e12d3fdc16bf9305bfbd58a85', NULL, CAST(N'2023-09-26T10:19:13.513' AS DateTime), 1, N'1', CAST(N'2023-09-26T09:47:13.687' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[UserLogin] ([LoginId], [UserId], [UserName], [UserPassword], [FailedLoginAttempt], [LastLoggedDate], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (4, 4, N'prabha', N'2ac5296d36b978eedb9bdb7900d4b2c7', NULL, NULL, 1, N'1', CAST(N'2023-09-27T13:39:21.243' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[UserLogin] ([LoginId], [UserId], [UserName], [UserPassword], [FailedLoginAttempt], [LastLoggedDate], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (5, 5, N'qwe', N'7f96ad18080bce4542e1f20d29442427', NULL, NULL, 1, N'1', CAST(N'2023-10-13T13:43:56.977' AS DateTime), NULL, NULL, 0)
GO
SET IDENTITY_INSERT [dbo].[UserLogin] OFF
GO
SET IDENTITY_INSERT [dbo].[UserMaster] ON 
GO
INSERT [dbo].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (1, N'Full', N'', N'Access', CAST(N'1990-01-01T00:00:00.397' AS DateTime), N'9821234567', N'full@gmail.com', N'Admin', 1, N'system', CAST(N'2023-06-06T14:59:00.333' AS DateTime), NULL, CAST(N'2023-06-06T14:59:00.333' AS DateTime), 0, NULL)
GO
INSERT [dbo].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (2, N'AnuPrabha', N'Shyam', N'M', CAST(N'2023-09-14T00:00:00.000' AS DateTime), N'12345678901', N'anu1@gmail.com', N'Admin', 1, N'1', CAST(N'2023-09-25T15:03:30.423' AS DateTime), N'1', CAST(N'2023-09-27T09:42:22.130' AS DateTime), 0, N'')
GO
INSERT [dbo].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (3, N'Atharva', N'', N'', CAST(N'1998-08-20T00:00:00.000' AS DateTime), N'952920589', N'ratnaparkhiatharv@gmail.com', N'Supervisor', 1, N'1', CAST(N'2023-09-26T09:47:13.670' AS DateTime), N'1', CAST(N'2023-09-26T14:55:32.643' AS DateTime), 0, N'')
GO
INSERT [dbo].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (4, N'Anu', N'Prabha', N'Muttathu', CAST(N'1983-11-08T00:00:00.000' AS DateTime), N'1234567899', N'prabha@gmail.com', N'Admin', 1, N'1', CAST(N'2023-09-27T13:39:21.213' AS DateTime), N'1', CAST(N'2023-10-06T09:11:31.500' AS DateTime), 0, N'Client\Files\Users\ProfileImages\638314187611438087.png')
GO
INSERT [dbo].[UserMaster] ([UserId], [FirstName], [MiddleName], [LastName], [DOB], [MobileNo], [EmailId], [Designation], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted], [ProfileImage]) VALUES (5, N'k', N'k', N'k', CAST(N'2000-10-04T00:00:00.000' AS DateTime), N'898989', N'iu', N'Admin', 1, N'1', CAST(N'2023-10-13T13:43:56.950' AS DateTime), N'1', CAST(N'2023-10-13T14:53:38.257' AS DateTime), 0, NULL)
GO
SET IDENTITY_INSERT [dbo].[UserMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRoles] ON 
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, 1, 1, N'system', CAST(N'2023-06-06T15:05:34.933' AS DateTime), N'6', CAST(N'2023-09-01T03:07:33.600' AS DateTime), 0)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (3, 1, 2, 1, N'1', CAST(N'2023-09-26T09:31:08.227' AS DateTime), N'1', CAST(N'2023-09-26T10:58:21.100' AS DateTime), 0)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (4, 1, 3, 1, N'1', CAST(N'2023-09-26T10:12:36.707' AS DateTime), N'1', CAST(N'2023-09-26T10:58:47.217' AS DateTime), 0)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (5, 2, 2, 1, N'3', CAST(N'2023-09-26T10:14:03.610' AS DateTime), NULL, NULL, 0)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (6, 2, 3, 0, N'2', CAST(N'2023-09-26T10:16:24.047' AS DateTime), N'1', CAST(N'2023-09-26T10:58:49.437' AS DateTime), 1)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (7, 2, 1, 0, N'1', CAST(N'2023-09-26T11:45:05.040' AS DateTime), N'1', CAST(N'2023-09-26T11:45:41.370' AS DateTime), 1)
GO
INSERT [dbo].[UserRoles] ([UserRoleId], [RoleId], [UserId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (8, 1, 5, 1, N'1', CAST(N'2023-10-13T13:44:18.157' AS DateTime), NULL, NULL, 0)
GO
SET IDENTITY_INSERT [dbo].[UserRoles] OFF
GO
SET IDENTITY_INSERT [dbo].[UserWorkCenter] ON 
GO
INSERT [dbo].[UserWorkCenter] ([UserWorkCenterId], [UserId], [WorkCenterId], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, 1, 1, N'7', CAST(N'2023-07-28T09:37:37.690' AS DateTime), N'7', CAST(N'2023-07-28T09:37:39.707' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[UserWorkCenter] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkCenterMaster] ON 
GO
INSERT [dbo].[WorkCenterMaster] ([WorkCenterId], [WorkCenterName], [WorkCenterCode], [WorkCenterDesc], [DisplaySeq], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, N'KIT', N'KIT', N'Prepare the necessary components and materials required for the production process.', 1, 1, N'system', CAST(N'2023-06-12T05:48:59.047' AS DateTime), NULL, CAST(N'2023-06-12T05:48:59.047' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[WorkCenterMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkCenterStepsMaster] ON 
GO
INSERT [dbo].[WorkCenterStepsMaster] ([StepId], [WorkCenterId], [StepName], [StepCode], [StepDesc], [DisplaySeq], [IsActive], [CreatedBy], [CreatedOn], [ModifiedBy], [ModifiedOn], [IsDeleted]) VALUES (1, 1, N'Assemble Sub-Assemblies', N'', N'', 0, 1, N'system', CAST(N'2023-07-18T06:06:51.900' AS DateTime), NULL, NULL, 0)
GO
SET IDENTITY_INSERT [dbo].[WorkCenterStepsMaster] OFF
GO
ALTER TABLE [dbo].[AlertsSchedular] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AlertsSchedular] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[AlertsSchedular] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[AlertsSchedular] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[AlertsServiceMaster] ADD  CONSTRAINT [DF__AlertsSer__HasAt__1CBC4616]  DEFAULT ((0)) FOR [HasAttachment]
GO
ALTER TABLE [dbo].[AlertsServiceMaster] ADD  CONSTRAINT [DF__AlertsSer__IsAct__1DB06A4F]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AlertsServiceMaster] ADD  CONSTRAINT [DF__AlertsSer__IsDel__1EA48E88]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[AlertsServiceMaster] ADD  CONSTRAINT [DF__AlertsSer__Creat__1F98B2C1]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[AlertsServiceMaster] ADD  CONSTRAINT [DF__AlertsSer__Modif__208CD6FA]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[AlertsServiceSchedular] ADD  CONSTRAINT [DF__AlertsSer__IsAct__41EDCAC5]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AlertsServiceSchedular] ADD  CONSTRAINT [DF__AlertsSer__IsDel__42E1EEFE]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[AlertsServiceSchedular] ADD  CONSTRAINT [DF__AlertsSer__Creat__43D61337]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[AlertsServiceSchedular] ADD  CONSTRAINT [DF__AlertsSer__Modif__44CA3770]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[DBConnectionMaster] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[DBConnectionMaster] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[DBConnectionMaster] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[DBConnectionMaster] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[EmailConfig] ADD  DEFAULT ('SYSTEM') FOR [CreatedBy]
GO
ALTER TABLE [dbo].[EmailConfig] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[EmailConfig] ADD  DEFAULT ('SYSTEM') FOR [ModifiedBy]
GO
ALTER TABLE [dbo].[EmailConfig] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[MenuMaster] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[MenuMaster] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[NotificationMaster] ADD  CONSTRAINT [DF__Notificat__Retry__02FC7413]  DEFAULT ((0)) FOR [RetryCount]
GO
ALTER TABLE [dbo].[NotificationMaster] ADD  CONSTRAINT [DF__Notificat__Creat__03F0984C]  DEFAULT ('SYSTEM') FOR [CreatedBy]
GO
ALTER TABLE [dbo].[NotificationMaster] ADD  CONSTRAINT [DF__Notificat__Creat__04E4BC85]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[NotificationMaster] ADD  CONSTRAINT [DF__Notificat__Modif__05D8E0BE]  DEFAULT ('SYSTEM') FOR [ModifiedBy]
GO
ALTER TABLE [dbo].[NotificationMaster] ADD  CONSTRAINT [DF__Notificat__Modif__06CD04F7]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[ServiceCommunication] ADD  DEFAULT ('SYSTEM') FOR [CreatedBy]
GO
ALTER TABLE [dbo].[ServiceCommunication] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[ServiceCommunication] ADD  DEFAULT ('SYSTEM') FOR [ModifiedBy]
GO
ALTER TABLE [dbo].[ServiceCommunication] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[SubRoles] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[SubRoles] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[UserGroup] ADD  CONSTRAINT [DF__UserGroup__Creat__7D439ABD]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[UserGroup] ADD  CONSTRAINT [DF__UserGroup__Modif__7E37BEF6]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[UserGroupMapping] ADD  CONSTRAINT [DF__UserGroup__Creat__01142BA1]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[UserGroupMapping] ADD  CONSTRAINT [DF__UserGroup__Modif__02084FDA]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[UserLogin] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[UserLogin] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[UserMaster] ADD  CONSTRAINT [DF__UserMaste__Creat__36B12243]  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[UserMaster] ADD  CONSTRAINT [DF__UserMaste__Modif__37A5467C]  DEFAULT (getdate()) FOR [ModifiedOn]
GO
ALTER TABLE [dbo].[UserRoles] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[UserRoles] ADD  DEFAULT (getdate()) FOR [ModifiedOn]
GO
/****** Object:  StoredProcedure [dbo].[AlertsSchedular_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 06/10/2023
-- Description:	This stored procedure handles CRUD operations for AlertsSchedular Table.
-- =============================================
CREATE PROCEDURE [dbo].[AlertsSchedular_CRUD]
(

	@SchedularId INT = 0,
	@IName VARCHAR(200),
	@ICode VARCHAR(10),
	@IDesc VARCHAR(1000),
	@FrequencyInMinutes INT,
	@SchedularType VARCHAR(100),
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM AlertsSchedular WHERE SchedularId = @SchedularId AND IsDeleted <> 1 )
		BEGIN
			UPDATE AlertsSchedular
			SET 
				IName = @IName, 
				ICode = @ICode, 
				IDesc = @IDesc, 
				FrequencyInMinutes = @FrequencyInMinutes,
				SchedularType = @SchedularType,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE SchedularId = @SchedularId ;
		END	
		
		ELSE IF(@SchedularId = 0  AND LTRIM(RTRIM(ISNULL(@IName,''))) <> '')
		BEGIN
			INSERT INTO AlertsSchedular
			( IName,ICode,IDesc,FrequencyInMinutes,SchedularType,IsActive,IsDeleted,CreatedBy,CreatedOn )
			VALUES
			( @IName,@ICode,@IDesc,@FrequencyInMinutes,@SchedularType,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT A.SchedularId, A.IName,A.ICode,A.IDesc,A.FrequencyInMinutes,A.SchedularType, A.IsActive, A.IsDeleted
	 FROM AlertsSchedular A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[AlertsSchedular_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 03/10/2023
-- Description:	This stored procedure handles  Status Update of AlertsSchedular table
-- =============================================
CREATE PROCEDURE [dbo].[AlertsSchedular_StatusUpdate]
(
	@SchedularId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE AlertsSchedular
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE SchedularId = @SchedularId;

		SELECT * FROM AlertsSchedular WHERE SchedularId = @SchedularId;

END

GO
/****** Object:  StoredProcedure [dbo].[AlertsServiceMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 06/10/2023
-- Description:	This stored procedure handles CRUD operations for AlertsServiceMaster Table.
-- =============================================
CREATE PROCEDURE [dbo].[AlertsServiceMaster_CRUD]
(

	@ServiceId INT = 0,
	@Title VARCHAR(100),
	@SDesc VARCHAR(1000),
	@AlertType VARCHAR(20),
	@HasAttachment INT,
	@AttachmentType VARCHAR(100),
	@AttachmentPath VARCHAR(500),
	@AttachmentFileType VARCHAR(50),
	@OutputFileName VARCHAR(100),
	@DataSourceType VARCHAR(30),
	@DataSourceDef NVARCHAR(4000),
	@PostSendDataSourceType VARCHAR(30),
	@PostSendDataSourceDef NVARCHAR(4000),
	@EmailTo VARCHAR(200),
	@CCTo VARCHAR(1000),
	@BccTo VARCHAR(1000),
	@ASubject VARCHAR(1000),
	@ABody NVARCHAR(MAX),
	@DBConnid INT,
	@AlertConfigId INT,
	@SchedularId INT,
	@LastExecutedOn DATETIME,
	@NextExecutionTime  DATETIME,
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM AlertsServiceMaster WHERE ServiceId = @ServiceId AND IsDeleted <> 1 )
		BEGIN
			UPDATE AlertsServiceMaster
			SET 
				Title = @Title,
				SDesc = @SDesc,
				AlertType = @AlertType,
				HasAttachment = @HasAttachment,
				AttachmentType = @AttachmentType,
				AttachmentPath = @AttachmentPath,
				AttachmentFileType = @AttachmentFileType,
				OutputFileName = @OutputFileName,
				DataSourceType = @DataSourceType,
				DataSourceDef = @DataSourceDef,
				PostSendDataSourceType = @PostSendDataSourceType,
				PostSendDataSourceDef = @PostSendDataSourceDef,
				EmailTo = @EmailTo,
				CCTo = @CCTo,
				BccTo = @BccTo,
				ASubject = @ASubject,
				ABody = @ABody,
				DBConnid = @DBConnid,
				AlertConfigId = @AlertConfigId,
				SchedularId = @SchedularId,
				LastExecutedOn = @LastExecutedOn,
				NextExecutionTime = @NextExecutionTime,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE ServiceId = @ServiceId ;
		END	
		
		ELSE IF(@ServiceId = 0
		 AND LTRIM(RTRIM(ISNULL(@Title,''))) <> ''
		 AND LTRIM(RTRIM(ISNULL(@AlertType,''))) <> ''
		 AND LTRIM(RTRIM(ISNULL(@SDesc,''))) <> ''
		 AND LTRIM(RTRIM(ISNULL(@AttachmentType,''))) <> ''
		 )
		BEGIN
			INSERT INTO AlertsServiceMaster
			(Title,SDesc,AlertType,HasAttachment,AttachmentType,AttachmentPath,AttachmentFileType,OutputFileName,DataSourceType,DataSourceDef,PostSendDataSourceType,
             PostSendDataSourceDef,EmailTo, CCTo,BccTo, ASubject,ABody,DBConnid,AlertConfigId,SchedularId,LastExecutedOn,NextExecutionTime,
			 IsActive,IsDeleted, CreatedBy, CreatedOn )

			VALUES
			(@Title,@SDesc,@AlertType,@HasAttachment,@AttachmentType,@AttachmentPath,@AttachmentFileType,@OutputFileName,@DataSourceType,@DataSourceDef,@PostSendDataSourceType,
             @PostSendDataSourceDef,@EmailTo, @CCTo,@BccTo, @ASubject,@ABody,@DBConnid,@AlertConfigId,@SchedularId,@LastExecutedOn,@NextExecutionTime,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT 	 
	 A.ServiceId,A.Title,A.SDesc,A.AlertType,A.HasAttachment,A.AttachmentType,A.AttachmentPath,A.AttachmentFileType,A.OutputFileName,A.DataSourceType,
	 --A.DataSourceDef,
	 '' as DataSourceDef,
	 A.PostSendDataSourceType,
     A.PostSendDataSourceDef,
	 A.EmailTo, A.CCTo,A.BccTo, A.ASubject,A.ABody,A.DBConnid,A.AlertConfigId,A.SchedularId,A.LastExecutedOn,A.NextExecutionTime, A.IsActive, A.IsDeleted,
	 B.IName as SchedularName,C.ConnName,D.IName as EmailConfigName
	 FROM AlertsServiceMaster A 
	 INNER JOIN AlertsSchedular B ON A.SchedularId = B.SchedularId
	 INNER JOIN DBConnectionMaster C ON A.DBConnid = C.DBConnId
	 INNER JOIN EmailConfig D ON A.AlertConfigId = D.EmailConfigId
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[AlertsServiceMaster_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 06/10/2023
-- Description:	This stored procedure handles  Status Update of AlertsServiceMaster table
-- =============================================
CREATE PROCEDURE [dbo].[AlertsServiceMaster_StatusUpdate]
(
	@ServiceId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE AlertsServiceMaster
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE ServiceId = @ServiceId;

		--SELECT * FROM AlertsServiceMaster WHERE ServiceId = @ServiceId;

			 SELECT 	 
	 A.ServiceId,A.Title,A.SDesc,A.AlertType,A.HasAttachment,A.AttachmentType,A.AttachmentPath,A.AttachmentFileType,A.OutputFileName,A.DataSourceType,A.DataSourceDef,A.PostSendDataSourceType,
     A.PostSendDataSourceDef,A.EmailTo, A.CCTo,A.BccTo, A.ASubject,A.ABody,A.DBConnid,A.AlertConfigId,A.SchedularId,A.LastExecutedOn,A.NextExecutionTime, A.IsActive, A.IsDeleted,
	 B.IName as SchedularName,C.ConnName,D.IName as EmailConfigName
	 FROM AlertsServiceMaster A 
	 INNER JOIN AlertsSchedular B ON A.SchedularId = B.SchedularId
	 INNER JOIN DBConnectionMaster C ON A.DBConnid = C.DBConnId
	 INNER JOIN EmailConfig D ON A.AlertConfigId = D.EmailConfigId
	 WHERE A.IsDeleted <> 1 AND A.ServiceId = @ServiceId;


END

GO
/****** Object:  StoredProcedure [dbo].[AlertsServiceSchedular_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 11/10/2023
-- Description:	This stored procedure handles CRUD operations for AlertsServiceSchedular Table.
-- =============================================
CREATE PROCEDURE [dbo].[AlertsServiceSchedular_CRUD]
(

	@MappperId INT = 0,
	@ServiceId INT,
	@SchedularId INT,
	@LastExecutionTime DATETIME,
	@NextExecutionTime DATETIME,
	@StartsFrom DATETIME,
	@EndsOn DATETIME,
	@DailyStartOn VARCHAR(100),
	@DailyEndsOn VARCHAR(100),
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM AlertsServiceSchedular WHERE MappperId = @MappperId AND IsDeleted <> 1 )
		
		BEGIN
		UPDATE AlertsServiceSchedular
			SET 

			ServiceId = @ServiceId,
			SchedularId = @SchedularId,
			LastExecutionTime = @LastExecutionTime,
			NextExecutionTime = @NextExecutionTime,
			StartsFrom = @StartsFrom,
			EndsOn = @EndsOn,
			DailyStartOn =  CONVERT( TIME, @DailyStartOn ) ,
			DailyEndsOn = CONVERT( TIME, @DailyEndsOn ) ,
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
			WHERE MappperId = @MappperId ;

		END
				
		ELSE IF(@MappperId = 0  AND LTRIM(RTRIM(ISNULL(@LastExecutionTime,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@NextExecutionTime,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@StartsFrom,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@EndsOn,''))) <> '' 
		AND @ServiceId <> 0 AND @SchedularId<> 0 )
		BEGIN
			INSERT INTO AlertsServiceSchedular
			(ServiceId,SchedularId,LastExecutionTime,NextExecutionTime
			,StartsFrom,EndsOn,DailyStartOn,DailyEndsOn,
			IsActive,IsDeleted,CreatebBy,CreatedOn)
			VALUES
			(@ServiceId,@SchedularId,@LastExecutionTime,@NextExecutionTime
			,@StartsFrom,@EndsOn,CONVERT( TIME, @DailyStartOn ),CONVERT( TIME, @DailyEndsOn ) ,
			@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

		SELECT A.MappperId,A.ServiceId,A.SchedularId,A.LastExecutionTime,A.NextExecutionTime,
			   A.StartsFrom,A.EndsOn,CONVERT(varchar, A.DailyStartOn, 114) AS DailyStartOn,CONVERT(varchar, A.DailyEndsOn, 114) AS DailyEndsOn,
			   A.IsActive,A.IsDeleted,A.CreatebBy,A.CreatedOn,A.ModifiedBy,A.ModifiedOn,
			   B.IName,C.Title

		FROM AlertsServiceSchedular A 
		INNER JOIN AlertsSchedular B ON A.SchedularId=B.SchedularId
		INNER JOIN AlertsServiceMaster C ON A.ServiceId=C.ServiceId
		WHERE A.IsDeleted <> 1;
END
GO
/****** Object:  StoredProcedure [dbo].[AlertsServiceSchedular_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 11/10/2023
-- Description:	This stored procedure handles  Status Update of AlertsServiceSchedular table
-- =============================================
CREATE PROCEDURE [dbo].[AlertsServiceSchedular_StatusUpdate]
(
	@MappperId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE AlertsServiceSchedular
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE MappperId = @MappperId;


		-- SELECT * FROM AlertsServiceSchedular WHERE MappperId = @MappperId;


		SELECT A.MappperId,A.ServiceId,A.SchedularId,A.LastExecutionTime,A.NextExecutionTime,
			   A.StartsFrom,A.EndsOn,CONVERT(varchar, A.DailyStartOn, 114) AS DailyStartOn,CONVERT(varchar, A.DailyEndsOn, 114) AS DailyEndsOn,
			   A.IsActive,A.IsDeleted,A.CreatebBy,A.CreatedOn,A.ModifiedBy,A.ModifiedOn,
			   B.IName,C.Title

		FROM AlertsServiceSchedular A 
		INNER JOIN AlertsSchedular B ON A.SchedularId=B.SchedularId
		INNER JOIN AlertsServiceMaster C ON A.ServiceId=C.ServiceId
		WHERE A.IsDeleted <> 1 AND A.MappperId = @MappperId;



END

GO
/****** Object:  StoredProcedure [dbo].[AlertsServiceVariables_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 10/10/2023
-- Description:	This stored procedure handles CRUD operations for AlertsServiceVariables Table.
-- =============================================
CREATE PROCEDURE [dbo].[AlertsServiceVariables_CRUD]
(
	@VariableId INT = 0,
	@ServiceId INT,
	@VarInstance VARCHAR(100), 
	@VarValue VARCHAR(100),
	@VarType VARCHAR(50),
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM AlertsServiceVariables WHERE VariableId = @VariableId )

		BEGIN
		
		UPDATE AlertsServiceVariables
			SET 
				ServiceId = @ServiceId,
				VarInstance = @VarInstance,
				VarValue = @VarValue,
				VarType = @VarType,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE VariableId = @VariableId ;
		END

		ELSE IF(@VariableId = 0
		AND LTRIM(RTRIM(ISNULL(@VarInstance,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@VarValue,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@VarType,''))) <> '' )
		BEGIN
			INSERT INTO AlertsServiceVariables
			( ServiceId ,VarInstance ,VarValue ,VarType,IsActive,IsDeleted,CreatedBy,CreatedOn)
			VALUES
			( @ServiceId ,@VarInstance ,@VarValue ,@VarType,@IsActive,@IsDeleted,@ActionUser,GETDATE());
		END

	 SELECT A.VariableId, A.ServiceId, A.VarInstance ,A.VarValue ,A.VarType,
	 A.IsActive,A.IsDeleted,B.Title
	 FROM AlertsServiceVariables A INNER JOIN AlertsServiceMaster B ON A.ServiceId=B.ServiceId
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[Dashboard_GetAllUserDetails]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Sumit Gore
-- Create date: 04/08/2023
-- Description:	This stored procedure populates the data on user dashboard
-- =============================================
CREATE PROCEDURE [dbo].[Dashboard_GetAllUserDetails] 
	@ActionUser INT = 0
AS
BEGIN
	DECLARE @DashboardData TABLE (
		LabelName VARCHAR(100),
		LabelValue VARCHAR(100),
		LabelType VARCHAR(20)
	)

	-- NUMBER OF USERS
	INSERT INTO @DashboardData 
	SELECT 'Total', COUNT(UserId),'UserCount' LabelType FROM UserMaster

	-- NUMBER OF ACTIVE USERS ACTIVE TODAY
	INSERT INTO @DashboardData 
	SELECT 'Active', COUNT(DISTINCT(UserId)),'Users' LabelType
	FROM [dbo].[UserLoginLog]
	WHERE CAST(LoggedTime AS DATE) = CAST(GETDATE() AS DATE);

	-- NUMBER OF ACTIVE USERS ACTIVE TODAY group change
	INSERT INTO @DashboardData 
	SELECT 'Today', COUNT(DISTINCT(UserId)),'ActiveUser' LabelType
	FROM [dbo].[UserLoginLog]
	WHERE CAST(LoggedTime AS DATE) = CAST(GETDATE() AS DATE);

	-- NUMBER OF ACTIVE USERS ACTIVE 7 days ago on that day
	INSERT INTO @DashboardData 
	SELECT 'L.Week', COUNT(DISTINCT(UserId)),'ActiveUser' LabelType
	FROM [dbo].[UserLoginLog]
	WHERE CAST(LoggedTime AS DATE) = CAST(DATEADD(DAY, -7, GETDATE()) AS DATE)

	-- NUMBER OF ACTIVE USERS ACTIVE 30 days ago on that day
	INSERT INTO @DashboardData 
	SELECT 'L.Month', COUNT(DISTINCT(UserId)),'ActiveUser' LabelType
	FROM [dbo].[UserLoginLog]
	WHERE CAST(LoggedTime AS DATE) = CAST(DATEADD(DAY, -30, GETDATE()) AS DATE)

	--NUMBER OF USERS MAPPED TO EACH GROUP WITH NAME
	INSERT INTO @DashboardData 
	SELECT B.GroupCode, COUNT(A.UserID),'UserGroup' LabelType
	FROM UserGroupMapping A
	LEFT OUTER JOIN dbo.UserGroup B WITH (NOLOCK) ON A.GroupId = B.GroupId
	GROUP BY A.GroupID, B.GroupCode

	--NUMBER OF USERS MAPPED TO EACH WORKCENTER LIMITED TO TOP 3 WORKCENTERS WITH HEIGHEST USER COUNTS
	INSERT INTO @DashboardData
	SELECT TOP 3 A.WorkCenterCode, COUNT(B.UserId),'UserWorkcenter' LabelType
	FROM WorkCenterMaster A
	LEFT OUTER JOIN UserWorkCenter B WITH (NOLOCK) ON A.WorkCenterId = B.WorkCenterId
	GROUP BY A.WorkCenterName, A.WorkCenterCode
	ORDER BY COUNT(B.UserId) DESC;

	--NUMBER OF USERS ROLE-WISE
	INSERT INTO @DashboardData
	SELECT B.RoleCode,COUNT(DISTINCT(A.UserId)),'UserRole' LabelType
	FROM UserRoles A
	LEFT OUTER JOIN dbo.Roles B WITH (NOLOCK) ON A.RoleId = B.RoleId
	GROUP BY B.RoleCode


	--Non active users (today)
	DECLARE @TotalActiveUsersToday INT, @TotalUsers INT;

	SELECT @TotalActiveUsersToday = CAST(LabelValue AS INT)
	FROM @DashboardData
	WHERE LabelName = 'Active';

	SELECT @TotalUsers = CAST(LabelValue AS INT)
	FROM @DashboardData
	WHERE LabelName = 'Total';

	INSERT INTO @DashboardData (LabelName, LabelValue, LabelType)
	VALUES ('Inactive', CAST(@TotalUsers - @TotalActiveUsersToday AS VARCHAR(100)), 'Users');


	SELECT * FROM @DashboardData;
	
	--NUMBER OF USERS MAPPED TO EACH WORKCENTER
	--SELECT A.WorkCenterCode,COUNT(B.UserId)
	--FROM WorkCenterMaster A
	--LEFT OUTER JOIN UserWorkCenter B WITH (NOLOCK) ON A.WorkCenterId = B.WorkCenterId
	--GROUP BY A.WorkCenterName,A.WorkCenterCode
	--ORDER BY COUNT(B.UserId) DESC;
		 
	
END
GO
/****** Object:  StoredProcedure [dbo].[DashBoard_GetDetails]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DashBoard_GetDetails]
(
	@ActionUser INT
)
AS
BEGIN

	-- Retrieve general dashboard statistics
	SELECT
        'Sassy' AS [CurrentTask],
        3542 AS [TotalActiveTask],
        1253 AS [TaskCompleted],
        '5.2%' AS [AverageCompletedTask],
        '01:56:34' AS [ETAforCurrentTask],
        'General statistics for the current user.' AS Remarks;

	-- Retrieve top 5 work centers with completed tasks
	SELECT TOP 5
		A.WorkcenterId, B.WorkCenterCode,
		SUM(CASE WHEN A.CurrentStatus = 2 THEN 1 ELSE 0 END) AS Completed,
		SUM(CASE WHEN A.CurrentStatus = 1 THEN 1 ELSE 0 END) AS InProgress,
		SUM(CASE WHEN A.CurrentStatus = 0 THEN 1 ELSE 0 END) AS NotStarted,
		'Recently completed tasks for the user.' AS Remarks
	FROM WorkItemTransition A
	LEFT JOIN WorkCenterMaster B ON A.WorkcenterId = B.WorkcenterId
	WHERE ISNULL(A.AssignedTo, 0) = @ActionUser OR ISNULL(A.CompletedBy, 0) = @ActionUser OR ISNULL(A.ModifiedBy, 0) = @ActionUser
	GROUP BY A.WorkCenterId, B.WorkCenterCode
	ORDER BY Completed DESC;

	-- Retrieve top 5 work centers with in-progress tasks
	SELECT TOP 5
		A.WorkcenterId, B.WorkCenterCode,
		SUM(CASE WHEN A.CurrentStatus = 1 THEN 1 ELSE 0 END) AS InProgress,
		SUM(CASE WHEN A.CurrentStatus = 2 THEN 1 ELSE 0 END) AS Completed,
		SUM(CASE WHEN A.CurrentStatus = 0 THEN 1 ELSE 0 END) AS NotStarted,
		'Work centers where tasks are currently in progress.' AS Remarks
	FROM WorkItemTransition A
	LEFT JOIN WorkCenterMaster B ON A.WorkcenterId = B.WorkcenterId
	WHERE ISNULL(A.AssignedTo, 0) = @ActionUser OR ISNULL(A.CompletedBy, 0) = @ActionUser OR ISNULL(A.ModifiedBy, 0) = @ActionUser
	GROUP BY A.WorkCenterId, B.WorkCenterCode
	ORDER BY InProgress DESC;

	-- Retrieve top 5 work centers with not started tasks
	SELECT TOP 5
		A.WorkcenterId, B.WorkCenterCode,
		SUM(CASE WHEN A.CurrentStatus = 0 THEN 1 ELSE 0 END) AS NotStarted,
		SUM(CASE WHEN A.CurrentStatus = 2 THEN 1 ELSE 0 END) AS Completed,
		SUM(CASE WHEN A.CurrentStatus = 1 THEN 1 ELSE 0 END) AS InProgress,
		'Work centers where tasks have not yet started.' AS Remarks
	FROM WorkItemTransition A
	LEFT JOIN WorkCenterMaster B ON A.WorkcenterId = B.WorkcenterId
	WHERE ISNULL(A.AssignedTo, 0) = @ActionUser OR ISNULL(A.CompletedBy, 0) = @ActionUser OR ISNULL(A.ModifiedBy, 0) = @ActionUser
	GROUP BY A.WorkCenterId, B.WorkCenterCode
	ORDER BY NotStarted DESC;

	-- Retrieve top 5 work centers with overall task status
	SELECT TOP 5
		A.WorkcenterId, B.WorkCenterCode,
		SUM(CASE WHEN A.CurrentStatus = 2 THEN 1 ELSE 0 END) AS Completed,
		SUM(CASE WHEN A.CurrentStatus = 1 THEN 1 ELSE 0 END) AS InProgress,
		SUM(CASE WHEN A.CurrentStatus = 0 THEN 1 ELSE 0 END) AS NotStarted,
		'Overview of task statuses in various work centers.' AS Remarks
	FROM WorkItemTransition A
	LEFT JOIN WorkCenterMaster B ON A.WorkcenterId = B.WorkcenterId
	WHERE ISNULL(A.AssignedTo, 0) = @ActionUser OR ISNULL(A.CompletedBy, 0) = @ActionUser OR ISNULL(A.ModifiedBy, 0) = @ActionUser
	GROUP BY A.WorkCenterId, B.WorkCenterCode
	ORDER BY Completed DESC;
        
END
GO
/****** Object:  StoredProcedure [dbo].[DBConnectionMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 28/00/2023
-- Description:	This stored procedure handles CRUD operations for DBConnectionMaster Table.
-- =============================================
CREATE PROCEDURE [dbo].[DBConnectionMaster_CRUD]
(

	@DBConnId INT = 0,
	@ConnName VARCHAR(100),
	@ServerName NVARCHAR(200),
	@UserName VARCHAR(100),
	@Passwrd VARCHAR(200),
	@DBName VARCHAR(100),
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM DBConnectionMaster WHERE DBConnId = @DBConnId AND IsDeleted <> 1 )

		BEGIN
		IF(@DBConnId <> 0 AND LTRIM(RTRIM(ISNULL(@Passwrd,''))) <> '')
		
		BEGIN
		UPDATE DBConnectionMaster
			SET 
				ConnName = @ConnName, 
				ServerName = @ServerName, 
				UserName = @UserName, 
				Passwrd = @Passwrd,
				DBName = @DBName,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()
			WHERE DBConnId = @DBConnId ;

		END

		ELSE
		BEGIN
			UPDATE DBConnectionMaster
			SET 
				ConnName = @ConnName, 
				ServerName = @ServerName, 
				UserName = @UserName, 
				DBName = @DBName,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()
			WHERE DBConnId = @DBConnId ;
		END	

        END
				
		ELSE IF(@DBConnId = 0 AND LTRIM(RTRIM(ISNULL(@ConnName,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@ServerName,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@UserName,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@Passwrd,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@DBName,''))) <> '')
		BEGIN
			INSERT INTO DBConnectionMaster
			( ConnName,ServerName,UserName,Passwrd,DBName,IsActive,IsDeleted,CreatedBy,CreatedOn )
			VALUES
			( @ConnName,@ServerName,@UserName,@Passwrd,@DBName,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT A.DBConnId, A.ConnName,A.ServerName,A.UserName,A.Passwrd,A.DBName, A.IsActive, A.IsDeleted
	 FROM DBConnectionMaster A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[DBConnectionMaster_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha
-- Create date: 02/10/2023
-- Description:	This stored procedure handles  Status Update of DBConnectionMaster table
-- =============================================
CREATE PROCEDURE [dbo].[DBConnectionMaster_StatusUpdate]
(
	@DBConnId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE DBConnectionMaster
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE DBConnId = @DBConnId;

		SELECT * FROM DBConnectionMaster WHERE DBConnId = @DBConnId;

END

GO
/****** Object:  StoredProcedure [dbo].[EmailConfig_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 28/00/2023
-- Description:	This stored procedure handles CRUD operations for EmailConfig Table.
-- =============================================
CREATE PROCEDURE [dbo].[EmailConfig_CRUD]
(
	@EmailConfigId INT = 0,
	@IName VARCHAR(100),
	@IDesc VARCHAR(1000), 
	@IHost VARCHAR(500),
	@IPort VARCHAR(10),
	@IFrom VARCHAR(100),
	@IPassword VARCHAR(100),
	@IEnableSsl INT,
	@IsBodyHtml INT,
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM EmailConfig WHERE EmailConfigId = @EmailConfigId AND IsDeleted <> 1 )

		BEGIN

		IF(@EmailConfigId <> 0 AND LTRIM(RTRIM(ISNULL(@IPassword,''))) <> '')
		BEGIN
		UPDATE EmailConfig
			SET 
				IName = @IName,
				IDesc = @IDesc,
				IHost = @IHost,
				IPort = @IPort,
				IFrom = @IFrom,
				IPassword = @IPassword,
				IEnableSsl = @IEnableSsl,
				IsBodyHtml = @IsBodyHtml,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()
			WHERE EmailConfigId = @EmailConfigId ;
		END

		ELSE

		BEGIN
			UPDATE EmailConfig
			SET 
				IName = @IName,
				IDesc = @IDesc,
				IHost = @IHost,
				IPort = @IPort,
				IFrom = @IFrom,
				IEnableSsl = @IEnableSsl,
				IsBodyHtml = @IsBodyHtml,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()
			WHERE EmailConfigId = @EmailConfigId ;
		END	
		
		END	

		ELSE IF(@EmailConfigId = 0
		AND LTRIM(RTRIM(ISNULL(@IName,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@IHost,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@IPort,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@IFrom,''))) <> ''
		AND LTRIM(RTRIM(ISNULL(@IPassword,''))) <> ''
		)
		BEGIN
			INSERT INTO EmailConfig
			( IName ,IDesc ,IHost ,IPort, IFrom, IPassword, IEnableSsl, IsBodyHtml, IsActive, IsDeleted, CreatedBy, CreatedOn)
			VALUES
			( @IName ,@IDesc ,@IHost ,@IPort,@IFrom, @IPassword, @IEnableSsl, @IsBodyHtml, @IsActive, @IsDeleted, @ActionUser, GETDATE() );
		END


	 SELECT A.EmailConfigId, A.IName ,A.IDesc ,A.IHost ,A.IPort, A.IFrom, A.IPassword, A.IEnableSsl, A.IsBodyHtml, A.IsActive, A.IsDeleted
	 FROM EmailConfig A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[EmailConfig_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 03/10/2023
-- Description:	This stored procedure handles  Status Update of EmailConfig table
-- =============================================
CREATE PROCEDURE [dbo].[EmailConfig_StatusUpdate]
(
	@EmailConfigId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE EmailConfig
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE EmailConfigId = @EmailConfigId;

		SELECT * FROM EmailConfig WHERE EmailConfigId = @EmailConfigId;

END

GO
/****** Object:  StoredProcedure [dbo].[GetEmailConfigDetails]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anuprabha>
-- Create date: <21-09-2023>
-- Description:	<For GetEmailConfigDetails >
-- =============================================
CREATE PROCEDURE [dbo].[GetEmailConfigDetails] 
	
AS

BEGIN
	SELECT * FROM EmailConfig WHERE IsDeleted <> 1;
END
GO
/****** Object:  StoredProcedure [dbo].[GetExecutionServicemaster]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetExecutionServicemaster]
AS
BEGIN
	--Change Next Execution Time for exisiting services
	UPDATE A
	SET A.NextExecutionTime = DATEADD(minute, B.FrequencyInMinutes, A.LastExecutionTime)
	FROM dbo.AlertsServiceSchedular A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.AlertsSchedular B WITH (NOLOCK)
	ON A.SchedularId = B.SchedularId
	WHERE A.IsDeleted <> 1 AND A.IsActive = 1
	AND A.LastExecutionTime IS NOT NULL;

	--Run instantly services scheduled for the first time
	UPDATE A
	SET A.LastExecutionTime = DATEADD(minute, -(B.FrequencyInMinutes), GETDATE()),
		A.NextExecutionTime = GETDATE()
	FROM dbo.AlertsServiceSchedular A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.AlertsSchedular B WITH (NOLOCK)
	ON A.SchedularId = B.SchedularId
	WHERE A.IsDeleted <> 1 AND A.IsActive = 1
	AND A.LastExecutionTime IS NULL;

	--Get Services to be executed
	IF OBJECT_ID('tempdb..#AlertServiceMaster') IS NOT NULL DROP TABLE #AlertServiceMaster;

	SELECT A.ServiceId, A.Title, A.SDesc, A.AlertType,A.HasAttachment, A.AttachmentType, A.AttachmentPath, A.AttachmentFileType, A.OutputFileName,
			A.DataSourceType, A.DataSourceDef, A.PostSendDataSourceType, A.PostSendDataSourceDef, A.EmailTo, A.CCTo, A.BccTo,A.ASubject,A.ABody,
			B.StartsFrom, B.EndsOn, B.DailyStartOn, B.DailyEndsOn,B.MappperId,
			C.SchedularId, C.FrequencyInMinutes, C.SchedularType,
			D.DBConnId, D.ConnName,D.ServerName, D.UserName, D.Passwrd, D.DBName, E.ServiceVariables
	INTO #AlertServiceMaster
	FROM dbo.AlertsServiceMaster A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.AlertsServiceSchedular B WITH (NOLOCK)
	ON A.ServiceId = B.ServiceId
	LEFT OUTER JOIN dbo.AlertsSchedular C WITH (NOLOCK)
	ON B.SchedularId = C.SchedularId
	LEFT OUTER JOIN dbo.DBConnectionMaster D WITH (NOLOCK)
	ON A.DBConnid = D.DBConnId
	LEFT OUTER JOIN (
		SELECT  ServiceId
			   ,STUFF((SELECT ', ' + CAST((VarInstance+ ':'+ VarValue+ ':'+ VarType) AS VARCHAR(100)) ServiceVariables
				 FROM AlertsServiceVariables 
				 WHERE ServiceId = t.ServiceId
				 FOR XML PATH(''), TYPE)
				.value('.','NVARCHAR(MAX)'),1,2,' ') ServiceVariables
		FROM AlertsServiceVariables t
		GROUP BY ServiceId

	) E
	ON A.ServiceId = E.ServiceId
	WHERE A.IsDeleted <> 1 AND A.IsActive = 1
	AND GETDATE() BETWEEN B.StartsFrom AND B.EndsOn
	AND CAST(GETDATE() AS TIME) BETWEEN B.DailyStartOn AND B.DailyEndsOn
	AND B.NextExecutionTime <= GETDATE();

	--Update lastExecutionTime of the Service
	UPDATE B
	SET B.LastExecutionTime = GETDATE()
	FROM #AlertServiceMaster A
	LEFT OUTER JOIN dbo.AlertsServiceSchedular B WITH (NOLOCK)
	ON A.MappperId = B.MappperId;

	SELECT * FROM #AlertServiceMaster

END


GO
/****** Object:  StoredProcedure [dbo].[GetPushNotifications]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetPushNotifications] 
AS
BEGIN
	IF OBJECT_ID('tempdb..#PushNotifications') IS NOT NULL DROP TABLE #PushNotifications

	SELECT NotificationId, NType, NSubject, NContent, NStatus, NTo, NCc, NBcc, RetryCount, A.IsDeleted, Remarks,AttachmentPath,
			A.PostSendDataSourceType, A.PostSendDataSourceDef, B.DBConnId, B.ConnName,B.ServerName, B.UserName, B.Passwrd, B.DBName
	INTO #PushNotifications
	FROM NotificationMaster A
	LEFT OUTER JOIN dbo.DBConnectionMaster B WITH (NOLOCK)
	ON A.DBConnId = B.DBConnId
	WHERE A.IsDeleted <> 1 AND ISNULL(A.RetryCount,0) < 3 AND A.NStatus = 'Pending' AND ISNULL(A.ScheduledDate, GETDATE()) <= GETDATE();

	UPDATE B
	SET B.RetryCount = (ISNULL(B.RetryCount,0) + 1), B.RetryDate = GETDATE()
	FROM #PushNotifications A
	LEFT OUTER JOIN dbo.NotificationMaster B
	ON A.NotificationId = B.NotificationId;
	
	SELECT * FROM #PushNotifications;
END


GO
/****** Object:  StoredProcedure [dbo].[MenuMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Atharva Ratnaparkhi
-- Create date: 17/07/2023
-- Description:	This Stored Procedure Performs CRUD Operations on MenuMaster Table
-- =============================================

CREATE PROCEDURE [dbo].[MenuMaster_CRUD]
(
	@MenuId BIGINT,
	@MenuName VARCHAR(50),
	@MenuCode VARCHAR(20),
	@MenuDesc VARCHAR(500),
	@DisplayOrder INT,
	@ParentMenuId BIGINT,
	@DefaultChildMenuId BIGINT,
	@MenuIconUrl VARCHAR(255),
	@TemplatePath VARCHAR(255),
	@IsActive INT = 1,
	@IsDeleted INT = 0,
	@ActionUser INT
)
AS
BEGIN

	IF NOT EXISTS(SELECT 1 FROM MenuMaster WHERE MenuId = @MenuId) AND 
	LTRIM(RTRIM(ISNULL(@MenuName, ''))) <> '' AND
	LTRIM(RTRIM(ISNULL(@MenuCode, ''))) <> ''
	BEGIN
		INSERT INTO [dbo].[MenuMaster] 
		(MenuName, MenuCode, MenuDesc, DisplayOrder, ParentMenuId, DefaultChildMenuId, MenuIconUrl, TemplatePath, IsActive, CreatedBy, CreatedOn, IsDeleted, ModifiedBy, ModifiedOn)
		VALUES 
		(@MenuName, @MenuCode, @MenuDesc, @DisplayOrder, @ParentMenuId, @DefaultChildMenuId, @MenuIconUrl, @TemplatePath, @IsActive, @ActionUser, GETDATE(), @IsDeleted, NULL, NULL);

		SELECT @MenuId = SCOPE_IDENTITY(); 
	END
	ELSE IF EXISTS(SELECT 1 FROM MenuMaster 
							WHERE MenuId = @MenuId AND (MenuName <> @MenuName OR MenuCode <> @MenuCode OR MenuDesc <> @MenuDesc OR
							DisplayOrder <> @DisplayOrder OR ParentMenuId <> @ParentMenuId OR DefaultChildMenuId <> @DefaultChildMenuId OR
							MenuIconUrl <> @MenuIconUrl OR TemplatePath <> @TemplatePath OR IsActive <> @IsActive OR IsDeleted <> @IsDeleted))
	BEGIN
		UPDATE MenuMaster
		SET MenuName = @MenuName,
			MenuCode = @MenuCode,
			MenuDesc = @MenuDesc,
			DisplayOrder = @DisplayOrder,
			ParentMenuId = @ParentMenuId,
			DefaultChildMenuId = @DefaultChildMenuId,
			MenuIconUrl = @MenuIconUrl,
			TemplatePath = @TemplatePath,
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE MenuId = @MenuId
	END

	SELECT A.MenuId, A.MenuName, A.MenuCode, A.MenuDesc, A.DisplayOrder, A.ParentMenuId, A.DefaultChildMenuId, A.MenuIconUrl, A.TemplatePath, A.IsActive,
			CASE WHEN B.UserId IS NULL THEN A.CreatedBy 
			   ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
			   END AS CreatedBy,
			A.CreatedOn,
			A.ModifiedBy,
			A.ModifiedOn,
			A.IsDeleted
	FROM dbo.MenuMaster A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK)
	ON A.CreatedBy = CONVERT(VARCHAR(50),B.UserId)

	WHERE A.IsDeleted = 0

END


GO
/****** Object:  StoredProcedure [dbo].[NotificationMaster_Insert]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[NotificationMaster_Insert]
(
	@typNotificationMaster typNotificationMaster ReadOnly
)
AS
BEGIN
	INSERT INTO dbo.NotificationMaster 
	(NType, NSubject, NContent, NTo, NCc, NBcc, IsDeleted, NStatus, Remarks, ScheduledDate, 
	PostSendDataSourceType, PostSendDataSourceDef, DBConnId, AttachmentPath, RetryCount, CreatedBy)
	SELECT 
	NType, NSubject, NContent, NTo, NCc, NBcc, IsDeleted, NStatus, Remarks, ScheduledDate, 
	PostSendDataSourceType, PostSendDataSourceDef, DBConnId, AttachmentPath, RetryCount, CreatedBy
	FROM @typNotificationMaster;

END
GO
/****** Object:  StoredProcedure [dbo].[NotificationMaster_UpdateStatus]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		Anuprabha
-- Create date: 22/09/2023
-- Description:	This stored procedure handles  Update Status in table NotificationMaster.
-- =============================================
CREATE PROCEDURE [dbo].[NotificationMaster_UpdateStatus]
(
	@typNotificationMaster typNotificationMaster ReadOnly
)
AS
BEGIN
	
	UPDATE B
	SET B.NStatus = A.NStatus,
		B.Remarks = A.Remarks,
		B.ModifiedOn = GETDATE(),
		B.ModifiedBy = 'SYSTEM'
	FROM @typNotificationMaster A
	LEFT OUTER JOIN dbo.NotificationMaster B
	ON A.NotificationId = B.NotificationId;
	
END
GO
/****** Object:  StoredProcedure [dbo].[RolesMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Ravindra Chauhan
-- Create date: 25/07/2023
-- Description:	This Stored Procedure Performs CRUD Operations on Roles Table.
-- =============================================
CREATE PROCEDURE [dbo].[RolesMaster_CRUD]
(
	@RoleId	INT,
	@RoleName	VARCHAR(50),
	@RoleCode	VARCHAR(20),
	@RoleDesc	VARCHAR(500),
	@IsActive	INT = 1,
	@IsDeleted	INT = 0,
	@ActionUser INT
)
AS
BEGIN

	IF NOT EXISTS(SELECT 1 FROM Roles WHERE RoleId = @RoleId ) AND LTRIM(RTRIM(ISNULL(@RoleName,''))) <> ''
	BEGIN
		INSERT INTO [dbo].Roles 
		(RoleName, RoleCode, RoleDesc,IsActive, CreatedBy, CreatedOn,ModifiedBy,ModifiedOn,IsDeleted)
		VALUES 
		(@RoleName, @RoleCode, @RoleDesc, @IsActive, @ActionUser, GETDATE(),NULL,NULL,@IsDeleted);

		SELECT @RoleId = SCOPE_IDENTITY(); 
	END
	ELSE IF EXISTS(SELECT 1 FROM Roles 
							WHERE RoleId = @RoleId AND (RoleName <> @RoleName OR RoleCode <> @RoleCode OR RoleDesc <> @RoleDesc OR
							IsActive <> @IsActive OR IsDeleted <> @IsDeleted ))
	BEGIN
		UPDATE Roles
		SET RoleName = @RoleName,
			RoleCode = @RoleCode,
			RoleDesc = @RoleDesc,
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE RoleId = @RoleId
	END

	SELECT A.RoleId,A.RoleName,A.RoleCode,A.RoleDesc,A.IsActive,A.IsDeleted,
	CASE WHEN B.UserId IS NULL THEN A.CreatedBy 
			   ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
			   END AS CreatedBy
			   ,A.CreatedOn,A.ModifiedBy,A.ModifiedOn
	FROM dbo.Roles A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK)
	ON A.CreatedBy = CONVERT(VARCHAR(50),B.UserId)
	WHERE A.IsDeleted = 0

END
GO
/****** Object:  StoredProcedure [dbo].[SchedularMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 28/00/2023
-- Description:	This stored procedure handles CRUD operations for SchedularMaster Table.
-- =============================================
CREATE PROCEDURE [dbo].[SchedularMaster_CRUD]
(

	@SchedularId INT = 0,
	@IName VARCHAR(200),
	@ICode VARCHAR(10),
	@IDesc VARCHAR(1000),
	@FrequencyInMin INT,
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM SchedularMaster WHERE SchedularId = @SchedularId AND IsDeleted <> 1 )
		BEGIN
			UPDATE SchedularMaster
			SET 
				IName = @IName, 
				ICode = @ICode, 
				IDesc = @IDesc, 
				FrequencyInMin = @FrequencyInMin,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE SchedularId = @SchedularId ;
		END	
		
		ELSE IF(@SchedularId = 0  AND LTRIM(RTRIM(ISNULL(@IName,''))) <> '')
		BEGIN
			INSERT INTO SchedularMaster
			( IName,ICode,IDesc,FrequencyInMin,IsActive,IsDeleted,CreatedBy,CreatedOn )
			VALUES
			( @IName,@ICode,@IDesc,@FrequencyInMin,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT A.SchedularId, A.IName,A.ICode,A.IDesc,A.FrequencyInMin, A.IsActive, A.IsDeleted
	 FROM SchedularMaster A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[SchedularMaster_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 03/10/2023
-- Description:	This stored procedure handles  Status Update of SchedularMaster table
-- =============================================
CREATE PROCEDURE [dbo].[SchedularMaster_StatusUpdate]
(
	@SchedularId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE SchedularMaster
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE SchedularId = @SchedularId;

		SELECT * FROM SchedularMaster WHERE SchedularId = @SchedularId;

END

GO
/****** Object:  StoredProcedure [dbo].[ServiceMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 28/09/2023
-- Description:	This stored procedure handles CRUD operations for ServiceMaster Table.
-- =============================================
CREATE PROCEDURE [dbo].[ServiceMaster_CRUD]
(

	@ServiceId INT = 0,
	@IName VARCHAR(200),
	@ICode VARCHAR(10),
	@IDesc VARCHAR(1000),
	@DataFetchType INT,
	@DataFetchProcess VARCHAR(500),
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM ServiceMaster WHERE ServiceId = @ServiceId AND IsDeleted <> 1 )
		BEGIN
			UPDATE ServiceMaster
			SET 
				IName = @IName, 
				ICode = @ICode, 
				IDesc = @IDesc, 
				DataFetchType = @DataFetchType,
				DataFetchProcess  = @DataFetchProcess ,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE ServiceId = @ServiceId ;
		END	
		
		ELSE IF(@ServiceId = 0
		 AND LTRIM(RTRIM(ISNULL(@IName,''))) <> ''
		 AND LTRIM(RTRIM(ISNULL(@ICode,''))) <> ''
		 AND LTRIM(RTRIM(ISNULL(@DataFetchProcess,''))) <> '')
		BEGIN
			INSERT INTO ServiceMaster
			( IName,ICode,IDesc,DataFetchType,DataFetchProcess,IsActive,IsDeleted,CreatedBy,CreatedOn )
			VALUES
			( @IName,@ICode,@IDesc,@DataFetchType,@DataFetchProcess,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT A.ServiceId,A.IName,A.ICode,A.IDesc,A.DataFetchType,A.DataFetchProcess, A.IsActive, A.IsDeleted
	 FROM ServiceMaster A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[ServiceMaster_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Anuprabha
-- Create date: 06/10/2023
-- Description:	This stored procedure handles  Status Update of ServiceMaster table
-- =============================================
CREATE PROCEDURE [dbo].[ServiceMaster_StatusUpdate]
(
	@ServiceId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE ServiceMaster
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE ServiceId = @ServiceId;

		SELECT * FROM ServiceMaster WHERE ServiceId = @ServiceId;

END

GO
/****** Object:  StoredProcedure [dbo].[ServiceSchedular_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha Muttathu
-- Create date: 28/00/2023
-- Description:	This stored procedure handles CRUD operations for ServiceSchedular Table.
-- =============================================
CREATE PROCEDURE [dbo].[ServiceSchedular_CRUD]
(

	@MapperId INT = 0,
	@ServiceId INT,
	@SchedularId INT,
	@LastExecutionTime DATETIME,
	@NextExecutionTime DATETIME,
	@IsActive INT,
	@IsDeleted INT,
	@ActionUser INT
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM ServiceSchedular WHERE MapperId = @MapperId AND IsDeleted <> 1 )
		BEGIN
			UPDATE ServiceSchedular
			SET 
				ServiceId = @ServiceId, 
				SchedularId = @SchedularId, 
				LastExecutionTime = @LastExecutionTime, 
				NextExecutionTime = @NextExecutionTime,
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()

			WHERE MapperId = @MapperId ;
		END	
		
		ELSE IF(@MapperId = 0)
		BEGIN
			INSERT INTO ServiceSchedular
			( ServiceId,SchedularId,LastExecutionTime,NextExecutionTime,IsActive,IsDeleted,CreatedBy,CreatedOn )
			VALUES
			( @ServiceId,@SchedularId,@LastExecutionTime,@NextExecutionTime,@IsActive,@IsDeleted,@ActionUser,GETDATE() );
		END

	 SELECT A.ServiceId,A.SchedularId,A.LastExecutionTime,A.NextExecutionTime, A.IsActive, A.IsDeleted
	 FROM ServiceSchedular A 
	 WHERE A.IsDeleted <> 1;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_AlertsServiceVariables_StatusUpdate]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Anuprabha
-- Create date: 12/10/2023
-- Description:	This stored procedure handles  Status Update of AlertsServiceVariables table
-- =============================================
CREATE PROCEDURE [dbo].[SP_AlertsServiceVariables_StatusUpdate]
(
	@VariableId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE AlertsServiceVariables
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE VariableId = @VariableId;

		-- SELECT * FROM AlertsServiceVariables WHERE VariableId = @VariableId;
		SELECT A.VariableId, A.ServiceId, A.VarInstance ,A.VarValue ,A.VarType,
		 A.IsActive,A.IsDeleted,B.Title
	    FROM AlertsServiceVariables A INNER JOIN AlertsServiceMaster B ON A.ServiceId=B.ServiceId
		WHERE VariableId = @VariableId;
END

GO
/****** Object:  StoredProcedure [dbo].[SubRoles_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumeet Goliwar
-- Create date: 25/07/2023
-- Description:	This Stored procedure Maps Roles to specific menus so that only user having permission to specific user will be able to access the page
-- =============================================
CREATE PROCEDURE [dbo].[SubRoles_CRUD]
(
	@SubRoleId	INT,
	@RoleId	INT,
	@MenuId	INT,
	@IsActive	INT = 1,
	@IsDeleted	INT = 0,
	@ActionUser INT
)
AS
BEGIN

	IF NOT EXISTS(SELECT 1 FROM SubRoles WHERE SubRoleId = @SubRoleId ) AND 
		@RoleId <> 0 AND @MenuId <> 0
	BEGIN
		INSERT INTO [dbo].[SubRoles] 
		(RoleId, SubRoleName, SubRoleCode, SubRoleDesc, MenuId,DisplayOrder,IsActive, CreatedBy, CreatedOn,IsDeleted,ModifiedBy,ModifiedOn)
		SELECT 
			@RoleId, 
			B.[MenuName], 
			B.[MenuCode], 
			B.[MenuDesc], 
			B.[MenuId], 
			B.[DisplayOrder], 
			@IsActive, 
			@ActionUser, 
			GETDATE(),
			@IsDeleted, 
			NULL, 
			NULL
			FROM [dbo].[MenuMaster] B
			WHERE B.[MenuId] = @MenuId;

		SELECT @SubRoleId = SCOPE_IDENTITY(); 
	END
	ELSE IF EXISTS(SELECT 1 FROM SubRoles 
							WHERE SubRoleId = @SubRoleId)
	BEGIN
		UPDATE SubRoles
		SET 
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE SubRoleId = @SubRoleId
	END

	SELECT  A.MenuId, A.MenuName, A.MenuCode, A.MenuDesc, A.ParentMenuId,
			@RoleId RoleId, +
			CASE WHEN B.DisplayOrder IS NULL THEN A.DisplayOrder ELSE B.DisplayOrder END AS DisplayOrder
			, B.SubroleId,
			CASE WHEN B.IsActive IS NULL THEN 0 ELSE B.IsActive END AS HasAccess
	FROM dbo.MenuMaster A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.SubRoles B WITH (NOLOCK)
	ON A.MenuId = B.MenuId AND ISNULL(B.RoleId,0) IN (0,@RoleId)

END
GO
/****** Object:  StoredProcedure [dbo].[UserGroupMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserGroupMaster_CRUD]
(
	@GroupId	INT,
	@GroupName	VARCHAR(50),
	@GroupCode	VARCHAR(20),
	@GroupDesc	VARCHAR(500),
	@IsActive	INT = 1,
	@IsDeleted	INT = 0,
	@ActionUser INT
)
AS
BEGIN

	IF NOT EXISTS(SELECT 1 FROM UserGroup WHERE GroupId = @GroupId ) AND LTRIM(RTRIM(ISNULL(@GroupName,''))) <> ''
	BEGIN
		INSERT INTO [dbo].[UserGroup] 
		(GroupName, GroupCode, GroupDesc,IsActive, CreatedBy, CreatedOn,IsDeleted)
		VALUES 
		(@GroupName, @GroupCode, @GroupDesc, @IsActive, @ActionUser, GETDATE(),@IsDeleted);

		SELECT @GroupId = SCOPE_IDENTITY(); 
	END
	ELSE IF EXISTS(SELECT 1 FROM UserGroup 
							WHERE GroupId = @GroupId AND (GroupName <> @GroupName OR GroupCode <> @GroupCode OR GroupDesc <> @GroupDesc OR
							IsActive <> @IsActive OR IsDeleted <> @IsDeleted ))
	BEGIN
		UPDATE UserGroup
		SET GroupName = @GroupName,
			GroupCode = @GroupCode,
			GroupDesc = @GroupDesc,
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE GroupId = @GroupId
	END

	SELECT A.GroupId,A.GroupName,A.GroupCode,A.GroupDesc,A.IsActive,A.IsDeleted,
	CASE WHEN B.UserId IS NULL THEN A.CreatedBy 
			   ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
			   END AS CreatedBy
			   ,A.CreatedOn,A.ModifiedBy,A.ModifiedOn
	FROM dbo.UserGroup A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK)
	ON A.CreatedBy = CONVERT(VARCHAR(50),B.UserId)
	WHERE A.IsDeleted = 0

END
GO
/****** Object:  StoredProcedure [dbo].[UserLogin_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumit Gore
-- Create date: 18/07/2023
-- Description:	This stored procedure handles CRUD operations for Users login credentials.New user credentials will be created or updated with respect to UserID.
-- =============================================
CREATE PROCEDURE [dbo].[UserLogin_CRUD]
(
	@UserId INT,
	@UserName VARCHAR(50),
	@UserPassword VARCHAR(50),
	@ActionUser INT,
	@IsActive INT = 1,
	@IsDeleted INT = 0
)
AS
BEGIN

	DECLARE @ActiveUserId INT = 0;
	IF NOT EXISTS(SELECT 1 FROM UserLogin WHERE UserId = @UserId) AND LTRIM(RTRIM(ISNULL(@UserName,''))) <> ''
	BEGIN
		INSERT INTO UserLogin
		(UserId,UserName,UserPassword,IsActive,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn,IsDeleted)
		VALUES
		(@UserId,@UserName,@UserPassword,@IsActive,@ActionUser,GETDATE(),NULL,NULL,@IsDeleted);


	END
	ELSE IF EXISTS(SELECT 1 FROM UserLogin WHERE UserId = @UserId AND (
			UserName <> @UserName OR
			UserPassword <> @UserPassword OR
			IsActive <> @IsActive OR
			IsDeleted <> @IsDeleted
			) )
	BEGIN
		UPDATE UserLogin
		SET UserName = @UserName,
			UserPassword = @UserPassword,
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE(),
			IsDeleted = @IsDeleted
		WHERE UserId = @UserId;
	END
	 


	SELECT A.[UserId], A.[FirstName], A.[MiddleName], A.[LastName], A.[DOB], A.[MobileNo], A.[EmailId], A.[Designation], A.[IsActive], A.[ProfileImage],
       CASE 
           WHEN B.UserId IS NULL THEN A.CreatedBy 
           ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
       END AS CreatedBy,
       A.[CreatedOn], A.[ModifiedBy], A.[ModifiedOn], A.[IsDeleted], @ActiveUserId AS ActiveUserId,
       C.[UserName] AS UserName -- Adding the UserName column from the UserLogin table
			FROM [dbo].[UserMaster] A 
			LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK) ON A.CreatedBy = CONVERT(VARCHAR(50), B.UserId)
			LEFT OUTER JOIN dbo.UserLogin C WITH (NOLOCK) ON A.UserId = C.UserId -- Joining with UserLogin table
			WHERE A.IsDeleted = 0;

END


GO
/****** Object:  StoredProcedure [dbo].[UserMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumit Gore
-- Create date: 11/07/2023
-- Description:	This stored procedure handles CRUD operations for Users.New user will be added only if input EmailID is Unique.
-- =============================================
CREATE PROCEDURE [dbo].[UserMaster_CRUD]
(
	@UserId INT,
	@FirstName VARCHAR(50),
	@MiddleName VARCHAR(50),
	@LastName VARCHAR(50),
	@DOB DateTime = GETDATE,
	@MobileNo VARCHAR(50),
	@EmailId VARCHAR(50),
	@Designation VARCHAR(50),
	@IsActive INT = 1,
	@IsDeleted INT = 0,
	@ActionUser INT,
	@ProfileImage VARCHAR(255)
)
AS
BEGIN

	DECLARE @ActiveUserId INT = 0;
	IF NOT EXISTS(SELECT 1 FROM UserMaster WHERE UserId = @UserId) AND LTRIM(RTRIM(ISNULL(@EmailId,''))) <> ''
	BEGIN
		INSERT INTO UserMaster
		(FirstName, MiddleName, LastName, DOB, MobileNo, EmailId, Designation, IsActive, CreatedBy, CreatedOn, IsDeleted, ModifiedBy, ModifiedOn,ProfileImage)
		VALUES
		(@FirstName, @MiddleName, @LastName, @DOB, @MobileNo, @EmailId, @Designation, @IsActive, @ActionUser, GETDATE(), @IsDeleted,NULL,NULL,@ProfileImage);

		SELECT @UserId = SCOPE_IDENTITY();
		SELECT @ActiveUserId = @UserId;
	END
	ELSE IF EXISTS(SELECT 1 FROM UserMaster WHERE UserId = @UserId AND (
			ISNULL(FirstName,'') <> ISNULL(@FirstName,'') OR
			ISNULL(MiddleName,'') <> ISNULL(@MiddleName,'') OR
			ISNULL(LastName,'') <> ISNULL(@LastName,'') OR
			ISNULL(DOB,'') <> ISNULL(@DOB,'') OR
			ISNULL(MobileNo,'') <> ISNULL(@MobileNo,'') OR
			ISNULL(EmailId,'') <> ISNULL(@EmailId,'') OR
			ISNULL(Designation,'') <> ISNULL(@Designation,'') OR
			ISNULL(IsActive,'') <> ISNULL(@IsActive,'') OR
			ISNULL(IsDeleted,'') <> ISNULL(@IsDeleted,'') OR
			ISNULL(ProfileImage,'') <> ISNULL(@ProfileImage,'')) )
	BEGIN
		UPDATE UserMaster
		SET FirstName = @FirstName,
			MiddleName = @MiddleName,
			LastName = @LastName,
			DOB = @DOB,
			MobileNo = @MobileNo,
			EmailId = @EmailId,
			Designation = @Designation,
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE(),
			ProfileImage = @ProfileImage
		WHERE UserId = @UserId;
		SELECT @ActiveUserId = @UserId;

		UPDATE UserLogin
		SET IsActive = @IsActive
		WHERE UserId = @UserId;
	END
	 
	DECLARE @TempT TABLE (
		UserId INT,
		WorkCenterCode VARCHAR(50)
	)

	INSERT INTO @TempT
	select A.UserId, B.WorkCenterCode
	from dbo.UserWorkCenter A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.WorkCenterMaster B WITH (NOLOCK)
	ON A.WorkCenterId = B.WorkCenterId AND A.IsDeleted = 0

	SELECT A.[UserId], A.[FirstName], A.[MiddleName], A.[LastName], A.[DOB], A.[MobileNo], A.[EmailId], A.[Designation], A.[IsActive], A.[ProfileImage],
       CASE 
           WHEN B.UserId IS NULL THEN A.CreatedBy 
           ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
       END AS CreatedBy,
       A.[CreatedOn], A.[ModifiedBy], A.[ModifiedOn], A.[IsDeleted], @ActiveUserId AS ActiveUserId,
       C.[UserName] AS UserName, -- Adding the UserName column from the UserLogin table,
	   ISNULL(T.List_Output,'') AS AssignedWC

			FROM [dbo].[UserMaster] A 
			LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK) ON A.CreatedBy = CONVERT(VARCHAR(50), B.UserId)
			LEFT OUTER JOIN dbo.UserLogin C WITH (NOLOCK) ON A.UserId = C.UserId -- Joining with UserLogin table
			LEFT OUTER JOIN (
				SELECT  UserId
					   ,STUFF((SELECT ', ' + CAST(WorkCenterCode AS VARCHAR(10)) [text()]
						 FROM @TempT 
						 WHERE UserId = t.UserId
						 FOR XML PATH(''), TYPE)
						.value('.','NVARCHAR(MAX)'),1,2,' ') List_Output
				FROM @TempT t
				GROUP BY UserId
			) T
			ON T.UserId = A.UserId

END


GO
/****** Object:  StoredProcedure [dbo].[UserMaster_UpdateStatus]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumit Gore
-- Create date: 16/08/2023
-- Description:	This stored procedure handles CRUD operations for Users.New user will be added only if input EmailID is Unique.
-- =============================================
CREATE PROCEDURE [dbo].[UserMaster_UpdateStatus]
(
	@UserId INT,
	@IsActive INT = 1,
	@ActionUser INT
)
AS
BEGIN

		UPDATE UserMaster
		SET
			IsActive = @IsActive,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE UserId = @UserId;

		UPDATE UserLogin
		SET IsActive = @IsActive
		WHERE UserId = @UserId;

		SELECT * FROM UserMaster WHERE UserId = @UserId;
	

END


GO
/****** Object:  StoredProcedure [dbo].[UserRole_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumit Gore
-- Create date: 31/07/2023
-- Description:	This stored procedure handles CRUD operations for UserRole Table. New mapping between user's id and Role's id will be created assigning roles to users .
-- =============================================
CREATE PROCEDURE [dbo].[UserRole_CRUD]
(
	@UserRoleId INT = 0,
	@UserId INT = 0,
	@RoleId INT = 0,
	@IsActive INT ,
	@IsDeleted INT ,
	@ActionUser INT 
	
)
AS
BEGIN

		IF EXISTS(SELECT 1 FROM UserRoles WHERE UserId = @UserId AND RoleId = @RoleId )
		BEGIN
			UPDATE UserRoles
			SET 
				IsActive = @IsActive,
				IsDeleted = @IsDeleted,
				ModifiedBy = @ActionUser,
				ModifiedOn = GETDATE()
				
			WHERE UserId = @UserId AND RoleId = @RoleId;
		END		
		ELSE IF(@UserRoleId = 0 AND @UserId <> 0 AND @RoleId <> 0)
		BEGIN
			INSERT INTO UserRoles
			(UserId, RoleId,IsActive,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn,IsDeleted)
			VALUES
			(@UserId,@RoleId,@IsActive,@ActionUser,GETDATE(),NULL,NULL,@IsDeleted);

		END

	
	 
	 SELECT A.UserRoleId ,A.RoleId, B.RoleName, A.UserId,A.IsActive,A.IsDeleted
	 FROM [dbo].[UserRoles] A
		LEFT OUTER JOIN dbo.Roles B WITH (NOLOCK) ON B.RoleId = A.RoleId
	 WHERE A.UserId = @UserId AND A.IsDeleted = 0;
END



GO
/****** Object:  StoredProcedure [dbo].[UserRolesByUserId]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserRolesByUserId]
(
	@UserId INT
)
AS 
BEGIN
	IF OBJECT_ID('tempdb..#MenuMaster') IS NOT NULL DROP TABLE #MenuMaster;

	SELECT SubRoleId, B.RoleId, C.MenuName as SubRoleName
		   , C.MenuCode SubRoleCode --Menu Code must be unique for each menu as it binds pageload function on top of it
		   , SubRoleDesc, B.MenuId, C.DisplayOrder, ParentMenuId, DefaultChildMenuId, MenuIconUrl, TemplatePath 
	INTO #MenuMaster
	FROM UserRoles A WITH (NOLOCK)
	LEFT OUTER JOIN SubRoles B WITH (NOLOCK)
	ON A.RoleId = B.RoleId
	LEFT OUTER JOIN MenuMaster C WITH (NOLOCK)
	ON B.MenuId = C.MenuId
	WHERE A.UserId = @UserId AND B.IsDeleted = 0;

	ALTER TABLE #MenuMaster ADD IsParent INT DEFAULT 0, ChildrenCount INT DEFAULT 0, ChildIsParent INT DEFAULT 0;

	--Marking the Parent Menu
	UPDATE #MenuMaster SET IsParent = (CASE WHEN ParentMenuId = 0 THEN 1 ELSE 0 END );

	--Marking the Children Count for Menu
	UPDATE M 
	SET M.ChildrenCount = ISNULL(B.ChildrenCount,0), M.ChildIsParent = 0
	FROM #MenuMaster M
	LEFT OUTER JOIN (
		SELECT A.MenuId, COUNT(1) ChildrenCount
		FROM #MenuMaster A
		LEFT OUTER JOIN #MenuMaster B
		ON A.MenuId = B.ParentMenuId
		WHERE A.IsParent = 1 GROUP BY A.MenuId
	) B
	ON M.MenuId = B.MenuId;

	--Marking the Children without Parent
	UPDATE A SET A.ChildIsParent = 1
	FROM #MenuMaster A
	WHERE A.ParentMenuId NOT IN
	(
		SELECT MenuId FROM  #MenuMaster B 
	) AND A.IsParent <> 1;

	SELECT * FROM #MenuMaster ORDER BY DisplayOrder ;

END
GO
/****** Object:  StoredProcedure [dbo].[UserTimeTracking_Create]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sumit Gore
-- Create date: 17/08/2023
-- Description:	This stored procedure populates the data on UserTimeTracking
-- =============================================
CREATE PROCEDURE [dbo].[UserTimeTracking_Create]
	@PageCode VARCHAR(50),
	@ActionUser INT,
	@StartTime DATETIME,
	@EndTime DATETIME,
	@Duration INT
AS
BEGIN
	INSERT INTO [dbo].[UserTimeTracking]
		(PageCode,UserId,StartTime,EndTime,Duration,LogTime)
	VALUES
		(@PageCode,@ActionUser,@StartTime,@EndTime,@Duration,GETDATE())
END
GO
/****** Object:  StoredProcedure [dbo].[ValidateUserLogin]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ValidateUserLogin]
(
	@UserName VARCHAR(50),
	@UserPassword VARCHAR(500)
)
AS
BEGIN
	DECLARE @ResponseCode INT, @ResponseDescription VARCHAR(500), @UserId INT = -1, @LogStatus VARCHAR(10) = 'FAILED';

	IF EXISTS (SELECT 1 FROM UserLogin WITH (NOLOCK) WHERE UserName = @UserName AND UserPassword <> @UserPassword)
	BEGIN
		SELECT @ResponseCode = 501, @ResponseDescription = 'User entered wrong Password';
		GOTO HANDLER;
	END
	ELSE IF NOT EXISTS (SELECT 1 FROM UserLogin WITH (NOLOCK) WHERE UserName = @UserName AND UserPassword = @UserPassword)
	BEGIN
		SELECT @ResponseCode = 502, @ResponseDescription = 'User Login not exists';
		GOTO HANDLER;
	END
	ELSE IF EXISTS (SELECT 1 FROM UserLogin WITH (NOLOCK) WHERE UserName = @UserName AND UserPassword = @UserPassword AND IsActive = 0)
	BEGIN
		SELECT @ResponseCode = 503, @ResponseDescription = 'User Login is disabled';
		GOTO HANDLER;
	END
	ELSE IF EXISTS (SELECT 1 
					FROM UserLogin A WITH (NOLOCK) 
					LEFT OUTER JOIN UserMaster B WITH (NOLOCK)
					ON A.UserId = B.UserId
					WHERE UserName = @UserName AND UserPassword = @UserPassword AND A.IsActive = 1 AND B.IsActive = 0 AND B.IsDeleted = 0)
	BEGIN
		SELECT @ResponseCode = 504, @ResponseDescription = 'User is disabled';
		GOTO HANDLER;
	END
	ELSE IF EXISTS (SELECT 1 
					FROM UserLogin A WITH (NOLOCK) 
					LEFT OUTER JOIN UserMaster B WITH (NOLOCK)
					ON A.UserId = B.UserId
					WHERE UserName = @UserName AND UserPassword = @UserPassword AND A.IsActive = 1 AND B.IsDeleted = 1)
	BEGIN
		SELECT @ResponseCode = 505, @ResponseDescription = 'User is deleted';
		GOTO HANDLER;
	END
	ELSE IF EXISTS (SELECT 1 
					FROM UserLogin A WITH (NOLOCK) 
					LEFT OUTER JOIN UserMaster B WITH (NOLOCK)
					ON A.UserId = B.UserId
					WHERE UserName = @UserName AND UserPassword = @UserPassword AND A.IsActive = 1 AND B.IsActive = 1 AND B.IsDeleted = 0)
	BEGIN
		SELECT @ResponseCode = 200, @ResponseDescription = 'User Login Success!!';
		
		SELECT @UserId = UserId, @LogStatus = 'SUCCESS'
		FROM UserLogin WITH (NOLOCK)
		WHERE UserName = @UserName AND UserPassword = @UserPassword;

		UPDATE UserLogin SET LastLoggedDate = GETDATE() WHERE UserId = @UserId;

	END

	HANDLER:
	BEGIN
		INSERT INTO UserLoginLog (UserId, UserName, UserPassword, LoggedTime, LogStatus, LogDescription) 
		VALUES (@UserId, @UserName, @UserPassword, GETDATE(), @LogStatus, @ResponseDescription);

		SELECT A.ResponseCode, A.ResponseDescription,B.*,C.UserRoles RoleId 
		FROM (
			SELECT @ResponseCode ResponseCode, @ResponseDescription ResponseDescription, @UserId UserId
		) A
		LEFT OUTER JOIN UserMaster B WITH (NOLOCK) 
		ON A.UserId = B.UserId
		LEFT OUTER JOIN (
					SELECT  UserId
						   ,STUFF((SELECT ', ' + CAST(RoleId AS VARCHAR(10)) [UserRoles]
							 FROM dbo.UserROles 
							 WHERE UserId = t.UserId AND IsActive = 1
							 FOR XML PATH(''), TYPE)
							.value('.','NVARCHAR(MAX)'),1,2,' ') UserRoles
					FROM dbo.UserROles t
					GROUP BY UserId
		) C
		ON A.UserId = C.UserId
	END

END
GO
/****** Object:  StoredProcedure [dbo].[WorkCenterMaster_CRUD]    Script Date: 10/14/2023 11:13:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[WorkCenterMaster_CRUD]
(
	@WorkCenterId	BIGINT,
	@WorkCenterName	VARCHAR(50),
	@WorkCenterCode	VARCHAR(20),
	@WorkCenterDesc	VARCHAR(500),
	@DisplaySeq INT,
	@IsActive	INT = 1,
	@IsDeleted	INT = 0,
	@ActionUser INT
)
AS	
BEGIN

	IF NOT EXISTS(SELECT 1 FROM [dbo].[WorkCenterMaster] WHERE WorkCenterId = @WorkCenterId ) AND 
		(LTRIM(RTRIM(ISNULL(@WorkCenterName,''))) <> '' AND
		LTRIM(RTRIM(ISNULL(@WorkCenterCode,''))) <> '')
	BEGIN
		INSERT INTO [dbo].[WorkCenterMaster] 
		(WorkCenterName, WorkCenterCode, WorkCenterDesc,DisplaySeq,IsActive, CreatedBy, CreatedOn,ModifiedBy,ModifiedOn,IsDeleted)
		VALUES 
		(@WorkCenterName, @WorkCenterCode, @WorkCenterDesc,@DisplaySeq, @IsActive, @ActionUser, GETDATE(),NULL,NULL,@IsDeleted);

		SELECT @WorkCenterId = SCOPE_IDENTITY(); 
	END
	ELSE IF EXISTS(SELECT 1 FROM [dbo].[WorkCenterMaster]
							WHERE WorkCenterId = @WorkCenterId AND (WorkCenterName <> @WorkCenterName OR WorkCenterCode <> @WorkCenterCode OR WorkCenterDesc <> @WorkCenterDesc OR
							DisplaySeq <> @DisplaySeq OR IsActive <> @IsActive OR IsDeleted <> @IsDeleted ))
	BEGIN
		UPDATE [dbo].[WorkCenterMaster]
		SET WorkCenterName = @WorkCenterName,
			WorkCenterCode = @WorkCenterCode,
			WorkCenterDesc = @WorkCenterDesc,
			DisplaySeq = @DisplaySeq,
			IsActive = @IsActive,
			IsDeleted = @IsDeleted,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE WorkCenterId = @WorkCenterId
	END

	SELECT A.WorkCenterId,A.WorkCenterName,A.WorkCenterCode,A.WorkCenterDesc,A.DisplaySeq,A.IsActive,A.IsDeleted,
	CASE WHEN B.UserId IS NULL THEN A.CreatedBy 
			   ELSE (ISNULL(B.FirstName + ' ','') + ISNULL(B.LastName,''))		   
			   END AS CreatedBy
			   ,A.CreatedOn,A.ModifiedBy,A.ModifiedOn
	FROM [dbo].[WorkCenterMaster] A WITH (NOLOCK)
	LEFT OUTER JOIN dbo.UserMaster B WITH (NOLOCK)
	ON A.CreatedBy = CONVERT(VARCHAR(50),B.UserId)
	WHERE A.IsDeleted = 0

END
GO
