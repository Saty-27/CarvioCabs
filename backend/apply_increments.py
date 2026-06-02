import pymongo

def reset_to_base_flyer_prices(db):
    # 1. Toyota Innova Crysta
    db.cars.update_many(
        {"car_id": "car_innova"},
        {
            "$set": {
                "rental_4hr": 2200,
                "rental_8hr": 3500,
                "extra_km": 22,
                "price_per_km": 22,
                "extra_hour": 200,
                "driver_allowance": 500,
                "night_allowance": 500,
                "outstation_min_km": 300,
                "outstation_per_km": 22,
                "base_price": 500,
                "subtitle": "220"
            }
        }
    )
    
    # 2. Kia Carens
    db.cars.update_many(
        {"car_id": "car_carens"},
        {
            "$set": {
                "rental_4hr": 2000,
                "rental_8hr": 3000,
                "extra_km": 19,
                "price_per_km": 19,
                "extra_hour": 200,
                "driver_allowance": 500,
                "night_allowance": 500,
                "outstation_min_km": 300,
                "outstation_per_km": 19,
                "base_price": 400,
                "subtitle": ""
            }
        }
    )
    
    # 3. Maruti Ertiga
    db.cars.update_many(
        {"car_id": "car_ertiga"},
        {
            "$set": {
                "rental_4hr": 1800,
                "rental_8hr": 2800,
                "extra_km": 17,
                "price_per_km": 17,
                "extra_hour": 200,
                "driver_allowance": 500,
                "night_allowance": 500,
                "outstation_min_km": 300,
                "outstation_per_km": 17,
                "base_price": 350,
                "subtitle": ""
            }
        }
    )
    
    # 4. Maruti Dzire
    db.cars.update_many(
        {"car_id": "car_dzire"},
        {
            "$set": {
                "rental_4hr": 1500,
                "rental_8hr": 2500,
                "extra_km": 17,
                "price_per_km": 17,
                "extra_hour": 200,
                "driver_allowance": 500,
                "night_allowance": 500,
                "outstation_min_km": 300,
                "outstation_per_km": 17,
                "base_price": 300,
                "subtitle": ""
            }
        }
    )

def main():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["carviodb"]
    
    # Reset to base flyer values first to avoid compounding
    reset_to_base_flyer_prices(db)
    print("Database reset to flyer base values.")
    
    # Increase 3-digit by 200, 2-digit by 30
    for car in db.cars.find({"car_id": {"$in": ["car_innova", "car_carens", "car_ertiga", "car_dzire"]}}):
        updates = {}
        fields_to_check = [
            "price_per_km", "extra_km", "outstation_per_km", 
            "extra_hour", "night_allowance", "driver_allowance", 
            "base_price"
        ]
        for field in fields_to_check:
            val = car.get(field)
            if val is not None:
                # 3-digit check (100 to 999)
                if 100 <= val <= 999:
                    updates[field] = val + 200
                # 2-digit check (10 to 99)
                elif 10 <= val <= 99:
                    updates[field] = val + 30
                    
        if updates:
            db.cars.update_many({"car_id": car["car_id"]}, {"$set": updates})
            print(f"Applied increments to {car['name']} ({car.get('car_id')}): {updates}")

if __name__ == "__main__":
    main()
