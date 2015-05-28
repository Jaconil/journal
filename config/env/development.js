module.exports = {
    connections: {
        default: {
            adapter: 'sails-mongo',
            host: 'maxime-guihal.com',
            port: 27018,
            database: 'journal'
        }
    },
    
    models: {
        connection: 'default',
        migrate: 'safe'
    },
    
    blueprints: {
        prefix: '/api'
    },
    
    
/*    bootstrap: function(callback) {
        
/*        User.create({
            username: 'Jaconil',
            password: 'azerty'
        }).exec(callback);
        */
/*        User.find().exec(function(err, users) {
           console.log('users', users);
           callback();
        });*/
    //} 

};
