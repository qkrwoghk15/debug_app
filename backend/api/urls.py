# api 요청이 왔을 때 Api 데이터를 보내야 하므로 만든 파일
from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.ListApi.as_view()),
    path('create/', views.CreateApi.as_view()),
    path('<int:pk>/', views.DetailApi.as_view()),
    path('<int:pk>/update/', views.UpdateApi.as_view()),
    url('cars', views.CarViewSet.as_view({'get':'list', 'post':'create'})),
    url('carimages', views.CarImagesViewSet.as_view({'get':'list', 'post':'create'})),
]