from django.conf.urls import include, url


urlpatterns = [
    url(r'', include('api_v1.urls')),
]
