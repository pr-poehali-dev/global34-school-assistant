import json
import os
import urllib.request
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка сообщений через GPT-4 для Глоберта
    Args: event - dict с httpMethod, body
          context - object с request_id
    Returns: HTTP response с ответом GPT
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    openai_key = os.environ.get('OPENAI_API_KEY', '')
    
    if not openai_key:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'reply': 'Спасибо за вопрос! Я помогу тебе с информацией о школе Global 34. API ключ OpenAI не настроен.'
            })
        }
    
    body_data = json.loads(event.get('body', '{}'))
    user_message = body_data.get('message', '')
    
    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'})
        }
    
    system_prompt = '''Ты - Глоберт, дружелюбный ИИ-помощник школы Global 34. 
Ты помогаешь ученикам с вопросами о школе.

Информация о школе:
- Столовая работает с 10:00 до 15:00, большая перемена с 11:10 до 11:25
- Библиотека на 2 этаже, кабинет 205, работает с 8:00 до 17:00
- Кружки: программирование, робототехника, английский клуб, спортивные секции
- Расписание уроков доступно во вкладке "Расписание"
- Домашнее задание в электронном дневнике

Отвечай кратко, по-дружески, как школьный помощник. Используй эмодзи умеренно.'''
    
    payload = {
        'model': 'gpt-4o-mini',
        'messages': [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_message}
        ],
        'max_tokens': 300,
        'temperature': 0.7
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai_key}'
    }
    
    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
    
    if 'choices' in data and len(data['choices']) > 0:
        reply = data['choices'][0]['message']['content']
    else:
        reply = 'Извини, не могу ответить прямо сейчас. Попробуй позже!'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'reply': reply})
    }
