from models.dboperations import runqueryindb

class imagedetailsModel:
    def __init__(self, imageid=None, latitude=None, longitude=None, locationname=None):
        if imageid == None:
            raise ValueError('Image id cant be None.')
        if not isinstance(imageid, str):
            raise TypeError('Image id should be string')
        self.imageid = imageid
        self.locationname = locationname
        self.latitude = latitude
        self.longitude = longitude

    def getimagedetails(self):
        query = "SELECT latitude, longitude, locationname FROM imagedetails WHERE imageid = ?"
        try:
            resultrows = runqueryindb(
                query= query,
                lambdafun= lambda cursor, row: {
                    'latitude': row[0],
                    'longitude': row[1],
                    'locationname': row[2]
                },
                dbparms=tuple([self.imageid])
            )
            if len(resultrows) > 0:
                self.latitude = resultrows[0]['latitude']
                self.longitude = resultrows[0]['longitude']
                self.locationname = resultrows[0]['locationname']
        except Exception as e:
            print(e)
            raise Exception("Unable to fetch image details for image id: {}".format(self.imageid))

    def updatedetails(self):
        query = "UPDATE imagedetails SET latitude = ? longitude = ? locationname = ? WHERE imageid = ?"
        try:
            runqueryindb(
                query=query,
                readquery=False,
                dbparms=tuple([self.latitude, self.longitude, self.locationname, self.imageid])
            )
        except Exception as e:
            print(e)
            raise Exception("Unale to update the image details for imageid: {}".format(self.imageid))

    def insertdetails(self):
        query = "INSERT INTO imagedetails (imageid, latitude, longitude, locationname) VALUES(?,?,?,?)"
        try:
            runqueryindb(
                query=query,
                dbparms= tuple([self.imageid, self.latitude, self.longitude, self.locationname]),
                readquery=False
            )
        except Exception as e:
            print(e)
            raise Exception("Unable to insert image details into database for imageid: {}".format(self.imageid))

    
    def updateorinsert(self):
        query = "SELECT imageid FROM imagedetails WHERE imageid = ?"
        resultrows = []
        try:
            resultrows = runqueryindb(
                query=query,
                lambdafun= lambda cursor, row: row[0],
                dbparms=tuple([self.imageid])
            )
        except Exception as e:
            print(e)
            raise Exception("Unable to insert/update image details into database for imageid: {}".format(self.imageid))

        if len(resultrows) == 0:
            self.insertdetails()
        else:
            self.updatedetails()

    def deletedetails(self):
        query = 'DELETE FROM imagedetails WHERE imageid = ?'
        try:
            runqueryindb(
                query=query,
                dbparms=tuple([self.imageid]),
                readquery= False
            )
        except Exception as e:
            print(e)
            raise Exception("Unable to delete image details for imageid: {}".format(self.imageid))