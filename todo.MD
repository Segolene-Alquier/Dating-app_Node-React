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

## 10/11

- integrer front material-ui sur les pages signup et login => SEGO
- faire front page mon profil => SEGO
- Encrypter les mots de passe
- validation compte via email https://trello.com/c/YhooitkC/10-envoyer-email-de-confirmation-pour-valider-profil => YANN
- reset mdp https://trello.com/c/JMxZst4c/13-reinitialisation-mdp => YANN

## 14/11

### Verification token

L'utilisateur recoit un lien pour confirmer le compte
quand le front recoit l'URL, il fait une requete au back pour confirmer le token
Si le back retourne true, le front affiche "Utilisateur validé". Le back supprime la ligne dans userValidation et passe utilisateur a verfied => true
Si le back retourne false, le front affiche l'erreur que le back aura retourné
