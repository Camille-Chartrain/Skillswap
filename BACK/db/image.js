const fs = require('fs');

// Chemin vers l'image
const cheminImage = 'imageCategory/artSkillswap.jpg';

// Lecture de l'image en mode binaire
fs.readFile(cheminImage, (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture de l\'image :', err);
        return;
    }

    // Conversion du contenu binaire en un tableau de bytes
    const bytes = Array.from(data);

    // Affichage des bytes de l'image
    console.log('Bytes de l\'image :', bytes);
});
