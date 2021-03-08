from dboperations import runqueryindb

class shareimagedetalsModel:
    def __init__(self, userid, imageid, sharedfromid):
        if userid == None:
            raise ValueError('Userid cant be None')
        if not isinstance(userid, str):
            raise TypeError('Userid should be string')
        self.userid = userid

        if imageid == None:
            raise ValueError('Imageid cant be None')
        if not isinstance(imageid, str):
            raise TypeError('Imageid should be string')
        self.imageid = imageid

        self.sharedfromid = sharedfromid