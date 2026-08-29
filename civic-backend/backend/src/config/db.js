// In-memory store — no DB needed for testing
let issues = [];
let counter = 1001;

export const db = {
  collection: () => ({
    insertOne: (doc) => {
      const id = `CIV-${counter++}`;
      issues.push({ _id: id, ...doc });
      return { insertedId: id };
    },
    find: (query) => ({
      sort: () => ({
        toArray: () => {
          let result = [...issues];
          if (query.status) result = result.filter((i) => i.status === query.status);
          if (query.category) result = result.filter((i) => i.category === query.category);
          if (query.area) result = result.filter((i) => i.area === query.area);
          return result.sort((a, b) => b.priority - a.priority);
        },
      }),
    }),
    findOne: ({ _id }) => issues.find((i) => i._id === _id) || null,
    updateOne: ({ _id }, { $set }) => {
      const idx = issues.findIndex((i) => i._id === _id);
      if (idx !== -1) issues[idx] = { ...issues[idx], ...$set };
    },
  }),
};
