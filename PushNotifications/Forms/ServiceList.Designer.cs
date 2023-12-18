namespace PushNotifications.Forms
{
    partial class ServiceList
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
            ServiceListDataGrid = new DataGridView();
            AddNewServiceBtn = new Button();
            ((System.ComponentModel.ISupportInitialize)ServiceListDataGrid).BeginInit();
            SuspendLayout();
            // 
            // ServiceListDataGrid
            // 
            ServiceListDataGrid.AccessibleName = "";
            ServiceListDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            ServiceListDataGrid.Location = new Point(24, 65);
            ServiceListDataGrid.Name = "ServiceListDataGrid";
            ServiceListDataGrid.RowTemplate.Height = 25;
            ServiceListDataGrid.Size = new Size(849, 456);
            ServiceListDataGrid.TabIndex = 0;
            // 
            // AddNewServiceBtn
            // 
            AddNewServiceBtn.Location = new Point(24, 25);
            AddNewServiceBtn.Name = "AddNewServiceBtn";
            AddNewServiceBtn.Size = new Size(118, 23);
            AddNewServiceBtn.TabIndex = 1;
            AddNewServiceBtn.Text = "Add New Service";
            AddNewServiceBtn.UseVisualStyleBackColor = true;
            AddNewServiceBtn.Click += AddNewServiceBtn_OnCLick;
            // 
            // ServiceList
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(899, 545);
            Controls.Add(AddNewServiceBtn);
            Controls.Add(ServiceListDataGrid);
            Name = "ServiceList";
            Text = "ServiceList";
            ((System.ComponentModel.ISupportInitialize)ServiceListDataGrid).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView ServiceListDataGrid;
        private Button AddNewServiceBtn;
    }
}