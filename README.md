Cloning the repository
--> Clone the repository using the command below :
git clone https://github.com/thatkhushi/MindMentor.git


--> Move into the directory where we have the project files :
cd mindmentor


--> Create a virtual environment :
# If you are on Windows
virtualenv env
# If you are on Linux or Mac
python -m venv env

--> Activate the virtual environment :
# If you are on Windows
.\env\Scripts\activate
# If you are on Linux or Mac
source env/bin/activate

Running the App
--> To run the mindmentor App, we use :
python manage.py runserver

⚠ Then, the development server will be started at http://127.0.0.1:8000/

