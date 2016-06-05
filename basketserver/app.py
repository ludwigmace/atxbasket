import sys
import logging
import rds_config
import pymysql

#rds settings
rds_host  = "basket2.c3ketvqnw11i.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
port = 3306
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

server_address = (rds_host, port)
try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """

    cursor = conn.cursor(pymysql.cursors.DictCursor)

    cursor.execute("call GetAmenities ('30.338477', '-97.718813');")

    rows = cursor.fetchall()

    return rows;
