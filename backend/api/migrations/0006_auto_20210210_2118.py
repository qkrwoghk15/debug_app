# Generated by Django 3.1.5 on 2021-02-10 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210125_1133'),
    ]

    operations = [
        migrations.RenameField(
            model_name='api',
            old_name='tracking_file',
            new_name='count',
        ),
        migrations.RenameField(
            model_name='api',
            old_name='tracking_video',
            new_name='labeld_video',
        ),
        migrations.AddField(
            model_name='api',
            name='tracklet',
            field=models.FileField(null=True, upload_to='text/'),
        ),
        migrations.AddField(
            model_name='api',
            name='vehicle',
            field=models.FileField(null=True, upload_to='text/'),
        ),
    ]
