const { faker } = require("@faker-js/faker");

/**
 * https://medium.com/strapi/how-to-handle-pagination-in-strapi-v4-with-sveltekit-d3dd8191137b
 * https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.html#findmany
 */
async function seedUsersCollection() {
  let userRoleId = null;
  const roleFounds = await strapi.entityService.findMany('plugin::users-permissions.role', {
    fields: ['id', 'name'],
    filters: { name: 'Content Manager' },
    sort: { createdAt: 'DESC' },
  });
  if (!roleFounds || roleFounds.length == 0) {
    const roleCreated = await strapi.entityService.create('plugin::users-permissions.role',{
      data: {
        name: "Content Manager",
        description: "can manage the content served",
        type: "content_manager"
      },
    });
    userRoleId = roleCreated.id;
  }
  else {
    userRoleId = roleFounds[0].id;
  }
  const userFounds = await strapi.entityService.findMany('plugin::users-permissions.user', {
    fields: ['username', 'email'],
    filters: { username: 'contentadmin' },
    sort: { createdAt: 'DESC' },
  });
  if (!userFounds || userFounds.length == 0) {
    const userCreated = await strapi.entityService.create('plugin::users-permissions.user',{
      data: {
        username: "contentadmin",
        email: "admin@transicaoportugal.org",
        password: "teste12345678",
        confirmed: true,
        blocked: false
      },
    });
    const userRoleCreated = await strapi.entityService.update('plugin::users-permissions.role',userRoleId,{
      data: {
        users: userCreated.id
      },
    });
  }
}
module.exports = { seedUsersCollection };
