from rest_framework import serializers
from NewsServiceApp.models.setting import Setting


class ExampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Setting
        fields = ['key', 'value']
