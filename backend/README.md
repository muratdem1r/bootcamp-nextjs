# bootcamp-api

Credit: [Brad Traversy Course](https://github.com/bradtraversy)

# Bootcamp API

> Backend API for DevCamper application, which is a bootcamp directory website
> 

## ****Usage****

- Clone this repository to your local
- Rename "config/config.env.example" to "config/config.env"
- Paste your MongoDB_URI at “config/config.env” file

## ****Install Dependencies****

```
# to install dependencies
npm install 
```

## ****Run App****

```
# to run app in dev mode
npm run dev

# to run app in prod mode
npm start  
```

## ****Postman****

- Import “BootCamp API” Postman Collection .json file to your collections
    
    ### Login as a “user or publisher” and Get Your Token
    
    - Open ”Authentication/Login User“ and send a request
    - From response section, copy your “token” value
    - Go to BootCamp API section and paste your “token” to the relevant area and save the changes.
    - Open any of the “GET” endpoints and send a request.
    
       
    
    ### Register User
    
    - Go to “Authentication/Register User”
    - Open “body” section in this POST Request
    - Change the properties and send a “POST” Request.
    - From response section, you will get a “token” for new user
    - You can login with this new user in “Login User” POST Request.
    - Also send new “GET” Requests with it
    
      
    
    ### Forgot Password
    
    - First of all you need a SMTP Server, we will use Mailtrap.io
    - Open your Mailtrap Inbox and SMTP Settings
    - Copy the given Username and Password and paste these to the relevant area at “config/config.env” file
    - Open “Authentication/Forgot Password” in Postman and go to “body” section
    - Give an email and send a request
    - After “Email sent!” response, go to your Mailtrap inbox and open the emails text section
    - Go to “Reset Password” endpoint in Postman, open body and change the password
    - Make a “PUT” Request in this endpoint with the given link in email

## ****Database Seeder****

- If you want to seed your database with given .json values from “_data” folder in your local, run after “Install Dependencies”

```
# first, destroy all data
node seeder -d

#then import all data
node seeder -i
```