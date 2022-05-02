from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from NewsServiceApp.ViewModels.serializers.setting_serializer import SettingSerializer
from NewsServiceApp.models.setting_model import Setting
import json


#class SettingViewSet(viewsets.ModelViewSet):
#    """
#    API endpoint that allows settings to be viewed or edited.
#    """
#    queryset = Setting.objects.all().order_by('Key')
#    serializer_class = SettingSerializer

"""
    This class contains settings REST getter methods
    learn django:
    https://docs.microsoft.com/en-us/visualstudio/python/learn-django-in-visual-studio-step-02-create-an-app?view=vs-2022
    https://www.django-rest-framework.org/tutorial/quickstart/
    https://docs.djangoproject.com/en/4.0/ref/models/instances/#django.db.models.Model
    https://docs.djangoproject.com/en/4.0/topics/db/search/
    https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#request-objects
    https://www.django-rest-framework.org/tutorial/3-class-based-views/
    https://blog.logrocket.com/django-rest-framework-create-api/
"""
class SettingsListApiView(APIView):

    """
    Get all settings.
    """
    def get(self, request, format=None):
        queryset = Setting.objects.all().order_by('Key')
        search_text = request.GET.get('searchText', None)
        if search_text is not None:
            queryset = queryset.filter(Key=search_text)

        settingsTotalCount = queryset.count()
        serializer = SettingSerializer(queryset, many=True)

        #isItOk = serializer.is_valid()
        headersJson = {'headers': ','.join(request.headers)}
        response = Response({'settings': serializer.data, 'request_query_parameters': json.dumps(request.GET), 'request_query_headers': json.dumps(headersJson)})
        response['X-Total-Count'] = settingsTotalCount
        return response

    #def post(self, request, *args, **kwargs):
    #    '''
    #    Create the setting with given todo data
    #    '''
    #    data = {
    #        'task': request.data.get('task'), 
    #        'completed': request.data.get('completed'), 
    #        'user': request.user.id
    #    }
    #    serializer = TodoSerializer(data=data)
    #    if serializer.is_valid():
    #        serializer.save()
    #        return Response(serializer.data, status=status.HTTP_201_CREATED)

    #    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)