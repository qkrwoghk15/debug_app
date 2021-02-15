from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
from django.conf import settings
#MEDIA_ROOT = os.path.join(BASE_DIR, 'upload')
'''
$ pip install pillow # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install pilkit # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install django-imagekit

# pip 설치 후, settings.INSTALLED_APPS에 imagekit 추가 필요
'''
# Create your models here.
def get_txt_file(video_file, which):
    file_name = video_file + which
    with open(file_name, 'w', encoding='utf-8') as txtfile:
        for i in range(1, 11):
            data = f'{i}번째 줄입니다.\n'
            txtfile.write(data)
    return file_name

def get_image_filename(instance, filename):
    id = instance.api.id
    return "images/%s" % (id) 

class Api(models.Model):
    original_video = models.CharField(max_length=100, null = False, default='')
    #labeld_video = models.FileField(upload_to='video/', blank = True, default=None)
    #count = models.FileField(upload_to='text/', null = True, blank = True,  default=None)
    #tracklet = models.FileField(upload_to='text/', null = True, blank = True, default = get_txt_file (settings.MEDIA_ROOT,'/text/_tracklet.txt'))
    #vehicle = models.FileField(upload_to='text/', null = True, blank = True, default = get_txt_file(settings.MEDIA_ROOT, '/text/_vehicle.txt'))
    upload_at = models.DateTimeField(auto_now_add=True)

    #def video_file_name(self):
    #    return os.path.basename(self.original_video.name)

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