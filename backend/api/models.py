'''
$ pip install pillow # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install pilkit # django-imagekit 사용을 위해서 사전 설치 필요
$ pip install django-imagekit

pip 설치 후, settings.INSTALLED_APPS에 imagekit 추가
'''
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail
from django.dispatch import receiver
import os
from django.conf import settings #MEDIA_ROOT = os.path.join(BASE_DIR, 'upload')
import csv
import cv2

def read_csv_file(video_name):
    count_path = os.path.join(settings.MEDIA_ROOT, video_name + '_count.log')
    tracklet_path = os.path.join(settings.MEDIA_ROOT, video_name + '_tracklet.log')
    vehicle_path = os.path.join(settings.MEDIA_ROOT, video_name + '_vehicle.log')

    count = 0
    with open(tracklet_path, encoding='utf-8') as txtfile:
        for row in txtfile.readlines()[1:]:
            count+=1

    return count_path, tracklet_path, vehicle_path, count

def create_other_models(api_pk):
    api = Api.objects.get(id = api_pk)

    ''' SCENES '''
    video_cap = cv2.VideoCapture(os.path.join(settings.MEDIA_ROOT, str(api.original_video)))
    image_dir = os.path.join(settings.MEDIA_ROOT, 'images')
    if not os.path.isdir(image_dir):
        os.mkdir(image_dir)

    image_dir = os.path.join(image_dir, str(api.original_video).split('.')[0])
    if not os.path.isdir(image_dir):
        os.mkdir(image_dir)
    
    vid_length = int(video_cap.get(cv2.CAP_PROP_FRAME_COUNT))
    for framenum in range(0, vid_length):
        video_cap.set(cv2.CAP_PROP_FRAME_COUNT, framenum)
        ret, image = video_cap.read()
        if ret is False:
            break

        image_path = os.path.join(image_dir, str(framenum)+'.JPEG')
        cv2.imwrite(image_path, image)
        SceneImage.objects.create(api = api, frame = framenum, scene_image = image_path)
    
    video_cap.release()

    ''' CARS '''
    with open(api.tracklet, encoding='utf-8') as txtfile:
        for row in txtfile.readlines()[1:]:
            # ID,BeginFrame,ExitFrame,Type,Confidence,StartLineLabel,StartLineFrame,EndLineLabel,EndLineFrame, ? , ?
            ID, BeginFrame, ExitFrame, Type = row.strip().split(',')[:4]
            # create Cars List
            Car.objects.create(car_id=ID, api=api, begin_frame=BeginFrame, exit_frame=ExitFrame, car_type=Type)

    ''' Car IMAGES '''
    with open(api.vehicle, encoding='utf-8') as txtfile:
        for row in txtfile.readlines()[1:]:
            ID, Frame, X, Y, W, H, Type, Confidence = row.strip().split(',')
            # create Image List each car
            CarImage.objects.create(car_id = Car.objects.get(car_id=ID), 
                                    frame=Frame, x=X, y=Y, width=W, height=H, 
                                    car_type=Type, confidence=Confidence)

# Create your models here.-
class Api(models.Model):
    # video_filename = models.CharField(max_length=100, primary_key = True, default='None')
    original_video = models.FileField(default=None)
    labeld_video = models.FileField(blank = True, default=None)
    video_name =  models.CharField(max_length=100, null=True, blank=True)
    count =  models.CharField(max_length=100, null=True, blank=True)
    tracklet = models.CharField(max_length=100, null=True, blank=True)
    vehicle = models.CharField(max_length=100, null=True, blank=True)
    num_of_cars = models.IntegerField(default=0)

    def __str__(self):
        """A string representation of the model."""
        return str(self.original_video) + '_' + str(self.id)

    def save(self, *args, **kwargs):
        self.video_name = str(self.original_video)
        self.count, self.tracklet, self.vehicle, self.num_of_cars = read_csv_file(str(self.original_video).split('.')[0])
        super().save(*args, **kwargs)
        create_other_models(self.id)

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
    # image = ProcessedImageField(
    #     upload_to=get_image_filename,
    #     processors = [Thumbnail(224, 224)],
    #     format = 'JPEG',
    #     options = {'quality': 60},
    #     null = True,
    #     verbose_name='Image')

class SceneImage(models.Model):
    api = models.ForeignKey(Api, related_name='scenes', on_delete=models.CASCADE, db_column="api")
    frame = models.IntegerField(primary_key=True)
    scene_image = models.ImageField()