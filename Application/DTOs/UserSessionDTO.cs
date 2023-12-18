namespace DTO
{
    public class UserSessionDTO
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Designation { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string RoleId { get; set; }
        public string CompanyId { get; set; }
        public string DefaultCompanyId { get; set; }
    }

    public class SessionParam
    {
        public string Param0 { get; set; }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
        public string Param3 { get; set; }
        public string Param4 { get; set; }
        public string Param5 { get; set; }
        public string Param6 { get; set; }
        public string Param7 { get; set; }
    }
}
