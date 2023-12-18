using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace PushNotifications.Forms
{
    public partial class ServiceDetail : Form
    {
        public ServiceDetail()
        {
            InitializeComponent();
            LoadAlertTypeCB();
        }
        private void HasAttachmentCB_CheckedChanged(object sender, EventArgs e)
        {
            AttachmentPanel.BackColor = Color.Red;
            if (HasAttachmentCB.Checked == true)
            {
                AttachmentPanel.Show();
            }
            else
            {
                AttachmentPanel.Hide();
            }
        }
        public void LoadAlertTypeCB()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Description", typeof(string));

            dt.Rows.Add("Email", "Email");
            dt.Rows.Add("SMS", "SMS");
            dt.Rows.Add("WhatsApp", "WhatsApp");

            AlertTypeCB.ValueMember = "ID";
            AlertTypeCB.DisplayMember = "Description";
            AlertTypeCB.SelectedValue = "ID";
            AlertTypeCB.DataSource = dt;
        }
        public void LoadtAttachmentTypeCB()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Description", typeof(string));

            dt.Rows.Add("CrystalReport", "CrystalReport");
            dt.Rows.Add("API", "API");
            dt.Rows.Add("DBSP", "DBSP");

            AttachmentTypeCB.ValueMember = "ID";
            AttachmentTypeCB.DisplayMember = "Description";
            AttachmentTypeCB.SelectedValue = "ID";
            AttachmentTypeCB.DataSource = dt;
        }

    }
}
