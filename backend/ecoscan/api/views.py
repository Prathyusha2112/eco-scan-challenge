from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
import openai
import requests
import logging
import base64
import json

openai.api_key = "4039f8e9300c485d8fedb7e7c8e52eb6"

API_ENDPOINT = "https://reewild-az-open-ai-aus.openai.azure.com/openai/deployments/gpt-4o-temporary/chat/completions?api-version=2024-08-01-preview"
API_KEY = "4039f8e9300c485d8fedb7e7c8e52eb6"

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
            recognized_items.append({"name": "Shirt", "carbonFootprint": 5.0})
        elif 'jeans' in file_name:
            recognized_items.append({"name": "Jeans", "carbonFootprint": 10.0})
        elif 'shoes' in file_name:
            recognized_items.append({"name": "Shoes", "carbonFootprint": 8.0})
        elif 'jacket' in file_name:
            recognized_items.append({"name": "Hat", "carbonFootprint": 15.0})
        else:
            recognized_items.append({"name": "Unknown", "carbonFootprint": 0.0})

        return recognized_items

    def image_recognition(self, file):
        
        try:
            image_data = file.read()
            files = {'file': (file.name, image_data, file.content_type)}

            api_endpoint = "https://reewild-az-open-ai-aus.openai.azure.com/openai/deployments/gpt-4o-temporary/chat/completions?api-version=2024-08-01-preview"
            headers = {
            "api-key": "xxxxx",
            }

            payload = {
                "messages": [
                    {"role": "user", "content": "Analyze the following image and describe it as either 'shirt' or 'jeans' if possible."}
                ],
                
            }

            response = requests.post(api_endpoint, headers=headers, files=files, data=payload)
            if response.status_code == 200:
                response_data = response.json()
                logging.info(f"Response Data: {response_data}") 

                # Ensure 'choices' key exists in the response data
                if 'choices' in response_data:
                    recognized_items = response_data['choices'][0]['message']['content']
                    return [{"name": recognized_items, "carbonFootprint": 2.5}]
                else:
                    logging.error("Unexpected response structure: 'choices' key not found.")
                    return None
            else:
                logging.error(f"Request failed with status code {response.status_code}: {response.text}")
                return None

            

            recognized_items = response.json()['choices'][0]['message']['content']
            return recognized_items
        
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {e}")
            return None
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            return None


class EcoScoreView(APIView):
    

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
        {"name": "Free shipping on your next purchase", "points_req": 10},
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