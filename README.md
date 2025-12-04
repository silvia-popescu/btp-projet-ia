# 🏠 EduHOUSE - Plateforme d'Éducation Sécurisée

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security: Level 5](https://img.shields.io/badge/Security-Level%205%20Enterprise-brightgreen.svg)](https://github.com)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-blue.svg)](https://github.com)
[![Version: 1.0](https://img.shields.io/badge/Version-1.0-orange.svg)](https://github.com)

> **Plateforme éducative complète et sécurisée** connectant élèves, parents et enseignants. Gestion des cours, devoirs, notes, présences, paiements et communications - tout en un seul endroit.

**Version:** 1.0  
**Dernière mise à jour:** Décembre 2025  
**Statut:** ✅ Prêt pour Production  
**Niveau de Sécurité:** 🔵 LEVEL 5 (Enterprise Grade)

---

## 📋 Table des Matières Complète

### 📚 Mise en Route
- [Vue d'ensemble](#-vue-densemble)
- [Démarrage rapide](#-démarrage-rapide)
- [Identifiants de démo](#-identifiants-de-démo)
- [Installation](#-installation)

### 🎯 Fonctionnalités
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Rôles utilisateurs](#-rôles-utilisateurs)
- [Dashboards](#-dashboards)

### 🔐 Sécurité & Permissions
- [Sécurité Enterprise (Niveau 5)](#-sécurité-enterprise-niveau-5)
- [Workflows & Permissions](#-workflows--permissions)
- [Exemples détaillés](#-exemples-de-workflows-détaillés)
- [Permission Matrix](#-permission-matrix)

### 🎤 Présentation & Pitch
- [Pitch français (3 versions)](#-pitch--présentation-française)
- [Démonstration live](#-démonstration-live)
- [Scripts d'oral](#-scripts-oraux-complets)

### 🔧 Technique
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Références API](#-références-api-complètes)
- [Guide Admin Panel](#-admin-panel-guide)

### 📖 Ressources
- [Dépannage](#-dépannage)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## 🎯 Vue d'ensemble

**EduHOUSE** est une plateforme éducative intégrée qui transforme la manière dont les écoles gèrent l'apprentissage. Elle connecte:

| Rôle | Fonction | Actions |
|------|----------|---------|
| **👨‍🎓 Élèves** | Apprentissage | Voir devoirs, soumettre travaux, consulter notes |
| **👨‍👩‍👧 Parents** | Suivi | Suivre progression enfants, communiquer avec profs |
| **👨‍🏫 Enseignants** | Enseignement | Créer cours, assigner devoirs, noter élèves |
| **⚙️ Admin** | Management | Gérer utilisateurs, inscriptions, paiements |

### Notre Mission

> **Transformer l'éducation française avec une plateforme sécurisée, intuitive et centralisée**

### Avantages Clés

- ✅ **Interface intuitive en français**
- ✅ **Sécurité enterprise (Niveau 5)**
- ✅ **4 rôles avec permissions granulaires**
- ✅ **Prêt pour déploiement immédiat**
- ✅ **Documentation complète (5 fichiers)**
- ✅ **Code production-ready**

---

## 🚀 Démarrage Rapide

### En 30 Secondes

#### 1. Lancer le serveur
```bash
npm install
npm start
# ou
node src/server.js
```

#### 2. Ouvrir le navigateur
```
http://localhost:5000
```

#### 3. Se connecter
Utilisez les identifiants de démo ci-dessous

#### 4. Explorer
- Consultez votre dashboard
- Naviguez avec la sidebar
- Gérez les utilisateurs (admin seulement)

---

## 👥 Identifiants de Démo

### Élèves
| Email | Mot de passe | Rôle |
|-------|--------------|------|
| student1@example.com | password123 | Étudiant |
| student2@example.com | password123 | Étudiant |
| student3@example.com | password123 | Étudiant |

### Parents
| Email | Mot de passe | Rôle |
|-------|--------------|------|
| parent1@example.com | password123 | Parent |
| parent2@example.com | password123 | Parent |

### Enseignants
| Email | Mot de passe | Rôle |
|-------|--------------|------|
| teacher1@example.com | password123 | Enseignant |
| teacher2@example.com | password123 | Enseignant |

### Admin
| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@example.com | password123 | Admin |

---

## ✨ Fonctionnalités Principales

### 📚 Gestion des Cours
- ✅ Créer des cours (Enseignants)
- ✅ Inscrire élèves (Admin)
- ✅ Voir cours enregistrés (Élèves)
- ✅ Voir progression (Parents)

### 📝 Devoirs & Évaluations
- ✅ Créer devoirs (Enseignants)
- ✅ Soumettre travaux (Élèves)
- ✅ Noter et donner feedback (Enseignants)
- ✅ Voir notes (Élèves & Parents)

### 📊 Suivi & Rapports
- ✅ Consulter notes (Élèves/Parents)
- ✅ Voir présences (Élèves/Parents)
- ✅ Générer rapports (Enseignants)
- ✅ Statistiques système (Admin)

### 💬 Communication
- ✅ Messagerie directe (Tous)
- ✅ Notifications (Temps réel)
- ✅ Historique messages
- ✅ Archivage

### 💰 Paiements
- ✅ Créer demandes (Admin)
- ✅ Effectuer paiements (Parents)
- ✅ Approuver paiements (Admin)
- ✅ Suivi paiements

### 👥 Gestion Utilisateurs
- ✅ Créer comptes (Admin)
- ✅ Gérer permissions (Admin)
- ✅ Lier parent-enfant (Admin)
- ✅ Inscrire élèves (Admin)

---

## 👥 Rôles Utilisateurs

### 👨‍🎓 ÉTUDIANT

**Ce qu'ils peuvent faire:**
- Voir leurs cours enregistrés
- Voir les devoirs assignés
- Soumettre leurs travaux
- Consulter leurs notes
- Voir leur présence
- Envoyer/recevoir messages

**Ce qu'ils NE peuvent PAS faire:**
- Créer des cours
- Noter d'autres élèves
- Gérer les paiements
- Accéder aux fonctions admin

---

### 👨‍👩‍👧 PARENT

**Ce qu'ils peuvent faire:**
- Voir les cours de leurs enfants
- Consulter les notes
- Voir les présences
- Voir les devoirs
- Envoyer/recevoir messages
- Suivre la progression

**Ce qu'ils NE peuvent PAS faire:**
- Ajouter leurs propres enfants (Admin doit le faire)
- Créer des cours
- Noter les élèves
- Gérer les paiements

---

### 👨‍🏫 ENSEIGNANT

**Ce qu'ils peuvent faire:**
- Créer nouvelles classes/cours
- Voir leurs étudiants
- Créer des devoirs
- Noter les soumissions
- Enregistrer présences
- Consulter les paiements
- Envoyer/recevoir messages

**Ce qu'ils NE peuvent PAS faire:**
- Inscrire les élèves (Admin doit le faire)
- Traiter les paiements (Admin le fait)
- Accéder aux autres cours

---

### ⚙️ ADMIN

**Ce qu'ils peuvent faire (COMPLET):**
- Gérer tous les utilisateurs
- Créer et approuver les comptes
- Lier parents aux enfants
- Inscrire élèves dans les cours
- Créer et approuver paiements
- Voir toutes les statistiques
- Accès système complet

**SEUL Admin peut:**
- Ajouter enfants aux parents
- Traiter les paiements
- Approuver les leçons
- Créer les inscriptions

---

## 🎯 Dashboards

### Student Dashboard (Élève)
```
Tableau de Bord
├─ Mes Cours
├─ Mes Devoirs
├─ Mes Notes
├─ Ma Présence
├─ Messages
└─ Paramètres
```

### Teacher Dashboard (Enseignant)
```
Tableau de Bord
├─ Mes Cours
├─ Mes Élèves
├─ Devoirs & Évaluations
├─ Présences
├─ Messages
├─ Paiements
└─ Paramètres
```

### Parent Dashboard (Parent)
```
Tableau de Bord
├─ Mes Enfants
├─ Cours de l'enfant
├─ Notes de l'enfant
├─ Présence de l'enfant
├─ Messages
├─ Paiements
└─ Paramètres
```

### Admin Panel (Admin)
```
Panneau Admin
├─ Utilisateurs
├─ Classes
├─ Paiements
├─ Statistiques
├─ Audit Logs
└─ Paramètres Système
```

---

## 🔐 Sécurité Enterprise (Niveau 5)

### ⭐ 7 Composants de Sécurité

#### 1. 🔐 Validation Mots de Passe Forte
- Minimum 12 caractères (↑ de 8)
- Lettres MAJUSCULES requises
- Lettres minuscules requises
- Nombres (0-9) requis
- Caractères spéciaux (!@#$%^&*) requis
- Blocage patterns courants (password123, admin, etc.)

#### 2. 🛡️ Rate Limiting (Protection Force Brute)
- Login: 5 tentatives par 15 minutes
- Registration: 5 tentatives par 15 minutes
- Suivi par IP et par email
- Verrouillage automatique du compte
- Configuration flexible

#### 3. 📋 Audit Logging Complet
- Tous les événements authentification
- Suivi de l'adresse IP
- Timestamp précis
- Niveaux de sévérité (INFO/WARNING/CRITICAL)
- Stockage dans `logs/audit.log`
- Analyse forensique possible

#### 4. 🧹 Sanitisation d'Entrées
- Validation format email
- Suppression caractères dangereux
- Validation usernames
- Typage variables
- Protection XSS
- Protection injection

#### 5. 🔑 Sécurité Tokens
- Blacklist tokens au logout
- Vérification sur tous endpoints
- Endpoint révocation
- 24 heures expiration
- JWT HS256

#### 6. 🔒 Chiffrement Données
- AES-256-GCM disponible
- Génération IV aléatoire
- Vérification tag authentification
- Génération clés cryptographiques
- Prêt production

#### 7. 🌐 En-têtes Sécurité HTTP (8)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy
- Strict-Transport-Security
- Referrer-Policy
- Permissions-Policy
- X-Request-ID unique

### Protection Contre Attaques

| Attaque | Protégé | Méthode |
|---------|---------|---------|
| **Force Brute** | ✅ | Rate limiting (5/15min) |
| **Dictionary** | ✅ | Mots de passe forts |
| **XSS** | ✅ | Sanitisation + CSP |
| **SQL Injection** | ✅ | Validation entrées |
| **CSRF** | ✅ | CORS + Headers |
| **Session Hijacking** | ✅ | Blacklist tokens |
| **Token Theft** | ✅ | Expiration + Blacklist |
| **Clickjacking** | ✅ | X-Frame-Options |
| **MIME Sniffing** | ✅ | X-Content-Type |
| **Man-in-the-Middle** | ⚠️ | Besoin HTTPS/TLS |

### Fichiers Sécurité
- **`src/security.js`** (600+ lignes) - Module sécurité complète
- **`src/server.js`** - Intégration sécurité
- **`logs/audit.log`** - Piste audit

---

## 🔄 Workflows & Permissions

### 🎯 Qui Approuve Quoi?

#### ✅ ADMIN approuve:
- ✓ Ajout enfants aux parents
- ✓ Inscription élèves dans classes
- ✓ Traitement paiements
- ✓ Création comptes

#### ✅ ENSEIGNANT approuve:
- ✓ Notation devoirs (évaluation)
- ✓ Enregistrement présence
- ✓ Création évaluations

#### ✅ PAS D'APPROBATION nécessaire pour:
- ✓ Messages (envoi direct)
- ✓ Élève voit ses notes
- ✓ Parent voit données enfant

---

### 📝 Exemples de Workflows Détaillés

#### Workflow 1: Inscription Élève
```
1. Parent/Élève crée compte
   └─ Sur index.html, Sign Up

2. Admin approuve
   └─ Admin Panel → Users
   └─ Vérifie compte

3. Admin ajoute enfant
   └─ Lie parent_id à child_id
   └─ Stocké: parent_child.json

4. Admin inscrit étudiant
   └─ Sélectionne classe
   └─ Ajoute élève
   └─ Stocké: enrollments.json

5. Parent & Élève voient la classe
   └─ Apparait dans dashboards
```

#### Workflow 2: Créer Cours
```
1. Enseignant crée classe
   └─ Dashboard → "Mes Cours"
   └─ "Créer Nouveau Cours"
   └─ Nom, Niveau, Description
   └─ Sauvegardé: classes.json

2. Admin inscrit élèves (optionnel)
   └─ Admin Panel → Classes
   └─ Sélectionner classe
   └─ Ajouter étudiants
   └─ Sauvegardé: enrollments.json

3. Enseignant voit ses élèves
   └─ Dashboard → "Mes Élèves"
   └─ Peut assigner devoirs

4. Élèves voient le cours
   └─ Dashboard → "Classes"
   └─ Voir contenu
```

#### Workflow 3: Soumettre Devoir
```
1. Enseignant crée devoir
   └─ "Devoirs & Évaluations"
   └─ Titre, description, deadline
   └─ Sauvegardé: homework.json

2. Élève reçoit notification
   └─ Notification automatique

3. Élève soumet travail
   └─ Clique "Soumettre"
   └─ Upload fichier OU texte
   └─ Sauvegardé: homework_submissions.json

4. Enseignant note
   └─ Revoit soumission
   └─ Rentre note (A/B/C ou 20/20)
   └─ Ajoute feedback
   └─ Sauvegardé: grades.json

5. Élève voit note
   └─ Dashboard → "Notes"
   └─ Voit note + commentaire prof

6. Parent voit note
   └─ Dashboard → Enfant → Notes
```

#### Workflow 4: Traitement Paiement
```
1. Admin crée demande
   └─ Admin Panel → Paiements
   └─ Montant, Parent, Description
   └─ Sauvegardé: payments.json

2. Parent paie
   └─ Voit notification
   └─ Effectue paiement

3. Admin confirme
   └─ Admin Panel → Paiements
   └─ Vérifie et approuve
   └─ Statut: "Approuvé"

4. Enseignant voit paiement reçu
```

#### Workflow 5: Messages
```
1. Parent envoie message
   └─ Dashboard → Messages
   └─ Nouveau Message
   └─ Sélectionne Prof
   └─ Écrit contenu
   └─ Sauvegardé: messages.json

2. Professeur reçoit
   └─ Notification
   └─ Inbox Messages

3. Professeur répond
   └─ Clique Répondre
   └─ Conversation directe
   └─ Pas d'approbation

4. Parent voit réponse
```

---

### 📊 Permission Matrix Complète

| Action | Élève | Parent | Prof | Admin |
|--------|-------|--------|------|-------|
| **Ajouter enfant** | ❌ | ❌ | ❌ | ✅ |
| **Créer classe** | ❌ | ❌ | ✅ | ✅ |
| **Inscrire élève** | ❌ | ❌ | ❌ | ✅ |
| **Créer devoir** | ❌ | ❌ | ✅ | ✅ |
| **Soumettre devoir** | ✅ | ❌ | ❌ | ❌ |
| **Noter travail** | ❌ | ❌ | ✅ | ✅ |
| **Marquer présence** | ❌ | ❌ | ✅ | ✅ |
| **Créer paiement** | ❌ | ❌ | ❌ | ✅ |
| **Approuver paiement** | ❌ | ❌ | ❌ | ✅ |
| **Envoyer message** | ✅ | ✅ | ✅ | ✅ |
| **Voir ses données** | ✅ | ✅* | ✅ | ✅ |

*Parent peut voir données enfant seulement si lié

---

### 📁 Fichiers de Données

| Fichier | Contenu | Créé par | Approuvé par |
|---------|---------|----------|--------------|
| **users.json** | Comptes utilisateurs | Admin | - |
| **parent_child.json** | Liens parent-enfant | Admin | Admin |
| **classes.json** | Cours/classes | Enseignant | - |
| **enrollments.json** | Inscriptions élèves | Admin | Admin |
| **homework.json** | Devoirs | Enseignant | - |
| **homework_submissions.json** | Soumissions élèves | Élève | - |
| **grades.json** | Notes | Enseignant | - |
| **attendance.json** | Présences | Enseignant | - |
| **payments.json** | Paiements | Admin | Admin |
| **messages.json** | Messages | Tous | - |
| **lessons.json** | Leçons | Enseignant | Admin |

---

## 🎤 Pitch & Présentation Française

### ⏱️ VERSION 10 SECONDES

```
"EduHOUSE est une plateforme éducative sécurisée qui connecte 
élèves, parents et enseignants. Nous simplifions la gestion des 
cours, devoirs et paiements. Niveau de sécurité: Enterprise Grade 
(Niveau 5). Prêt pour déploiement immédiat."
```

### ⏱️ VERSION 30 SECONDES

```
"EduHOUSE est une plateforme d'éducation en ligne révolutionnaire 
pour les établissements scolaires français.

Elle permet:
- Les ENSEIGNANTS de créer des cours et noter les élèves en 
  temps réel
- Les PARENTS de suivre la progression de leurs enfants
- Les ÉLÈVES de soumettre leurs travaux
- L'ADMIN de gérer les paiements et inscriptions

Sécurité de niveau entreprise avec authentification renforcée,
chiffrement des données et audit logging."
```

### ⏱️ VERSION 1 MIN 30 SECONDES (STRUCTURE)

**1. Ouverture impactante (15 sec)**
Levez la main si vous recevez des SMS pour savoir comment va votre enfant à l'école...

**2. Le problème (30 sec)**
Les écoles françaises utilisent des systèmes fragmentés: emails, SMS, papier. Inefficace et pas sécurisé.

**3. Notre solution (45 sec)**
EduHOUSE centralise TOUT:
- Enseignants créent cours et notent
- Parents suivent progression
- Élèves soumettent travaux
- Admin gère tout

**4. La sécurité (30 sec)**
Niveau 5 Enterprise:
- JWT authentification
- Mots de passe forts (12 caractères)
- Rate limiting
- Audit logging complet
- Chiffrement AES-256

**5. Le marché (30 sec)**
65,000 établissements en France. À 100€/mois: 78M€ potentiel.

**6. Prochaines étapes & Ask (30 sec)**
Cherchons 500k€ pour:
- Développement complet
- Infrastructure
- Marketing
- Beta test 5 écoles

**TOTAL: 1 min 30 sec**

---

## 🎬 Démonstration Live

### Titre: "Une Journée Type dans EduHOUSE"

#### ACT 1: Matin (2 min)
- **Scène 1:** Prof crée un cours
- **Scène 2:** Admin inscrit 3 élèves

#### ACT 2: En classe (3 min)
- **Scène 3:** Prof assigne devoir
- **Scène 4:** Élève reçoit notification
- **Scène 5:** Élève soumet travail

#### ACT 3: Après-midi (3 min)
- **Scène 6:** Prof note le devoir
- **Scène 7:** Élève voit sa note

#### ACT 4: Parents (2 min)
- **Scène 8:** Parent voit progression
- **Scène 9:** Parent envoie message
- **Scène 10:** Prof répond

#### ACT 5: Admin (2 min)
- **Scène 11:** Admin crée paiement
- **Scène 12:** Parent paie
- **Scène 13:** Admin confirme

**TOTAL: 15 minutes**

---

## 🔧 Stack Technique

### Frontend
- **HTML5** - Structure (pages: student, teacher, parent, admin)
- **CSS3** - Styling (responsive, modern)
- **JavaScript (Vanilla)** - Interaction
- **Fontawesome** - Icons
- **Animations** - Smooth transitions

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **JWT** - Authentification
- **bcryptjs** - Hashing passwords
- **CORS** - Cross-origin requests

### Base de Données
- **JSON Files** - Data storage (11 fichiers)
- **File System** - Persistence

### Sécurité
- **bcryptjs** - Password hashing (10 rounds)
- **crypto** - Token generation + AES-256
- **Rate Limiter** - Custom implementation
- **Audit Logger** - Custom logging

---

## 📁 Structure du Projet

```
projet/
├── src/
│   ├── server.js           # Express server principal
│   ├── database.js         # Gestion données JSON
│   ├── security.js         # Module sécurité (600+ lines)
│   └── auth-handlers.js    # Authentification
│
├── data/
│   ├── users.json          # Comptes utilisateurs
│   ├── classes.json        # Classes/cours
│   ├── enrollments.json    # Inscriptions
│   ├── parent_child.json   # Liens parent-enfant
│   ├── homework.json       # Devoirs
│   ├── homework_submissions.json  # Soumissions
│   ├── grades.json         # Notes
│   ├── attendance.json     # Présences
│   ├── payments.json       # Paiements
│   ├── messages.json       # Messages
│   └── lessons.json        # Leçons
│
├── pages/
│   └── (placeholder pages)
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── HTML Files (root)
│   ├── index.html          # Login/Signup
│   ├── student-dashboard.html
│   ├── teacher-dashboard.html
│   ├── parent-dashboard.html
│   ├── admin-panel.html
│   └── (other pages)
│
├── logs/
│   └── audit.log           # Audit trail sécurité
│
├── docs/
│   └── (documentation)
│
├── README.md               # Ce fichier
├── SECURITY.md             # Détails sécurité
├── SECURITY_QUICK_REFERENCE.md
├── WORKFLOWS.md            # Workflows & permissions
├── WORKFLOWS_EXAMPLES.md   # Exemples détaillés
├── PRESENTATION.md         # Pitch français
│
├── package.json
├── .env.example
└── .gitignore
```

---

## 🔗 Références API Complètes

### Authentification
```
POST   /api/auth/register     # Inscription
POST   /api/auth/login        # Connexion
POST   /api/auth/logout       # Déconnexion (blacklist token)
POST   /api/auth/verify       # Vérifier token
```

### Profil Utilisateur
```
GET    /api/user/profile      # Voir profil
PUT    /api/user/profile      # Modifier profil
```

### Élève
```
GET    /api/student/classes        # Ses cours
GET    /api/student/homework       # Ses devoirs
POST   /api/student/homework/:id/submit  # Soumettre
GET    /api/student/grades         # Ses notes
GET    /api/student/attendance     # Ses présences
GET    /api/student/messages       # Ses messages
```

### Parent
```
GET    /api/parent/children                 # Ses enfants
GET    /api/parent/child/:id/classes        # Cours enfant
GET    /api/parent/child/:id/grades         # Notes enfant
GET    /api/parent/child/:id/attendance     # Présences enfant
GET    /api/parent/child/:id/homework       # Devoirs enfant
```

### Enseignant
```
GET    /api/teacher/classes              # Ses classes
POST   /api/teacher/class                # Créer classe
GET    /api/teacher/class/:id/students   # Élèves classe
POST   /api/teacher/homework             # Créer devoir
GET    /api/teacher/homework/:id/submissions  # Soumissions
POST   /api/teacher/homework/:id/grade   # Noter devoir
POST   /api/teacher/attendance           # Marquer présence
POST   /api/teacher/grade                # Ajouter note
GET    /api/teacher/payments             # Voir paiements
```

### Admin
```
GET    /api/admin/users                  # Tous utilisateurs
GET    /api/admin/user/:id               # User détails
PUT    /api/admin/user/:id               # Modifier user
GET    /api/admin/classes                # Toutes classes
GET    /api/admin/payments               # Tous paiements
POST   /api/admin/payment                # Créer paiement
GET    /api/admin/statistics             # Statistiques
```

### Messages (Tous)
```
POST   /api/message/send                 # Envoyer message
GET    /api/message/inbox                # Recevoir messages
PUT    /api/message/:id/read             # Marquer lu
```

---

## 🔐 Détails Sécurité

Voir **[SECURITY.md](SECURITY.md)** pour:
- Détails complets Niveau 5
- Configuration sécurité
- Bonnes pratiques
- Roadmap Niveau 6 (Maximum)

Voir **[SECURITY_QUICK_REFERENCE.md](SECURITY_QUICK_REFERENCE.md)** pour:
- Guide rapide
- FAQ sécurité
- Checklist

---

## 🎤 Détails Présentation

Voir **[PRESENTATION.md](PRESENTATION.md)** pour:
- 3 versions pitch (10s, 30s, 1m30s)
- Démonstration complète (13 scènes)
- Scripts d'oral
- Checklist présentation

---

## 📋 Admin Panel Guide

### Comment Accéder
```
1. Aller à http://localhost:5000/admin-panel.html
2. Se connecter avec admin@example.com / password123
3. Accès complet au système
```

### Fonctionnalités Admin

#### Users Management
- Voir tous les utilisateurs
- Ajouter nouveau compte
- Modifier utilisateur
- Supprimer compte
- Voir détails (email, téléphone, rôle)

#### Classes Management
- Voir tous les cours
- Voir élèves par classe
- Ajouter classe
- Inscrire élèves

#### Payments
- Voir tous les paiements
- Créer demande paiement
- Approuver paiement
- Voir statut

#### Statistics
- Nombre utilisateurs
- Nombre classes
- Nombre devoirs
- Nombre paiements

---

## 🔧 Installation

### Prérequis
- Node.js 14+
- npm 6+
- Navigateur moderne

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/silvia-popescu/btp-projet-ia.git
cd btp-projet-ia
```

2. **Installer dépendances**
```bash
npm install
```

3. **Configurer variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. **Lancer le serveur**
```bash
npm start
# ou
node src/server.js
```

5. **Ouvrir navigateur**
```
http://localhost:5000
```

---

## 📖 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier le port 5000 est libre
netstat -an | grep 5000

# Ou spécifier autre port
PORT=8000 npm start
```

### Erreur "users.forEach is not a function"
- Assurez-vous data/users.json existe
- Vérifier format JSON valide
- Relancer serveur

### Mot de passe ne fonctionne pas
- Vérifier Caps Lock
- Essayer admin@example.com / password123
- Vérifier format email

### Onglets du dashboard vides
- Attendre chargement (2-3 sec)
- Actualiser page (F5)
- Vérifier console pour erreurs

---

## 🤝 Contribuer

Les contributions sont bienvenues! Pour contribuer:

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Code Style
- Indentation: 4 espaces
- Comments: Français et Anglais
- Fonctions: camelCase
- Variables: camelCase
- Constantes: UPPER_CASE

---

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour détails.

---

## 📞 Support

Pour des questions ou problèmes:
1. Consultez la documentation
2. Vérifiez les issues existantes
3. Créer une nouvelle issue

---

## ✨ Remerciements

Merci à tous les contributeurs et testeurs!

---

## 🗺️ Roadmap

### Version 1.1 (Janvier 2025)
- [ ] Two-Factor Authentication
- [ ] Email notifications
- [ ] Calendar view

### Version 1.2 (Février 2025)
- [ ] Mobile app
- [ ] Video lessons
- [ ] Advanced analytics

### Version 2.0 (Q1 2025)
- [ ] HTTPS/TLS
- [ ] MongoDB integration
- [ ] API REST documentation
- [ ] Admin dashboard redesign

---

**Dernière mise à jour:** 4 décembre 2025  
**Version:** 1.0  
**Statut:** Production Ready ✅
