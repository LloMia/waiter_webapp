# waiter_webapp
## The web application will allow:
  ### waiters:
   * to select days that they are comfortable working.
   * update their working days.
   
 ### Admin:
   * view how many waiters per day.
   * reset waiters name every end of the week.
   
## How to install the app.
  You can clone this [repository](https://github.com/LloMia/waiter_webapp) on your PC.
  
  
  ## How to clone
   * Copy and paste this on your terminal.
   
        ``` $ git clone https://github.com/LloMia/waiter_webapp.git waiter_webapp ```
        
  ## Software needed
  * NodeJS
  * MongoDB
  * Package.json dependencies
  * Mocha

## installation.

### nodeJS

To install it on Ubuntu you can use the [apt-get package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions.md).

### MongoDB
How to install [MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04).

### Package.json dependancies

           
               "dependencies": {
                    "body-parser": "^1.17.1",
                    "express": "^4.15.2",
                    "express-flash": "0.0.2",
                    "express-handlebars": "^3.0.0",
                    "express-session": "^1.15.4",
                    "mongoose": "^4.11.5"
                    } 
                    
        
To install all dependencies required for the app to run, on the terminal navigate to the project root, and type npm install .


 
  ## Running the app locally

* In the command line, navigate to the project working folder.Once you are in the appropriate folder input this command

               $ nodemon or
               $ node index.js
     
* The following message should be displayed "Node app is running on port 3005"

* Then open a new tab on your browser and type this http://localhost:3005/ and the app will open.

## Deployment

This app is deployed to gitHub and Heroku. use mLab as a database.

 ### Must have when deploying:
 
  * Node.js and npm installed.
  * an existing Node.js app.
  * a free Heroku account.
  * the Heroku CLI.
  
  Now follow these commands when you're deploying to heroku:
  
          $ heroku login
            Enter your heroku creditials
          $ heroku create
          $ git add .
          $ git commit -m 'added Procfile'
          $ git push heroku master



  ### Open the app on heroku
  You can also type the command ``` heroku open ```
  
  Your app is a go!
  
