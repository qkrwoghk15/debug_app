from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import generics, viewsets
from rest_framework import status, filters

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

    @login_decorator
    def post(self,request):
        data = json.loads(request.body)
        try:
            make = Style.objects.create(            # 만들자마자 make라는 변수에 style 객체 저장
                description  = data['description'],
                user_id      = request.user.id
            )

            for image in data['image_url_list']:
                StyleImage.objects.create(
                    image_url = image,
                    style_id = make.id              # 스타일 id에 해당하는 변수의 아이디를 바로 불러와서 저장

        except KeyError:
            return JsonResponse({"message": "INVALID_KEYS"}, status = 400)
        return HttpResponse(status = 200)

class UpdateApi(generics.UpdateAPIView):
    queryset = Api.objects.all()
    serializer_class = ApiSerializer

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

# Form
# https://www.bogotobogo.com/python/Django/Python_Django_Image_Files_Uploading_Example.php

#CharField
#https://www.valentinog.com/blog/drf/