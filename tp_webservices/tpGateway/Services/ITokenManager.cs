namespace tpGateway.Services
{
    public interface ITokenManager
    {
        bool ValidateClient(string clientId, string clientToken);
    }
}
