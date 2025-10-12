import json
import os
from typing import Dict, Any
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI chat endpoint using DeepSeek API for intelligent responses
    Args: event with httpMethod, body (messages array), queryStringParameters
          context with request_id, function_name attributes
    Returns: HTTP response with AI answer
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
    
    api_key = os.environ.get('DEEPSEEK_API_KEY', '')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key not configured'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    messages = body_data.get('messages', [])
    user_name = body_data.get('userName', '')
    
    if not messages:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No messages provided'}),
            'isBase64Encoded': False
        }
    
    system_message = f"Ты - Глоберт, дружелюбный ИИ-помощник в школе Global 34. Обращайся к пользователю по имени {user_name}. Отвечай кратко и по делу на русском языке. Помогай с вопросами о школе, расписании, учебе, домашних заданиях."
    
    deepseek_messages = [{'role': 'system', 'content': system_message}] + messages
    
    try:
        response = requests.post(
            'https://api.deepseek.com/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'deepseek-chat',
                'messages': deepseek_messages,
                'temperature': 0.7,
                'max_tokens': 500
            },
            timeout=10
        )
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'DeepSeek API error: {response.text}'}),
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
