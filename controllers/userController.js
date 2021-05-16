// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/userModel');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const userModel = jsonDB('../data/user');

//Traigo el validator desde el middleware
const {
	validationResult
} = require('express-validator');


let userController = {
	

		/*show: (req, res) => {

				res.render('login');
			
		},*/

		showRegister: (req, res) => {

		return	res.render('register');
		
		},


		/*store: (req, res) => {
			console.log(req.files);
			// Atrapa los contenidos del formulario... Ponele
			const user = req.body;
			// Verificar si viene un archivo, para nombrarlo.
			// user.imagen = req.file ? req.file.filename : '';
			// console.log(user.imagen);
			// console.log(user);
			// Cuidado sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
			userModel.create(user);
			res.redirect('/');*/
		//},
		
		//Ya lo declaramos en el showregister
		/*register: (req, res) => {
			return res.render('register');
		},*/
		
		processRegister: (req, res) => {
			const resultValidation = validationResult(req);
	
			if (resultValidation.errors.length > 0) {
				return res.render('../views/users/register', {
					errors: resultValidation.mapped(),
					oldData: req.body
				});
			}
	
			let userInDB = User.findByField('email', req.body.email);
	
			if (userInDB) {
				return res.render('../views/users/register', {
					errors: {
						email: {
							msg: 'Este email ya está registrado'
						}
					},
					oldData: req.body
				});
			}
	
			let userToCreate = {
				...req.body,
				password: bcryptjs.hashSync(req.body.password, 10),
				imagen: req.file.filename
			}
	
			let userCreated = User.create(userToCreate);
	
			return res.redirect('/login');
		},

		editUserScreen : (req, res) => {
			let userId = req.params.id;
			res.render('users/editUser',
			{userId : userId}
			);

		},
		
		login: (req, res) => {
			return res.render('/login');
		},
		
		loginProcess: (req, res) => {
			let userToLogin = User.findByField('email', req.body.email);
			
			if(userToLogin) {
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
	
					if(req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
					}
	
					return res.redirect('/user/profile');
				} 
				return res.render('userLoginForm', {
					errors: {
						email: {
							msg: 'Las credenciales son inválidas'
						}
					}
				});
			}
	
			return res.render('userLoginForm', {
				errors: {
					email: {
						msg: 'No se encuentra este email en nuestra base de datos'
					}
				}
			});
		},
		
		profile: (req, res) => {
			return res.render('userProfile', {
				user: req.session.userLogged
			});
		},
	
		
		logout: (req, res) => {
			res.clearCookie('userEmail');
			req.session.destroy();
			return res.redirect('/');
		}
	}
		



module.exports = userController
