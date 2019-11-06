from django.conf.urls import url

from .views import FriendsList, MakeAuth, ProfileName

app_name = 'api_v1'

urlpatterns = [
    url(r'auth', MakeAuth.as_view(), name='make-auth'),
    url(r'profile', ProfileName.as_view(), name='profile-name'),
    url(r'friends', FriendsList.as_view(), name='friends'),
]
