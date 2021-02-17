from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import generics, viewsets

from .models import Api, Car, CarImage
from .serializers import ApiSerializer, CarSerializer, CarImageSerializer

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

class DetailCar(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class CarImageViewSet(viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer

class DetailCarImage(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer

def api_detail(request, api_pk):
    api = get_object_or_404(Api, api_pk=id)
    return render(request, 'api/api_detail.html', {'api': api})

def car_detail(request, car_pk):
    car = get_object_or_404(Car, car_pk=car_id)
    return render(request, 'car/car_detail.html', {'car': car})    
# Form
# https://www.bogotobogo.com/python/Django/Python_Django_Image_Files_Uploading_Example.php

#CharField
#https://www.valentinog.com/blog/drf/