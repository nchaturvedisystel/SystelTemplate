using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using Common;
using PushNotification.Interface;
using PushNotification.Model;
using PushNotification.Service;

namespace PushNotification
{
    public partial class Rule : Form
    {
        private int recordId;
        private string SelectedFilePath;
        private string SelectedFileName;
        private readonly IServiceSchedular schedularService;
        public Rule(int selectedId = 0)
        {

            InitializeComponent();
            recordId = selectedId;
            PopulateDBConfig();
            PopulateFormData();
            PopulateEmailConfig();
            PopulateAlertSchedular();
            PopulateServiceVariablesData();
            PopulateServiceSchedular();
            this.StartPosition = FormStartPosition.CenterScreen;
            schedularService = new ServiceSchedularService();

        }

        public void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        public void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        public void RuleReport_Click(object sender, EventArgs e)
        {

        }


        public void label3_Click(object sender, EventArgs e)
        {

        }

        public void label1_Click(object sender, EventArgs e)
        {

        }


        public void label1_Click_1(object sender, EventArgs e)
        {

        }

        public void RuleSetDSCheckBox_CheckedChanged(object sender, EventArgs e)
        {

        }

        public void button1_Click(object sender, EventArgs e)
        {

        }

        public void label1_Click_2(object sender, EventArgs e)
        {

        }

        public void textBox9_TextChanged(object sender, EventArgs e)
        {

        }

        public void dateTimePicker2_ValueChanged(object sender, EventArgs e)
        {
            NextExecution.Format = DateTimePickerFormat.Custom;
            NextExecution.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        public void DBConfigSave_Click(object sender, EventArgs e)
        {

        }

        public void EmailConfSave_Click(object sender, EventArgs e)
        {

        }

        public void EmailConfig_Click(object sender, EventArgs e)
        {
        }

        public void EmailConfClose_Click(object sender, EventArgs e)
        {
        }

        public void textBox1_TextChanged_1(object sender, EventArgs e)
        {

        }

        public void button1_Click_1(object sender, EventArgs e)
        {

        }

        public void button2_Click(object sender, EventArgs e)
        {
        }

        public void SConfigClose_Click(object sender, EventArgs e)
        {

        }

        public void folderBrowserDialog3_HelpRequest(object sender, EventArgs e)
        {

        }

        public void ASMBrowse_Click(object sender, EventArgs e)
        {
            openFileDialog1.ShowDialog();
        }

        public void button3_Click(object sender, EventArgs e)
        {

        }

        public void button4_Click(object sender, EventArgs e)
        {
            Close();
        }

        public void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            dateTimePicker1.Format = DateTimePickerFormat.Custom;
            dateTimePicker1.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        public void ServiceScheduler_Click(object sender, EventArgs e)
        {

        }

        public void dateTimePicker3_ValueChanged(object sender, EventArgs e)
        {
            EndsOnDate.Format = DateTimePickerFormat.Custom;
            EndsOnDate.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        public void dateTimePicker5_ValueChanged(object sender, EventArgs e)
        {
            DailyStartsOn.Format = DateTimePickerFormat.Custom;
            DailyStartsOn.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        public void dateTimePicker6_ValueChanged(object sender, EventArgs e)
        {
            DailyEndsOn.Format = DateTimePickerFormat.Custom;
            DailyEndsOn.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        public void DBConfig_Click(object sender, EventArgs e)
        {

        }

        public void textBox6_TextChanged(object sender, EventArgs e)
        {

        }

        public void Rule_Load(object sender, EventArgs e)
        {

        }


        public void EmailConfirm_Click(object sender, EventArgs e)
        {
            EmailConfigDTO emailConfig = new EmailConfigDTO
            {
                ConnectionName = TitleText.Text.ToString(),
                Description = DescText.Text.ToString(),
                Host = HostConf.Text.ToString(),
                Port = PortConfig.Text.ToString(),
                From = FromConfig.Text.ToString(),
                Password = PassConfig.Text.ToString(),

            };
            bool isActive = checkBox2.Checked;
            EmailConfigService emailConfigService = new EmailConfigService();
            emailConfigService.InsertEmailConfig(emailConfig, isActive);

        }

        private void PortConfig_TextChanged(object sender, EventArgs e)
        {

        }

        private void EmailFrom_TextChanged(object sender, EventArgs e)
        {

        }

        private void PassConfig_TextChanged(object sender, EventArgs e)
        {

        }

        private void button2_Click_1(object sender, EventArgs e)
        {
            try
            {
                Model.SchedularConfigDTO schedularDTO = new Model.SchedularConfigDTO
                {
                    SchedularName = SchedulerName.Text,
                    SchedularCode = SchedularCodeTxt.Text,
                    SchedularDesc = SchedularDescText.Text,
                    SchedularType = SConfigType.Text,
                    FrequencyInMins = Convert.ToInt32(SchedularFreq.Text),
                };

                Service.SchedularService schedularService = new Service.SchedularService();
                schedularService.CreateSchedular(schedularDTO);

                MessageBox.Show("Data Saved Successfully");
            }
            catch (Exception ex)
            {

                MessageBox.Show("An error occurred: " + ex.Message);
            }

        }
        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void AlertServiceMaster_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click_2(object sender, EventArgs e)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();

                // Check for duplicate title
                using (SqlCommand checkCommand = new SqlCommand("SELECT COUNT(*) FROM AlertsServiceMaster WHERE Title = @Title AND ServiceId != @ServiceId", connection))
                {
                    checkCommand.Parameters.Add(new SqlParameter("@Title", SqlDbType.VarChar, 100)).Value = ASMTitle.Text;
                    checkCommand.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = recordId;

                    int count = (int)checkCommand.ExecuteScalar();

                    if (count > 0)
                    {
                        MessageBox.Show("A record with the same title already exists. Please choose a different title.");
                        return;
                    }
                }

                using (SqlCommand command = new SqlCommand("AlertsServiceMaster_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Title", SqlDbType.VarChar, 100)).Value = ASMTitle.Text;
                    command.Parameters.AddWithValue("@SDesc", "This is New Email");
                    command.Parameters.AddWithValue("@HasAttachment", 1);

                    if (recordId > 0)
                    {
                        // If it's an update, don't change DBConnid, AlertConfigId, and SchedularId
                        command.Parameters.AddWithValue("@DBConnid", GetExistingValue(connection, "DBConnid", recordId));
                        command.Parameters.AddWithValue("@AlertConfigId", GetExistingValue(connection, "AlertConfigId", recordId));
                        command.Parameters.AddWithValue("@SchedularId", GetExistingValue(connection, "SchedularId", recordId));
                    }
                    else
                    {
                        // If it's a new record, get the latest identity values
                        command.Parameters.AddWithValue("@DBConnid", GetLatestIdentityValue(connection, "DBConnid"));
                        command.Parameters.AddWithValue("@AlertConfigId", GetLatestIdentityValue(connection, "AlertConfigId"));
                        command.Parameters.AddWithValue("@SchedularId", GetLatestIdentityValue(connection, "SchedularId"));
                    }

                    // Rest of the code remains the same...
                    command.Parameters.AddWithValue("@LastExecutedOn", 1);
                    command.Parameters.AddWithValue("@NextExecutionTime", 1);
                    command.Parameters.AddWithValue("@IsActive", 1);
                    command.Parameters.AddWithValue("@IsDeleted", 0);
                    command.Parameters.AddWithValue("@ActionUser", 1);
                    command.Parameters.Add(new SqlParameter("@AlertType", SqlDbType.VarChar, 100)).Value = ASMType.Text;
                    command.Parameters.Add(new SqlParameter("@AttachmentType", SqlDbType.VarChar, 100)).Value = ASMAttachment.Text;
                    command.Parameters.Add(new SqlParameter("@AttachmentPath", SqlDbType.VarChar, 100)).Value = SelectedFilePath;
                    command.Parameters.Add(new SqlParameter("@AttachmentFileType", SqlDbType.VarChar, 100)).Value = ASMFileType.Text;
                    command.Parameters.Add(new SqlParameter("@DataSourceType", SqlDbType.VarChar, 100)).Value = ASMOutsource.Text;
                    command.Parameters.Add(new SqlParameter("@PostSendDataSourceType", SqlDbType.VarChar, 100)).Value = ASMPostDataSrv.Text;
                    command.Parameters.Add(new SqlParameter("@EmailTo", SqlDbType.VarChar, 100)).Value = ASMEmail.Text;
                    command.Parameters.Add(new SqlParameter("@CCTo", SqlDbType.VarChar, 100)).Value = ASMCC.Text;
                    command.Parameters.Add(new SqlParameter("@BccTo", SqlDbType.VarChar, 100)).Value = ASMBcc.Text;
                    command.Parameters.Add(new SqlParameter("@ASubject", SqlDbType.VarChar, 100)).Value = ASMSubject.Text;
                    command.Parameters.Add(new SqlParameter("@ABody", SqlDbType.VarChar, 100)).Value = ASMBody.Text;
                    command.Parameters.Add(new SqlParameter("@OutputFileName", SqlDbType.VarChar, 100)).Value = ASMOutputFileName.Text;
                    command.Parameters.Add(new SqlParameter("@PostSendDataSourceDef", SqlDbType.VarChar, 100)).Value = ASMPostSrcDef.Text;
                    command.Parameters.Add(new SqlParameter("@DataSourceDef", SqlDbType.VarChar, 100)).Value = ASMDatasourceDef.Text;
                    if (recordId > 0)
                    {
                        // Update an existing record...
                        command.Parameters.AddWithValue("@ServiceId", recordId);
                        command.ExecuteNonQuery();
                        MessageBox.Show("Data Updated");
                    }
                    else
                    {
                        // Insert a new record...
                        command.ExecuteNonQuery();
                        int newServiceId = GetLatestIdentityValue(connection, "ServiceId");
                        MessageBox.Show("Data Saved with ServiceId: " + newServiceId);
                    }
                }
            }
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private int GetExistingValue(SqlConnection connection, string columnName, int serviceId)
        {
            // Fetch the existing value from the database
            using (SqlCommand command = new SqlCommand($"SELECT {columnName} FROM AlertsServiceMaster WHERE ServiceId = @ServiceId", connection))
            {
                command.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = serviceId;
                object result = command.ExecuteScalar();
                if (result != DBNull.Value)
                {
                    return Convert.ToInt32(result);
                }
                return 1; // Default value if no records exist
            }
        }

        private int GetLatestIdentityValue(SqlConnection connection, string columnName)
        {
            // Execute a query to get the latest identity value
            using (SqlCommand command = new SqlCommand($"SELECT MAX({columnName}) FROM AlertsServiceMaster", connection))
            {
                object result = command.ExecuteScalar();
                if (result != DBNull.Value)
                {
                    return Convert.ToInt32(result) + 1; // Increment the latest identity value
                }
                return 1; // Default value if no records exist
            }
        }


        public void ASMBrowse_Click_1(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "All Files (*.*)|*.*";
                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    SelectedFilePath = openFileDialog.FileName;
                    SelectedFileName = Path.GetFileName(SelectedFilePath);
                    ASMBrowse.Text = SelectedFileName;
                }
            }
        }

        private void PopulateServiceVariablesData()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                string query = "SELECT VarInstance, VarValue, VarType FROM AlertsServiceVariables WHERE VariableId = @RecordID";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Populate the form's controls with data from the database
                            VarInstanceTextBox.Text = reader["VarInstance"].ToString();
                            VarValueTextBox.Text = reader["VarValue"].ToString();
                            VarTypeTextBox.Text = reader["VarType"].ToString();

                            reader.Close();
                        }
                    }
                }
            }
        }

        public void PopulateServiceSchedular()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                string query = "SELECT LastExecutionTime,NextExecutionTime,StartsFrom,EndsOn,DailyStartOn,DailyEndsOn from AlertsServiceSchedular where ServiceId=@RecordId";
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            dateTimePicker1.Text = reader["LastExecutionTime"].ToString();
                            NextExecution.Text = reader["NextExecutionTime"].ToString();
                            StartsFromDate.Text = reader["StartsFrom"].ToString();
                            EndsOnDate.Text = reader["EndsOn"].ToString();
                            DailyStartsOn.Text = reader["DailyStartOn"].ToString();
                            DailyEndsOn.Text = reader["DailyEndsOn"].ToString();
                            reader.Close();
                        }
                    }
                }
            }
        }
        private void PopulateFormData()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                string query = "SELECT Title, AlertType, AttachmentType, AttachmentPath, AttachmentFileType, DataSourceType, PostSendDataSourceType, EmailTo, CCTo, BccTo, ASubject, ABody, OutputFileName, PostSendDataSourceDef, DataSourceDef FROM AlertsServiceMaster WHERE ServiceId = @RecordID";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            ASMTitle.Text = reader["Title"].ToString();
                            ASMType.Text = reader["AlertType"].ToString();
                            ASMAttachment.Text = reader["AttachmentType"].ToString();
                            ASMFileType.Text = reader["AttachmentFileType"].ToString();
                            ASMOutsource.Text = reader["DataSourceType"].ToString();
                            ASMPostDataSrv.Text = reader["PostSendDataSourceType"].ToString();
                            ASMEmail.Text = reader["EmailTo"].ToString();
                            ASMCC.Text = reader["CCTo"].ToString();
                            ASMBcc.Text = reader["BccTo"].ToString();
                            ASMSubject.Text = reader["ASubject"].ToString();
                            ASMBody.Text = reader["ABody"].ToString();
                            ASMOutputFileName.Text = reader["OutputFileName"].ToString();
                            ASMPostSrcDef.Text = reader["PostSendDataSourceDef"].ToString();
                            ASMDatasourceDef.Text = reader["DataSourceDef"].ToString();
                            reader.Close();
                        }
                    }
                }
            }
        }
        public void PopulateDBConfig()
        {
            using (SqlConnection connection = new SqlConnection(DBConn.GetConnectionString(ConfigurationManager.AppSettings["AppKeyPath"])))
            {
                connection.Open();
                string query = "SELECT ConnName,ServerName, UserName,Passwrd, DBName from DBConnectionMaster where DBConnId = @RecordID";
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            ConName.Text = reader["ConnName"].ToString();
                            ServerName.Text = reader["ServerName"].ToString();
                            UserName.Text = reader["UserName"].ToString();
                            DBName.Text = reader["DBName"].ToString();
                            Passwrd.Text = reader["Passwrd"].ToString();
                            reader.Close();

                        }
                    }
                }
            }
        }
        public void PopulateEmailConfig()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                string query = "Select IName,IDesc,IHost,IPort,IFrom,IPassword from EmailConfig where EmailConfigId = @RecordId";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@RecordId",SqlDbType.Int)).Value = recordId;
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if(reader.Read())
                        {
                            TitleText.Text = reader["IName"].ToString();
                            DescText.Text= reader["IDesc"].ToString() ;
                            HostConf.Text = reader["IHost"].ToString();
                            PortConfig.Text = reader["IPort"].ToString();
                            FromConfig.Text = reader["IFrom"].ToString();
                            PassConfig.Text = reader["IPassword"].ToString();
                            reader.Close();
                        }
                    }
                }
            }
        }

        public void PopulateAlertSchedular()
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                string query = "SELECT IName,ICode,IDesc,FrequencyInMinutes,SchedularType from AlertsSchedular where SchedularId=@RecordId";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            SchedulerName.Text = reader["IName"].ToString();
                            SchedularCodeTxt.Text = reader["ICode"].ToString();
                            SchedularDescText.Text = reader["IDesc"].ToString();
                            SchedularFreq.Text = reader["FrequencyInMinutes"].ToString();
                            SConfigType.Text = reader["SchedularType"].ToString();
                            reader.Close();
                        }
                    }
                }
            }

        }
        private void button7_Click(object sender, EventArgs e)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();

                using (SqlCommand checkCommand = new SqlCommand("SELECT COUNT(*) FROM DBConnectionMaster WHERE ConnName = @ConnName AND DBConnId != @DBConnId", connection))
                {
                    checkCommand.Parameters.Add(new SqlParameter("@ConnName", SqlDbType.VarChar, 100)).Value = ConName.Text;
                    checkCommand.Parameters.Add(new SqlParameter("@DBConnId", SqlDbType.Int)).Value = recordId;

                    int count = (int)checkCommand.ExecuteScalar();

                    if (count > 0)
                    {
                        MessageBox.Show("A record with the same Connection Name already exists. Please choose a different Connection Name.");
                        return;
                    }
                }

                using (SqlCommand command = new SqlCommand("DBConnectionMaster_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@DBConnId", SqlDbType.Int)).Value = recordId;
                    command.Parameters.Add(new SqlParameter("@ConnName", SqlDbType.VarChar, 100)).Value = ConName.Text;
                    command.Parameters.Add(new SqlParameter("@ServerName", SqlDbType.NVarChar, 200)).Value = ServerName.Text;
                    command.Parameters.Add(new SqlParameter("@UserName", SqlDbType.VarChar, 100)).Value = UserName.Text;
                    command.Parameters.Add(new SqlParameter("@Passwrd", SqlDbType.VarChar, 200)).Value = Passwrd.Text;
                    command.Parameters.Add(new SqlParameter("@DBName", SqlDbType.VarChar, 100)).Value = DBName.Text;
                    command.Parameters.AddWithValue("@IsActive", 1);
                    command.Parameters.AddWithValue("@IsDeleted", 0);
                    command.Parameters.Add(new SqlParameter("@ActionUser", SqlDbType.Int)).Value = 1;
                    command.ExecuteNonQuery();
                    MessageBox.Show(recordId > 0 ? "Data Updated" : "Data Saved");
                }

            }
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private void textBox12_TextChanged(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                connection.Open();
                using (SqlCommand checkCommand = new SqlCommand("SELECT COUNT(*) FROM AlertsServiceVariables WHERE VarInstance = @VarInstance AND ServiceId = @ServiceId", connection))
                {
                    checkCommand.Parameters.Add(new SqlParameter("@VarInstance", SqlDbType.VarChar, 100)).Value = VarInstanceTextBox.Text;
                    checkCommand.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = 1;

                    int count = (int)checkCommand.ExecuteScalar();

                    if (count > 0)
                    {
                        MessageBox.Show("A record with the same VarInstance already exists within this service. Please choose a different VarInstance.");
                        return;
                    }
                }

                using (SqlCommand command = new SqlCommand("AlertsServiceVariables_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@VariableId", SqlDbType.Int)).Value = 0;
                    command.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = 2;
                    command.Parameters.Add(new SqlParameter("@VarInstance", SqlDbType.VarChar, 100)).Value = VarInstanceTextBox.Text;
                    command.Parameters.Add(new SqlParameter("@VarValue", SqlDbType.VarChar, 100)).Value = VarValueTextBox.Text;
                    command.Parameters.Add(new SqlParameter("@VarType", SqlDbType.VarChar, 50)).Value = VarTypeTextBox.Text;
                    command.Parameters.AddWithValue("@IsActive", 1);
                    command.Parameters.AddWithValue("@IsDeleted", 0);
                    command.Parameters.Add(new SqlParameter("@ActionUser", SqlDbType.Int)).Value = 1;

                    command.ExecuteNonQuery();
                    MessageBox.Show(5 > 0 ? "Data Updated" : "Data Saved");
                }
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            try
            {
                string dateFormat = "HH:mm:ss MMMM dd, yyyy";

                ServiceSchedularDTO schedularDTO = new ServiceSchedularDTO
                {

                    ServiceId = 2,
                    SchedularId = 1,
                    LastExecutionTime = DateTime.ParseExact(dateTimePicker1.Text, dateFormat, CultureInfo.InvariantCulture),
                    NextExecutionTime = DateTime.ParseExact(NextExecution.Text, dateFormat, CultureInfo.InvariantCulture),
                    StartsFrom = DateTime.ParseExact(StartsFromDate.Text, dateFormat, CultureInfo.InvariantCulture),
                    EndsOn = DateTime.ParseExact(EndsOnDate.Text, dateFormat, CultureInfo.InvariantCulture),
                    DailyStartOn = DateTime.ParseExact(DailyStartsOn.Text, dateFormat, CultureInfo.InvariantCulture),
                    DailyEndsOn = DateTime.ParseExact(DailyEndsOn.Text, dateFormat, CultureInfo.InvariantCulture),

                    IsActive = 1,
                    IsDeleted = 0,
                    ActionUser = 0

                };
                ServiceSchedularService schedularService = new ServiceSchedularService();
                schedularService.CreateSchedular(schedularDTO);
                MessageBox.Show("Data Saved Successfully");
            }
            catch (Exception ex)
            {
                // Handle and log the exception, or show an error message
                MessageBox.Show("An error occurred: " + ex.Message);
            }
        }

        private void AlertServiceMaster1_Click(object sender, EventArgs e)
        {

        }

        private void StartsFromDate_ValueChanged(object sender, EventArgs e)
        {
            StartsFromDate.Format = DateTimePickerFormat.Custom;
            StartsFromDate.CustomFormat = "hh:mm:ss MMMM dd, yyyy";
        }

        private void Passwrd_TextChanged(object sender, EventArgs e)
        {

        }
    }
}