# api 요청이 왔을 때 Api 데이터를 보내야 하므로 만든 파일
from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.ListApi.as_view()),
    path('create/', views.CreateApi.as_view()),
    path('<int:pk>/', views.DetailApi.as_view()),
    path('<int:pk>/update/', views.UpdateApi.as_view()),

    path('<int:api_pk>/cars/', views.CarViewSet.as_view({'get':'list', 'post':'create'})),
    path('<int:api_pk>/cars/<int:car_pk>/', views.DetailCar.as_view()),

    url('carimages/', views.CarImageViewSet.as_view({'get':'list', 'post':'create'})),
    url('<int:pk>/carimages/<int:pk>/', views.DetailCarImage.as_view()),
]