import { ObjectId } from 'bson';

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

    return { ...userInfo, _id: result.insertedId };
  }

  async function getByEmail({
    email,
  }) {
    const db = await makeDb();

    return db
      .collection('users')
      .findOne({
        email,
      });
  }

  async function getById({
    _id,
  }) {
    const db = await makeDb();

    return db
      .collection('users')
      .findOne({
        _id: new ObjectId(_id.toString()),
      });
  }

  return Object.freeze({
    insert,
    getByEmail,
    getById,
  });
};

export default makeUsersDb;
