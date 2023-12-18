namespace PushNotification
{
    partial class ServicesSettings
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
            SMTPCancel = new Button();
            SMTPApply = new Button();
            ServicesNew = new Button();
            ServicesEdit = new Button();
            ServiceDelete = new Button();
            dataGridView1 = new DataGridView();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            SuspendLayout();
            // 
            // SMTPCancel
            // 
            SMTPCancel.Location = new Point(463, 432);
            SMTPCancel.Name = "SMTPCancel";
            SMTPCancel.Size = new Size(64, 22);
            SMTPCancel.TabIndex = 15;
            SMTPCancel.Text = "Cancel";
            SMTPCancel.UseVisualStyleBackColor = true;
            SMTPCancel.Click += SMTPCancel_Click;
            // 
            // SMTPApply
            // 
            SMTPApply.Location = new Point(393, 432);
            SMTPApply.Name = "SMTPApply";
            SMTPApply.Size = new Size(64, 22);
            SMTPApply.TabIndex = 16;
            SMTPApply.Text = "Apply";
            SMTPApply.UseVisualStyleBackColor = true;
            SMTPApply.Click += SMTPApply_Click;
            // 
            // ServicesNew
            // 
            ServicesNew.Location = new Point(12, 12);
            ServicesNew.Name = "ServicesNew";
            ServicesNew.Size = new Size(75, 23);
            ServicesNew.TabIndex = 17;
            ServicesNew.Text = "New";
            ServicesNew.UseVisualStyleBackColor = true;
            ServicesNew.Click += ServicesNew_Click;
            // 
            // ServicesEdit
            // 
            ServicesEdit.Location = new Point(93, 12);
            ServicesEdit.Name = "ServicesEdit";
            ServicesEdit.Size = new Size(75, 23);
            ServicesEdit.TabIndex = 18;
            ServicesEdit.Text = "Edit";
            ServicesEdit.UseVisualStyleBackColor = true;
            ServicesEdit.Click += ServicesEdit_Click;
            // 
            // ServiceDelete
            // 
            ServiceDelete.Location = new Point(174, 12);
            ServiceDelete.Name = "ServiceDelete";
            ServiceDelete.Size = new Size(75, 23);
            ServiceDelete.TabIndex = 19;
            ServiceDelete.Text = "Delete";
            ServiceDelete.UseVisualStyleBackColor = true;
            ServiceDelete.Click += ServiceDelete_Click;
            // 
            // dataGridView1
            // 
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(12, 56);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowTemplate.Height = 25;
            dataGridView1.Size = new Size(515, 348);
            dataGridView1.TabIndex = 20;
            dataGridView1.CellContentClick += dataGridView1_CellContentClick;
            // 
            // ServicesSettings
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(539, 466);
            Controls.Add(dataGridView1);
            Controls.Add(ServiceDelete);
            Controls.Add(ServicesEdit);
            Controls.Add(ServicesNew);
            Controls.Add(SMTPApply);
            Controls.Add(SMTPCancel);
            MaximizeBox = false;
            Name = "ServicesSettings";
            Text = "Services Settings";
            Load += ServicesSettings_Load;
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ResumeLayout(false);
        }

        #endregion
        private Button SMTPCancel;
        private Button SMTPApply;
        private Button ServicesNew;
        private Button ServicesEdit;
        private Button ServiceDelete;
        private DataGridView dataGridView1;
    }
}