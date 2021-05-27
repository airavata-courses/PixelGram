from models.dboperations import runqueryindb

class usertoimageModel:
    def __init__(self, userid=None, imageids=None):
        print("Hello userid: {} ".format(userid))
        if userid == None:
            raise ValueError('Userid cant be None')
        if not isinstance(userid, str):
            raise TypeError('Userid should be string')
        self.userid = userid
        
        if isinstance(imageids, list):
            self.imageids = imageids
        elif isinstance(imageids, str):
            self.imageids = [].append(imageids)
        else:
            self.imageids = imageids
        print('Imagesids: {}'.format(self.imageids))
    
    def get_imageids(self):
        if self.userid == None:
            raise Exception('''Userid shouldn't be NONE''')
        query = "SELECT imageid FROM usertoimage WHERE userid = ?"
        usertoimage = None
        try:
            resultrows = runqueryindb(
                query=query,
                lambdafun= lambda cursor, row: row[0],
                dbparms=tuple([self.userid])
            )
            self.imageids = resultrows
        except Exception as e:
            print(e)
            raise Exception('''Unable to get list of image id's for userid: {}'''.format(userid))

    def delete_imageids(self):
        if self.userid == None or self.imageids == None:
            raise Exception('''User id shouldn't be NONE AND images id's shouldn't be NONE''')
        if len(self.imageids) > 0:
            query = "DELETE FROM usertoimage WHERE userid = ? AND (imageid = ?" + " OR imageid = ?"*(len(self.imageids)-1) + ")"
            try:
                runqueryindb(
                    query=query,
                    dbparms= tuple([self.userid] + self.imageids),
                    readquery=False
                )
            except Exception as e:
                print(e)
                raise Exception('''Unable to delete image id's: {} from userid: {}'''.format(self.imageids, self.userid))

    def insert(self):
        if self.userid == None or self.imageids == None:
            raise Exception('''User id shouldn't be NONE AND images id's shouldn't be NONE''')
        if len(self.imageids) > 0:
            query = "INSERT INTO usertoimage VALUES (?, ?)"
            try:
                runqueryindb(
                    query= query,
                    dbparms= [tuple([self.userid, x]) for x in self.imageids],
                    readquery=False
                )
            except Exception as e:
                print(e)
                raise Exception('''Unable to insert image id's: {} for userid: {}'''.format(self.imageids, self.userid))
