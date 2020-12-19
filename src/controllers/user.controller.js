const UserModel = require('../models/user.model')

exports.getUsersList = (req, res) => {
    
    UserModel.getAllUsers((err, users) => {
        if(err){
            res.send(err);
        } else {
            console.log("users fetched");
            res.send(users);
        }
    })
}

//get user by id
exports.getUserByID = (req, res) => {

    UserModel.getUserById(req.params.id, (err, user) => {
        if(err) {
            res.send(err);
        }else {
            console.log("user determined");
            res.send(user);
        }
    })
}

//create new user
exports.createNewUser = (req, res) => {
    const post_data = new UserModel(req.body);
    console.log('userReqData', post_data);

    //check if null
    if(post_data.constructor === Object && Object.keys(post_data).length === 0) {
        res.status(400).send({success: false, message: 'Fill all fields.'});
    }else {
        console.log('data can be post');
        UserModel.createNewUser(post_data, (err, user) => {
            if(err) {
                res.send(err);
                res.json({status: false, message: err, data: user});
            }else {
                res.json({status: true, message: 'User inserted successfully', data: user.insertId, insertedData: post_data});
            }

        })
    }
}

//update user
exports.updateUser = (req, res) => {
    const post_data = new UserModel(req.body);
    console.log('Updated UserReqData', post_data);
    //check if null
    if(post_data.constructor === Object && Object.keys(post_data).length === 0) {
        res.status(400).send({success: false, message: 'Fill all fields.'});
    }else {
        console.log('data to update');
        UserModel.updateUser(req.params.id, post_data, (err, user) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'User updated successfully'});
        })
    }
}

//delete user
exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (err, user) => {
        if(err)
        res.send(err);
        res.json({success: true, message: 'User deleted successfully'});
    })
}