from models.dboperations import runqueryindb

class shareimagedetalsModel:
    def __init__(self, userid=None, imageids=None, sharedtoids=None):
        if userid == None:
            raise ValueError('Userid cant be None')
        if not isinstance(userid, str):
            raise TypeError('Userid should be string')
        self.userid = userid

        if not imageids == None and not isinstance(imageids, list):
            raise TypeError('Imageids should be list, if its not none')
        self.imageids = imageids

        if not sharedtoids == None and not isinstance(sharedtoids, list):
            raise TypeError('sharedfromid should be list, if its not none')
        self.sharedtoids = sharedtoids

    def get_shared_imageids(self):
        query = '''SELECT sharedfromid, GROUP_CONCAT(imageid,',') FROM sharedetails WHERE userid = ?'''
        try:
            resultrows = runqueryindb(
                query=query,
                lambdafun= lambda cursor, row: {
                    'shareduserid': row[0],
                    'imageids': [x.strip() for x in row[1].split(',')] if not row[1] == None else None
                } if not row == None else None,
                dbparms=tuple([self.userid])
            )
            return {
                "userid": self.userid,
                "shareddetails": resultrows
            }
        except Exception as e:
            print(e)
            raise Exception('Unable to get shared image details from databse for userid: {}'.format(self.userid))
    
    def update_share_details(self):
        query = '''INSERT OR REPLACE INTO sharedetails(userid, imageid, sharedfromid) VALUES (?,?,?)'''
        try:
            runqueryindb(
                query=query,
                readquery=False,
                dbparms= [tuple([*z, self.userid]) for z in [[y,x] for x in self.imageids for y in self.sharedtoids]]
            )
        except Exception as e:
            print(e)
            raise Exception('Unable to insert/update shared image details for userid: {}'.format(self.userid))
    
    def delete_share_details_for_user(self):
        query = '''DELETE FROM sharedetails WHERE sharedfromid = ?'''
        try:
            runqueryindb(
                query=query,
                dbparms=tuple([self.userid]),
                readquery=False
            )
        except Exception as e:
            print(e)
            raise Exception('Unable to do delete operation on database for userid: {}'.format(self.userid))
    
    def delete_share_details_for_user_shareuser(self):
        query = '''DELETE FROM sharedetails WHERE userid = ? AND sharedfromid = ?'''
        try:
            runqueryindb(
                query=query,
                readquery=False,
                dbparms=[tuple([x, self.userid]) for x in self.sharedtoids]
            )
        except Exception as e:
            print(e)
            raise Exception('Unable to do delete operation on database for userid: {} and sharefromid: {}'.format(self.userid, self.sharedtoids))
    
    def delete_share_details(self):
        query = '''DELETE FROM sharedetails WHERE userid = ? AND imageid = ? AND sharedfromid = ?'''
        try:
            runqueryindb(
                query=query,
                readquery=False,
                dbparms= [tuple([*z, self.userid]) for z in [[y,x] for x in self.imageids for y in self.sharedtoids]]
            )
        except Exception as e:
            print(e)
            raise Exception('Unable to do delete operation on database for userid: {}, imageids: {} and sharefromid: {} '.format(self.userid, self.imageids, self.sharedtoids))
    
    def delete_share_details_images(self):
        query = '''DELETE FROM sharedetails WHERE sharedfromid = ? AND imageid = ?'''
        try:
            runqueryindb(
                query=query,
                readquery=False,
                dbparms=[tuple([self.userid, x]) for x in self.imageids]
            )
        except Exception as e:
            print(e)
            raise Exception('Unable to do delete operation on database for userid: {}, imageids: {}'.format(self.userid, self.imageids))