from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
import openai
import requests
import logging

# Create your views here.

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
        file_name = file.name.lower()
        recognized_items = []

        if 'shirt' in file_name:
            recognized_items.append({"name": "Shirt", "carbonFootprint": 2.5})
        elif 'jeans' in file_name:
            recognized_items.append({"name": "Jeans", "carbonFootprint": 3.0})
        else:
            recognized_items.append({"name": "Unknown", "carbonFootprint": 0.0})

        return recognized_items

    def image_recognition(self, file):
        api_endpoint = "https://reewild-az-open-ai-aus.openai.azure.com/openai/deployments/gpt-4o-temporary/chat/completions?api-version=2024-08-01-preview"
        headers = {
            "Authorization": "Bearer YOUR_API_KEY",  # Replace with your actual API key
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

            logging.info(f"Sending request to OpenAI API")
            response = requests.post(api_endpoint, headers=headers, files=files, json=data)
            response.raise_for_status()

            logging.info(f"Response status code: {response.status_code}")
            logging.info(f"Response content: {response.content}")

            recognized_items = response.json()['choices'][0]['message']['content']
            return recognized_items
        
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {e}")
            return None
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            return None


class EcoScoreView(APIView):
    item_scores = {
        "Shirt": 5,
        "Jeans": 10,
    }

    def get(self, request, *args, **kwargs):
        items = request.query_params.getlist('recognized_items')
        if not items:
            return Response({'recognized_items': 'No items provided'}, status=status.HTTP_400_BAD_REQUEST)

        recognized_items = eval(items[0])
        eco_points = self.calculate_eco_points(recognized_items)
        return Response({
            'eco_points': eco_points
        }, status=status.HTTP_200_OK)
        
    def calculate_eco_points(self, recognized_items):
        eco_points = 0
        for item in recognized_items:
            carbon_footprint = item.get('carbonFootprint', 0)
            if carbon_footprint != 0:
                eco_points += int(100 / carbon_footprint)
            else:
                eco_points += 0
        return eco_points


class OffersView(APIView):
    offers = [
        {"name": "10 0ff on eco-friendly brands", "points_req": 1},
        {"name": "Free shipping on your next purchase", "points_req": 200},
        {"name": "25 off on eco-friendly brands", "points_req": 500},
    ]

    def get(self, request, *args, **kwargs):
        points_param = request.query_params.get('eco_points', '0')
        try:
            eco_points = int(points_param)
        except ValueError:
            return Response({"error": "Invalid points parameter"}, status=status.HTTP_400_BAD_REQUEST)

        offers = self.get_offers_based_on_points(eco_points)
        
        return Response({"available_offers": offers}, status=status.HTTP_200_OK)
    
    def get_offers_based_on_points(self, eco_points):
        available_offers = [offer for offer in self.offers if eco_points >= offer['points_req']]
        return available_offers