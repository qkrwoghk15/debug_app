# JSON으로 데이터를 직렬화(Serialize)해주기 위해 만든 파일
from rest_framework import serializers
from .models import Api, ApiImages

class ApiImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiImages
        fields = ['image']

class ApiSerializer(serializers.ModelSerializer):
    images = ApiImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Api
        fields = [
            'id',
            'original_video',
            'labeld_video',
            'count',
            'tracklet',
            'vehicle',
            'images',
            'upload_at',
        ]
    
    def create(self, validated_data):
        images_data = self.context['request'].FILES
        api = Api.objects.create(**validated_data)
        for image_data in images_data.getlist('image'):
            ApiImages.objects.create(api=api, image=image_data)
        return api

class ApiCreateSerializer(serializers.ModelSerializer):
    images = ApiImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Api
        fields = [
            'original_video',
        ]
    
    def create(self, validated_data):
        images_data = self.context['request'].FILES
        api = Api.objects.create(**validated_data)
        for image_data in images_data.getlist('image'):
            ApiImages.objects.create(api=api, image=image_data)
        return api