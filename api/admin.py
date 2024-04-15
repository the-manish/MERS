from django.contrib import admin

# Register your models here.
from .models import Movie,Exercise,User

admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Exercise)
