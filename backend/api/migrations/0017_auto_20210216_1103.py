# Generated by Django 3.1.3 on 2021-02-16 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20210216_1047'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='api',
            name='video_name',
        ),
        migrations.DeleteModel(
            name='ApiTexts',
        ),
    ]
