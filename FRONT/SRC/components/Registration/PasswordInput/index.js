import React, { useState } from 'react';
import "./style.scss";

export default function PasswordInput() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const specialCharPattern = /[@$!%*?&]/;

    const validatePassword = (value) => {
        setValidations({
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialChar: specialCharPattern.test(value),
        });
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        validatePassword(value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='password'>

            <label htmlFor="password">Mot de passe * :</label>
            <div className='pwd_and_button'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    minLength="12"
                    maxLength="64"
                    required
                />

                <button
                    type="button"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}>
                    {showPassword ? 'Cacher' : 'Afficher'}
                </button>
            </div>

            <ul className='validator'>
                <li style={{ color: validations.hasUpperCase ? 'green' : 'red' }}>
                    {validations.hasUpperCase ? '✔' : '✖'} Contient une majuscule
                </li>
                <li style={{ color: validations.hasLowerCase ? 'green' : 'red' }}>
                    {validations.hasLowerCase ? '✔' : '✖'} Contient une minuscule
                </li>
                <li style={{ color: validations.hasNumber ? 'green' : 'red' }}>
                    {validations.hasNumber ? '✔' : '✖'} Contient un chiffre
                </li>
                <li style={{ color: validations.hasSpecialChar ? 'green' : 'red' }}>
                    {validations.hasSpecialChar ? '✔' : '✖'} Contient un caractère spécial @$!%*?&
                </li>
            </ul>
        </div>
    );
}
