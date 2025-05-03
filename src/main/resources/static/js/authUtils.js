function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// Exemple d'utilisation
const token = localStorage.getItem('jwtToken');  // Récupère le token JWT depuis le stockage local
const parsedToken = parseJwt(token);
if (parsedToken && parsedToken.name) {  // Si le nom de l'utilisateur est dans 'name' dans le token
    // Remplace le nom d'utilisateur dans le lien
    document.getElementById('userName').innerText = parsedToken.name;
} else {
    // Si le nom d'utilisateur n'est pas trouvé, afficher "Nom d'utilisateur inconnu"
    document.getElementById('userName').innerText = "Nom d'utilisateur inconnu";
}
