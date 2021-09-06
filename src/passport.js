const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = passport.use(new LocalStrategy(
    function(username, password, done){
        if(username == 'VZLA' && password == '123'){
            return done(null, {
                id: '1',
                username: 'VZLA',
                password: '123'
            });
        } else {
            return done(null, false, { message: 'Datos Incorrectos.' });
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    if(id == '1'){
        done(null,{
            id: '1',
            username: 'VZLA',
            password: '123'
        }); 
    }
})