# from django.test import TestCase

# # Create your tests here.
# import unittest
# from rest_framework.test import APIClient
# from rest_framework import status
# from django.urls import reverse
# from django.core.files.uploadedfile import SimpleUploadedFile
# import json

# class ImageAnalysisViewTests(unittest.TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('analyze-image')

#     def test_image_upload_success(self):
#         file = SimpleUploadedFile("test_shirt.jpg", b"file_content", content_type="image/jpeg")
#         response = self.client.post(self.url, {'file': file}, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('recognized_items', response.data)
#         self.assertEqual(response.data['recognized_items'][0]['name'], 'Shirt')

#     def test_image_upload_no_file(self):
#         response = self.client.post(self.url, {}, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('file', response.data)

#     def test_image_upload_recognition_failure(self):
#         file = SimpleUploadedFile("test_unknown.jpg", b"file_content", content_type="image/jpeg")
#         response = self.client.post(self.url, {'file': file}, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
#         self.assertIn('recognized_items', response.data)
#         self.assertEqual(response.data['recognized_items'][0]['name'], 'Unknown')


# class EcoScoreViewTests(unittest.TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('eco_score')

#     def test_eco_score_calculation(self):
#         recognized_items = [{"name": "Shirt", "carbonFootprint": 2.5}]
#         response = self.client.get(self.url, {'recognized_items': json.dumps(recognized_items)})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('eco_points', response.data)
#         self.assertEqual(response.data['eco_points'], 40)  # 100 / 2.5 = 40

#     def test_eco_score_no_items(self):
#         response = self.client.get(self.url, {'recognized_items': '[]'})
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# class OffersViewTests(unittest.TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('offers')

#     def test_get_offers_with_points(self):
#         response = self.client.get(self.url, {'eco_points': 10})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('available_offers', response.data)
#         self.assertEqual(len(response.data['available_offers']), 2)

#     def test_get_offers_no_points(self):
#         response = self.client.get(self.url, {'eco_points': 0})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('available_offers', response.data)
#         self.assertEqual(len(response.data['available_offers']), 1)


# if __name__ == '__main__':
#     unittest.main()

