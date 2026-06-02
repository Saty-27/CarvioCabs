import pymongo

def main():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["carviodb"]
    
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
                "subtitle": "220"
            }
        }
    )
    print("Updated Toyota Innova Crysta")
    
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
                "subtitle": ""
            }
        }
    )
    print("Updated Kia Carens")
    
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
                "subtitle": ""
            }
        }
    )
    print("Updated Maruti Ertiga")
    
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
                "subtitle": ""
            }
        }
    )
    print("Updated Maruti Dzire")

if __name__ == "__main__":
    main()
