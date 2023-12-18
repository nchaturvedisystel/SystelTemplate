namespace PushNotification
{
    partial class Rule
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            AlertServiceMaster = new TabControl();
            AlertServiceMaster1 = new TabPage();
            ASMTitle = new TextBox();
            ASMPostDataSrv = new ComboBox();
            ASMPostSrcDef = new TextBox();
            ASMOutputFileName = new TextBox();
            ASMDatasourceDef = new TextBox();
            ASMBody = new TextBox();
            ASMSubject = new TextBox();
            ASMBcc = new TextBox();
            ASMCC = new TextBox();
            ASMEmail = new TextBox();
            label17 = new Label();
            label16 = new Label();
            label15 = new Label();
            button1 = new Button();
            label12 = new Label();
            label11 = new Label();
            label10 = new Label();
            label9 = new Label();
            label8 = new Label();
            label7 = new Label();
            ASMOutsource = new ComboBox();
            label6 = new Label();
            ASMFileType = new ComboBox();
            label5 = new Label();
            ASMBrowse = new Button();
            label4 = new Label();
            ASMAttachment = new ComboBox();
            label3 = new Label();
            ASMType = new ComboBox();
            label2 = new Label();
            label1 = new Label();
            DBConfig = new TabPage();
            button7 = new Button();
            DBConfigPassword = new Label();
            Passwrd = new TextBox();
            DBName = new TextBox();
            UserName = new TextBox();
            ServerName = new TextBox();
            ConName = new TextBox();
            IsActiveCheckBox = new CheckBox();
            DBConfigName = new Label();
            DBConfigUser = new Label();
            DBConfigServer = new Label();
            DBConfigConn = new Label();
            EmailConfigStatus = new TabPage();
            checkBox2 = new CheckBox();
            EmailConfirm = new Button();
            PassConfig = new TextBox();
            FromConfig = new TextBox();
            PortConfig = new TextBox();
            HostConf = new TextBox();
            EConfigPort = new Label();
            DescText = new TextBox();
            TitleText = new TextBox();
            RuleStatus = new Label();
            Password = new Label();
            FromEmailId = new Label();
            Host = new Label();
            RuleDesc = new Label();
            RuleTitle = new Label();
            SConfigClose = new TabPage();
            button2 = new Button();
            SConfigType = new ComboBox();
            SchedulerIsActive = new CheckBox();
            SchedularFreq = new TextBox();
            FrequencyInMinutes = new Label();
            SchedularType = new Label();
            SchedularDesc = new Label();
            SchedularCode = new Label();
            SchedularDescText = new TextBox();
            SchedularCodeTxt = new TextBox();
            SchedulerName = new TextBox();
            SchedularName = new Label();
            ServiceVariables = new TabPage();
            checkBox1 = new CheckBox();
            button5 = new Button();
            VarTypeTextBox = new TextBox();
            VarValueTextBox = new TextBox();
            VarInstanceTextBox = new TextBox();
            VarType = new Label();
            VarValue = new Label();
            VarInstance = new Label();
            ServiceScheduler = new TabPage();
            button6 = new Button();
            DailyEndsOn = new DateTimePicker();
            DailyStartsOn = new DateTimePicker();
            SchedularIsAct = new CheckBox();
            StartsFromDate = new DateTimePicker();
            EndsOnDate = new DateTimePicker();
            NextExecution = new DateTimePicker();
            dateTimePicker1 = new DateTimePicker();
            comboBox3 = new ComboBox();
            comboBox2 = new ComboBox();
            SchedularDailyEnds = new Label();
            SchedularDailyStart = new Label();
            SchedularEnds = new Label();
            SchedularStarts = new Label();
            SchedularNextExc = new Label();
            SchedularLastExec = new Label();
            SchedularSchedularName = new Label();
            SchedularServiceName = new Label();
            button3 = new Button();
            button4 = new Button();
            openFileDialog1 = new OpenFileDialog();
            fileSystemWatcher1 = new FileSystemWatcher();
            AlertServiceMaster.SuspendLayout();
            AlertServiceMaster1.SuspendLayout();
            DBConfig.SuspendLayout();
            EmailConfigStatus.SuspendLayout();
            SConfigClose.SuspendLayout();
            ServiceVariables.SuspendLayout();
            ServiceScheduler.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)fileSystemWatcher1).BeginInit();
            SuspendLayout();
            // 
            // AlertServiceMaster
            // 
            AlertServiceMaster.AccessibleName = "Report";
            AlertServiceMaster.Controls.Add(AlertServiceMaster1);
            AlertServiceMaster.Controls.Add(DBConfig);
            AlertServiceMaster.Controls.Add(EmailConfigStatus);
            AlertServiceMaster.Controls.Add(SConfigClose);
            AlertServiceMaster.Controls.Add(ServiceVariables);
            AlertServiceMaster.Controls.Add(ServiceScheduler);
            AlertServiceMaster.Location = new Point(-4, 2);
            AlertServiceMaster.Name = "AlertServiceMaster";
            AlertServiceMaster.SelectedIndex = 0;
            AlertServiceMaster.Size = new Size(667, 468);
            AlertServiceMaster.TabIndex = 0;
            AlertServiceMaster.Tag = "";
            // 
            // AlertServiceMaster1
            // 
            AlertServiceMaster1.Controls.Add(ASMTitle);
            AlertServiceMaster1.Controls.Add(ASMPostDataSrv);
            AlertServiceMaster1.Controls.Add(ASMPostSrcDef);
            AlertServiceMaster1.Controls.Add(ASMOutputFileName);
            AlertServiceMaster1.Controls.Add(ASMDatasourceDef);
            AlertServiceMaster1.Controls.Add(ASMBody);
            AlertServiceMaster1.Controls.Add(ASMSubject);
            AlertServiceMaster1.Controls.Add(ASMBcc);
            AlertServiceMaster1.Controls.Add(ASMCC);
            AlertServiceMaster1.Controls.Add(ASMEmail);
            AlertServiceMaster1.Controls.Add(label17);
            AlertServiceMaster1.Controls.Add(label16);
            AlertServiceMaster1.Controls.Add(label15);
            AlertServiceMaster1.Controls.Add(button1);
            AlertServiceMaster1.Controls.Add(label12);
            AlertServiceMaster1.Controls.Add(label11);
            AlertServiceMaster1.Controls.Add(label10);
            AlertServiceMaster1.Controls.Add(label9);
            AlertServiceMaster1.Controls.Add(label8);
            AlertServiceMaster1.Controls.Add(label7);
            AlertServiceMaster1.Controls.Add(ASMOutsource);
            AlertServiceMaster1.Controls.Add(label6);
            AlertServiceMaster1.Controls.Add(ASMFileType);
            AlertServiceMaster1.Controls.Add(label5);
            AlertServiceMaster1.Controls.Add(ASMBrowse);
            AlertServiceMaster1.Controls.Add(label4);
            AlertServiceMaster1.Controls.Add(ASMAttachment);
            AlertServiceMaster1.Controls.Add(label3);
            AlertServiceMaster1.Controls.Add(ASMType);
            AlertServiceMaster1.Controls.Add(label2);
            AlertServiceMaster1.Controls.Add(label1);
            AlertServiceMaster1.Location = new Point(4, 24);
            AlertServiceMaster1.Name = "AlertServiceMaster1";
            AlertServiceMaster1.Size = new Size(659, 440);
            AlertServiceMaster1.TabIndex = 6;
            AlertServiceMaster1.Text = "AlertServiceMaster";
            AlertServiceMaster1.UseVisualStyleBackColor = true;
            AlertServiceMaster1.Click += AlertServiceMaster1_Click;
            // 
            // ASMTitle
            // 
            ASMTitle.Location = new Point(138, 17);
            ASMTitle.Name = "ASMTitle";
            ASMTitle.Size = new Size(167, 23);
            ASMTitle.TabIndex = 77;
            // 
            // ASMPostDataSrv
            // 
            ASMPostDataSrv.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            ASMPostDataSrv.FormattingEnabled = true;
            ASMPostDataSrv.Items.AddRange(new object[] { "Crystal Report", "SQL Queries" });
            ASMPostDataSrv.Location = new Point(454, 51);
            ASMPostDataSrv.Name = "ASMPostDataSrv";
            ASMPostDataSrv.Size = new Size(167, 23);
            ASMPostDataSrv.TabIndex = 76;
            ASMPostDataSrv.Text = "SQL Queries";
            // 
            // ASMPostSrcDef
            // 
            ASMPostSrcDef.Location = new Point(454, 84);
            ASMPostSrcDef.Multiline = true;
            ASMPostSrcDef.Name = "ASMPostSrcDef";
            ASMPostSrcDef.Size = new Size(192, 68);
            ASMPostSrcDef.TabIndex = 75;
            // 
            // ASMOutputFileName
            // 
            ASMOutputFileName.Location = new Point(454, 18);
            ASMOutputFileName.Name = "ASMOutputFileName";
            ASMOutputFileName.Size = new Size(167, 23);
            ASMOutputFileName.TabIndex = 72;
            // 
            // ASMDatasourceDef
            // 
            ASMDatasourceDef.Location = new Point(454, 187);
            ASMDatasourceDef.Multiline = true;
            ASMDatasourceDef.Name = "ASMDatasourceDef";
            ASMDatasourceDef.Size = new Size(192, 56);
            ASMDatasourceDef.TabIndex = 69;
            // 
            // ASMBody
            // 
            ASMBody.Location = new Point(138, 351);
            ASMBody.Multiline = true;
            ASMBody.Name = "ASMBody";
            ASMBody.Size = new Size(167, 72);
            ASMBody.TabIndex = 67;
            // 
            // ASMSubject
            // 
            ASMSubject.Location = new Point(138, 322);
            ASMSubject.Name = "ASMSubject";
            ASMSubject.Size = new Size(167, 23);
            ASMSubject.TabIndex = 65;
            // 
            // ASMBcc
            // 
            ASMBcc.Location = new Point(138, 289);
            ASMBcc.Name = "ASMBcc";
            ASMBcc.Size = new Size(167, 23);
            ASMBcc.TabIndex = 63;
            // 
            // ASMCC
            // 
            ASMCC.Location = new Point(138, 256);
            ASMCC.Name = "ASMCC";
            ASMCC.Size = new Size(167, 23);
            ASMCC.TabIndex = 61;
            // 
            // ASMEmail
            // 
            ASMEmail.Location = new Point(138, 225);
            ASMEmail.Name = "ASMEmail";
            ASMEmail.Size = new Size(167, 23);
            ASMEmail.TabIndex = 59;
            // 
            // label17
            // 
            label17.AutoSize = true;
            label17.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label17.Location = new Point(329, 84);
            label17.Name = "label17";
            label17.Size = new Size(109, 18);
            label17.TabIndex = 74;
            label17.Text = "Post SourceDef :";
            // 
            // label16
            // 
            label16.AutoSize = true;
            label16.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label16.Location = new Point(329, 51);
            label16.Name = "label16";
            label16.Size = new Size(115, 18);
            label16.TabIndex = 73;
            label16.Text = "Post DataSource :";
            // 
            // label15
            // 
            label15.AutoSize = true;
            label15.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label15.Location = new Point(329, 18);
            label15.Name = "label15";
            label15.Size = new Size(119, 18);
            label15.TabIndex = 71;
            label15.Text = "Output FileName:";
            // 
            // button1
            // 
            button1.Location = new Point(571, 400);
            button1.Name = "button1";
            button1.Size = new Size(75, 23);
            button1.TabIndex = 70;
            button1.Text = "Confirm";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click_2;
            // 
            // label12
            // 
            label12.AutoSize = true;
            label12.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label12.Location = new Point(329, 192);
            label12.Name = "label12";
            label12.Size = new Size(110, 18);
            label12.TabIndex = 68;
            label12.Text = "DataSource Def :";
            // 
            // label11
            // 
            label11.AutoSize = true;
            label11.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label11.Location = new Point(13, 351);
            label11.Name = "label11";
            label11.Size = new Size(46, 18);
            label11.TabIndex = 66;
            label11.Text = "Body :";
            // 
            // label10
            // 
            label10.AutoSize = true;
            label10.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label10.Location = new Point(13, 322);
            label10.Name = "label10";
            label10.Size = new Size(61, 18);
            label10.TabIndex = 64;
            label10.Text = "Subject :";
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label9.Location = new Point(13, 289);
            label9.Name = "label9";
            label9.Size = new Size(52, 18);
            label9.TabIndex = 62;
            label9.Text = "Bcc To :";
            // 
            // label8
            // 
            label8.AutoSize = true;
            label8.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label8.Location = new Point(13, 256);
            label8.Name = "label8";
            label8.Size = new Size(48, 18);
            label8.TabIndex = 60;
            label8.Text = "CC To :";
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label7.Location = new Point(13, 225);
            label7.Name = "label7";
            label7.Size = new Size(66, 18);
            label7.TabIndex = 58;
            label7.Text = "Email To :";
            // 
            // ASMOutsource
            // 
            ASMOutsource.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            ASMOutsource.FormattingEnabled = true;
            ASMOutsource.Items.AddRange(new object[] { "Crystal Report", "SQL Queries" });
            ASMOutsource.Location = new Point(138, 192);
            ASMOutsource.Name = "ASMOutsource";
            ASMOutsource.Size = new Size(167, 23);
            ASMOutsource.TabIndex = 57;
            ASMOutsource.Text = "SQL Queries";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label6.Location = new Point(13, 192);
            label6.Name = "label6";
            label6.Size = new Size(111, 18);
            label6.TabIndex = 56;
            label6.Text = "Outsource Type :";
            // 
            // ASMFileType
            // 
            ASMFileType.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            ASMFileType.FormattingEnabled = true;
            ASMFileType.Items.AddRange(new object[] { "PDF", "Excel" });
            ASMFileType.Location = new Point(138, 157);
            ASMFileType.Name = "ASMFileType";
            ASMFileType.Size = new Size(167, 23);
            ASMFileType.TabIndex = 55;
            ASMFileType.Text = "PDF";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label5.Location = new Point(13, 157);
            label5.Name = "label5";
            label5.Size = new Size(70, 18);
            label5.TabIndex = 54;
            label5.Text = "File Type :";
            // 
            // ASMBrowse
            // 
            ASMBrowse.Location = new Point(138, 118);
            ASMBrowse.Name = "ASMBrowse";
            ASMBrowse.Size = new Size(87, 27);
            ASMBrowse.TabIndex = 53;
            ASMBrowse.Text = "Browse";
            ASMBrowse.UseVisualStyleBackColor = true;
            ASMBrowse.Click += ASMBrowse_Click_1;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label4.Location = new Point(13, 118);
            label4.Name = "label4";
            label4.Size = new Size(119, 18);
            label4.TabIndex = 52;
            label4.Text = "Attachment Path :";
            // 
            // ASMAttachment
            // 
            ASMAttachment.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            ASMAttachment.FormattingEnabled = true;
            ASMAttachment.Items.AddRange(new object[] { "Crystal Report", "HTML" });
            ASMAttachment.Location = new Point(138, 84);
            ASMAttachment.Name = "ASMAttachment";
            ASMAttachment.Size = new Size(167, 23);
            ASMAttachment.TabIndex = 51;
            ASMAttachment.Text = "Crystal Report";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label3.Location = new Point(13, 84);
            label3.Name = "label3";
            label3.Size = new Size(120, 18);
            label3.TabIndex = 50;
            label3.Text = "Attachment Type :";
            // 
            // ASMType
            // 
            ASMType.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            ASMType.FormattingEnabled = true;
            ASMType.Items.AddRange(new object[] { "Email", "SMS", "Whatsapp" });
            ASMType.Location = new Point(138, 51);
            ASMType.Name = "ASMType";
            ASMType.Size = new Size(167, 23);
            ASMType.TabIndex = 49;
            ASMType.Text = "Email";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(13, 51);
            label2.Name = "label2";
            label2.Size = new Size(78, 18);
            label2.TabIndex = 48;
            label2.Text = "Alert Type :";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(13, 18);
            label1.Name = "label1";
            label1.Size = new Size(43, 18);
            label1.TabIndex = 46;
            label1.Text = "Title :";
            // 
            // DBConfig
            // 
            DBConfig.Controls.Add(button7);
            DBConfig.Controls.Add(DBConfigPassword);
            DBConfig.Controls.Add(Passwrd);
            DBConfig.Controls.Add(DBName);
            DBConfig.Controls.Add(UserName);
            DBConfig.Controls.Add(ServerName);
            DBConfig.Controls.Add(ConName);
            DBConfig.Controls.Add(IsActiveCheckBox);
            DBConfig.Controls.Add(DBConfigName);
            DBConfig.Controls.Add(DBConfigUser);
            DBConfig.Controls.Add(DBConfigServer);
            DBConfig.Controls.Add(DBConfigConn);
            DBConfig.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfig.Location = new Point(4, 24);
            DBConfig.Name = "DBConfig";
            DBConfig.Padding = new Padding(3);
            DBConfig.Size = new Size(659, 440);
            DBConfig.TabIndex = 1;
            DBConfig.Text = "DBConfig";
            DBConfig.UseVisualStyleBackColor = true;
            DBConfig.Click += DBConfig_Click;
            // 
            // button7
            // 
            button7.Location = new Point(554, 394);
            button7.Name = "button7";
            button7.Size = new Size(75, 23);
            button7.TabIndex = 71;
            button7.Text = "Confirm";
            button7.UseVisualStyleBackColor = true;
            button7.Click += button7_Click;
            // 
            // DBConfigPassword
            // 
            DBConfigPassword.AutoSize = true;
            DBConfigPassword.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfigPassword.Location = new Point(6, 159);
            DBConfigPassword.Name = "DBConfigPassword";
            DBConfigPassword.Size = new Size(67, 18);
            DBConfigPassword.TabIndex = 20;
            DBConfigPassword.Text = "Password";
            // 
            // Passwrd
            // 
            Passwrd.Location = new Point(146, 159);
            Passwrd.Name = "Passwrd";
            Passwrd.Size = new Size(265, 26);
            Passwrd.TabIndex = 19;
            Passwrd.TextChanged += Passwrd_TextChanged;
            // 
            // DBName
            // 
            DBName.ForeColor = Color.Black;
            DBName.Location = new Point(146, 127);
            DBName.Name = "DBName";
            DBName.Size = new Size(265, 26);
            DBName.TabIndex = 18;
            DBName.TextChanged += textBox9_TextChanged;
            // 
            // UserName
            // 
            UserName.Location = new Point(146, 95);
            UserName.Name = "UserName";
            UserName.Size = new Size(265, 26);
            UserName.TabIndex = 17;
            // 
            // ServerName
            // 
            ServerName.Location = new Point(146, 63);
            ServerName.Name = "ServerName";
            ServerName.Size = new Size(265, 26);
            ServerName.TabIndex = 16;
            // 
            // ConName
            // 
            ConName.Location = new Point(146, 31);
            ConName.Name = "ConName";
            ConName.Size = new Size(265, 26);
            ConName.TabIndex = 15;
            ConName.TextChanged += textBox6_TextChanged;
            // 
            // IsActiveCheckBox
            // 
            IsActiveCheckBox.AutoSize = true;
            IsActiveCheckBox.Location = new Point(6, 207);
            IsActiveCheckBox.Name = "IsActiveCheckBox";
            IsActiveCheckBox.Size = new Size(75, 22);
            IsActiveCheckBox.TabIndex = 14;
            IsActiveCheckBox.Text = "IsActive";
            IsActiveCheckBox.UseVisualStyleBackColor = true;
            IsActiveCheckBox.CheckedChanged += RuleSetDSCheckBox_CheckedChanged;
            // 
            // DBConfigName
            // 
            DBConfigName.AutoSize = true;
            DBConfigName.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfigName.Location = new Point(6, 127);
            DBConfigName.Name = "DBConfigName";
            DBConfigName.Size = new Size(65, 18);
            DBConfigName.TabIndex = 3;
            DBConfigName.Text = "DB Name";
            // 
            // DBConfigUser
            // 
            DBConfigUser.AutoSize = true;
            DBConfigUser.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfigUser.Location = new Point(6, 95);
            DBConfigUser.Name = "DBConfigUser";
            DBConfigUser.Size = new Size(76, 18);
            DBConfigUser.TabIndex = 2;
            DBConfigUser.Text = "User Name";
            // 
            // DBConfigServer
            // 
            DBConfigServer.AutoSize = true;
            DBConfigServer.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfigServer.Location = new Point(6, 63);
            DBConfigServer.Name = "DBConfigServer";
            DBConfigServer.Size = new Size(88, 18);
            DBConfigServer.TabIndex = 1;
            DBConfigServer.Text = "Server Name";
            // 
            // DBConfigConn
            // 
            DBConfigConn.AutoSize = true;
            DBConfigConn.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            DBConfigConn.Location = new Point(6, 31);
            DBConfigConn.Name = "DBConfigConn";
            DBConfigConn.Size = new Size(118, 18);
            DBConfigConn.TabIndex = 0;
            DBConfigConn.Text = "Connection Name";
            // 
            // EmailConfigStatus
            // 
            EmailConfigStatus.AccessibleName = "";
            EmailConfigStatus.Controls.Add(checkBox2);
            EmailConfigStatus.Controls.Add(EmailConfirm);
            EmailConfigStatus.Controls.Add(PassConfig);
            EmailConfigStatus.Controls.Add(FromConfig);
            EmailConfigStatus.Controls.Add(PortConfig);
            EmailConfigStatus.Controls.Add(HostConf);
            EmailConfigStatus.Controls.Add(EConfigPort);
            EmailConfigStatus.Controls.Add(DescText);
            EmailConfigStatus.Controls.Add(TitleText);
            EmailConfigStatus.Controls.Add(RuleStatus);
            EmailConfigStatus.Controls.Add(Password);
            EmailConfigStatus.Controls.Add(FromEmailId);
            EmailConfigStatus.Controls.Add(Host);
            EmailConfigStatus.Controls.Add(RuleDesc);
            EmailConfigStatus.Controls.Add(RuleTitle);
            EmailConfigStatus.Location = new Point(4, 24);
            EmailConfigStatus.Name = "EmailConfigStatus";
            EmailConfigStatus.Padding = new Padding(3);
            EmailConfigStatus.Size = new Size(659, 440);
            EmailConfigStatus.TabIndex = 0;
            EmailConfigStatus.Text = "EmailConfig";
            EmailConfigStatus.UseVisualStyleBackColor = true;
            EmailConfigStatus.Click += EmailConfig_Click;
            // 
            // checkBox2
            // 
            checkBox2.AutoSize = true;
            checkBox2.Location = new Point(140, 335);
            checkBox2.Name = "checkBox2";
            checkBox2.Size = new Size(15, 14);
            checkBox2.TabIndex = 25;
            checkBox2.UseVisualStyleBackColor = true;
            // 
            // EmailConfirm
            // 
            EmailConfirm.Location = new Point(7, 379);
            EmailConfirm.Name = "EmailConfirm";
            EmailConfirm.Size = new Size(75, 23);
            EmailConfirm.TabIndex = 24;
            EmailConfirm.Text = "Confirm";
            EmailConfirm.UseVisualStyleBackColor = true;
            EmailConfirm.Click += EmailConfirm_Click;
            // 
            // PassConfig
            // 
            PassConfig.Location = new Point(140, 304);
            PassConfig.Name = "PassConfig";
            PassConfig.Size = new Size(191, 23);
            PassConfig.TabIndex = 21;
            PassConfig.TextChanged += PassConfig_TextChanged;
            // 
            // FromConfig
            // 
            FromConfig.Location = new Point(140, 275);
            FromConfig.Name = "FromConfig";
            FromConfig.Size = new Size(191, 23);
            FromConfig.TabIndex = 20;
            FromConfig.TextChanged += PortConfig_TextChanged;
            // 
            // PortConfig
            // 
            PortConfig.Location = new Point(140, 246);
            PortConfig.Name = "PortConfig";
            PortConfig.Size = new Size(191, 23);
            PortConfig.TabIndex = 19;
            PortConfig.TextChanged += EmailFrom_TextChanged;
            // 
            // HostConf
            // 
            HostConf.Location = new Point(140, 217);
            HostConf.Name = "HostConf";
            HostConf.Size = new Size(191, 23);
            HostConf.TabIndex = 18;
            // 
            // EConfigPort
            // 
            EConfigPort.AutoSize = true;
            EConfigPort.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            EConfigPort.Location = new Point(7, 246);
            EConfigPort.Name = "EConfigPort";
            EConfigPort.Size = new Size(34, 18);
            EConfigPort.TabIndex = 17;
            EConfigPort.Text = "Port";
            EConfigPort.Click += label1_Click_1;
            // 
            // DescText
            // 
            DescText.Location = new Point(140, 57);
            DescText.Multiline = true;
            DescText.Name = "DescText";
            DescText.Size = new Size(345, 132);
            DescText.TabIndex = 8;
            // 
            // TitleText
            // 
            TitleText.Location = new Point(140, 28);
            TitleText.Name = "TitleText";
            TitleText.Size = new Size(191, 23);
            TitleText.TabIndex = 7;
            TitleText.TextChanged += textBox1_TextChanged;
            // 
            // RuleStatus
            // 
            RuleStatus.AutoSize = true;
            RuleStatus.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            RuleStatus.Location = new Point(7, 334);
            RuleStatus.Name = "RuleStatus";
            RuleStatus.Size = new Size(56, 18);
            RuleStatus.TabIndex = 6;
            RuleStatus.Text = "IsActive";
            // 
            // Password
            // 
            Password.AutoSize = true;
            Password.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            Password.Location = new Point(7, 304);
            Password.Name = "Password";
            Password.Size = new Size(67, 18);
            Password.TabIndex = 5;
            Password.Text = "Password";
            // 
            // FromEmailId
            // 
            FromEmailId.AutoSize = true;
            FromEmailId.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            FromEmailId.Location = new Point(7, 275);
            FromEmailId.Name = "FromEmailId";
            FromEmailId.Size = new Size(100, 18);
            FromEmailId.TabIndex = 4;
            FromEmailId.Text = "From(Email ID)";
            // 
            // Host
            // 
            Host.AutoSize = true;
            Host.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            Host.Location = new Point(7, 217);
            Host.Name = "Host";
            Host.Size = new Size(36, 18);
            Host.TabIndex = 2;
            Host.Text = "Host";
            // 
            // RuleDesc
            // 
            RuleDesc.AutoSize = true;
            RuleDesc.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            RuleDesc.Location = new Point(7, 57);
            RuleDesc.Name = "RuleDesc";
            RuleDesc.Size = new Size(78, 18);
            RuleDesc.TabIndex = 1;
            RuleDesc.Text = "Description";
            // 
            // RuleTitle
            // 
            RuleTitle.AutoSize = true;
            RuleTitle.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            RuleTitle.Location = new Point(7, 28);
            RuleTitle.Name = "RuleTitle";
            RuleTitle.Size = new Size(118, 18);
            RuleTitle.TabIndex = 0;
            RuleTitle.Text = "Connection Name";
            // 
            // SConfigClose
            // 
            SConfigClose.Controls.Add(button2);
            SConfigClose.Controls.Add(SConfigType);
            SConfigClose.Controls.Add(SchedulerIsActive);
            SConfigClose.Controls.Add(SchedularFreq);
            SConfigClose.Controls.Add(FrequencyInMinutes);
            SConfigClose.Controls.Add(SchedularType);
            SConfigClose.Controls.Add(SchedularDesc);
            SConfigClose.Controls.Add(SchedularCode);
            SConfigClose.Controls.Add(SchedularDescText);
            SConfigClose.Controls.Add(SchedularCodeTxt);
            SConfigClose.Controls.Add(SchedulerName);
            SConfigClose.Controls.Add(SchedularName);
            SConfigClose.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SConfigClose.Location = new Point(4, 24);
            SConfigClose.Name = "SConfigClose";
            SConfigClose.Padding = new Padding(3);
            SConfigClose.Size = new Size(659, 440);
            SConfigClose.TabIndex = 3;
            SConfigClose.Text = "SchedulerConfig";
            SConfigClose.UseVisualStyleBackColor = true;
            SConfigClose.Click += SConfigClose_Click;
            // 
            // button2
            // 
            button2.Location = new Point(26, 401);
            button2.Name = "button2";
            button2.Size = new Size(75, 23);
            button2.TabIndex = 29;
            button2.Text = "Confirm";
            button2.UseVisualStyleBackColor = true;
            button2.Click += button2_Click_1;
            // 
            // SConfigType
            // 
            SConfigType.AutoCompleteCustomSource.AddRange(new string[] { "Email", "SMS", "Whatsapp" });
            SConfigType.FormattingEnabled = true;
            SConfigType.Items.AddRange(new object[] { "Recurring", "SingleTime" });
            SConfigType.Location = new Point(175, 204);
            SConfigType.Name = "SConfigType";
            SConfigType.Size = new Size(251, 26);
            SConfigType.TabIndex = 28;
            // 
            // SchedulerIsActive
            // 
            SchedulerIsActive.AutoSize = true;
            SchedulerIsActive.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedulerIsActive.Location = new Point(26, 286);
            SchedulerIsActive.Name = "SchedulerIsActive";
            SchedulerIsActive.Size = new Size(65, 22);
            SchedulerIsActive.TabIndex = 23;
            SchedulerIsActive.Text = "Active";
            SchedulerIsActive.UseVisualStyleBackColor = true;
            // 
            // SchedularFreq
            // 
            SchedularFreq.Location = new Point(175, 236);
            SchedularFreq.Name = "SchedularFreq";
            SchedularFreq.Size = new Size(251, 26);
            SchedularFreq.TabIndex = 22;
            // 
            // FrequencyInMinutes
            // 
            FrequencyInMinutes.AutoSize = true;
            FrequencyInMinutes.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            FrequencyInMinutes.Location = new Point(26, 236);
            FrequencyInMinutes.Name = "FrequencyInMinutes";
            FrequencyInMinutes.Size = new Size(136, 18);
            FrequencyInMinutes.TabIndex = 13;
            FrequencyInMinutes.Text = "FrequencyInMinutes";
            // 
            // SchedularType
            // 
            SchedularType.AutoSize = true;
            SchedularType.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularType.Location = new Point(26, 204);
            SchedularType.Name = "SchedularType";
            SchedularType.Size = new Size(101, 18);
            SchedularType.TabIndex = 7;
            SchedularType.Text = "Schedular Type";
            // 
            // SchedularDesc
            // 
            SchedularDesc.AutoSize = true;
            SchedularDesc.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularDesc.Location = new Point(26, 104);
            SchedularDesc.Name = "SchedularDesc";
            SchedularDesc.Size = new Size(101, 18);
            SchedularDesc.TabIndex = 6;
            SchedularDesc.Text = "Schedular Desc";
            // 
            // SchedularCode
            // 
            SchedularCode.AutoSize = true;
            SchedularCode.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularCode.Location = new Point(26, 72);
            SchedularCode.Name = "SchedularCode";
            SchedularCode.Size = new Size(104, 18);
            SchedularCode.TabIndex = 5;
            SchedularCode.Text = "Schedular Code";
            // 
            // SchedularDescText
            // 
            SchedularDescText.Location = new Point(175, 104);
            SchedularDescText.Multiline = true;
            SchedularDescText.Name = "SchedularDescText";
            SchedularDescText.Size = new Size(251, 70);
            SchedularDescText.TabIndex = 4;
            // 
            // SchedularCodeTxt
            // 
            SchedularCodeTxt.ForeColor = SystemColors.InactiveCaptionText;
            SchedularCodeTxt.Location = new Point(175, 72);
            SchedularCodeTxt.Multiline = true;
            SchedularCodeTxt.Name = "SchedularCodeTxt";
            SchedularCodeTxt.Size = new Size(251, 26);
            SchedularCodeTxt.TabIndex = 2;
            // 
            // SchedulerName
            // 
            SchedulerName.Location = new Point(175, 40);
            SchedulerName.Name = "SchedulerName";
            SchedulerName.Size = new Size(251, 26);
            SchedulerName.TabIndex = 1;
            // 
            // SchedularName
            // 
            SchedularName.AutoSize = true;
            SchedularName.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularName.Location = new Point(26, 40);
            SchedularName.Name = "SchedularName";
            SchedularName.Size = new Size(109, 18);
            SchedularName.TabIndex = 0;
            SchedularName.Text = "Schedular Name";
            SchedularName.Click += label1_Click;
            // 
            // ServiceVariables
            // 
            ServiceVariables.Controls.Add(checkBox1);
            ServiceVariables.Controls.Add(button5);
            ServiceVariables.Controls.Add(VarTypeTextBox);
            ServiceVariables.Controls.Add(VarValueTextBox);
            ServiceVariables.Controls.Add(VarInstanceTextBox);
            ServiceVariables.Controls.Add(VarType);
            ServiceVariables.Controls.Add(VarValue);
            ServiceVariables.Controls.Add(VarInstance);
            ServiceVariables.Location = new Point(4, 24);
            ServiceVariables.Name = "ServiceVariables";
            ServiceVariables.Padding = new Padding(3);
            ServiceVariables.Size = new Size(659, 440);
            ServiceVariables.TabIndex = 4;
            ServiceVariables.Text = "ServiceVariables";
            ServiceVariables.UseVisualStyleBackColor = true;
            // 
            // checkBox1
            // 
            checkBox1.AutoSize = true;
            checkBox1.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            checkBox1.Location = new Point(6, 280);
            checkBox1.Name = "checkBox1";
            checkBox1.Size = new Size(65, 22);
            checkBox1.TabIndex = 26;
            checkBox1.Text = "Active";
            checkBox1.UseVisualStyleBackColor = true;
            // 
            // button5
            // 
            button5.Location = new Point(6, 324);
            button5.Name = "button5";
            button5.Size = new Size(75, 23);
            button5.TabIndex = 25;
            button5.Text = "Confirm";
            button5.UseVisualStyleBackColor = true;
            button5.Click += button5_Click;
            // 
            // VarTypeTextBox
            // 
            VarTypeTextBox.Location = new Point(140, 126);
            VarTypeTextBox.Name = "VarTypeTextBox";
            VarTypeTextBox.Size = new Size(243, 23);
            VarTypeTextBox.TabIndex = 6;
            // 
            // VarValueTextBox
            // 
            VarValueTextBox.Location = new Point(140, 88);
            VarValueTextBox.Name = "VarValueTextBox";
            VarValueTextBox.Size = new Size(243, 23);
            VarValueTextBox.TabIndex = 5;
            // 
            // VarInstanceTextBox
            // 
            VarInstanceTextBox.Location = new Point(140, 49);
            VarInstanceTextBox.Name = "VarInstanceTextBox";
            VarInstanceTextBox.Size = new Size(243, 23);
            VarInstanceTextBox.TabIndex = 4;
            VarInstanceTextBox.TextChanged += textBox12_TextChanged;
            // 
            // VarType
            // 
            VarType.AutoSize = true;
            VarType.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            VarType.Location = new Point(6, 126);
            VarType.Name = "VarType";
            VarType.Size = new Size(57, 18);
            VarType.TabIndex = 3;
            VarType.Text = "VarType";
            // 
            // VarValue
            // 
            VarValue.AutoSize = true;
            VarValue.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            VarValue.Location = new Point(6, 88);
            VarValue.Name = "VarValue";
            VarValue.Size = new Size(63, 18);
            VarValue.TabIndex = 2;
            VarValue.Text = "VarValue";
            // 
            // VarInstance
            // 
            VarInstance.AutoSize = true;
            VarInstance.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            VarInstance.Location = new Point(6, 49);
            VarInstance.Name = "VarInstance";
            VarInstance.Size = new Size(80, 18);
            VarInstance.TabIndex = 1;
            VarInstance.Text = "VarInstance";
            // 
            // ServiceScheduler
            // 
            ServiceScheduler.Controls.Add(button6);
            ServiceScheduler.Controls.Add(DailyEndsOn);
            ServiceScheduler.Controls.Add(DailyStartsOn);
            ServiceScheduler.Controls.Add(SchedularIsAct);
            ServiceScheduler.Controls.Add(StartsFromDate);
            ServiceScheduler.Controls.Add(EndsOnDate);
            ServiceScheduler.Controls.Add(NextExecution);
            ServiceScheduler.Controls.Add(dateTimePicker1);
            ServiceScheduler.Controls.Add(comboBox3);
            ServiceScheduler.Controls.Add(comboBox2);
            ServiceScheduler.Controls.Add(SchedularDailyEnds);
            ServiceScheduler.Controls.Add(SchedularDailyStart);
            ServiceScheduler.Controls.Add(SchedularEnds);
            ServiceScheduler.Controls.Add(SchedularStarts);
            ServiceScheduler.Controls.Add(SchedularNextExc);
            ServiceScheduler.Controls.Add(SchedularLastExec);
            ServiceScheduler.Controls.Add(SchedularSchedularName);
            ServiceScheduler.Controls.Add(SchedularServiceName);
            ServiceScheduler.Location = new Point(4, 24);
            ServiceScheduler.Name = "ServiceScheduler";
            ServiceScheduler.Padding = new Padding(3);
            ServiceScheduler.Size = new Size(659, 440);
            ServiceScheduler.TabIndex = 5;
            ServiceScheduler.Text = "ServiceSchedular";
            ServiceScheduler.UseVisualStyleBackColor = true;
            ServiceScheduler.Click += ServiceScheduler_Click;
            // 
            // button6
            // 
            button6.Location = new Point(382, 395);
            button6.Name = "button6";
            button6.Size = new Size(75, 23);
            button6.TabIndex = 30;
            button6.Text = "Confirm";
            button6.UseVisualStyleBackColor = true;
            button6.Click += button6_Click;
            // 
            // DailyEndsOn
            // 
            DailyEndsOn.Location = new Point(382, 293);
            DailyEndsOn.Name = "DailyEndsOn";
            DailyEndsOn.Size = new Size(224, 23);
            DailyEndsOn.TabIndex = 29;
            DailyEndsOn.ValueChanged += dateTimePicker6_ValueChanged;
            // 
            // DailyStartsOn
            // 
            DailyStartsOn.Location = new Point(382, 209);
            DailyStartsOn.Name = "DailyStartsOn";
            DailyStartsOn.Size = new Size(224, 23);
            DailyStartsOn.TabIndex = 28;
            DailyStartsOn.ValueChanged += dateTimePicker5_ValueChanged;
            // 
            // SchedularIsAct
            // 
            SchedularIsAct.AutoSize = true;
            SchedularIsAct.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularIsAct.Location = new Point(382, 353);
            SchedularIsAct.Name = "SchedularIsAct";
            SchedularIsAct.Size = new Size(75, 22);
            SchedularIsAct.TabIndex = 24;
            SchedularIsAct.Text = "IsActive";
            SchedularIsAct.UseVisualStyleBackColor = true;
            // 
            // StartsFromDate
            // 
            StartsFromDate.Location = new Point(382, 45);
            StartsFromDate.Name = "StartsFromDate";
            StartsFromDate.Size = new Size(224, 23);
            StartsFromDate.TabIndex = 13;
            StartsFromDate.ValueChanged += StartsFromDate_ValueChanged;
            // 
            // EndsOnDate
            // 
            EndsOnDate.Location = new Point(382, 126);
            EndsOnDate.Name = "EndsOnDate";
            EndsOnDate.Size = new Size(224, 23);
            EndsOnDate.TabIndex = 12;
            EndsOnDate.ValueChanged += dateTimePicker3_ValueChanged;
            // 
            // NextExecution
            // 
            NextExecution.Location = new Point(16, 293);
            NextExecution.Name = "NextExecution";
            NextExecution.Size = new Size(224, 23);
            NextExecution.TabIndex = 11;
            NextExecution.ValueChanged += dateTimePicker2_ValueChanged;
            // 
            // dateTimePicker1
            // 
            dateTimePicker1.Checked = false;
            dateTimePicker1.CustomFormat = "";
            dateTimePicker1.ImeMode = ImeMode.AlphaFull;
            dateTimePicker1.Location = new Point(16, 209);
            dateTimePicker1.Name = "dateTimePicker1";
            dateTimePicker1.Size = new Size(224, 23);
            dateTimePicker1.TabIndex = 10;
            dateTimePicker1.ValueChanged += dateTimePicker1_ValueChanged;
            // 
            // comboBox3
            // 
            comboBox3.FormattingEnabled = true;
            comboBox3.Items.AddRange(new object[] { "Every 5 minutes", "Every 15 minutes", "Every 1 hour" });
            comboBox3.Location = new Point(16, 126);
            comboBox3.Name = "comboBox3";
            comboBox3.Size = new Size(224, 23);
            comboBox3.TabIndex = 9;
            comboBox3.Text = "Every 5 minutes";
            // 
            // comboBox2
            // 
            comboBox2.FormattingEnabled = true;
            comboBox2.Items.AddRange(new object[] { "KDPL-Invoices", "RDPL", "Cosmic" });
            comboBox2.Location = new Point(16, 45);
            comboBox2.Name = "comboBox2";
            comboBox2.Size = new Size(224, 23);
            comboBox2.TabIndex = 8;
            comboBox2.Text = "KDPL-Invoices";
            // 
            // SchedularDailyEnds
            // 
            SchedularDailyEnds.AutoSize = true;
            SchedularDailyEnds.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularDailyEnds.Location = new Point(382, 272);
            SchedularDailyEnds.Name = "SchedularDailyEnds";
            SchedularDailyEnds.Size = new Size(92, 18);
            SchedularDailyEnds.TabIndex = 7;
            SchedularDailyEnds.Text = "Daily Ends On";
            // 
            // SchedularDailyStart
            // 
            SchedularDailyStart.AutoSize = true;
            SchedularDailyStart.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularDailyStart.Location = new Point(382, 188);
            SchedularDailyStart.Name = "SchedularDailyStart";
            SchedularDailyStart.Size = new Size(92, 18);
            SchedularDailyStart.TabIndex = 6;
            SchedularDailyStart.Text = "Daily Start On";
            // 
            // SchedularEnds
            // 
            SchedularEnds.AutoSize = true;
            SchedularEnds.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularEnds.Location = new Point(382, 105);
            SchedularEnds.Name = "SchedularEnds";
            SchedularEnds.Size = new Size(58, 18);
            SchedularEnds.TabIndex = 5;
            SchedularEnds.Text = "Ends On";
            // 
            // SchedularStarts
            // 
            SchedularStarts.AutoSize = true;
            SchedularStarts.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularStarts.Location = new Point(382, 24);
            SchedularStarts.Name = "SchedularStarts";
            SchedularStarts.Size = new Size(78, 18);
            SchedularStarts.TabIndex = 4;
            SchedularStarts.Text = "Starts From";
            // 
            // SchedularNextExc
            // 
            SchedularNextExc.AutoSize = true;
            SchedularNextExc.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularNextExc.Location = new Point(16, 272);
            SchedularNextExc.Name = "SchedularNextExc";
            SchedularNextExc.Size = new Size(135, 18);
            SchedularNextExc.TabIndex = 3;
            SchedularNextExc.Text = "Next Execution Time";
            // 
            // SchedularLastExec
            // 
            SchedularLastExec.AutoSize = true;
            SchedularLastExec.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularLastExec.Location = new Point(16, 188);
            SchedularLastExec.Name = "SchedularLastExec";
            SchedularLastExec.Size = new Size(129, 18);
            SchedularLastExec.TabIndex = 2;
            SchedularLastExec.Text = "Last Execution Time";
            // 
            // SchedularSchedularName
            // 
            SchedularSchedularName.AutoSize = true;
            SchedularSchedularName.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularSchedularName.Location = new Point(15, 105);
            SchedularSchedularName.Name = "SchedularSchedularName";
            SchedularSchedularName.Size = new Size(109, 18);
            SchedularSchedularName.TabIndex = 1;
            SchedularSchedularName.Text = "Schedular Name";
            // 
            // SchedularServiceName
            // 
            SchedularServiceName.AutoSize = true;
            SchedularServiceName.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            SchedularServiceName.Location = new Point(15, 24);
            SchedularServiceName.Name = "SchedularServiceName";
            SchedularServiceName.Size = new Size(93, 18);
            SchedularServiceName.TabIndex = 0;
            SchedularServiceName.Text = "Service Name";
            SchedularServiceName.Click += label1_Click_2;
            // 
            // button3
            // 
            button3.Font = new Font("Calibri", 11.25F, FontStyle.Regular, GraphicsUnit.Point);
            button3.Location = new Point(453, 476);
            button3.Name = "button3";
            button3.Size = new Size(106, 22);
            button3.TabIndex = 32;
            button3.Text = "Save";
            button3.UseVisualStyleBackColor = true;
            button3.Click += button3_Click;
            // 
            // button4
            // 
            button4.Location = new Point(565, 476);
            button4.Name = "button4";
            button4.Size = new Size(98, 22);
            button4.TabIndex = 28;
            button4.Text = "Close";
            button4.UseVisualStyleBackColor = true;
            button4.Click += button4_Click;
            // 
            // openFileDialog1
            // 
            openFileDialog1.FileName = "openFileDialog1";
            // 
            // fileSystemWatcher1
            // 
            fileSystemWatcher1.EnableRaisingEvents = true;
            fileSystemWatcher1.SynchronizingObject = this;
            // 
            // Rule
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(682, 510);
            Controls.Add(button4);
            Controls.Add(button3);
            Controls.Add(AlertServiceMaster);
            Name = "Rule";
            Text = "Rule";
            Load += Rule_Load;
            AlertServiceMaster.ResumeLayout(false);
            AlertServiceMaster1.ResumeLayout(false);
            AlertServiceMaster1.PerformLayout();
            DBConfig.ResumeLayout(false);
            DBConfig.PerformLayout();
            EmailConfigStatus.ResumeLayout(false);
            EmailConfigStatus.PerformLayout();
            SConfigClose.ResumeLayout(false);
            SConfigClose.PerformLayout();
            ServiceVariables.ResumeLayout(false);
            ServiceVariables.PerformLayout();
            ServiceScheduler.ResumeLayout(false);
            ServiceScheduler.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)fileSystemWatcher1).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private TabControl AlertServiceMaster;
        private TabPage EmailConfigStatus;
        private TabPage DBConfig;
        private TabPage SConfigClose;
        private TabPage ServiceVariables;
        private TabPage ServiceScheduler;
        private TabPage RuleOptions;
        private Label RuleStatus;
        private Label Password;
        private Label FromEmailId;
        private Label RuleFolder;
        private Label Host;
        private Label RuleDesc;
        private Label RuleTitle;
        private TextBox TitleText;
        private TextBox DescText;
        private Label DBConfigName;
        private Label DBConfigUser;
        private Label DBConfigServer;
        private Label DBConfigConn;
        private CheckBox IsActiveCheckBox;
        private Label SchedularType;
        private Label SchedularDesc;
        private Label SchedularCode;
        private TextBox SchedularDescText;
        private TextBox SchedularCodeTxt;
        private TextBox SchedulerName;
        private Label SchedularName;
        private Label FrequencyInMinutes;
        private Label EConfigPort;
        private TextBox PassConfig;
        private TextBox FromConfig;
        private TextBox PortConfig;
        private TextBox HostConf;
        private TextBox DBName;
        private TextBox UserName;
        private TextBox ServerName;
        private TextBox ConName;
        private TextBox Passwrd;
        private Label DBConfigPassword;
        private TextBox SchedularFreq;
        private CheckBox SchedulerIsActive;
        private TextBox VarTypeTextBox;
        private TextBox VarValueTextBox;
        private TextBox VarInstanceTextBox;
        private Label VarType;
        private Label VarValue;
        private Label VarInstance;
        private Label SchedularSchedularName;
        private Label SchedularServiceName;
        private ComboBox comboBox3;
        private ComboBox comboBox2;
        private Label SchedularDailyEnds;
        private Label SchedularDailyStart;
        private Label SchedularEnds;
        private Label SchedularStarts;
        private Label SchedularNextExc;
        private Label SchedularLastExec;
        private CheckBox SchedularIsAct;
        private DateTimePicker StartsFromDate;
        private DateTimePicker EndsOnDate;
        private DateTimePicker NextExecution;
        private DateTimePicker dateTimePicker1;
        private DateTimePicker DailyEndsOn;
        private DateTimePicker DailyStartsOn;
        private ComboBox SConfigType;
        private Button button3;
        private Button button4;
        private OpenFileDialog openFileDialog1;
        private Button EmailConfirm;
        private Button button2;
        private Button button5;
        private Button button6;
        private TabPage AlertServiceMaster1;
        private ComboBox ASMPostDataSrv;
        private TextBox ASMPostSrcDef;
        private TextBox ASMOutputFileName;
        private TextBox ASMDatasourceDef;
        private TextBox ASMBody;
        private TextBox ASMSubject;
        private TextBox ASMBcc;
        private TextBox ASMCC;
        private TextBox ASMEmail;
        private Label label17;
        private Label label16;
        private Label label15;
        private Button button1;
        private Label label12;
        private Label label11;
        private Label label10;
        private Label label9;
        private Label label8;
        private Label label7;
        private ComboBox ASMOutsource;
        private Label label6;
        private ComboBox ASMFileType;
        private Label label5;
        private Button ASMBrowse;
        private Label label4;
        private ComboBox ASMAttachment;
        private Label label3;
        private ComboBox ASMType;
        private Label label2;
        private Label label1;
        private TextBox ASMTitle;
        private FileSystemWatcher fileSystemWatcher1;
        private Button button7;
        private CheckBox checkBox1;
        private CheckBox checkBox2;
    }
}