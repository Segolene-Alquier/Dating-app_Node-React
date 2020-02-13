const { db } = require('../../../config/database');

class Block {
  isValidType(type) {
    const authorizedTypes = ['id', 'blockingUser', 'blockedUser'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async create(blockingUserId, blockedUserId) {
    try {
      console.log(
        `INSERT INTO public."Block" (blockingUser, blockedUser) VALUES (${blockingUserId}, ${blockedUserId} RETURNING id)`,
      );
      return await db
        .any(
          'INSERT INTO public."Block" ("blockingUser", "blockedUser") VALUES ($1, $2) RETURNING id',
          [blockingUserId, blockedUserId],
        )
        .then(data => {
          return {
            success: true,
            created: true,
            id: data[0].id,
          };
        });
    } catch (err) {
      console.log(err, 'in model Block.create()');
      return { created: false, error: err };
    }
  }

  async exists(blockingUser, blockedUser) {
    try {
      console.log(
        `SELECT exists(SELECT from public."Block" WHERE "blockingUser" = ${blockingUser} AND "blockedUser" = ${blockedUser})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."Block" WHERE "blockingUser" = $1 AND "blockedUser" = $2);`,
        [blockingUser, blockedUser],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Block.exists()');
      return null;
    }
  }

  async delete(blockingUser, blockedUser) {
    try {
      console.log(
        `DELETE FROM public."Block" WHERE "blockingUser" = ${blockingUser} AND "blockedUser" = ${blockedUser}`,
      );
      const result = await db.any(
        'DELETE FROM public."Block" WHERE "blockingUser" = $1  AND "blockedUser" = $2 ',
        [blockingUser, blockedUser],
      );
      return { success: true, deleted: true };
    } catch (err) {
      console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = Block;
