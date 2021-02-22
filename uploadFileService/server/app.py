from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()
gauth.LocalWebserverAuth()

drive = GoogleDrive(gauth)

file_obj = drive.CreateFile({'id': '1Th4twhHaB_6YlT0AMuQz3qXXkgzsWH1Q'})
file_obj.GetContentFile('photo1.jpg, mimetype='image/jpg')

