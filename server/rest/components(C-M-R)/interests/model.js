const {db, pgp} = require("../../../config/database");

class Interest {
    isValidType(type) {
        const authorized_types = ['id', 'name']
        return authorized_types.some((authorized_type) => {
            return type === authorized_type
        })
    }

    async  getBy(type, value) {
        try {
            let result;
            if (!this.isValidType(type)) {
            console.log(`Interest.getBy(): ${type} is not an authorized type`);
            return (null);
            }
            console.log(`SELECT * FROM public."Interest" WHERE ${type} = ${value}`)
            result = await db.any(`SELECT * FROM public."Interest" WHERE $1:name = $2`, [type, value])
            return (result)
        }
        catch (err) {
            console.log(err, "in model Interest.getBy()");
        }
    }

    async  getAll() {
        try {
          let result;
          console.log('SELECT * FROM public."Interest"')
          result = await db.any('SELECT * FROM public."Interest"')
          return (result)
        }
        catch (err) {
          console.log(err, "in model Interest.getAll()");
        }
    }

    async  exists(type, value) {
        try {
            let result;
            if (!value) return false;
            if (!this.isValidType(type)) {
                console.log(`Interest.exists(): ${type} is not an authorized type`);
                return (null);
            }
            console.log(`SELECT exists(SELECT from public."Interest" WHERE ${type} = ${value})`)
            result = await db.none(`SELECT exists(SELECT from public."Interest" WHERE id = ALL($2));`, [value])
            return (result[0].exists)
        }
        catch (err) {
            console.log(err, "in model Interest.exists()");
        }
    }
}

module.exports = Interest