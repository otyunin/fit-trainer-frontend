# fit-trainer (Front-end)

Internship project at InCode Group.
 
 ## Getting started

1. **First start the [Back-end](https://github.com/otyunin/fit-trainer-backend.git/) and MongoDB!**
2. Srart the front-end:

     
        $ git clone https://github.com/otyunin/fit-trainer-frontend.git
        $ cd fit-trainer-frontend
        $ npm install
        $ npm run start     
        Go to [http://localhost:3000/](http://localhost:3000/)

## If the port is occupied by another proces


     On Linux:
         $ fuser -k -n tcp <PortNumber>
         $ kill -9 <ProcessID>
     On Windows:
         $ netstat -ano | findstr :<PortNumber>
         $ taskkill /PID <ProcessID> /F

