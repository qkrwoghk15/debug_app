# Generated by Django 3.1.3 on 2021-02-17 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20210217_1631'),
    ]

    operations = [
        migrations.AddField(
            model_name='api',
            name='num_of_cars',
            field=models.IntegerField(default=0),
        ),
    ]
