from django.shortcuts import render

# Create your views here.
from rest_framework import generics, viewsets

from .models import Api, Car, CarImages
from .serializers import ApiSerializer, CarSerializer, CarImagesSerializer

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

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class CarImagesViewSet(viewsets.ModelViewSet):
    queryset = CarImages.objects.all()
    serializer_class = CarImagesSerializer
# Form
# https://www.bogotobogo.com/python/Django/Python_Django_Image_Files_Uploading_Example.php

#CharField
#https://www.valentinog.com/blog/drf/