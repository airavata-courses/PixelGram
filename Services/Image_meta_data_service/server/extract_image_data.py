from PIL import Image
from PIL.ExifTags import TAGS
from geopy.geocoders import GoogleV3
import io
import numpy as np


class meta_data_extraction:
    def __init__(self, image_data, **meta_data_dict):
        self.meta_data_dict = dict((k.lower(), meta_data_dict[k]) for k in meta_data_dict)
        self.meta_data = dict((meta_data_dict[k], None) for k in meta_data_dict)
        self.image_data = image_data
        self.image = Image.open(io.BytesIO(self.image_data))

    def get_exif_data():
        self.image.verify()
        self.exif_data = self.image._getexif()

    def get_decimal_from_dms(dms, ref):
        degrees = dms[0][0] / dms[0][1]
        minutes = dms[1][0] / dms[1][1] / 60.0
        seconds = dms[2][0] / dms[2][1] / 3600.0

        if ref in ['S', 'W']:
            degrees = -degrees
            minutes = -minutes
            seconds = -seconds
        
        return round(degrees + minutes + seconds, 5)

    
    def extract_meta_data():
        if self.exif_data == None: 
            get_exif_data()
        for tag in self.meta_data_dict:
            if tag == 'latitude':
                meta_data[meta_data_extraction[tag]] = self.getlatitude()
            elif tag == 'longitude':
                meta_data[meta_data_extraction[tag]] = self.getlongitude()
            elif tag == 'timestamp':
                meta_data[meta_data_extraction[tag]] = self.gettimestamp()
            elif tag == 'location':
                meta_data[meta_data_extraction[tag]] = self.getlocation(self.getlatitude(), self.getlongitude())
        return meta_data

    def getlatitude():
        if self.exif_data == None:
            self.get_exif_data()
        if not self.exif_data:
            raise ValueError("No Exif meta data found")
        
        latitude = None
        latitude_ref = None
        for (idx, tag) in TAGS.items():
            if tag == 'GPSInfo':
                if idx not in self.exif_data:
                    raise ValueError("No EXIF geogtagging found")
                for (key, val) in GPSTAGS.items():
                    if key in self.exif_data[idx] and val.lower() == 'GPSLatitudeRef'.lower():
                        latitude = self.exif_data[idx][key]
                    elif key in self.exif_data[idx] and val.lower() == 'GPSLatitude'.lower():
                        latitude_ref = self.exif_data[idx][key]
        return self.get_decimal_from_dms(latitude, latitude_ref)
            
    def getlongitude():
        if self.exif_data == None:
            self.get_exif_data()
        if not self.exif_data:
            raise ValueError("No Exif meta data found")
        
        longitude = None
        longitude_ref = None
        for (idx, tag) in TAGS.items():
            if tag == 'GPSInfo':
                if idx not in self.exif_data:
                    raise ValueError("No EXIF geogtagging found")
                for (key, val) in GPSTAGS.items():
                    if key in self.exif_data[idx] and val.lower() == 'GPSLatitudeRef'.lower():
                        longitude = self.exif_data[idx][key]
                    elif key in self.exif_data[idx] and val.lower() == 'GPSLatitude'.lower():
                        longitude_ref = self.exif_data[idx][key]
        return self.get_decimal_from_dms(longitude, longitude_ref)
    
    def gettimestamp():
        return None
    
    def getlocation(latitude, longitude):
        geolocator = GoogleV3(api_key="AIzaSyAy_bt-05aROvADKWdSytAhkvTaiso1jJ8")
        address = geolocator.reverse('{}, {}'.format(latitude,longitude))
        print(address)
        return "Bloomington"

    
