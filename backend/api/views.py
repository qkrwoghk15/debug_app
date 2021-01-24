from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Api
from .serializers import ApiSerializer

class ListApi(generics.ListCreateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

class DetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer