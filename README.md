# react-todo

Setup Airtable
Sign up (or login) for an Airtable account.
Create a new base.
Choose a Title, Icon, and Color for your base.
Rename "Table 1" to "Default".
Within the table, rename the first column to title and delete the other columns.
Create another column called completedAt and set it to a date format and use the ISO option in the dropdown. We will not be using this field in this lesson but it will allow us to enhance the application later.
Add one or more todo items to the table.
Create Environment File
Open code editor
Create a new file named .env.local in the root directory
"dotenv" files use the syntax VARIABLE=value to add add key-value pairs of data available to an application at runtime. In the case of React applications scaffolded with Create-React-App(CRA) variable keys prefixed with "REACT_APP" are available for developers to reference inside of their application. See Adding Custom Environment Variables in the Create-React-App documentation for more details.

Generate Airtable API Key
Navigate to https://airtable.com/account.
Click "Generate API Key".
Copy the key from the input field.
Open .env.local.
Create a new variable named REACT_APP_AIRTABLE_API_KEY.
Paste the key as its value.
Connect to Airtable API
Back in Airtable, click "Help" button.
Click "API Documentation" link.
Copy the "Base ID".
Open .env.local.
Create a new variable named REACT_APP_AIRTABLE_BASE_ID.
Paste the ID as its value.
Create a new variable named REACT_APP_TABLE_NAME and then set it equal to "Default"
At this point, you should have a dotenv file that resembles:

REACT_APP_AIRTABLE_API_KEY="super_secret_value"
REACT_APP_AIRTABLE_BASE_ID="super_secret_value"
REACT_APP_TABLE_NAME="Default"
