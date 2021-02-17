from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Api, Car, CarImage

@receiver(post_delete, sender=Api)
def file_delete_action(sender, instance, **kwargs):
    instance.original_video.delete(False)
    instance.labeld_video.delete(False)

@receiver( post_save, sender = Car )
def api_post_save( sender, **kwargs ):
    api = kwargs[ 'instance' ].api
    api.num_of_cars += 1
    api.save( )