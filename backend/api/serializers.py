# JSON으로 데이터를 직렬화(Serialize)해주기 위해 만든 파일
from rest_framework import serializers
from .models import Api, Car, CarImage, SceneImage

class SceneImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SceneImage
        fields = ('frame', 'scene_image')

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ('car_id', 'frame', 'x', 'y', 'width', 'height', 'car_type', 'confidence')

    def to_representation(self, instance):
        self.fields['car_id'] = CarRepresentationSerializer(read_only=True)
        return super(CarImageSerializer, self).to_representation(instance)

class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True)

    class Meta:
        model = Car
        fields = ('car_id', 'api', 'begin_frame', 'exit_frame', 'car_type', 'images')

    def to_representation(self, instance):
        self.fields['api'] = ApiRepresentationSerializer(read_only=True)
        return super(CarSerializer, self).to_representation(instance)

class ApiSerializer(serializers.ModelSerializer):
    cars = CarSerializer(many=True)
    #scenes = SceneImageSerializer(many=True)

    class Meta:
        model = Api
        fields = ('id', 'original_video', 'labeld_video', 'count', 'tracklet', 'vehicle', 'num_of_cars', 'cars')

#자식 테이블에서 부모 테이블 참조하기
#https://076923.github.io/posts/Python-Django-11/
class ApiRepresentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Api
        fields = ('id', 'original_video')

class CarRepresentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ( 'car_id', 'car_type')