from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
import openai
import requests

# Create your views here.

#accept an image, recognize clothing item, return identified items with their respective carbon footprints

class ImageAnalysisView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'file': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        recognized_items = self.mock_image_recognition(file)

        if not recognized_items:
            return Response({'recognized_items': 'item recognition failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'recognized_items': recognized_items}, status=status.HTTP_200_OK)

    def mock_image_recognition(self, file):
        recognized_items = {
            "Shirt",
            "Jeans",
        }
        return recognized_items

    def image_recognition(self, file):
        api_endpoint = "https://reewild-az-open-ai-aus.openai.azure.com/openai/deployments/gpt-4o-temporary/chat/completions?api-version=2024-08-01-preview"
        headers = {
            "Authorization": f"4039f8e9300c485d8fedb7e7c8e52eb6",  
            "Content-Type": "application/json"
        }
        try:
            
            image_data = file.read()
            files = {'file': (file.name, image_data, file.content_type)}

            data = {
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "user",
                        "content": "Is this image a shirt or a pair of jeans? give answer in only one word."
                    }
                ],
                "temperature": 0.5,
            }
            response = requests.post(api_endpoint, headers=headers, files=files, json=data)
            response.raise_for_status()


            recognized_items = response.json()['choices'][0]['message']['content']
            return recognized_items
        
        except Exception as e:
            print(f"Error: {e}")
            return None


class EcoScoreView(APIView):
    item_scores = {
        "Shirt": 5,
        "Jeans": 10,
    }

    def get(self, request, *args, **kwargs):
        items = request.query_params.getlist('items')
        if not items:
            return Response({'items': 'No items provided'}, status=status.HTTP_400_BAD_REQUEST)

        total_score = sum([self.item_scores.get(item, 0) for item in items])
        eco_points = self.calculate_eco_points(total_score)
        return Response({
            'total_score': total_score,
            'eco_points': eco_points
        }, status=status.HTTP_200_OK)
        
    def calculate_eco_points(self, total_score):
        return int(total_score*2)


class OffersView(APIView):
    offers = [
        {"name": "10% off on eco-friendly brands", "points_req": "100"},
        {"name": "Free shipping on your next purchase", "points_req": "200"},
        {"name": "25% off on eco-friendly brands", "points_req": "500"},
    ]

    def get(self, request, *args, **kwargs):
        eco_points = int(request.query_params.get('points', 0))
        available_offers = [offer for offer in self.offers if int(offer['points_req']) <= eco_points]
        return Response({"available offers": available_offers}, status=status.HTTP_200_OK)