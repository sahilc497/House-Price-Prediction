import json
import pickle
import numpy as np
import os

__locations = None
__data_columns = None
__model = None


def load_saved_artifacts():
    global __data_columns, __locations, __model
    print("Loading artifacts...")

    base_dir = os.path.dirname(__file__)

    with open(os.path.join(base_dir, "artifacts", "columns.json"), "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[3:]

    with open(
        os.path.join(base_dir, "artifacts", "banglore_home_prices_model.pickle"),
        "rb"
    ) as f:
        __model = pickle.load(f)

    print("Artifacts loaded successfully")


def get_location_names():
    return __locations


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)
