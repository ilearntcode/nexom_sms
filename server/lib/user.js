var userfnc = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser 
};

var users = [{id: 1, name: 'Adam', class: 'Class 5'},
            {id: 2, name: 'Joel', class: 'Class 4'}];

function getAllUsers () {
    return users;
}

function getUser (id) {
    return users[id];
}

function deleteUser (id) {
    return users.pop();
}

function updateUser (id) {

}

module.exports = userfnc;