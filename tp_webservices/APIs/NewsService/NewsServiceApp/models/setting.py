from django.db import models

class Setting(models.Model):
    key = models.CharField(max_length=30)
    value = models.CharField(max_length=30)
