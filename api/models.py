from django.db import models
from django.utils import timezone

class User(models.Model):
    username = models.CharField(max_length=100, unique=True, default='admin')
    age = models.IntegerField()
    email = models.EmailField()
    password = models.CharField(max_length=100)    
    exercises = models.ManyToManyField('Exercise', related_name='users_exercises', blank=True)
    movies = models.ManyToManyField('Movie', related_name='users_movies', blank=True)    

class Quotes(models.Model):
    emotion = models.IntegerField()
    quote_text = models.CharField(max_length=1000)
  
class Exercise(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField(default='https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=')
    created_at = models.DateTimeField(default=timezone.now)
    users = models.ManyToManyField('User', related_name='exercises_users', blank=True)
    
    
class Movie(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField(default='https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=')
    created_at = models.DateTimeField(default=timezone.now)
    users = models.ManyToManyField('User', related_name='movies_users', blank=True)
