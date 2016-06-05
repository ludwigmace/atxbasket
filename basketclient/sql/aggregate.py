import json
from db_config import db_config

import pymysql.cursors

def query(sql, values):

    connection = pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        db=db_config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, values)
            connection.commit()
    finally:
        connection.close()


def parse_library():
    def parse_loc(loc):
        return loc.replace('(', '').replace(')', '').split(',')

    with open("data/library.json") as f:
        data = json.load(f)
        data = data['data']
        for d in data:
            item = {
                'name': d[9],
                'loc': parse_loc(d[11])
            }

            sql = "INSERT INTO amenities (amenity_type, name, lat, lon) VALUES(%s, %s, %s, %s)"
            values = ("library", item['name'], item['loc'][0], item['loc'][1])
            query(sql, values)

if __name__ == "__main__":
    parse_library()
