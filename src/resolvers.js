var crypto = require("crypto");

function generateUniqueSlug() {
  var slug = crypto.randomBytes(2).toString("hex");
  // check if slug already exists
  // if not, then return
  return slug;
}

const resolvers = {
  Query: {
    async link(root, { id }, { models }) {
      return models.Link.findByPk(id);
    },
    async allLinks(root, args, { models }) {
      return models.Link.findAll({
        order: [["createdAt", "DESC"]]
      });
    }
  },
  Mutation: {
    async createLink(root, { url, slug }, { models }) {
      // if slug is empty, we want to generate unique slug
      if (!slug) {
        slug = generateUniqueSlug();
      }

      // look through all the Link objects in the database
      // check to see if slug is unique
      models.Link.findAll()
        .then((res) => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].dataValues["slug"] === slug) {
              console.log(slug + " does exist");
              // if there is a repeat, we generate new uniqueSlug
              // and force appendage making it unique
              let appendage = generateUniqueSlug();
              slug += appendage.substr(0, 1);
            } else {
              console.log(slug + " does not exist");
            }
          }
        })
        .catch((err) => err);

      return models.Link.create({
        url,
        slug
      });
    }
  }
};

module.exports = resolvers;
