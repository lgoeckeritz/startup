# Notes

IP address of server: 34.206.34.136

How to ssh into the server

  ➜  ssh -i [key pair file] ubuntu@[ip address]
  ➜  ex: ssh -i ~/keys/production.pem ubuntu@53.104.2.123

The domain name for the server is: lizsrecipes.click

In order to put the simon website onto mine, I used this command inside of the simon-html folder:
./deployFiles.sh -k "C:\Users\laygo\OneDrive - Brigham Young University\Documents\Fall 2023\CS 260\260_Server.pem" -h lizsrecipes.click -s simon
