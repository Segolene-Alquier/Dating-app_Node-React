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

  // async getBy(type, value) {
  //   try {
  //     if (!this.isValidType(type)) {
  //       console.log(`Block.getBy(): ${type} is not an authorized type`);
  //       return null;
  //     }
  //     console.log(
  //       `SELECT * FROM public."Block" WHERE ${type} = ${value}`,
  //     );
  //     const result = await db.any(
  //       `SELECT * FROM public."Block", public."User"  WHERE $1:name = $2 AND "Block"."blockingUser" = "User".id ORDER BY date DESC`,
  //       [type, value],
  //     );
  //     return result;
  //   } catch (err) {
  //     console.log(err, 'in model Block.getBy()');
  //     return null;
  //   }
  // }

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

  // async relationship(visitorUser, visitedUser) {
  //   try {
  //     console.log(
  //       `SELECT exists(SELECT from public."Block" WHERE "blockingUser" = $1 AND "blockedUser" = $2) AS visitorlikevisited, exists(SELECT from public."Block" WHERE "blockedUser" = $1 AND "blockingUser" = $2) AS visitedlikevisitor`,
  //     );
  //     const result = await db.any(
  //       `SELECT exists(SELECT from public."Block" WHERE "blockingUser" = $1 AND "blockedUser" = $2) AS visitorlikevisited, exists(SELECT from public."Block" WHERE "blockedUser" = $1 AND "blockingUser" = $2) AS visitedlikevisitor`,
  //       [visitorUser, visitedUser],
  //     );
  //     result[0].match =
  //       result[0].visitorlikevisited && result[0].visitedlikevisitor;
  //     return result[0];
  //   } catch (err) {
  //     console.log(err, 'in model Block.exists()');
  //     return null;
  //   }
  // }

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
