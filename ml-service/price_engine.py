import math

def predict_price(brand, model, year, km_driven, fuel, transmission, owner):

    current_year = 2026
    age = current_year - year

    # ⭐ Segment base price
    segment_price = {
        "hatchback": 600000,
        "sedan": 900000,
        "suv": 1300000,
        "luxury": 3500000
    }

    # detect segment by brand/model keywords
    luxury_brands = ["bmw","audi","mercedes"]
    suv_models = ["creta","innova","scorpio","fortuner"]

    if brand.lower() in luxury_brands:
        base = segment_price["luxury"]
    elif any(x in model.lower() for x in suv_models):
        base = segment_price["suv"]
    elif "city" in model.lower() or "verna" in model.lower():
        base = segment_price["sedan"]
    else:
        base = segment_price["hatchback"]

    # ⭐ brand premium factor
    brand_factor = {
        "maruti": 0.9,
        "hyundai": 1.0,
        "tata": 1.05,
        "mahindra": 1.1,
        "toyota": 1.3,
        "honda": 1.2,
        "bmw": 2.0,
        "audi": 2.2,
        "mercedes": 2.5
    }.get(brand.lower(),1)

    # ⭐ depreciation curve (non-linear)
    depreciation = math.exp(-0.12 * age)

    # ⭐ km effect (smart)
    km_factor = max(0.5, 1 - (km_driven / 250000))

    # ⭐ fuel multiplier
    fuel_factor = {
        "petrol": 1.0,
        "diesel": 1.1,
        "electric": 1.4,
        "cng": 0.9
    }.get(fuel.lower(),1)

    # ⭐ transmission bonus
    transmission_factor = 1.05 if transmission.lower()=="automatic" else 1

    # ⭐ ownership penalty
    owner_penalty = 1 - (0.05 * (owner-1))

    price = base * brand_factor * depreciation * km_factor * fuel_factor * transmission_factor * owner_penalty

    return round(price, -3)