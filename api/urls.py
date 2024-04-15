from django.urls import path
from . import views
urlpatterns = [
    path('',views.getRoutes, name='routes'),
    path('login/',views.login_user, name='login'),
    path('signup/',views.signup, name='signup'),
    path('outcome/',views.getOutcomeOfUser, name='outcome'),
    # path('chat/',views.chatbot_view, name='chat'),
    path('<int:pk>/movies/',views.getMovieOfUser, name='movie'),
    path('<int:pk>/exercises/',views.getExerciseOfUser, name='exercise'),
    path('<int:pk>/savemovie/',views.saveMovieOfUser, name='save_movie'),
    path('<int:pk>/saveexercise/',views.saveExerciseOfUser, name='save_exercise')
]