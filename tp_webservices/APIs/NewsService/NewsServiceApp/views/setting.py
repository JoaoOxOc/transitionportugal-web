from rest_framework import viewsets
from rest_framework import permissions
from NewsServiceApp.ViewModels.serializers.example_serializer import ExampleSerializer


class ExampleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows settings to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = ExampleSerializer
