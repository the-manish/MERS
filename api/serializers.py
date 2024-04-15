from rest_framework.serializers import ModelSerializer
from .models import User,Movie,Exercise


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        
class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'