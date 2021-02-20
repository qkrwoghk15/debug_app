from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail
from django.dispatch import receiver
import os
from django.conf import settings
import csv
#MEDIA_ROOT = os.path.join(BASE_DIR, 'upload')
'''
$ pip install pillow # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install pilkit # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install django-imagekit

# pip 설치 후, settings.INSTALLED_APPS에 imagekit 추가 필요
'''
def read_csv_file(video_name, api_id):
    num_of_cars = 0

    count_path = os.path.join(settings.MEDIA_ROOT, video_name + '_count.csv')
    tracklet_path = os.path.join(settings.MEDIA_ROOT, video_name + '_tracklet.csv')
    vehicle_path = os.path.join(settings.MEDIA_ROOT, video_name + '_vehicle.csv')

    with open(tracklet_path, encoding='utf-8') as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',')
        next(csv_reader)#header skip
        # ID, BeginFrame, ExitFrame, Type
        for row in csv_reader:
            ID, BeginFrame, ExitFrame, Type, _, _, _, _, _ = row
            # create Cars List
            num_of_cars += 1
            Car.objects.create(car_id=ID, api=api_id, begin_frame=BeginFrame, exit_frame=ExitFrame, car_type=Type)


    with open(vehicle_path, encoding='utf-8') as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',')
        next(csv_reader)#header skip
        # ID, Frame, X, Y, W, H, Type, Confidence
        for row in csv_reader:
            ID, Frame, X, Y, W, H, Type, Confidence = row
            # create Images each cars

    return count_path, tracklet_path, vehicle_path, num_of_cars

def get_image_filename(instance):
    id = instance.api.id
    return "images/%s" % (id)

# Create your models here.-
class Api(models.Model):
    original_video = models.FileField(default=None)
    labeld_video = models.FileField(blank = True, default=None)
    count =  models.CharField(max_length=100, null=True, blank=True)
    tracklet = models.CharField(max_length=100, null=True, blank=True)
    vehicle = models.CharField(max_length=100, null=True, blank=True)
    num_of_cars = models.IntegerField(default=0)

    def __str__(self):
        """A string representation of the model."""
        return str(self.original_video) + '_' + str(self.id)

    def save(self, *args, **kwargs):
        self.count, self.tracklet, self.vehicle, self.num_of_cars = read_csv_file(str(self.original_video).split('.')[0], self.id)
        super().save(*args, **kwargs)

class Car(models.Model):
    car_id = models.CharField(max_length=100, primary_key=True)
    api = models.ForeignKey(Api, related_name="cars", on_delete=models.CASCADE, db_column="api")
    begin_frame = models.IntegerField()
    exit_frame = models.IntegerField()
    car_type = models.CharField(max_length=100)

class CarImage(models.Model):
    car_id = models.ForeignKey(Car, related_name="images", on_delete=models.CASCADE, db_column="car_id")
    frame = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    car_type = models.CharField(max_length=100)
    confidence = models.DecimalField(max_digits=5, decimal_places=2)
    image = ProcessedImageField(
        upload_to=get_image_filename,
        processors = [Thumbnail(224, 224)],
        format = 'JPEG',
        options = {'quality': 60},
        null = True,
        verbose_name='Image')