import React, { useState } from 'react';

export default function PswdLogin() {

    const [showPassword, setShowPassword] = useState(false);

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
                minLength="12"
                maxLength="64"
                required
            />
            <button type="button" onClick={toggleShowPassword} aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}>
                {showPassword ? 'Cacher' : 'Afficher'}
            </button>
        </div>
    );
}
