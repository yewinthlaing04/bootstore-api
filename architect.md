# Application de vente de billets et abonnements

# 1. Identification des exigences

## **Contexte**

Application de vente de billets et d’abonnements pour une société de production et ses salles partenaires, accessible **en ligne**, sur **bornes automatiques**, et aux **guichets**.

---

## **Exigences fonctionnelles**

| ID      | Description                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------- |
| **R1**  | Permettre aux clients d’acheter des billets via le site web de la société de production.                 |
| **R2**  | Permettre aux clients d’acheter des billets via le site web des salles partenaires.                      |
| **R3**  | Permettre l’achat de billets aux bornes automatiques des salles (kiosques).                              |
| **R4**  | Permettre l’achat de billets au guichet des salles (personnel).                                          |
| **R5**  | Permettre aux clients d’acheter des abonnements via le site web de la société.                           |
| **R6**  | Permettre aux clients d’acheter des abonnements via le site web des salles partenaires.                  |
| **R7**  | Permettre l’achat d’abonnements via bornes automatiques ou guichets des salles partenaires.              |
| **R8**  | Permettre au personnel de guichet d’effectuer des ventes de billets et d’abonnements (interface dédiée). |
| **R9**  | Permettre aux producteurs délégués de consulter l’ensemble des ventes (bilans, exports, statistiques).   |
| **R10** | Fournir des interfaces personnalisées selon le profil : client, vendeur (guichet), producteur délégué.   |
| **R11** | Gérer la disponibilité des places / sièges par représentation (consistance en temps réel).               |
| **R12** | Gérer les paiements sécurisés via plusieurs moyens (CB, Stripe/Adyen, paiement sur place).               |
| **R13** | Générer des billets numériques (QR code / code-barres) imprimables et valables à l’entrée.               |
| **R14** | Gérer les abonnements (séries, réductions, validation/renouvellement).                                   |
| **R15** | Prendre en compte les ventes multi-canaux (sites, bornes, guichets) avec synchronisation centralisée.    |
| **R16** | Journaliser toutes les transactions et actions (audit).                                                  |
| **R17** | Fournir des exports / rapports (CSV, PDF) pour les bilans des producteurs.                               |
| **R18** | Assurer l’authentification et la gestion des rôles (client, vendeur, admin, producteur).                 |
| **R19** | Envoyer des notifications (email / SMS / e-ticket).                                                      |
| **R20** | Supporter le mode hors ligne pour bornes et guichets avec synchronisation ultérieure (optionnel).        |

---

## **Exigences non fonctionnelles**

| ID      | Description                                                                   |
| ------- | ----------------------------------------------------------------------------- |
| **NF1** | Haute disponibilité pendant les pics de vente.                                |
| **NF2** | Latence faible pour la réservation et validation des places.                  |
| **NF3** | Conformité **PCI-DSS** pour les paiements (si stockage ou traitement des CB). |
| **NF4** | Scalabilité : capacité à monter en charge pour les gros événements.           |
| **NF5** | Sécurité renforcée sur les accès et les données personnelles (**RGPD**).      |
| **NF6** | Traçabilité et conservation des logs selon la période légale.                 |

---

> 🧩 **Remarque :**  
> Ces exigences serviront de base pour la conception des cas d’utilisation et l’identification des composants applicatifs (clients, ventes, paiements, reporting, etc.).

# 2. Catégories proposées

## **Objectif**

Les exigences fonctionnelles et non fonctionnelles identifiées sont regroupées en plusieurs **catégories** afin de faciliter l’analyse, la conception des composants, et la traçabilité entre les besoins et les modules applicatifs.

---

## **Catégories et exigences associées**

| **Catégorie**                               | **Description**                                                                                                                        | **Exigences associées**            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **Client / Buyer**                          | Interface web et mobile pour les clients : navigation dans le catalogue, gestion du panier, génération d’e-tickets, paiement en ligne. | R1, R2, R5, R6, R13, R14, R19, R18 |
| **Point de vente (POS / Kiosk / Guichet)**  | Bornes automatiques et guichets physiques pour la vente sur site, incluant le mode dégradé/hors ligne et l’interface du personnel.     | R3, R4, R7, R8, R20                |
| **Produit / Représentation**                | Gestion des spectacles, représentations, salles et disponibilités en temps réel.                                                       | R11, R15                           |
| **Transaction / Paiement**                  | Gestion du panier, processus de paiement, facturation, remboursements et journalisation des transactions.                              | R12, R16                           |
| **Reporting / Admin**                       | Accès producteurs délégués, bilans, exports, statistiques, et gestion des rôles et droits d’accès.                                     | R9, R17, R18                       |
| **Infrastructure / Sécurité / Intégration** | Architecture technique, synchronisation multi-canal, conformité réglementaire, performance et sécurité.                                | NF1, NF2, NF3, NF4, NF5, NF6       |

---

> 💡 **Remarque :**
> Ces catégories serviront de base pour l’identification des composants applicatifs, la définition des interfaces requises/fournies, et la conception du diagramme de composants.
