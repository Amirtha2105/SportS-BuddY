# SportS-BuddY
The SportS BuddY is a web application that allows the users to upload detailed information on various sports events, locations and timings. Creating this app helps users to form meaningful interactions outside their social circles. 

There are 2 sections in this application - User and Admin

Step-by-step procedure for authentication and access are as follows:

User:
1. At the first stage, the users must register themselves to access the web application for viewing the sports related news and informations.
2. After registration using email and password, they are supposed to login, which leads into the add-events section to upload the sports event, that occurs in and around their areas, so that, if any individual is nearer to the mentioned location and time, they can be able to view the sport event.
3. Once the add-event section gets displayed, the user can be able to add the name, location, date and time, and the description of the sport event, and it gets locally stored in the browser as well as in the firestore database, which is the real-time backend.
4. Once the sport event gets over, the users have the access to delete the details of the eventm so that no further confusion occurs.
5. After making necessary changes, the user logs out.

Admin:
1. The admin must login using his/her login credentials to manage the sports categories, cities and areas.
2. After logging in, the Manage section occurs, where the admin can add/delete sports category, add/delete city, add/delete areas based on the user preferences.
3. After the changes made, the admin logs out.

Basic overflow of the project:

home.html -> Main page that directs to login/register

index.html and app.js -> Registration of a new user/ Login of an existing user and for logging in and logging out functionality.

(User authentications stored in firestore database)

view.html and app1.js -> Viewing all the events, local storage and firestore database, where both stores the detailed information.

admin.html and admin.js -> For accessing admin panel, logging in, managing sports categories, cities and areas and after making updation, logging out.







