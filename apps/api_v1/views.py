from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
import requests


# Do authentication with incoming vk_code
class MakeAuth(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, format=None):
        query_data = request.data
        vk_code = None
        vk_error = None

        if not query_data:
            return Response({'status': 'error', 'text': 'Lost query'})

        try:
            vk_code = query_data.get('code')
            vk_error = query_data.get('error_description')
        except Exception as ex:
            return Response({'status': 'error', 'text': str(ex)})

        if vk_error:
            return Response({
                'status': 'error',
                'text': vk_error if isinstance(vk_error, str) else str(vk_error)
            })

        redirect_uri = self.get_redirect_uri(request)
        if not redirect_uri:
            return Response({'status': 'error', 'text': 'Lost server name or port'})

        if vk_code:
            answer = self.send_vk_code(redirect_uri, vk_code)
            return Response(answer)
        return Response({'status': 'error', 'text': 'Lost query data'})

    def get_redirect_uri(self, request):
        redirect_uri = None
        server_name = request.META.get('SERVER_NAME')
        server_port = request.META.get('SERVER_PORT')
        if not server_name:
            return None

        if server_port != 80 and server_port != '80' and server_port != None and server_port != '':
            redirect_uri = 'http://{0}:{1}/progress'.format(server_name, server_port)
        else:
            redirect_uri = 'http://{0}/progress'.format(server_name)
        return redirect_uri

    def send_vk_code(self, redirect_uri, vk_code):
        vk_auth_answer = requests.get('https://oauth.vk.com/access_token', params={
            'client_id': settings.VK_CLIENT_ID,
            'client_secret': settings.VK_SECRET_KEY,
            'redirect_uri': redirect_uri,
            'code': vk_code
        })

        vk_error = None
        parsed_answer = None
        try:
            parsed_answer = vk_auth_answer.json()
            vk_error = parsed_answer.get('error_description', None)
        except Exception as ex:
            return {'status': 'error', 'text': str(ex)}

        if vk_error:
            return {
                'status': 'error',
                'text': vk_error if isinstance(vk_error, str) else str(vk_error)
            }
        return parsed_answer


# Load profile name
class ProfileName(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, format=None):
        query_data = request.data

        if not query_data:
            return Response({
                'status': 'error',
                'text': 'Lost data'
            })

        vk_access_token = None
        try:
            vk_access_token = query_data.get('token')
        except Exception as ex:
            return Response({'status': 'error', 'text': str(ex)})

        vk_user_id = None
        try:
            vk_user_id = query_data.get('user_id')
        except Exception as ex:
            return Response({'status': 'error', 'text': str(ex)})

        vk_profile_name = self.get_profile_name(vk_access_token, vk_user_id)
        return Response(vk_profile_name)

    def get_profile_name(self, vk_access_token, vk_user_id):
        vk_profile_name = None
        vk_answer = requests.post('https://api.vk.com/method/users.get', data={
            'access_token': vk_access_token,
            'v': '5.103',
            'user_id': vk_user_id
        })

        vk_error = None
        try:
            parsed_answer = vk_answer.json()
            vk_profile_response = parsed_answer.get('response', None)

            if vk_profile_response:
                vk_users_first_item = vk_profile_response[0]

                if vk_users_first_item:
                    vk_profile_first_name = vk_users_first_item.get('first_name', None)
                    vk_profile_last_name = vk_users_first_item.get('last_name', None)

                    if vk_profile_first_name and vk_profile_last_name:
                        vk_profile_name = {
                            'userName': '{0} {1}'.format(
                                vk_profile_first_name,
                                vk_profile_last_name
                            )
                        }

            vk_error_response = parsed_answer.get('error', None)
            if vk_error_response:
                vk_error = vk_error_response.get('error_msg', None)
        except Exception as ex:
            return {'status': 'error', 'text': str(ex)}

        if vk_error:
            return {
                'status': 'error',
                'text': vk_error if isinstance(vk_error, str) else str(vk_error)
            }

        if vk_profile_name:
            return vk_profile_name

        return {'status': 'error', 'text': 'Lost friends data'}


# Load friends list with incoming access_token
class FriendsList(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, format=None):
        query_data = request.data

        if not query_data:
            return Response({
                'status': 'error',
                'text': 'Lost data'
            })

        vk_access_token = None
        try:
            vk_access_token = query_data.get('token')
        except Exception as ex:
            return Response({'status': 'error', 'text': str(ex)})

        vk_friends = self.send_request_friends(vk_access_token)
        return Response(vk_friends)

    def send_request_friends(self, vk_access_token):
        vk_friends = None
        vk_answer = requests.post('https://api.vk.com/method/friends.get', data={
            'order': 'random',
            'count': 5,
            'fields': ['photo_50'],
            'access_token': vk_access_token,
            'v': '5.103'
        })

        vk_error = None
        try:
            parsed_answer = vk_answer.json()
            vk_friends_response = parsed_answer.get('response', None)
            if vk_friends_response:
                vk_friends = vk_friends_response.get('items', None)

            vk_error_response = parsed_answer.get('error', None)
            if vk_error_response:
                vk_error = vk_error_response.get('error_msg', None)
        except Exception as ex:
            return {'status': 'error', 'text': str(ex)}

        if vk_error:
            return {
                'status': 'error',
                'text': vk_error if isinstance(vk_error, str) else str(vk_error)
            }

        if vk_friends:
            return vk_friends

        return {'status': 'error', 'text': 'Lost friends data'}
