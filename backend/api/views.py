from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Api
from .serializers import ApiSerializer, ApiCreateSerializer

class ListApi(generics.ListCreateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class DetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class CreateApi(generics.CreateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiCreateSerializer

class UpdateApi(generics.UpdateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

#Form
#https://www.bogotobogo.com/python/Django/Python_Django_Image_Files_Uploading_Example.php

#CharField
#https://www.valentinog.com/blog/drf/