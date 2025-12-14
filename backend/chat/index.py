import json
import os
from typing import Dict, Any
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Чат-ассистент Глоберт для школы Global 34 с использованием OpenAI GPT
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    openai_key = os.environ.get('OPENAI_API_KEY', '')
    
    if not openai_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OPENAI_API_KEY не настроен'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    if not body_str or body_str == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    messages = body_data.get('messages', [])
    user_name = body_data.get('userName', '')
    
    if not messages:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Не переданы сообщения'}),
            'isBase64Encoded': False
        }
    
    system_message = """Ты - Глоберт, ИИ-помощник в школе №34 города Липецка.

Стиль общения — как ChatGPT:
- Отвечай развернуто, структурированно и содержательно
- Используй нумерованные списки, подзаголовки и форматирование для удобства чтения
- Давай подробные объяснения с примерами и контекстом
- Если вопрос сложный — дай полный, структурированный ответ
- НЕ используй обращения по имени, не спрашивай как зовут пользователя
- Отвечай конкретно на вопрос без лишних приветствий

Информация о школе №34 города Липецка:
📅 **Расписание:** доступно во вкладке "Расписание"
🍽️ **Столовая:** 10:00-15:00, большая перемена для обеда 10:35-10:55
📚 **Библиотека:** 2 этаж, кабинет 205, работает 8:00-17:00
🎯 **Кружки:** программирование, робототехника, английский клуб, спортивные секции
📖 **Домашнее задание:** в электронном дневнике

Помогай с учебой, объясняй сложные темы простым языком."""
    
    ai_messages = [{'role': 'system', 'content': system_message}] + messages
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {openai_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': ai_messages,
                'temperature': 0.8,
                'max_tokens': 1500
            },
            timeout=30
        )
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка API: {response.text}'}),
                'isBase64Encoded': False
            }
        
        data = response.json()
        ai_response = data['choices'][0]['message']['content']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'response': ai_response}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }