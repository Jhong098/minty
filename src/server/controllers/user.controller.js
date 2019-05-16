import validateRegisterInput from '../validation/register';
import User from '../models/user';
import gravatar from 'gravatar';
import validateLoginInput from '../validation/login';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export const register = (req, res) => {
  const {
    errors,
    isValid,
  } = validateRegisterInput(req.body);
  console.log(isValid)

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      console.log('newUser')

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          console.log('hashing')
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log(user)
                  return res.json(user);
                });
            }
          });
        }
      });
    }
  })
}

export const login = (req, res) => {
  const {
    errors,
    isValid,
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  })
  .then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          };

          jwt.sign(payload, 'secret', {
            expiresIn: 3600,
          }, (err, token) => {
            if (err) console.error('There is some error in token', err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          });
        } else {
          errors.password = 'Incorrect Password';
          return res.status(400).json(errors);
        }
      });
  });
};

export const authenticate = (req, res) => {
  passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  };
};
