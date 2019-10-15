# TODO:

* Proteger les requetes avec try et catch
A checker au signup :
- tout les champs sont remplis en back
- Le login, l'email n'existe pas en DB
- password 1 et 2 sont similaires
- Mot de passe securisé majuscule, minuscule, chiffre, charactere special et minimum 8 characteres
- verifier protection injection sql, cross cxx
- Ajouter messages erreur pour chaque champ
- Verifier les inputs onKeyUp

CORS Errors

Unsubscribe les composant quand on exit 
=> sur les hooks

initialise state avec les valeurs

Json web token, verifier chaque requête si JWT l’a
Stocker JWT dans cookie de session
Mettre en middleware JWT


Etapes validation sign up

- verifie que login = alpha/num char
- verifie que login pas deja en db
- verifie que email est format valide
- verifie que email est pas en db
- verifie que le format de password est bon
- verifie que format password2 est bon aussi
- verifie que les deux passwords sont identiques
- ensuite j'insere en db