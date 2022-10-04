import requests
from bs4 import BeautifulSoup

URL = "https://cspmgmt.managebuilding.com/Resident/public/rentals"

r = requests.get(URL)
# print(r.content)

# Create Beautiful Soup object with html content
soup = BeautifulSoup(r.content, 'html5lib')
# print(soup.prettify())

# Array to store listings
listings = []

table = soup.find('div', attrs = {'id': 'rentals-container'})

# Get each listing and add to array of listings
for row in table.findAll('a', attrs = {'class': 'featured-listing accent-color-border-on-hover'}):
  info = row.find('div', attrs = {'class': 'featured-listing__content'}).find('div', attrs = {'class': 'featured-listing__description-container'})
  price = row.find('div', attrs = {'class': 'featured-listing__content'}).find('div', attrs = {'class': 'featured-listing__content-footer'}).find('p', attrs = {'class': 'featured-listing__price accent-color'})
  bedbath = info.find('p', attrs = {'class': 'featured-listing__features'})
  address = info.find('p', attrs = {'class': 'featured-listing__address'})
  image = row.find('div', attrs = {'class': 'featured-listing__image-container'})

  listing = {}
  
  listing['title'] = info.h3.text
  listing['price'] = price.text
  listing['bed bath'] = bedbath.text
  listing['address'] = address.text
  listing['img'] = image.img['src']
  listing['url'] = row['href']

  # print(listing['title'])
  # print(listing['price'])
  # print(listing['bed bath'])
  # print(listing['address'])
  # print(listing['img'])
  # print(listing['url'])
  
  # Add each listing to array
  listings.append(listing)

#print(listings)

  