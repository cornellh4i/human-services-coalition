from cgi import print_exception
import requests
from bs4 import BeautifulSoup

# Fair market rates
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

    table = soup.find('div', attrs={'id': 'rentals-container'})

    # Get each listing and add to array of listings
    for row in table.findAll('a', attrs={'class': 'featured-listing accent-color-border-on-hover'}):
        try:
            info = row.find('div', attrs={'class': 'featured-listing__content'}).find(
                'div', attrs={'class': 'featured-listing__description-container'})
            priceContainer = row.find('div', attrs={'class': 'featured-listing__content'}).find('div', attrs={
                'class': 'featured-listing__content-footer'}).find('p', attrs={'class': 'featured-listing__price accent-color'})
            bedbath = info.find(
                'p', attrs={'class': 'featured-listing__features'})
            address = info.find(
                'p', attrs={'class': 'featured-listing__address'})
            image = row.find(
                'div', attrs={'class': 'featured-listing__image-container'})

            price = (priceContainer.text[1:]).replace(',', '')
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

    table = soup.find('div', attrs={'class': 'es-listing es-layout-2_col'})

    # Get each listing and add to array of listings
    for row in table.findAll('div', attrs={'class': 'es-property-inner'}):
        try:
            info = row.find('div', attrs={'class': 'es-property-info'})
            titleText = info.find('div', attrs={
                                  'class': 'es-col-view'}).h2.find('a', attrs={'class': 'es-property-link'}).text
            priceText = info.find('div', attrs={
                                  'class': 'es-col-view'}).find('span', attrs={'class': 'es-price'}).text
            imageLinkContainer = row.find('div', attrs={
                                          'class': 'es-property-thumbnail'}).find('div', attrs={'class': 'es-thumbnail'}).a

            # Create empty listing
            listing = {}

            # Find bed and bath in bottom section, both are under same class tag. Could have neither
            for bedBath in info.find('div', attrs={'class': 'es-bottom-info'}).find('div', attrs={'class': 'es-bottom-icon__list'}).findAll('span', attrs={'class': 'es-bottom-icon'}):
                try:
                    if "bed" in bedBath.text.strip():
                        listing['bed'] = bedBath.text.strip()
                    elif "bath" in bedBath.text.strip():
                        listing['bath'] = bedBath.text.strip()
                except:
                    continue

            price = (priceText[2:-3]).replace(',', '')
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

# Returns an array of listings from Craigslist under fair market prices (only 1st page)


def processCraigslist():
    URL = "https://ithaca.craigslist.org/search/apa"

    # Get HTML content from specified URL
    r = requests.get(URL)

    # Create Beautiful Soup object with HTML content
    soup = BeautifulSoup(r.content, 'html5lib')

    # Array to store listings
    listings = []

    rows = soup.find('ul', attrs={'class': 'rows'})

    # Get each listing and add to array of listings
    for row in rows.findAll('li', attrs={'class': 'result-row'}):
        try:
            info = row.find('div', attrs={'class': 'result-info'})
            title = info.h3.text
            priceText = info.find('span', attrs={
                'class': 'result-meta'}).find('span', attrs={'class': 'result-price'}).text
            price = (priceText[1:]).replace(',', '')
            address = info.find('span', attrs={
                'class': 'result-meta'}).find('span', attrs={'class': 'result-hood'}).text
            address = address.strip()
            try:
                beds = info.find('span', attrs={
                    'class': 'result-meta'}).find('span', attrs={'class': 'housing'}).text
                beds = beds.strip()
                beds = beds[0:3]
                if 'br' not in beds:
                    beds = "Studio"
                else:
                    beds = beds[0:1]
            except:
                beds = "Studio"
            url = info.h3.a['href']

            # Check if listing falls under fair market price
            # Create empty listing
            listing = {}

            # Check if listing falls under fair market price
            if filterListing(int(price), beds):
                # Add listing information
                listing['title'] = title.strip()
                listing['price'] = priceText
                listing['address'] = address[1:len(address)-1]
                listing['beds'] = beds
                listing['url'] = url
                # Get bathrooms and pictures
                listing.update(getCraigslistAdditional(url))

                # Print statements for debugging
                print(listing['title'])
                print(listing['price'])
                print(listing['address'])
                print(listing['beds'])
                print(listing['url'])

                listings.append(listing)

        except:
            continue

    return listings


# Get additonal info from Craigslist such as bathrooms and pictures
def getCraigslistAdditional(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    info = {}

    # Get number of bathrooms
    bathrooms = soup.find(
        'span', attrs={'class': 'shared-line-bubble'}).text.strip()
    bathrooms = bathrooms[len(bathrooms) - 3]
    info['bathrooms'] = bathrooms

    # Get images
    pics = []
    imageHead = soup.find('div', attrs={'id': 'thumbs'})
    for pic in imageHead.findAll('a'):
        pics.append(pic['href'])
    info['pics'] = pics

    return info


# Returns an array of listings from apartments.com under fair market prices
def processApartments():
    URL = "https://www.apartments.com/ithaca-ny/"

    # Goes to each page of apartments.com and processes its lisitngs
    for page in range(1, 9):
        url = URL + str(page) + '/'
        processApartmentsHelper(url)


# Processes a single page of apartments.com and returns an array of listings from that page under fair market prices
def processApartmentsHelper(url):
    URL = url

    # Use a header to allow the client to pass in additional information while trying to get HTML content from specified URL (avoiding a timeout error)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1",
               "DNT": "1", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

    # Get HTML content from specified URL
    r = requests.get(URL, headers=headers)

    # Create Beautiful Soup object with HTML content
    soup = BeautifulSoup(r.content, 'html5lib')

    # Array to store listings
    listings = []

    # Get each listing and add to array of listings
    table = soup.find('div', attrs={'id': 'placardContainer'})

    # Get each listing and add to array of listings
    for row in table.findAll('li', attrs={'mortar-wrapper'}):
        try:
            try:
                address = row.find(
                    'div', attrs={'class': 'property-address js-url'}).text
            except:
                address = row.find(
                    'p', attrs={'class': 'property-address js-url'}).text

            try:
                priceText = row.find('section', attrs={
                                     'class': 'placard-content'}).find('p', attrs={'class': 'property-pricing'}).text
            except:
                try:
                    priceText = row.find('section', attrs={
                                         'class': 'placard-content'}).find('p', attrs={'class': 'price-range'}).text
                except:
                    try:
                        priceText = row.find('section', attrs={
                                             'class': 'placard-content'}).find('p', attrs={'class': 'property-rents'}).text
                    except:
                        try:
                            priceText = row.find('section', attrs={
                                                 'class': 'placard-content'}).find('span', attrs={'class': 'property-rents'}).text
                        except:
                            priceText = row.find('section', attrs={
                                                 'class': 'placard-content'}).find('div', attrs={'class': 'price-range'}).text

            try:
                bedbathText = row.find('section', attrs={
                                       'class': 'placard-content'}).find('p', attrs={'class': 'property-beds'}).text
            except:
                try:
                    bedbathText = row.find('section', attrs={
                                           'class': 'placard-content'}).find('div', attrs={'class': 'bed-range'}).text
                except:
                    bedbathText = row.find('section', attrs={
                                           'class': 'placard-content'}).find('span', attrs={'class': 'property-beds'}).text

            # Create empty listing
            listing = {}

            # Handles the case that the listing is a range of beds and prices
            if "-" in priceText:
                indexPriceDash = priceText.find("-")
                price1 = priceText[:indexPriceDash].replace(
                    '$', '').replace(',', '').strip()
                price2 = priceText[indexPriceDash+2:].replace(',', '').strip()
                indexBedDash = bedbathText.find("-")
                bed1Text = bedbathText[:indexBedDash].strip() + " Beds"
                bed2Text = bedbathText[indexBedDash+1:].strip()
                bed1 = getBed(bed1Text)
                bed2 = getBed(bed2Text)

                # Check if listing falls under fair market price
                if filterListing(int(price1), bed1) or filterListing(int(price2), bed2):
                    # Add listing information
                    listing['address'] = address
                    listing['price'] = priceText
                    listing['bedbath'] = bedbathText

                    # Print statements for debugging
                    print(listing['address'])
                    print(listing['price'])
                    print(listing['bedbath'])
                    print()

                    listings.append(listing)

            # Handles case that the listing is not a range of beds and prices
            elif '$' in priceText:
                if '/' in priceText:
                    price = (priceText[:priceText.find('/')]
                             ).replace('$', '').strip()
                else:
                    price = priceText.replace('$', '').replace(',', '').strip()

                if ' ' in bedbathText:
                    bed = getBed(bedbathText)
                else:
                    bed = bedbathText

                # Check if listing falls under fair market price
                if filterListing(int(price), bed):
                    # Add listing information
                    listing['address'] = address
                    listing['price'] = priceText
                    listing['bedbath'] = bedbathText

                    # Print statements for debugging
                    print(listing['address'])
                    print(listing['price'])
                    print(listing['bedbath'])
                    print()

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
processCraigslist()
processApartments()
