from django.urls import path
from .views import ImageAnalysisView, EcoScoreView, OffersView

urlpatterns = [
    path('analyze-image/', ImageAnalysisView.as_view(), name='analyze_image'),
    path('eco-score/', EcoScoreView.as_view(), name='eco_score'),
    path('offers/', OffersView.as_view(), name='offers'),
]