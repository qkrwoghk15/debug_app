from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
'''
$ pip install pillow # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install pilkit # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install django-imagekit

# pip 설치 후, settings.INSTALLED_APPS에 imagekit 추가 필요
'''
# Create your models here.
def get_image_filename(instance, filename):
    id = instance.api.id
    return "images/%s" % (id) 

class Api(models.Model):
    original_video = models.FileField(upload_to='video/', null = False)
    labeld_video = models.FileField(upload_to='video/', blank = True, default=None)
    count = models.FileField(upload_to='text/', blank = True, default=None)
    tracklet = models.FileField(upload_to='text/', null = True, default = str(original_video) + '_tracklet.txt')
    vehicle = models.FileField(upload_to='text/', null = True, default = str(original_video) + '_vehicle.txt')
    upload_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """A string representation of the model."""
        return str(self.original_video) + '_' + str(self.upload_at)

class ApiImages(models.Model):
    api = models.ForeignKey(Api, blank=True, null=True, on_delete=models.CASCADE)
    image = ProcessedImageField(
        upload_to=get_image_filename,
        processors = [Thumbnail(100, 100)],
        format = 'JPEG',
        options = {'quality': 60},
        null = True,
        verbose_name='Image')

@receiver(post_delete, sender=Api)
def file_delete_action(sender, instance, **kwargs):
    instance.original_video.delete(False)