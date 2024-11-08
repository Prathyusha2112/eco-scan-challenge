import io
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from rest_framework import status

class ImageAnalysisViewTests(APITestCase):
    def test_post_with_no_image(self):
        response = self.client.post('/api/analyze-image/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'file': 'No image uploaded'})

    def test_post_with_recognized_items(self):
        image_file = SimpleUploadedFile("image.jpg", b"file_content", content_type="image/jpeg")
        response = self.client.post('/api/analyze-image/', {'file': image_file})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'recognized_items': {'Shirt', 'Jeans'}})

    def test_post_with_failed_recognition(self):
        image_file = SimpleUploadedFile("image.jpg", b"file_content", content_type="image/jpeg")
        response = self.client.post('/api/image-analysis/', {'file': image_file})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {'recognized_items': 'item recognition failed'})

class EcoScoreViewTests(APITestCase):
    def test_get_with_no_items(self):
        response = self.client.get('/api/eco-score/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'recognized_items': 'No items provided'})

    def test_get_with_items(self):
        response = self.client.get('/api/eco-score/', {'recognized_items': '[{"name": "Shirt", "carbonFootprint": 2.5}, {"name": "Jeans", "carbonFootprint": 3.0}]'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'eco_points': 73})