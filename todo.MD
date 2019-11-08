# TODO:

- Proteger les requetes avec try et catch
  A checker au signup :

* tout les champs sont remplis en back
* Le login, l'email n'existe pas en DB
* password 1 et 2 sont similaires
* Mot de passe securisé majuscule, minuscule, chiffre, charactere special et minimum 8 characteres
* verifier protection injection sql, cross cxx
* Ajouter messages erreur pour chaque champ
* Verifier les inputs onKeyUp
  CORS Errors

Unsubscribe les composant quand on exit
=> sur les hooks

initialise state avec les valeurs

Json web token, verifier chaque requête si JWT l’a
Stocker JWT dans cookie de session
Mettre en middleware JWT

## 29/10

Il nous reste a verifier depuis React que l'utilisateur a un token valide en back (avec JWT.verify).
On doit donc :

- Créer en back une fonction avec une route qui va dire si le token est valide (voir checkToken https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#3432)
- Créer une fonction React qui appelle le back sur la route de verification de token et qui autorise ou non l'affichage de la page. Si non, rediriger vers login
- Proteger les routes avec la fonction réact qu'on a créé

Ressources :
https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#3432
https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352
https://codesandbox.io/s/nn9rr8o1kl?from-embed

## 8/11

- On doit redirect quand le login a fonctionné
- Redirect vers l'accueil si l'utilisateur est deja log
- Ajouter les verif token expired
