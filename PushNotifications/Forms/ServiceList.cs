using PushNotifications.Interface;
using PushNotifications.Model;
using PushNotifications.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace PushNotifications.Forms
{
    public partial class ServiceList : Form
    {
        public ServiceList()
        {
            InitializeComponent();
            LoadServiceMasterData();
        }
        public void LoadServiceMasterData()
        {
            IServiceMaster serviceMaster = new ServiceMasterService();
            ServiceMasterList serviceList = serviceMaster.GetAllServices();
            var targetList = GetServiceMasterGridData(serviceList).Items;
            ServiceListDataGrid.DataSource = targetList;

        }
        public ServiceMasterDataGridViewList GetServiceMasterGridData(ServiceMasterList serviceMasterList)
        {
            ServiceMasterDataGridViewList serviceMasterDataGridViewList = new ServiceMasterDataGridViewList();
            List<ServiceMasterDataGridViewDTO> dataList = new List<ServiceMasterDataGridViewDTO>();
            foreach (var item in serviceMasterList.Items)
            {
                ServiceMasterDataGridViewDTO serviceMasterDataGridViewDTO = new ServiceMasterDataGridViewDTO();
                serviceMasterDataGridViewDTO.ServiceId = item.ServiceId;
                serviceMasterDataGridViewDTO.Title = item.Title;
                serviceMasterDataGridViewDTO.AlertType = item.AlertType;
                serviceMasterDataGridViewDTO.EmailTo = item.EmailTo;
                serviceMasterDataGridViewDTO.AttachmentType = item.AttachmentType;
                serviceMasterDataGridViewDTO.AttachmentFileType = item.AttachmentFileType;
                serviceMasterDataGridViewDTO.IsActive = item.IsActive;
                serviceMasterDataGridViewDTO.IsDeleted = item.IsDeleted;
                dataList.Add(serviceMasterDataGridViewDTO);
            }
            serviceMasterDataGridViewList.Items = dataList;

            return serviceMasterDataGridViewList;
        }

        private void AddNewServiceBtn_OnCLick(object sender, EventArgs e)
        {
            ServiceDetail serviceDetail = new ServiceDetail();
            serviceDetail.ShowDialog();
        }
    }
}
