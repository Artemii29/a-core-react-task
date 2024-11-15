import '../styles/Login.scss';
import {useState} from 'react';
import axios from 'axios';
import {ApolloClient, gql, InMemoryCache, useMutation} from '@apollo/client';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    organizations {
      name
      id
      userRoles {
        role {
          id
          name
        }
      }
      users {
        id
        name
        surname
        email
        companies {
          id
          name
        }
      }
    }
  }
}
`;

const Login: React.FC<null> = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	
	const [inputType, setInputType] = useState(false);
	const [loginUser] = useMutation(LOGIN_USER);
	const [loginError, setLoginError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const changeInput = () => {
		setInputType(!inputType);
	};
	const updateLogin = (event) => {
		setLogin(event.target.value);
		setLoginError(false);
	};
	const updatePassword = (event) => {
		setPassword(event.target.value);
		setPasswordError(false);
	};
	let error = '';
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let hasError = false;
		if (!login) {
			setLoginError(true);
			hasError = true;
		}
		if (!password) {
			setPasswordError(true);
			hasError = true;
		}
		try {
			const {data} = await loginUser({
				variables: {email: login, password},
			});
			console.log(data);
			localStorage.setItem('token', data.login.token);
			navigate('/main');
		} catch (error) {
			console.error('Ошибка при авторизации:', error);
			alert('Ошибка при авторизации. Проверьте логин и пароль.');
		}
		
	};
	
	return (
		<div className="login_page">
			<div className="login_page_main">
				<img src="../pictures/core-logo.svg" width="120px" height="20px"/>
				<div className="login_popup">
					<h3 className="login_popup_logo">Войдите в свой аккаунт</h3>
					<div className="login_popup__inputs">
						<div className={`login_popup__inputs__input ${loginError ? 'error' : ''}`}>
							<label htmlFor="">Адрес электронной почты<span>*</span></label>
							<input
								type="text"
								value={login}
								onChange={updateLogin}
								className="input"
							
							/>
							{loginError && <span className="error-message">Это поле обязательно для заполнения</span>}
						
						</div>
						<div className={`login_popup__inputs__input ${passwordError ? 'error' : ''}`}>
							<div className="login_popup__inputs__input__item">
								<label htmlFor="">Пароль<span>*</span></label>
								<input
									type={inputType ? 'text' : 'password'}
									value={password}
									onChange={updatePassword}
									className="input"/>
								{passwordError && <span className="error-message">Это поле обязательно для заполнения</span>}
								<img onClick={changeInput} className="login_popup__inputs__input__eye" src="/pictures/eye-off.svg"
								     width="24px" height="24px"/>
							</div>
						</div>
					</div>
					<div className="login__popup__bottom">
						<button onClick={handleSubmit} className="login__popup__bottom__still">Продолжить</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;