var crypto = require("crypto");

const usedSlugs = [];

function generateUniqueSlug() {
  var slug = crypto.randomBytes(2).toString("hex");
  // if slug has already been used
  if (usedSlugs.includes(slug)) {
    // create new slug
    slug = crypto.randomBytes(2).toString("hex");
    usedSlugs.push(slug);
    return slug;
  } else {
    // already unique
    return slug;
  }
}

const resolvers = {
  Query: {
    async link(root, { id }, { models }) {
      return models.Link.findByPk(id);
    },
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    }
  },
  Mutation: {
    async createLink(root, { url, slug }, { models }) {
      // if slug is empty, we want to generate unique slug
      slug = generateUniqueSlug();
      return models.Link.create({
        url,
        slug
      });
    }
  }
};

module.exports = resolvers;
