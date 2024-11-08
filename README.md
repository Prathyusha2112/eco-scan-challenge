
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

## 🌟 Product & Technical Enhancements

In this section, suggest possible improvements that could make **EcoScan** a more effective and scalable solution.

1. **Scaling**: 🌐 Describe how the backend could be optimized for a large user base, using techniques like caching or database integration.
2. **Enhanced Eco-Score Model**: 📊 Outline ways to make carbon scoring more accurate by considering factors like materials, brand data, or garment condition.
3. **User Experience Improvements**: ✨ Suggest UI/UX features that provide more insights or interactive elements for users, like sustainability comparisons.
4. **API Integrations**: 🔌 Describe possible integrations with external carbon data sources for real-time accuracy.

---

## 📲 Deployment

If deployed, include a link here to access the live version of **EcoScan**.

- **URL**: [Insert deployment link here if deployed]

---

### Thank you for building a greener future with EcoScan! 🌍💚
