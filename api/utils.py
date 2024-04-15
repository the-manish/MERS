from rest_framework.response import Response
from .models import User,Movie,Exercise,Quotes
from .serializers import  UserSerializer,MovieSerializer, ExerciseSerializer
import csv
import os
import random
from .scraperapi import scrape_movie_posters
from .sentiment import predict_sentiment


def getMovies(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        movies = user.movies.all()
        serializer = MovieSerializer(movies, many=True)
        movie = serializer.data
        movie_data = []
        for movie in movies:
            movie_info = {
                'name': movie.name,
                'image_url': movie.image_url
            }
            movie_data.append(movie_info)
        
        return Response(movie_data)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)

def getExercises(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        exercises = user.exercises.all()
        serializer = ExerciseSerializer(exercises, many=True)
        exercise = serializer.data
        exercise_data = []
        for exercise in exercises:
            exercise_info = {
                'name': exercise.name,
                'image_url': exercise.image_url
            }
            exercise_data.append(exercise_info)
        
        return Response(exercise_data)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
      

def save_movie(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        data = request.data
        movie_name = data.get('name')
        image_url = data.get('image_url')
        movie, created = Movie.objects.get_or_create(name=movie_name, defaults={'image_url': image_url})

        # Add the exercise to the user's exercises if it's not already added
        if created:
            user.movies.add(movie)

        return Response("Movie saved successfully")
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)    
    


def save_exercise(request, user_id):

    try:
        user = User.objects.get(pk=user_id)        
        data = request.data
        exercise_name = data.get('name')
        image_url = data.get('image_url')       
        exercise = Exercise.objects.create(name=exercise_name, image_url=image_url)

        # Add the exercise to the user's exercises if it's not already added
        # if created:
        user.exercises.add(exercise)

        return Response("Exercise saved successfully")
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)    

def signUp(request):    
    data = request.data
    
    name = data.get('username')
    age = data.get('age')
    email = data.get('email')
    password = data.get('password')
    
    if not name or not password:
        return Response({'error': 'Please provide both username and password'}, status=400)
    
    if User.objects.filter(email=email).exists():
        return Response({'error': 'User already exists'}, status=400)
    
    user = User.objects.create(username=name,age=age, email=email, password=password)
    user.save()
    return Response({'success': 'User created successfully'}, status=201)

def logIn(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = User.objects.filter(username=username, password = password).first()  
    print(user)  
    if user is not None:
        # login(request, user)
        print("User logged in successfully")  # Debugging statement
        return Response({'success': 'User logged in successfully'})
    else:
        print("Invalid username or password")  # Debugging statement
        return Response({'error': 'Invalid username or password'}, status=400)    
    

def import_data_quotes(csv_file_path):
    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Create an instance of MyModel for each row in the CSV file
            Quotes_instance = Quotes(
                emotion=row['emotion'],
                quote_text=row['quote'],
            )
            # Save the instance to the database
            Quotes_instance.save()

# def import_data_exercise(csv_file_path):
#     with open(csv_file_path, 'r') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             # Create an instance of MyModel for each row in the CSV file
#             Exercise_instance = Exercise(
#                 name=row['name'],
#                 image_url=row['image_url'],
#             )
#             # Save the instance to the database
#             Exercise_instance.save()


 
def get_random_exercises_from_csv(csv_file_path):
    try:
        # Open the CSV file
        with open(csv_file_path, 'r') as file:
            reader = csv.DictReader(file)

            # Initialize a list to store Exercise objects
            exercises = []

            # Iterate over each row in the CSV file
            for row in reader:
                # Create an Exercise object for each row and append it to the list
                exercise = Exercise(name=row['name'], image_url=row['image_url'])
                exercises.append(exercise)

            # Check if there are at least 5 exercises
            if len(exercises) < 5:
                return None  # Return None if there are fewer than 5 exercises

            # Randomly select 5 exercises from the list
            random_exercises = random.sample(exercises, 5)
            return random_exercises

    except FileNotFoundError:
        print(f"File '{csv_file_path}' not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

 

def get_random_quote_by_emotion(emotion):
    # Filter quotes based on the given emotion
    quotes = Quotes.objects.filter(emotion=emotion)

    # Check if any quotes are found
    if quotes.exists():
        # Select a random quote from the queryset
        random_quote = random.choice(quotes)
        return random_quote.quote_text
    else:
        return "No quotes found for the given emotion."

 
def getOutcome(request):
    current_directory = os.path.dirname(os.path.realpath(__file__))

    # Construct the file path to the Excel file
    quotes_file_path = os.path.join(current_directory, 'clustered_quotes.csv')
    exercise_file_path = os.path.join(current_directory,'Exercises.csv')
    
    
    data = request.data  # Assuming data is sent via POST request
    paragraph = data.get('body')  # Retrieve paragraph input
    
    output_int = predict_sentiment(paragraph)
        
    if Quotes.objects.exists():
        pass
    else:
        import_data_quotes(quotes_file_path)
    
    if output_int is not None:
        movie = scrape_movie_posters(output_int)
        exercise = get_random_exercises_from_csv(exercise_file_path);
        quote_to_send = get_random_quote_by_emotion(output_int)
        exercise_to_send = [{'name': ex.name, 'image_url': ex.image_url} for ex in exercise]
        movie_to_send = [{'name': mov['name'], 'image_url': mov['image_url']} for mov in movie]
        
        data_to_frontend = {
            "emotion": output_int,
            "movie": movie_to_send,
            "exercise": exercise_to_send,
            "quote": quote_to_send
        }
        return Response(data_to_frontend)
    
    else:
        print('error')
        return Response('Error')
    
    