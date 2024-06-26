# Generated by Django 5.0.3 on 2024-03-24 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_rename_exercise_user_exercises'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='exercises_users', to='api.user'),
        ),
        migrations.AddField(
            model_name='movie',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='movies_users', to='api.user'),
        ),
        migrations.AlterField(
            model_name='user',
            name='exercises',
            field=models.ManyToManyField(blank=True, related_name='users_exercises', to='api.exercise'),
        ),
        migrations.AlterField(
            model_name='user',
            name='movies',
            field=models.ManyToManyField(blank=True, related_name='users_movies', to='api.movie'),
        ),
    ]
