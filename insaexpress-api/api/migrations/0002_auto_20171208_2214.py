# Generated by Django 2.0 on 2017-12-08 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teamachievement',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]