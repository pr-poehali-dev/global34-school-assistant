import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Загрузка новостей из VK сообщества sc34global
    Args: event - dict с httpMethod
          context - object с request_id
    Returns: HTTP response с новостями
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    vk_token = os.environ.get('VK_ACCESS_TOKEN', '')
    
    if not vk_token:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'posts': [],
                'message': 'VK token not configured'
            })
        }
    
    domain = 'sc34global'
    count = 10
    
    params = urllib.parse.urlencode({
        'domain': domain,
        'count': count,
        'access_token': vk_token,
        'v': '5.131'
    })
    
    url = f'https://api.vk.com/method/wall.get?{params}'
    
    req = urllib.request.Request(url)
    
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
    
    if 'error' in data:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': data['error'].get('error_msg', 'VK API error')
            })
        }
    
    posts: List[Dict[str, Any]] = []
    
    if 'response' in data and 'items' in data['response']:
        for item in data['response']['items']:
            post_id = item.get('id', 0)
            owner_id = item.get('owner_id', 0)
            text = item.get('text', '')
            date_ts = item.get('date', 0)
            
            attachments = item.get('attachments', [])
            image_url = ''
            
            for attach in attachments:
                if attach.get('type') == 'photo':
                    photo = attach.get('photo', {})
                    sizes = photo.get('sizes', [])
                    if sizes:
                        max_size = max(sizes, key=lambda s: s.get('width', 0) * s.get('height', 0))
                        image_url = max_size.get('url', '')
                    break
            
            if text:
                posts.append({
                    'id': post_id,
                    'text': text[:500],
                    'date': date_ts,
                    'url': f'https://vk.com/wall{owner_id}_{post_id}',
                    'image': image_url
                })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'posts': posts})
    }
