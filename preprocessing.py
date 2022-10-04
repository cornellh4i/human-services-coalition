import requests
from bs4 import BeautifulSoup

URL = "https://cspmgmt.managebuilding.com/Resident/public/rentals"

r = requests.get(URL)
#print(r.content)

