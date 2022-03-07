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
    async createLink(root, { link, slug }, { models }) {
      return models.Link.create({
        link,
        slug
      });
    }
  }
};

module.exports = resolvers;
