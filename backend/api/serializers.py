# JSON으로 데이터를 직렬화(Serialize)해주기 위해 만든 파일
from rest_framework import serializers
from .models import Api

class ApiSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'original_video',
            'tracking_video',
            'tracking_file',
            'frameImgs',
            'upload_at',
        )
        model = Api