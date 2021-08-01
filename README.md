# Travel Agency Project - John Bryce

In this project I built a fake travel agency website to display a list of various destinations with the option to save a
vacation as favorite. Once saved, the vacation pops to the top of the vacations' list.

This site is based on user registration and login system that validates and saves the user info locally to allow the
user to automatically connect to the site after closing the page. When creating a new user through the system, it
automatically has a role of "ROLE_USER". When loading the site, it checks for the user role. If admin, it displays the
admin navigation bar and prevents the admin from liking a vacation. If the role is user, it hides the admin sections (
followers stats and admin board).

## Features:

### Client:

<b>User:</b>

- User registration/login
- Select vacation as favorite (vacation is saved in the db for next site's visits)
- Search for vacations' destinations
- Show user profile (not complete, displays basic information)
- Ability to see how many followers every vacation has

<b>Admin:</b>

- Admin board
    - tabular view of the vacations in the db
    - admin can view, edit and add vacations right from the admin board
    - vacation's description expands inside the table to allow to read the full description right form the table
- Chart that depicts the most liked vacation by the users (vacations a factor of followers)
- admin has a profile (not complete, displays basic information)
- the admin can see the user's home page view and search for a specific vacation like the user can (same homepage as for
  the user, without the option to like a vacation)

---

---


## SIDE NOTE:
- **_Add your own db name and password for the connection to MySQL in the './app/config/db.config.js' file_**
- **_If you want to initialize your own users and password, vacations and favorites, please add {force: true} to the sequelize's sync function in the './server.js' file and uncomment the initial() function call in line 65_**

---

# Server:

- Tables:
    - vacations
    - users
    - roles
    - user roles (a table that is created through the relations between the users table and the roles table)
    - favorite_vacations (saved the vacations by vacationId and userId)
- folders
    - resources:
        - images uploaded by the admin as vacation photos


#### Authorization, registration and password generation happens thought JWT and bycrypt password libraries.

---
#### Server port: 8080
#### Client port: 8081
