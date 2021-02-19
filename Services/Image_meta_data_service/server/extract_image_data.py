from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from geopy.geocoders import Nominatim
import io
import numpy as np


class meta_data_extraction:
    def __init__(self, image_data, meta_data_dict):
        self.meta_data_dict = dict((k.lower(), meta_data_dict[k]) for k in meta_data_dict)
        self.meta_data = dict((meta_data_dict[k], None) for k in meta_data_dict)
        self.image_data = image_data
        self.image = Image.open(io.BytesIO(self.image_data))
        self.exif_data = None

    def get_exif_data(self):
        self.image.verify()
        self.exif_data = self.image._getexif()

    def get_decimal_from_dms(self, dms, ref):
        degrees = dms[0]
        minutes = dms[1] / 60.0
        seconds = dms[2] / 3600.0

        if ref in ['S', 'W']:
            degrees = -degrees
            minutes = -minutes
            seconds = -seconds
        
        return round(degrees + minutes + seconds, 5)

    
    def getRequriedExifData(self):
        if self.exif_data == None:
            self.get_exif_data()
        for tag in self.meta_data_dict:
            if tag == 'latitude':
                self.meta_data[self.meta_data_dict[tag]] = self.getlatitude()
            elif tag == 'longitude':
                self.meta_data[self.meta_data_dict[tag]] = self.getlongitude()
            elif tag == 'timestamp':
                self.meta_data[self.meta_data_dict[tag]] = self.gettimestamp()
            elif tag == 'location':
                self.meta_data[self.meta_data_dict[tag]] = self.getlocation(self.getlatitude(), self.getlongitude())
        return self.meta_data

    def getlatitude(self):
        if self.exif_data == None:
            self.get_exif_data()
        if not self.exif_data:
            print("No Exif data found")
            raise ValueError("No Exif meta data found")
        
        latitude = None
        latitude_ref = None
        for (idx, tag) in TAGS.items():
            if tag == 'GPSInfo':
                if idx not in self.exif_data:
                    raise ValueError("No EXIF geogtagging found")
                for (key, val) in GPSTAGS.items():
                    if key in self.exif_data[idx] and val.lower() == 'GPSLatitudeRef'.lower():
                        latitude_ref = self.exif_data[idx][key]
                    elif key in self.exif_data[idx] and val.lower() == 'GPSLatitude'.lower():
                        latitude = self.exif_data[idx][key]
        return self.get_decimal_from_dms(latitude, latitude_ref)
            
    def getlongitude(self):
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
                        longitude_ref = self.exif_data[idx][key]
                    elif key in self.exif_data[idx] and val.lower() == 'GPSLatitude'.lower():
                        longitude = self.exif_data[idx][key]
        return self.get_decimal_from_dms(longitude, longitude_ref)
    
    def gettimestamp(self):
        return None
    
    def getlocation(self, latitude, longitude):
        geolocator = Nominatim(user_agent="myGeocoder")
        address = geolocator.reverse('{}, {}'.format(latitude,longitude), language='en')
        return str(address)

    
