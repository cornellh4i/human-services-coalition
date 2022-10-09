import requests
from bs4 import BeautifulSoup

#Fair market rates
fmrStudio = 980
fmrOne = 1000
fmrTwo = 1270
fmrThree = 1600
fmrFourPlus = 1800

# Returns an array of listings from CSP Management under fair market prices
def processCSP():
  URL = "https://cspmgmt.managebuilding.com/Resident/public/rentals"

  # Get HTML content from specified URL
  r = requests.get(URL)

  # Create Beautiful Soup object with HTML content
  soup = BeautifulSoup(r.content, 'html5lib')

  # Array to store listings
  listings = []

  table = soup.find('div', attrs = {'id': 'rentals-container'})

  # Get each listing and add to array of listings
  for row in table.findAll('a', attrs = {'class': 'featured-listing accent-color-border-on-hover'}):
    try: 
      info = row.find('div', attrs = {'class': 'featured-listing__content'}).find('div', attrs = {'class': 'featured-listing__description-container'})
      priceContainer = row.find('div', attrs = {'class': 'featured-listing__content'}).find('div', attrs = {'class': 'featured-listing__content-footer'}).find('p', attrs = {'class': 'featured-listing__price accent-color'})
      bedbath = info.find('p', attrs = {'class': 'featured-listing__features'})
      address = info.find('p', attrs = {'class': 'featured-listing__address'})
      image = row.find('div', attrs = {'class': 'featured-listing__image-container'})

      price = (priceContainer.text[1:]).replace(',','')
      beds = getBed(bedbath.text)

      # Check if listing falls under fair market price
      if filterListing(int(price), beds):
        # Create empty listing
        listing = {}
        
        # Add listing information
        listing['title'] = info.h3.text
        listing['price'] = priceContainer.text
        listing['bed bath'] = bedbath.text
        #listing['address'] = address.text
        listing['img'] = image.img['src']
        listing['url'] = row['href']

        # Print statements for debugging
        print(listing['title'])
        print(listing['price'])
        print(listing['bed bath'])

        listings.append(listing)
    except:
      continue

  return listings

# Returns an array of listings from CSP Management under fair market prices
def processCertified():
  URL = "https://www.certifiedpropertiesinc.com/property-listings/"

  # Get HTML content from specified URL
  r = requests.get(URL)

  # Create Beautiful Soup object with HTML content
  soup = BeautifulSoup(r.content, 'html5lib')

  # Array to store listings
  listings = []

  table = soup.find('div', attrs = {'class': 'es-listing es-layout-2_col'})

  # Get each listing and add to array of listings
  for row in table.findAll('div', attrs = {'class': 'es-property-inner'}):
    try:
      info = row.find('div', attrs = {'class': 'es-property-info'})
      titleText = info.find('div', attrs = {'class': 'es-col-view'}).h2.find('a', attrs = {'class': 'es-property-link'}).text
      priceText = info.find('div', attrs = {'class': 'es-col-view'}).find('span', attrs = {'class': 'es-price'}).text
      imageLinkContainer = row.find('div', attrs = {'class': 'es-property-thumbnail'}).find('div', attrs = {'class': 'es-thumbnail'}).a

      # Create empty listing
      listing = {}

      # Find bed and bath in bottom section, both are under same class tag. Could have neither
      for bedBath in info.find('div', attrs = {'class': 'es-bottom-info'}).find('div', attrs = {'class': 'es-bottom-icon__list'}).findAll('span', attrs = {'class': 'es-bottom-icon'}):
        try:
          if "bed" in bedBath.text.strip():
            listing['bed'] = bedBath.text.strip()
          elif "bath" in bedBath.text.strip():
            listing['bath'] = bedBath.text.strip()
        except:
          continue

      price = (priceText[2:-3]).replace(',','')
      beds = getBed(listing['bed'])

      # Check if listing falls under fair market price
      if filterListing(int(price), beds):
        # Add listing information
        listing['title'] = titleText
        listing['price'] = "$" + priceText[2:]
        listing['img'] = imageLinkContainer.img['src']
        listing['url'] = imageLinkContainer['href']

        # Print statements for debugging
        print(listing['title'])
        print(listing['price'])
        print(listing['bed'])
        print(listing['bath'])

        listings.append(listing)
    except:
      continue
  
  return listings

# Returns number of beds in listing
def getBed(bedbath):
  bed = bedbath[0: bedbath.find(' ')]
  return bed

# Returns fair market price for listing type
def getFMR(bed):
  if bed == "Studio":
    return fmrStudio
  elif bed == "1":
    return fmrOne
  elif bed == "2":
    return fmrTwo
  elif bed == "3":
    return fmrThree
  else:
    return fmrFourPlus

# Returns true if price of listing is under fair market price for listing type
def filterListing(price, beds):
  return price <= getFMR(beds)

processCSP()
processCertified()