# fit-trainer (Front-end)

Internship project at InCode Group.
 
 ## Getting started
Start [server](https://github.com/otyunin/fit-trainer-backend.git/)
 
     $ git clone https://github.com/otyunin/fir-trainer-frontend.git
     $ cd fit-trainer-frontend
     $ npm install
     $ npm run start
 Go to [http://localhost:3000/](http://localhost:3000/)

## Tips

If the port is occupied by another process:

     On Linux:
         $ fuser -k -n tcp <PortNumber>
         $ kill -9 <ProcessID>
     On Windows:
         $ netstat -ano | findstr :<PortNumber>
         $ taskkill /PID <ProcessID> /F

