const { nextTick } = require('process');
let con = require('../../config/db.config');

let User = function(user){
    this.status     =    user.status ? user.status : 1;
    this.fullname   =    user.fullname;
    this.email      =    user.email;
    this.phone      =    user.phone;
    this.password   =    user.password;
    this.created_at =    new Date();
    this.updated_at =    new Date();
}

//get all users from db
User.getAllUsers = (result) => {
    con.query('SELECT * FROM node', (err, res) => {
        if(err){
            console.log('Error while fetching list of users', err);
            result(null,err);
        }else{
            console.log('Users list fetched successfully');
            result(null,res);
        }
    })
}

//get user by id from db
User.getUserById = (id, result) => {
    con.query('SELECT * FROM node WHERE id = ?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching user", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//create a new user
User.createNewUser = (userRequestData, result) => {
    con.query('INSERT INTO node SET ?', userRequestData, (err, res) => {
        if(err) {
            console.log("Unable to post", err);
            result(null, err);
        } else {
            console.log('user created successfully')
            result(null, res);
        }
    })
}

//update user from db
User.updateUser = (id, userRequestData, result) => {
    con.query('UPDATE node SET status=?, fullname=?, email=? WHERE id=?', [userRequestData.status, userRequestData.fullname, userRequestData.email, id], (err, res) => {
        if(err) {
            console.log("Error while updating user", err);
            result(null, err);
        }else {
            console.log("User updated successfully");
            result(null, res);
        }
    })
}

//delete user
User.deleteUser = (id, result) => {
        // con.query("DELETE FROM node WHERE id=?", id, (err, res) => {
        //     if(err){
        //         console.log("Erro while deleting user",err);
        //         return(null, err);
        //     }else {
        //         console.log("User deleted successfully");
        //         return(null, res);
        //     }
        // })

        con.query("UPDATE node SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
            if(err){
                console.log('Error while deleting the user');
                result(null, err);
            }else{
                console.log("User deleted successfully");
                result(null, res);
            }
        });
}

module.exports = User;