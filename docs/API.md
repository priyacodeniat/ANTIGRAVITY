# AgriAssist AI - REST API Documentation

Base URL: `http://localhost:5000/api/v1`

All protected endpoints require an `Authorization` header with a valid Supabase JWT Bearer token:
```http
Authorization: Bearer <SUPABASE_JWT_TOKEN>
```

---

## 1. System Health & Status

### `GET /health`
Returns server operational health, active environment, and configured Gemini AI model.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "AgriAssist AI Backend Service is operating normally",
  "data": {
    "status": "healthy",
    "timestamp": "2026-11-06T12:00:00.000Z",
    "environment": "development",
    "aiModel": "gemini-2.5-flash"
  }
}
```

---

## 2. Farmer Profile

### `GET /profile`
Retrieves the profile of the authenticated farmer.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "c1f7a61d-3b74-4b53-9ecb-d1e34589d123",
    "full_name": "Ramesh Patel",
    "phone": "+91 98765 43210",
    "state": "Maharashtra",
    "district": "Nashik",
    "village": "Dindori",
    "preferred_language": "en",
    "land_area": 5.0,
    "land_area_unit": "acre",
    "soil_type": "Black Soil",
    "irrigation_availability": "Drip & Borewell",
    "farming_experience": "12 years"
  }
}
```

### `PUT /profile`
Updates farmer profile parameters.

**Request Body:**
```json
{
  "fullName": "Ramesh Patel",
  "phone": "+91 98765 43210",
  "state": "Maharashtra",
  "district": "Nashik",
  "village": "Dindori",
  "preferredLanguage": "hi",
  "landArea": 5.0,
  "landAreaUnit": "acre",
  "soilType": "Black Soil",
  "irrigationAvailability": "Drip & Borewell",
  "farmingExperience": "12 years"
}
```

---

## 3. Crop Advisory

### `POST /advisory/crop-recommendation`
Generates top 5 AI-backed crop recommendations based on soil, location, season, and water conditions.

**Request Body:**
```json
{
  "state": "Maharashtra",
  "district": "Nashik",
  "village": "Dindori",
  "soilType": "Black Soil",
  "soilPh": 6.8,
  "nitrogen": 280,
  "phosphorus": 25,
  "potassium": 160,
  "landArea": 5.0,
  "landAreaUnit": "acre",
  "waterAvailability": "medium",
  "season": "kharif",
  "farmingPreference": "conventional",
  "language": "en"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Crop recommendations generated successfully",
  "data": {
    "advisoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "result": {
      "summary": "High suitability for Soybean and Cotton based on deep black soil moisture retention.",
      "data_sufficiency": "high",
      "recommendations": [
        {
          "crop_name": "Soybean",
          "category": "Pulses",
          "suitability_score": 92,
          "confidence": "high",
          "suitable_season": "Kharif (June - October)",
          "growing_duration_days": 95,
          "water_requirement": "medium",
          "soil_compatibility": "Black soil provides ideal cation exchange capacity and water holding.",
          "reason": "Optimal kharif rainfall alignment with flowering cycle in Nashik district.",
          "planting_guidance": "Sow at 45cm row-to-row spacing after receiving 75mm monsoon rain.",
          "harvesting_guidance": "Harvest when 90% leaves turn yellow and pods rattle.",
          "risks": ["Water stagnation in case of excessive early monsoon"]
        }
      ],
      "missing_information": [],
      "precautions": ["Ensure seed treatment with Rhizobium culture before sowing."],
      "professional_consultation_recommended": false
    }
  }
}
```

---

## 4. Disease & Pest Detection

### `POST /advisory/disease-detection`
Accepts `multipart/form-data` with plant photograph and contextual growth notes.

**Form Data Fields:**
- `image`: Image file (JPG, PNG, WEBP, max 8MB)
- `cropName`: String (e.g. `Tomato`)
- `growthStage`: String (e.g. `Flowering`)
- `plantPartAffected`: String (e.g. `Leaves`)
- `symptomsObserved`: String (e.g. `Concentric rings on lower foliage`)
- `language`: String (`en`, `hi`, `kn`, etc.)

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Crop image disease analysis completed",
  "data": {
    "advisoryId": "4c8f5f64-5717-4562-b3fc-2c963f66afb7",
    "imageUrl": "https://...",
    "result": {
      "crop_name": "Tomato",
      "image_quality": "good",
      "overall_assessment": "Symptoms strongly indicative of Early Blight caused by Alternaria solani.",
      "possible_conditions": [
        {
          "name": "Early Blight (Alternaria solani)",
          "condition_type": "disease",
          "confidence": "high",
          "observed_symptoms": ["Concentric circular target-board spots", "Chlorotic yellow halo around lesions"],
          "explanation": "Fungal pathogen thriving in high humidity and warm temperatures.",
          "possible_causes": ["High humidity", "Overhead sprinkler splash spreading soil spores"],
          "recommended_actions": [
            "Biological: Apply Trichoderma viride or Bacillus subtilis foliar spray.",
            "Chemical: Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L. Observe 7-day PHI."
          ]
        }
      ],
      "immediate_steps": ["Prune and destroy infected lower leaves", "Switch from sprinkler to drip irrigation"],
      "preventive_measures": ["Mulch base of plants", "Follow 3-year solanaceous crop rotation"],
      "additional_information_needed": [],
      "expert_consultation_recommended": true,
      "disclaimer": "Visual screening cannot replace microbiological laboratory culture testing."
    }
  }
}
```

---

## 5. Fertilizer Advisory

### `POST /advisory/fertilizer`
Calculates crop-specific nutrient requirements and application timings.

**Request Body:**
```json
{
  "cropName": "Wheat",
  "growthStage": "Tillering (20-25 DAS)",
  "soilType": "Loamy soil",
  "soilPh": 6.8,
  "nitrogen": 220,
  "phosphorus": 20,
  "potassium": 150,
  "landArea": 2.0,
  "landAreaUnit": "acre",
  "fertilizerPreference": "integrated",
  "language": "en"
}
```

---

## 6. Irrigation Advisory

### `POST /advisory/irrigation`
Generates water management and conservation protocols.

**Request Body:**
```json
{
  "cropName": "Tomato",
  "growthStage": "Flowering",
  "soilType": "Loamy soil",
  "waterAvailability": "medium",
  "irrigationMethod": "drip",
  "recentRainfall": "No rain in 7 days",
  "weatherConditions": "Sunny 32°C",
  "language": "en"
}
```

---

## 7. Kisan AI Chatbot

### `POST /chat`
Sends a question to the context-grounded AI copilot.

**Request Body:**
```json
{
  "message": "What is the best bio-fungicide for root rot in chickpea?",
  "conversationId": null,
  "language": "en"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Message processed successfully",
  "data": {
    "conversationId": "5e8f5f64-5717-4562-b3fc-2c963f66afc8",
    "response": {
      "answer": "For chickpea root rot (Fusarium/Rhizoctonia), Trichoderma viride or Trichoderma harzianum is the most effective bio-fungicide. Treat seeds with 4-5 g/kg seed before sowing, or drench root zone with 2.5 kg/acre mixed with well-decomposed FYM.",
      "category": "Pest & Disease",
      "suggested_actions": ["Ensure adequate soil drainage to avoid water stagnation", "Seed treatment with Trichoderma"],
      "important_warnings": ["Do not mix bio-fungicides with chemical synthetic fungicides simultaneously."],
      "confidence": "high",
      "requires_expert_consultation": false
    }
  }
}
```

---

## 8. Advisory History

- `GET /history?page=1&pageSize=10&advisoryType=crop_recommendation`: Retrieves paginated history.
- `GET /history/:id`: Retrieves full details of a specific advisory.
- `DELETE /history/:id`: Deletes a user's advisory record.

---

## 9. Crop Catalog

- `GET /crops?category=Cereals&search=rice`: Retrieves active catalog entries.

