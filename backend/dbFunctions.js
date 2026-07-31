import Database from 'better-sqlite3'

//Create db object when module is loaded
//for testing purposes can be pointed to any other ".db" file in directory
//(will create the file if it doesnt exist)
const db = new Database('UsersDb.db')
db.pragma('journal_mode = WAL')

export function close()
{
    db.close()
}

export function getAllUsers()
{
    return db.prepare(`SELECT * FROM users`).all()
}

export function getUserById(id)
{
    return db.prepare(`SELECT * FROM users WHERE user_id=?`).get(id)
}

export function addUser(firstName, lastName, email, password)
{
    console.log(firstName, lastName, email, password)
    return db.prepare(
        `INSERT INTO Users (first_name, last_name, email, password)
         VALUES (?,?,?,?)
        `
    ).run(firstName, lastName, email, password)
}

export function updateUser(id, newFName, newLName, newEmail, newPassword)
{
    return db.prepare(
        `UPDATE Users SET first_name=?, last_name=?, email=?, password=?
         WHERE user_id=?
        `
    ).run(newFName, newLName, newEmail, newPassword, id)
}

export function deleteUser(id)
{
    return db.prepare(`DELETE FROM Users WHERE user_id=?`).run(id)
}

export function addWebsite(id, website_name, website_data) {
    return db.prepare(
        `INSERT INTO websites (user_id, website_name, website_data)
            VALUES (?,?,?)`
    ).run(id, website_name, website_data)
}

export function getWebsitesByUser(user_id) {
    const stmt = db.prepare(
        `SELECT * FROM websites WHERE user_id = ?`
    );

    return stmt.all(user_id);
}

export function getWebsiteById(id) {
    return db.prepare(
        "SELECT * FROM websites WHERE website_id = ?"
    ).get(id);
}

export function updateWebsiteData(id, data) {
    return db.prepare(`
        UPDATE websites
        SET website_data = ?
        WHERE website_id = ?
    `).run(data, id);
}

export function getUserByEmail(email){

    return db.prepare(
        `
        SELECT *
        FROM users
        WHERE LOWER(email)=LOWER(?)
        `
    ).get(email)

}