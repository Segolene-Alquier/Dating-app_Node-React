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
      console.log(err, 'in model Notification.create()');
      return { created: false, error: err };
    }
  }

  async updateRead(recipient) {
    try {
      console.log(
        `UPDATE public."Notification" SET read = true WHERE recipient = ${recipient}`,
      );
      const result = await db.any(
        `UPDATE public."Notification" SET read = true WHERE recipient = $1`,
        [recipient],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Notification.updateRead()');
      return null;
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`Notification.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT * FROM public."Notification" WHERE ${type} = ${value} ORDER BY id DESC`,
      );
      const result = await db.any(
        `SELECT * FROM public."Notification" WHERE $1:name = $2 ORDER BY id DESC`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Notification.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."Notification"');
      const result = await db.any('SELECT * FROM public."Notification"');
      return result;
    } catch (err) {
      console.log(err, 'in model Notification.getAll()');
      return null;
    }
  }

  async exists(likingUser, notificationdUser) {
    try {
      console.log(
        `SELECT exists(SELECT from public."Notification" WHERE "likingUser" = ${likingUser} AND "notificationdUser" = ${notificationdUser})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."Notification" WHERE "likingUser" = $1 AND "notificationdUser" = $2);`,
        [likingUser, notificationdUser],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Notification.exists()');
      return null;
    }
  }

  async delete(likingUser, notificationdUser) {
    try {
      console.log(
        `DELETE FROM public."Notification" WHERE "likingUser" = ${likingUser} AND "notificationdUser" = ${notificationdUser}`,
      );
      const result = await db.any(
        'DELETE FROM public."Notification" WHERE "likingUser" = $1  AND "notificationdUser" = $2 RETURNING EXISTS(SELECT from public."Notification" WHERE "notificationdUser" = $1 AND "likingUser" = $2) AS unmatch',
        [likingUser, notificationdUser],
      );
      console.log(result[0].unmatch);
      return { success: true, deleted: true, unmatch: result[0].unmatch };
    } catch (err) {
      console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = Notification;
