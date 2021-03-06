# Generated by Django 2.0 on 2017-12-09 11:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20171209_1158'),
    ]

    operations = [
        migrations.AddField(
            model_name='achievement',
            name='teams',
            field=models.ManyToManyField(through='api.TeamAchievement', to='api.Team'),
        ),
        migrations.AlterField(
            model_name='teamachievement',
            name='achievement',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='team_achievements', to='api.Achievement'),
        ),
    ]
