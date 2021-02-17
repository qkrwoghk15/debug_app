from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail
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
def get_txt_file(video_name, which):
    path = settings.MEDIA_ROOT+'/text/'+ video_name + which
    with open(path, 'w', encoding='utf-8') as txtfile:
        for i in range(1, 11):
            data = f'{i}번째 줄입니다.\n'
            txtfile.write(data)
    # with open('test.txt', encoding='utf-8') as txtfile:
    #     for row in txtfile.readlines():
    #         print(row, end='')
    #csv 읽기 쓰기 ## https://inoru.tistory.com/51?category=780478
    return path

def get_image_filename(instance):
    id = instance.api.id
    return "images/%s" % (id) 

class Api(models.Model):
    original_video = models.FileField(upload_to='video/', default=None)
    labeld_video = models.FileField(upload_to='video/', blank = True, default=None)
    count =  models.CharField(max_length=100, null=True, blank=True)
    tracklet = models.CharField(max_length=100, null=True, blank=True)
    vehicle = models.CharField(max_length=100, null=True, blank=True)
    num_of_cars = models.IntegerField(default=0)

    def __str__(self):
        """A string representation of the model."""
        return str(self.original_video) + '_' + str(self.id)

    def save(self, *args, **kwargs):
        self.count = get_txt_file(str(self.original_video).split('.')[0], '_count.txt')
        self.tracklet = get_txt_file(str(self.original_video).split('.')[0], '_tracklet.txt')
        self.vehicle = get_txt_file(str(self.original_video).split('.')[0], '_vehicle.txt')
        super().save(*args, **kwargs)

class Car(models.Model):
    car_id = models.IntegerField(primary_key=True)
    api = models.ForeignKey(Api, related_name="cars", on_delete=models.CASCADE, db_column="api")
    begin_frame = models.IntegerField()
    exit_frame = models.IntegerField()
    car_type = models.IntegerField()

    def save(self, *args, **kwargs):
        self.car_id = 1
        self.bgin_frame=1
        self.exit_frame = 1
        self.car_type = 1
        super().save(*args, **kwargs)

class CarImage(models.Model):
    car_id = models.ForeignKey(Car, related_name="images", on_delete=models.CASCADE, db_column="car_id")
    frame = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    car_type = models.IntegerField()
    confidence = models.DecimalField(max_digits=5, decimal_places=2)
    image = ProcessedImageField(
        upload_to=get_image_filename,
        processors = [Thumbnail(224, 224)],
        format = 'JPEG',
        options = {'quality': 60},
        null = True,
        verbose_name='Image')