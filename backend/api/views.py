from django.shortcuts import render, get_object_or_404
from django.db.models import Q
# Create your views here.
from rest_framework import generics, viewsets
from rest_framework import status, filters

from .models import Api, Car, CarImage, SceneImage
from .serializers import ApiSerializer, CarSerializer, CarImageSerializer, SceneImageSerializer

'''Api'''
class ListApi(generics.ListCreateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class DetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class CreateApi(generics.CreateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class UpdateApi(generics.UpdateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

'''Car'''
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('api', None)
        if search:
            queryset = queryset.filter(api=search)

        return queryset

class DetailCar(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('api', None)
        if search:
            queryset = queryset.filter(api=search)

        return queryset

'''CarImage'''
class CarImageViewSet(viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('car', None)
        if search:
            queryset = queryset.filter(car_id=search)

        return queryset

class DetailCarImage(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('car', None)
        if search:
            queryset = queryset.filter(car_id=search)

        return queryset

'''Scene'''
class SceneViewSet(viewsets.ModelViewSet):
    queryset = SceneImage.objects.all()
    serializer_class = SceneImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('car', None)
        if search:
            queryset = queryset.filter(car_id=search)

        return queryset

class DetailScene(generics.RetrieveUpdateDestroyAPIView):
    queryset = SceneImage.objects.all()
    serializer_class = SceneImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('car', None)
        if search:
            queryset = queryset.filter(car_id=search)

        return queryset

# Form
# https://www.bogotobogo.com/python/Django/Python_Django_Image_Files_Uploading_Example.php

#CharField
#https://www.valentinog.com/blog/drf/

class GetFrameImage(generics.ListCreateAPIView):
    queryset = SceneImage.objects.all()
    serializer_class = SceneImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = SceneImage.objects.filter(api = Api.objects.get(video_name = self.kwargs['video']), frame = self.kwargs['frame'])
        return queryset

class GetFrameImage(generics.ListCreateAPIView):
    queryset = SceneImage.objects.all()
    serializer_class = SceneImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = SceneImage.objects.filter(api = Api.objects.get(video_name = self.kwargs['video']), frame = self.kwargs['frame'])
