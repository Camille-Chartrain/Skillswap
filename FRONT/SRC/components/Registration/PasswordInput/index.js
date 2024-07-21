import React, { useState } from 'react';

export default function PasswordInput() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
    });

    const specialCharPattern = /[@$!%*?&]/;

    const validatePassword = (value) => {
        setValidations({
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialChar: specialCharPattern.test(value),
            hasMinLength: value.length >= 12,
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
        <div>
            <label htmlFor="password">Mot de passe * :</label>
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
            <label>
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={toggleShowPassword}
                />
                Afficher le mot de passe
            </label>
            <ul>
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
                    {validations.hasSpecialChar ? '✔' : '✖'} Contient un caractère spécial (@$!%*?&)
                </li>
                <li style={{ color: validations.hasMinLength ? 'green' : 'red' }}>
                    {validations.hasMinLength ? '✔' : '✖'} Contient au moins 12 caractères
                </li>
            </ul>
        </div>
    );
}
