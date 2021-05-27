import pytest
from metadata import MetaDataExtractor

def test_getgeotag():
    a = MetaDataExtractor(filename="sanyo-vpcsx550.jpg",filedata=[])
    (b,c)=a.get_geotagging()
    assert (c,b) == (-51.6211, 19.25584),"check filename"

if __name__ == "__main__":
    test_getgeotag()
    print("test passed")