const makeUsersDb = ({ makeDb }) => {
  async function insert({
    ...userInfo
  }) {
    const db = await makeDb();

    const result = await db
      .collection('users')
      .insertOne({
        ...userInfo,
      });

    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }

  return Object.freeze({
    insert,
  });
};

export default makeUsersDb;
