# Generated by Django 2.2.1 on 2019-05-10 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_position_speed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='picture',
            field=models.FileField(default='https://vignette.wikia.nocookie.net/lucifer/images/9/97/No_Photo.png/revision/latest?cb=20171213001812&path-prefix=fr', upload_to='', verbose_name='logo'),
        ),
    ]
