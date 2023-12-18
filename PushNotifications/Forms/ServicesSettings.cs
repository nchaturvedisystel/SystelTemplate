using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Windows.Forms;
using PushNotification.Model;

namespace PushNotification
{
    public partial class ServicesSettings : Form
    {


        public ServicesSettings()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void SMTPCheck1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void SMTPApply_Click(object sender, EventArgs e)
        {
            foreach (DataGridViewRow row in dataGridView1.Rows)
            {
                int serviceId = 0;
                if (row != null && row.Cells["ServiceId"].Value != null)
                {
                    bool isActive = (bool)row.Cells["Active"].Value;
                    serviceId = (int)row.Cells["ServiceId"].Value;

                    string updateQuery = "UPDATE AlertsServiceMaster SET IsActive = @isActive, IsDeleted = @isDeleted WHERE ServiceId = @serviceId";

                    using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
                    using (SqlCommand cmd = new SqlCommand(updateQuery, connection))
                    {
                        connection.Open();
                        cmd.Parameters.AddWithValue("@isActive", isActive ? 1 : 0);
                        cmd.Parameters.AddWithValue("@isDeleted", isActive ? 0 : 1);
                        cmd.Parameters.AddWithValue("@serviceId", serviceId);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            LoadData();
        }

        private void SMTPCancel_Click(object sender, EventArgs e)
        {
            Close();
        }
        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void ServicesNew_Click(object sender, EventArgs e)
        {
            Rule newServiceForm = new Rule();
            if (newServiceForm.ShowDialog() == DialogResult.OK)
            {
                LoadData();
            }
        }
        private void ServicesSettings_Load(object sender, EventArgs e)
        {
           LoadData();
        }
        private void LoadData()
        {
            string ServiceConnection = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(ServiceConnection);

            connection.Open();

            string query = "SELECT ServiceId, Title, AlertType,AttachmentType,AttachmentFileType,IsActive,IsDeleted FROM AlertsServiceMaster";

            SqlDataAdapter adapter = new SqlDataAdapter(query, connection);
            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet, "AlertsServiceMaster");
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = dataSet.Tables["AlertsServiceMaster"];
            //--this is for DBconfig
            DataSet dataset2 = new DataSet();
            adapter.Fill(dataset2, "DBConnectionMaster");
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = dataset2.Tables["DBConnectionMaster"];
            //--this is for Schedular
            DataSet dataset3 = new DataSet();
            adapter.Fill(dataset3, "AlertsSchedular");
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = dataset3.Tables["AlertsSchedular"];


        }

        private void ServicesEdit_Click(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count == 1)
            {
                int selectedId = (int)dataGridView1.SelectedRows[0].Cells["ServiceId"].Value;
                Rule editForm = new Rule(selectedId);
                editForm.FormClosed += (s, args) => 
                {
                    LoadData();
                };
                editForm.ShowDialog();

            }
            else
            {
                MessageBox.Show("Please select a single row to edit.");
            }

        }
     

        private void ServiceDelete_Click(object sender, EventArgs e)
        {
            DialogResult result = MessageBox.Show("Are you sure you want to delete the selected row(s)?", "Delete Confirmation", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

            if (result == DialogResult.Yes)
            {
                foreach (DataGridViewRow row in dataGridView1.SelectedRows)
                {
                    int recordId = (int)row.Cells["ServiceId"].Value;
                    using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand("DELETE FROM AlertsServiceMaster WHERE ServiceId = @RecordID", connection))
                        {
                            command.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.Int)).Value = recordId;
                            command.ExecuteNonQuery();
                        }
                    }
                    dataGridView1.Rows.Remove(row);
                }
            }

        }
    }
}


