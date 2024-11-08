
# 🌍 EcoScan - Clothing Carbon Footprint Scanner

## 📜 Overview
EcoScan is a web application designed to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. This project demonstrates a full-stack solution for a green initiative product.

## 🔧 Tech Stack
- **Frontend**: React 
- **Backend**: Django
- **Image Recognition**: created a mock function, which can be replaced by the required model.

---

## 🚀 Setup Instructions

1. **Clone the Repository**  
   First, clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/Prathyusha2112/eco-scan-challenge.git
   cd eco-scan-challenge
   ```

2. **Install Dependencies and Run Application**  
   Run the following commands:
   
    for frontend:
   ```bash
   cd ecoscan-frontend
   npm install
   npm start         # for frontend dependencies
   ```
   for backend:
```bash
  cd backend/ecoscan
  python3 -m venv ecovenv
  source ecovenv/bin/activate
  pip install -r requirements.text
  python manage.py runserver
   ```
for testing backend:
```bash
python manage.py test
```


## 🌱 Carbon Score Assumptions

To calculate the environmental impact of each clothing item, we have assigned approximate carbon scores based on item type. These scores are stored in an in-memory dictionary for quick access.

| 👕 Item       | 🌍 Estimated Carbon Score (kg CO₂) |
|--------------|------------------------------------|
| T-shirt      | 5                                  |
| Jeans        | 10                                 |
| Jacket       | 15                                 |
| Shoes        | 8                                  |

---

The mock formula used to calculate eco reward points is: eco_points = 100/carbon_footprint. This formula can be adjusted according to the requirement.

Offers are rolled out incrementally with eco-reward points. more points unlock better offers.

p.s. Currently, the mock function used for image recognition recognizes images based on the file name of the image. any unknown name will lead the function to put the image in 'unknown' category.

## 🌟 Product & Technical Enhancements

1.**Scaling**: 🌐

a. Content Caching: Using caching mechanisms like Redis or Memcached to cache frequent queries or responses, such as results of image analysis, eco-scores, or offers based on user data. This reduces the load on the server and speeds up response times.

b.  Auto-scaling: Implement auto-scaling for cloud services to automatically add or remove instances based on real-time traffic demand.
   
2. **Enhanced Eco-Score Model**: 📊 Integrate brand-specific carbon footprint data to calculate more accurate eco-scores. Many companies disclose their sustainability initiatives or carbon footprints. By incorporating this data, you can adjust the score based on the sustainability efforts of the brand. Factor in the materials used in the garments. Different materials have vastly different carbon footprints (e.g., cotton vs. synthetic fibers). Classifying the carbon footprints by the type of material used can lead to more efficient calculation of eco-scores.
3. **User Experience Improvements**: ✨ Whenever a user selects a clothing item of a particular brand, an alternative clothing item of the same type and colour can be suggested by the app which has lower carbon footprint. The app can also suggest natural origin products for every synthetic product selected by the user, promoting them to make a shift towards eco-friendly purchases.

4. **API Integrations**: 🔌 This application can be integrated with few open source APIs such as CarbonTrust. The application business can also integrate with government or public organizations like UN Sustainability goals to provide better recommendations and make the app more impactful.

---


