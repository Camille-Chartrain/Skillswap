import validator from "validator";
import client from "../database.js";

//A CONFIGURER
class User {

    #id;
    #email;
    #hash;
    #birthday;
    #grade_level;
    #presentation;
    #role;


    constructor(config) {
        this.id = config.id;
        this.email = config.email;
        this.hash = config.hash;
        this.birthday = config.birthday;
        this.grade_level = config.grade_level;
        this.presentation = config.presentation;
        this.role = config.role;
    }

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    get hash() {
        return this.#hash;
    }

    get birthday() {
        return this.#birthday;
    }

    get grade_level() {
        return this.#grade_level;
    }

    get presentation() {
        return this.#presentation;
    }

    get role() {
        return this.#role;
    }

    set id(value) {
        if (typeof value !== 'number' && typeof value !== 'undefined') {
            throw new Error('Id incorrect');
        }
        this.#id = value;
    }

    set email(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email invalide');
        }
        this.#email = value;
    }

    set hash(value) {
        if (!value) {
            throw new Error('Mot de passe invalide');
        }
        this.#hash = value;
    }



    async create() {
        const text = `
        INSERT INTO "user" ("email", "hash")
        VALUES ($1, $2)
        RETURNING id;
    `;
        const values = [this.email, this.hash];
        const result = await client.query(text, values);
        this.#id = result.rows[0].id;
    }

    static async read(id) {
        const text = `
        SELECT * FROM "user"
        WHERE id = $1;
    `;
        const values = [id];
        const result = await client.query(text, values);
        if (result.rowCount > 0) {
            return new User(result.rows[0]);
        }
        else {
            throw new Error('User non trouvé');
        }
    }

    async update() {
        const text = `
      UPDATE "user" 
      SET 
        "email" = $1,
        "hash" = $2
      WHERE id = $3;
    `;
        const values = [this.emaill, this.hash, this.id];
        client.query(text, values);
    }

    async delete() {
        const text = `
      DELETE FROM "user"
      WHERE id = $1;
    `;
        const values = [this.id];
        client.query(text, values);
    }
}

export default User;
