# Database Service:

This service connect to a postgreSQL database for maintaining all the user and image realted data.
All the other services connect to this services for their database queries.

### Pre-requisites:

pip3

python: v3.8

virtualenv

python modules listed in requirements.txt

Create a virtual environment based on Python 3.8
You need to have python3 installed on your machine. If this requirement is satisifed, you can install virtualenv by using the the link.
Once the virtualenv setup is done, please activate the environment using the command below:

```source <venv_folder_name>/bin/activate4```

# execution
run ```pip install requirements.txt```
where requirements.txt contains all the necessary dependencies.

then ```run python3 server.py``` to start the service at 0.0.0.0.50052


