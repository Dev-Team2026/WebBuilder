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