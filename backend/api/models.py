from django.db import models

# Create your models here.
class Api(models.Model):
    original_video = models.FileField(upload_to='video/', null = False)
    tracking_video = models.FileField(upload_to='video/', null = True)
    tracking_file = models.FileField(upload_to='text/', null = True)
    frameImgs = models.ImageField(upload_to='image/', null = True, default=None)
    upload_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """A string representation of the model."""
        return str(self.original_video) + str(self.upload_at)