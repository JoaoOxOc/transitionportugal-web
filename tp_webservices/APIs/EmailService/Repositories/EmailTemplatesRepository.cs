
using CommonLibrary.Entities;
using EmailService.Model;
using EmailService.Services.UnitOfWork;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EmailService.Repositories
{
    public class EmailTemplatesRepository : IEmailTemplatesRepository
    {
        private readonly DatabaseContext context = null;

        public EmailTemplatesRepository(IOptions<DbConfiguration> configs)
        {
            this.context = new DatabaseContext(configs);
        }

        public async Task Add(EmailTemplate entity)
        {
            try
            {
                await this.context.EmailTemplates.InsertOneAsync(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Count(string searchText, int? offset, int? limit, string sort)
        {
            try
            {
                searchText = searchText == null ? string.Empty : searchText.Trim();

                IQueryable<EmailTemplate> query = context.EmailTemplates.AsQueryable();

                query = query.Where(x => x.Description.Contains(searchText));


                List<EmailTemplate> logsList = query.ToList();

                return logsList.Count();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(string id)
        {
            try
            {
                DeleteResult actionResult = await this.context.EmailTemplates.DeleteOneAsync(Builders<EmailTemplate>.Filter.Eq("Id", id));

                return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<EmailTemplate>> Get()
        {
            try
            {
                return await context.EmailTemplates.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmailTemplate> GetById(object id)
        {
            var filter = Builders<EmailTemplate>.Filter.Eq("Id", id);

            try
            {
                return await context.EmailTemplates.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<EmailTemplate> GetFiltered(string searchText, int? offset, int? limit, string sort, string sortDirection, string ignoreId = null)
        {
            try
            {
                searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();

                IQueryable<EmailTemplate> query = context.EmailTemplates.AsQueryable();

                query = query.Where(x => x.Description.ToLower().Contains(searchText) || x.Key.ToLower() == searchText);

                if (!string.IsNullOrEmpty(ignoreId))
                {
                    query = query.Where(x => x.Id != ignoreId);
                }

                //SortDefinition<Log> sortFilter;

                switch (sort)
                {
                    case "Description":
                        query = sortDirection == "asc" ? query.OrderBy(x => x.Description) : query.OrderByDescending(x => x.Description);
                        break;
                    case "Key":
                        query = sortDirection == "asc" ? query.OrderBy(x => x.Key) : query.OrderByDescending(x => x.Key);
                        break;
                    default:
                        query = sortDirection == "asc" ? query.OrderBy(x => x.CreatedAt) : query.OrderByDescending(x => x.CreatedAt);
                        break;
                }



                if (offset.HasValue && limit.HasValue)
                {
                    query = query.Skip((offset.Value - 1) * limit.Value).Take(limit.Value);
                }

                List<EmailTemplate> logsList = query.ToList();

                return logsList;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmailTemplate> Update(EmailTemplate editedEmailTemplate)
        {
            try
            {
                var filter = Builders<EmailTemplate>.Filter.Eq("Id", editedEmailTemplate.Id);
                var setting = this.context.EmailTemplates.Find(filter).FirstOrDefaultAsync();
                if (setting.Result != null)
                {
                    var update = Builders<EmailTemplate>.Update
                                          .Set(x => x.Description, editedEmailTemplate.Description)
                                          .Set(x => x.Language, editedEmailTemplate.Language)
                                          .Set(x => x.Subject, editedEmailTemplate.Subject)
                                          .Set(x => x.Body, editedEmailTemplate.Body);

                    var result = await this.context.EmailTemplates.UpdateOneAsync(filter, update);
                    if (result.IsAcknowledged)
                    {
                        return setting.Result;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
