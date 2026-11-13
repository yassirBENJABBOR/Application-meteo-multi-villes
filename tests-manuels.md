
# Tests manuels – Gestion des erreurs

| ID | Cas de test | Action à effectuer | Résultat attendu | Statut |
|---|---|---|---|---|
| ERR01 | Champ vide | Cliquer sur Rechercher sans saisir de ville | Afficher « Veuillez entrer une ville » | ✅ |
| ERR02 | Ville inexistante | Saisir `XYZ12345` | Afficher « Ville introuvable » | ✅ |
| ERR03 | Clé API invalide | Utiliser une clé API incorrecte | Afficher « Clé API invalide » | ✅ |
| ERR04 | Absence de connexion Internet | Désactiver Internet puis effectuer une recherche | Afficher « Vérifiez votre connexion Internet » | ✅ |
| ERR05 | Dépassement du quota API | Simuler une réponse HTTP 429 | Afficher « Trop de quota, réessayez plus tard » | ✅ |
| ERR06 | Erreur serveur | Simuler une réponse HTTP 500 | Afficher « Service météo indisponible » | ✅ |
| ERR07 | Autre erreur HTTP | Simuler une réponse HTTP 400 ou 503 | Afficher un message d'erreur approprié | ✅ |
| ERR08 | Erreur de chargement météo | Provoquer un échec de la requête météo actuelle | Masquer la carte météo et afficher le message d'erreur | ✅ |
| ERR09 | Erreur de chargement prévisions | Provoquer un échec de la requête prévisions | Afficher le message dans la zone des prévisions | ✅ |
| ERR10 | Bouton Ressayer | Après une erreur, cliquer sur Ressayer | Relancer la recherche de la dernière ville saisie | ✅ |
| ERR11 | Chargement après erreur | Provoquer une erreur pendant le chargement | Masquer le loader après la réponse | ✅ |
| ERR12 | Nouvelle recherche après erreur | Faire une recherche invalide puis rechercher une ville valide | Afficher correctement les nouvelles données | ✅ |

## Légende

- ⬜ Non testé
- ✅ Réussi
- ❌ Échoué
