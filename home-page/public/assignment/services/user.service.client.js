/**
 * Created by sridh on 2/12/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email : "alice@cs5610.neu.edu"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email : "bob@cs5610.neu.edu"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email : "charly@cs5610.neu.edu"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email : "jannunzi@cs5610.neu.edu" }
            ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user){
            user._id = ((new Date()).getTime()).toString();
            users.push(user);
            return angular.copy(user);
        }

        function findUserById(userId){
            for(var i in users){
                if(users[i]._id === userId){
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var i in users){
                if(users[i].username === username){
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for(var i in users){
                if(users[i].username === username &&
                    users[i].password === password){
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var i in users){
                if(users[i]._id === userId){
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].email = user.email;
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var i in users){
                if(users[i]._id == userId){
                    users.splice(i,1);
                }
            }
        }
    }
})();