const { db } = require('../../../config/database');

class Notification {
  isValidType(type) {
    const authorizedTypes = ['id', 'recipient', 'sender', 'event', 'read'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async create(recipient, sender, type) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `INSERT INTO public."Notification" (recipient, sender, event) VALUES (${recipient}, ${sender}, ${type}, RETURNING id)`,
        );
      return await db
        .any(
          'INSERT INTO public."Notification" (recipient, sender, event) VALUES ($1, $2, $3) RETURNING id',
          [recipient, sender, type],
        )
        .then(data => {
          return {
            success: true,
            created: true,
            id: data[0].id,
          };
        });
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.create()');
      return { created: false, error: err };
    }
  }

  async updateRead(recipient) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `UPDATE public."Notification" SET read = true WHERE recipient = ${recipient}`,
        );
      const result = await db.any(
        `UPDATE public."Notification" SET read = true WHERE recipient = $1`,
        [recipient],
      );
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.updateRead()');
      return null;
    }
  }

  async numberUnread(recipient) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT COUNT(*) FROM public."Notification" WHERE recipient = ${recipient} AND read = false`,
        );
      const result = await db.any(
        `SELECT COUNT(*) FROM public."Notification" WHERE recipient = $1 AND read = false`,
        [recipient],
      );
      return result[0].count;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.numberUnread()');
      return null;
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        if (process.env.VERBOSE === 'true')
          console.log(
            `Notification.getBy(): ${type} is not an authorized type`,
          );
        return null;
      }
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT "Notification".id, "Notification".recipient, "Notification".sender, "Notification".event, "Notification".date, "Notification".read, "User".firstname, "User".profilePicture  FROM public."Notification" INNER JOIN public."User" WHERE ${type} = ${value} ORDER BY id DESC`,
        );
      const result = await db.any(
        `SELECT "Notification".id, "Notification".recipient, "Notification".sender, "Notification".event, "Notification".date, "Notification".read, "User".firstname, "User".username, "User"."profilePicture"
        FROM public."Notification" INNER JOIN public."User" ON("Notification".sender = "User".id)
        WHERE $1:name = $2 ORDER BY id DESC`,
        [type, value],
      );
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      if (process.env.VERBOSE === 'true')
        console.log('SELECT * FROM public."Notification"');
      const result = await db.any('SELECT * FROM public."Notification"');
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.getAll()');
      return null;
    }
  }

  async exists(likingUser, notificationdUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT exists(SELECT from public."Notification" WHERE "likingUser" = ${likingUser} AND "notificationdUser" = ${notificationdUser})`,
        );
      const result = await db.any(
        `SELECT exists(SELECT from public."Notification" WHERE "likingUser" = $1 AND "notificationdUser" = $2);`,
        [likingUser, notificationdUser],
      );
      return result[0].exists;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.exists()');
      return null;
    }
  }

  async delete(likingUser, notificationdUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `DELETE FROM public."Notification" WHERE "likingUser" = ${likingUser} AND "notificationdUser" = ${notificationdUser}`,
        );
      const result = await db.any(
        'DELETE FROM public."Notification" WHERE "likingUser" = $1  AND "notificationdUser" = $2 RETURNING EXISTS(SELECT from public."Notification" WHERE "notificationdUser" = $1 AND "likingUser" = $2) AS unmatch',
        [likingUser, notificationdUser],
      );
      if (process.env.VERBOSE === 'true') console.log(result[0].unmatch);
      return { success: true, deleted: true, unmatch: result[0].unmatch };
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = Notification;
