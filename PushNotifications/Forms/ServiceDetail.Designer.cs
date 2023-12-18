namespace PushNotifications.Forms
{
    partial class ServiceDetail
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
            tabControl1 = new TabControl();
            tabPage1 = new TabPage();
            AttachmentPanel = new Panel();
            AttachmentTypeCB = new ComboBox();
            AttachmentTypeLabel = new Label();
            HasAttachmentCB = new CheckBox();
            AlertTypeCB = new ComboBox();
            label2 = new Label();
            DescriptionRTB = new RichTextBox();
            ServiceDescriptionLabel = new Label();
            ServiceNameTB = new TextBox();
            label1 = new Label();
            tabPage2 = new TabPage();
            tabControl1.SuspendLayout();
            tabPage1.SuspendLayout();
            AttachmentPanel.SuspendLayout();
            SuspendLayout();
            // 
            // tabControl1
            // 
            tabControl1.Controls.Add(tabPage1);
            tabControl1.Controls.Add(tabPage2);
            tabControl1.Location = new Point(27, 12);
            tabControl1.Name = "tabControl1";
            tabControl1.SelectedIndex = 0;
            tabControl1.Size = new Size(579, 426);
            tabControl1.TabIndex = 0;
            // 
            // tabPage1
            // 
            tabPage1.Controls.Add(AttachmentPanel);
            tabPage1.Controls.Add(HasAttachmentCB);
            tabPage1.Controls.Add(AlertTypeCB);
            tabPage1.Controls.Add(label2);
            tabPage1.Controls.Add(DescriptionRTB);
            tabPage1.Controls.Add(ServiceDescriptionLabel);
            tabPage1.Controls.Add(ServiceNameTB);
            tabPage1.Controls.Add(label1);
            tabPage1.Location = new Point(4, 24);
            tabPage1.Name = "tabPage1";
            tabPage1.Padding = new Padding(3);
            tabPage1.Size = new Size(571, 398);
            tabPage1.TabIndex = 0;
            tabPage1.Text = "Service Details";
            tabPage1.UseVisualStyleBackColor = true;
            // 
            // AttachmentPanel
            // 
            AttachmentPanel.Controls.Add(AttachmentTypeCB);
            AttachmentPanel.Controls.Add(AttachmentTypeLabel);
            AttachmentPanel.Location = new Point(6, 155);
            AttachmentPanel.Name = "AttachmentPanel";
            AttachmentPanel.Size = new Size(556, 100);
            AttachmentPanel.TabIndex = 7;
            // 
            // AttachmentTypeCB
            // 
            AttachmentTypeCB.FormattingEnabled = true;
            AttachmentTypeCB.Location = new Point(125, 6);
            AttachmentTypeCB.Name = "AttachmentTypeCB";
            AttachmentTypeCB.Size = new Size(121, 23);
            AttachmentTypeCB.TabIndex = 1;
            // 
            // AttachmentTypeLabel
            // 
            AttachmentTypeLabel.AutoSize = true;
            AttachmentTypeLabel.Location = new Point(22, 12);
            AttachmentTypeLabel.Name = "AttachmentTypeLabel";
            AttachmentTypeLabel.Size = new Size(88, 15);
            AttachmentTypeLabel.TabIndex = 0;
            AttachmentTypeLabel.Text = "Generate From:";
            // 
            // HasAttachmentCB
            // 
            HasAttachmentCB.AutoSize = true;
            HasAttachmentCB.Location = new Point(321, 126);
            HasAttachmentCB.Name = "HasAttachmentCB";
            HasAttachmentCB.Size = new Size(112, 19);
            HasAttachmentCB.TabIndex = 6;
            HasAttachmentCB.Text = "Has Attachment";
            HasAttachmentCB.UseVisualStyleBackColor = true;
            HasAttachmentCB.CheckedChanged += HasAttachmentCB_CheckedChanged;
            // 
            // AlertTypeCB
            // 
            AlertTypeCB.FormattingEnabled = true;
            AlertTypeCB.Location = new Point(131, 126);
            AlertTypeCB.Name = "AlertTypeCB";
            AlertTypeCB.Size = new Size(121, 23);
            AlertTypeCB.TabIndex = 5;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(28, 126);
            label2.Name = "label2";
            label2.Size = new Size(86, 15);
            label2.TabIndex = 4;
            label2.Text = "Alert Type        :";
            // 
            // DescriptionRTB
            // 
            DescriptionRTB.Location = new Point(131, 41);
            DescriptionRTB.Name = "DescriptionRTB";
            DescriptionRTB.Size = new Size(431, 75);
            DescriptionRTB.TabIndex = 3;
            DescriptionRTB.Text = "";
            // 
            // ServiceDescriptionLabel
            // 
            ServiceDescriptionLabel.AutoSize = true;
            ServiceDescriptionLabel.Location = new Point(28, 41);
            ServiceDescriptionLabel.Name = "ServiceDescriptionLabel";
            ServiceDescriptionLabel.Size = new Size(85, 15);
            ServiceDescriptionLabel.TabIndex = 2;
            ServiceDescriptionLabel.Text = "Description     :";
            // 
            // ServiceNameTB
            // 
            ServiceNameTB.Location = new Point(131, 7);
            ServiceNameTB.Name = "ServiceNameTB";
            ServiceNameTB.Size = new Size(431, 23);
            ServiceNameTB.TabIndex = 1;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(28, 15);
            label1.Name = "label1";
            label1.Size = new Size(88, 15);
            label1.TabIndex = 0;
            label1.Text = "Service Name : ";
            // 
            // tabPage2
            // 
            tabPage2.Location = new Point(4, 24);
            tabPage2.Name = "tabPage2";
            tabPage2.Padding = new Padding(3);
            tabPage2.Size = new Size(571, 398);
            tabPage2.TabIndex = 1;
            tabPage2.Text = "Schedular Details";
            tabPage2.UseVisualStyleBackColor = true;
            // 
            // ServiceDetail
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(634, 450);
            Controls.Add(tabControl1);
            Name = "ServiceDetail";
            Text = "ServiceDetail";
            tabControl1.ResumeLayout(false);
            tabPage1.ResumeLayout(false);
            tabPage1.PerformLayout();
            AttachmentPanel.ResumeLayout(false);
            AttachmentPanel.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private TabControl tabControl1;
        private TabPage tabPage1;
        private TabPage tabPage2;
        private Label label1;
        private TextBox ServiceNameTB;
        private Label ServiceDescriptionLabel;
        private RichTextBox DescriptionRTB;
        private Label label2;
        private ComboBox AlertTypeCB;
        private CheckBox HasAttachmentCB;
        private Panel AttachmentPanel;
        private Label AttachmentTypeLabel;
        private ComboBox AttachmentTypeCB;
    }
}