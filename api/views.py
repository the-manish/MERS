from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import getMovies,getExercises,getOutcome,save_exercise,save_movie,signUp,logIn
# from .chatbot import ChatBot


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/id/movies/',
            'method': 'GET',
            'body': {'body': ""},
            'description': 'Returns movies of the user'
        },
         {
            'Endpoint': '/id/exercises/',
            'method': 'GET',
            'body': {'body': ""},
            'description': 'Returns all question answer'
        },
         {
            'Endpoint': '/outcome/',
            'method': 'GET',
            'body': None,
            'description': 'Returns the state of user'
        },
         {
            'Endpoint': '/id/savemovie/',
            'method': 'POST',
            'body': None,
            'description': 'save the movies that user likes'
        },
        {
            'Endpoint': '/id/saveexercise/',
            'method': 'POST',
            'body': None,
            'description': 'save the exercise that user likes'
        },
    ] 
    return Response(routes)



@api_view(['GET'])
def getMovieOfUser(request, pk):
    if request.method == 'GET':
        return getMovies(request, pk)


@api_view(['GET'])
def getExerciseOfUser(request, pk):
    if request.method == 'GET':
        return getExercises(request, pk)


@api_view(['POST']) 
def getOutcomeOfUser(request):
    if request.method == 'POST':
        return getOutcome(request)
    
    
@api_view(['POST']) 
def saveExerciseOfUser(request,pk):
    if request.method == 'POST':
        return save_exercise(request,pk)
    
@api_view(['POST']) 
def saveMovieOfUser(request,pk):
    if request.method == 'POST':
        return save_movie(request,pk)
    
    
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        return signUp(request)

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        return logIn(request)
    
    
# @api_view(['POST'])
# def chatbot_view(request):
#     if request.method == 'POST':   

#         chatbot = ChatBot()
#         # Get user input from the request
#         user_input = request.POST.get('input')

#         # Start chat and get chatbot response
#         chatbot_response = chatbot.start_chat(user_input)

#         # Return JSON response with chatbot's response
#         return Response({'response': chatbot_response})
#     else:
#         # Return empty response for GET requests
#         return Response({})
