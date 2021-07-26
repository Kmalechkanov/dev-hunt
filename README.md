# Assignment
Create an application for hiring a team of developers. This application should provide functionality for browsing, adding, updating and deleting developer profiles and managing the hiring process.

### As a user of that system, I should be able to:
- Login to the application
- Register (create a new account)
- List, create, edit and delete locations
- List, create, edit and delete technologies
- List, create, edit and delete developer’s profiles
- Select one or multiple developers and hire them for a specified period of time.
The system doesn’t have to make a difference between types of users (administrators, normal users, etc). For the sake of simplicity, everyone who is logged in and using the system can both manage developer’s profiles and hire them

### Each location has the following information:
- Name - required
- Google map link - optional

### Each technology has the following information:
- Name - required
- Image url - optional

### Each developer’s profile has the following information:
- Name - required
- Email - required
- Phone number - required
- Location - required
- Technology - required
- Price per hour - required
- Years of experience - required
- Native language - required (one of the following “English”, “Bulgarian”, “Serbian”)
- Profile picture url - optional
- Description - optional
- Linkedin profile link - optional

### The hiring process should follow the rules described below:
- A User can hire a single developer or a team of many developers.
- Each “hiring” record includes start date, end date and a developer who has been hired.
- A developer can’t be hired multiple times in the same period.
- A developer can’t be hired for past periods of time.

*Hint: Even if multiple developers are hired as a team for the same period of time, store a record for each of them.*

Note on entities deletion: Technologies and locations which are assigned to at least one developer should not be deletable! A developer who is currently hired or there is a request for future hiring should not be deletable!

## Technology stack for the application:
- Angular
- Angular Material
- json-server
- json-server-auth

### External 
- apexcharts