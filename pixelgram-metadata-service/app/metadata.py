import PIL
from PIL.ExifTags import GPSTAGS
from geopy.geocoders import Here
from flask_restful import Api
from flask import Flask
from flask import request
from PIL.ExifTags import TAGS

import werkzeug

from flask_restful import Resource,reqparse


class MetaDataExtractorResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('imageid', type = str, required = True, help = "This field cannot be left blank")
    parser.add_argument('image', type=werkzeug.datastructures.FileStorage, required = True, location='files', help = "This field cannot be left blank")

    def post(self):
        image_file = MetaDataExtractorResource.parser.parse_args(strict=True).get('image',None)
        imageid = MetaDataExtractorResource.parser.parse_args(strict=True).get('imageid',None)



class MetaDataExtractor:

    def __init__(self, filename, filedata):
        self.filename = filename
        self.filedata = filedata
        self.exif = None


    def get_exif(self,):
        image = PIL.Image.open(self.filename)
        image.verify()
        self.exif = image._getexif()


    def get_labeled_exif(self):
        labeled = {}
        for (key, val) in self.exif.items():
            labeled[TAGS.get(key)] = val
        return labeled



    def get_geotagging(self):
        if self.exif == None:
            self.get_exif()
        if not self.exif:
            raise ValueError("No EXIF metadata found")

        geotagging = {}
        for (idx, tag) in TAGS.items():
            if tag == 'GPSInfo':
                if idx not in self.exif:
                    raise ValueError("No EXIF geotagging found")

                for (key, val) in GPSTAGS.items():
                    if key in self.exif[idx]:
                        geotagging[val] = self.exif[idx][key]

        return self.get_coordinates(geotagging)



    def get_decimal_from_dms(self,dms, ref):

        print(dms)
        print(ref)

        degrees = dms[0]
        minutes = dms[1] / 60.0
        seconds = dms[2] / 3600.0

        if ref in ['S', 'W']:
            degrees = -degrees
            minutes = -minutes
            seconds = -seconds

        return round(degrees + minutes + seconds, 5)


    def get_coordinates(self, geotags):
        lat = self.get_decimal_from_dms(geotags['GPSLatitude'], geotags['GPSLatitudeRef'])

        lon = self.get_decimal_from_dms(geotags['GPSLongitude'], geotags['GPSLongitudeRef'])

        return (lat,lon)


    def make_thumbnail(filename):
        img = PIL.Image.open(filename)
        (width, height) = img.size
        if width > height:
            ratio = 50.0 / width
        else:
            ratio = 50.0 / height

        img.thumbnail((round(width * ratio), round(height * ratio)), PIL.Image.LANCZOS)
        img.save('thumb_' + filename)
    
