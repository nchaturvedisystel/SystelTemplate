using System.Net;
namespace Application
{
    public class APIResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
        public T Data { get; set; }
        private static APIResponse<T> Response(bool status, HttpStatusCode code, T data, string message = "")
        {
            return new APIResponse<T>()
            {
                Success = status,
                Message = message,
                StatusCode = (int)code,
                Data = data
            };
        }


        private static APIResponse<string> Response(bool status, HttpStatusCode code, string message = "")
        {
            return new APIResponse<string>()
            {
                Success = status,
                Message = message,
                StatusCode = (int)code
            };
        }

        public static APIResponse<T> OK(T data)
        {
            return Response(true, HttpStatusCode.OK, data, "");
        }

        public static APIResponse<T> OK(T data, string message)
        {
            return Response(true, HttpStatusCode.OK, data, message);
        }

        public static APIResponse<string> OK(string message)
        {
            return Response(true, HttpStatusCode.OK, message);
        }

        public static APIResponse<string> NotFound(string message)
        {
            return Response(false, HttpStatusCode.NotFound, message);
        }

        public static APIResponse<string> Conflict(string message)
        {
            return Response(false, HttpStatusCode.Conflict, message);
        }

        public static APIResponse<string> Created(string message)
        {
            return Response(true, HttpStatusCode.Created, message);
        }
        public static APIResponse<string> Unauthorized(string message)
        {
            return Response(false, HttpStatusCode.Unauthorized, message);
        }
        public static APIResponse<string> BadRequest(string message)
        {
            return Response(false, HttpStatusCode.BadRequest, message);
        }

        public static APIResponse<T> BadRequest(T Data, string message)
        {
            return Response(false, HttpStatusCode.BadRequest, Data, message);
        }

        public static APIResponse<string> InternalServerError(string message)
        {
            return Response(false, HttpStatusCode.InternalServerError, message);
        }

    }
}
