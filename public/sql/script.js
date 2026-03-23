
function supprimer(id) {
    const routeComplete = '/api/equipe/'+ id;

    fetch(
        routeComplete, {method: "DELETE"}
    ).then(
        (reponse) => response.json()
    ).then(
        (donnee) => window.location.href
    )
}