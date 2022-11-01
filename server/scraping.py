from audioop import add
from cgi import print_exception
from re import S
import requests
from bs4 import BeautifulSoup
import sys

#  Fair market rates
fmrStudio = 980
fmrOne = 1048
fmrTwo = 1269
fmrThree = 1619
fmrFour = 1812
fmrFive = 2083.8
fmrSix = 2396.37


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

            price = (priceContainer.text[1:]).replace(',',  '')
            beds = getBed(bedbath.text)

            # Check if listing falls under fair market price
            if filterListing(int(price), beds):
                # Create empty listing
                listing = {}

                listing['webScraped'] = True
                listing['pictures'] = image.img['src']
                listing['price'] = priceContainer.text[1:].replace(",", "")
                listing['size'] = "One Bed"
                listing['numBath'] = 3
                listing['schoolDistrict'] = None
                listing['pets'] = None
                listing['utilities'] = None
                listing['furnished'] = None
                listing['distTransportation'] = None
                listing['landlord'] = "CSP Management"
                listing['landlordEmail'] = None
                listing['landlordPhone'] = None
                listing['linkOrig'] = row['href']

                # Add listing information

                # listing['title'] = info.h3.text
                # listing['price'] = priceContainer.text
                # listing['bed bath'] = bedbath.text
                #listing['address'] = address.text
                # listing['img'] = image.img['src']
                # listing['url'] = row['href']

                # Print statements for debugging
                # print(listing['title'])
                # print(listing['price'])
                # print(listing['bed bath'])
                # print(listing)

                listings.append(listing)
        except:
            continue

    print(listings)
    return listings


# Returns an array of listings from certified properties under fair market prices
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

            price = (priceText[2:-3]).replace(',',  '')
            beds = getBed(listing['bed'])

            # Check if listing falls under fair market price
            if filterListing(int(price), beds):
                # Add listing information

                # listing['title'] = titleText
                # listing['price'] = "$" + priceText[2:]
                # listing['img'] = imageLinkContainer.img['src']
                # listing['url'] = imageLinkContainer['href']

                listing['webScraped'] = True
                listing['pictures'] = imageLinkContainer.img['src']
                listing['price'] = int(price)
                listing['size'] = "One Bed"
                listing['numBath'] = 3
                listing['schoolDistrict'] = None
                listing['pets'] = None
                listing['utilities'] = None
                listing['furnished'] = None
                listing['distTransportation'] = None
                listing['landlord'] = "Certified Properties"
                listing['landlordEmail'] = None
                listing['landlordPhone'] = None
                listing['linkOrig'] = imageLinkContainer['href']

                # Print statements for debugging
                # print(listing['title'])
                # print(listing['price'])
                # print(listing['bed'])
                # print(listing['bath'])
                print(listing)

                listings.append(listing)
        except:
            continue

    return listings

# Returns an array of listings from Craigslist under fair market prices (all pages)


def processCraigslist():
    first_url = "https://ithaca.craigslist.org/search/apa"
    urls = "https://ithaca.craigslist.org/search/apa?s="

    # Get HTML content from first page of Craigslist
    r = requests.get(first_url)

    # Create Beautiful Soup object with HTML content
    soup = BeautifulSoup(r.content, 'html5lib')

    # Get number of total listings
    totalListings = int(
        (soup.find('span', attrs={'class': 'totalcount'}).text))

    # Update listings to hold listings from first page
    listings = processCraigslistHelper(first_url)

    # Iterate through all the pages and get all listings under FMR
    start = 120
    while start < totalListings:
        listings + processCraigslistHelper(urls+str(start))
        start += 120

    return listings


# Returns an array of listings from Craigslist under fair market prices (only 1 page)
def processCraigslistHelper(url):
    # Get HTML content from specified URL
    r = requests.get(url)

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

            # Create empty listing
            listing = {}

            # Check if listing falls under fair market price
            if filterListing(int(price), beds):
                # Add listing information
                listing['title'] = title.strip()
                listing['price'] = priceText
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


# Get additonal info from Craigslist such as bathrooms, pictures, and address
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

    # Get address
    address = soup.find('div', attrs={'class': 'mapaddress'}).text.strip()
    info['address'] = address

    return info


def getIthacaRentingHelper(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')

    listings = []

    units = soup.find('div', attrs={'class': 'units'})
    print(soup)
    for unit in soup.findAll('div', attrs={'class': 'unit-list'}):
        print("hi")
        # Get beds
        bedbath = unit.find('div', attrs={'class': 'unit-type'}).text.strip()
        if 'BR' not in bedbath:
            beds = "Studio"
            baths = 0
        else:
            beds = (int)(bedbath[0:1])
            baths = (int)(bedbath[4:5])
        # Get price, if no price listed, set to large number
        try:
            price = (int)(unit.find('div', attrs={'id': 'unitPrice'}))
        except:
            price = 100000
        # Get url
        url = unit.a['href']

        listing = {}

        if filterListing(price, beds):
            listing['price'] = price
            listing['size'] = beds
            listing['numBaths'] = baths
            listing['linkOrig'] = url

        print(listing['price'])
        print(listing['size'])
        print(listing['numBaths'])
        print(listing['linkOrig'])


def getIthacaRentingInfo(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    info = {}


# Returns an array of listings from apartments.com under fair market prices
def processApartments():
    # These are the urls of each bed size
    URL1 = "https://www.apartments.com/ithaca-ny/1-bedrooms/"
    URL2 = "https://www.apartments.com/ithaca-ny/2-bedrooms/"
    URL3 = "https://www.apartments.com/ithaca-ny/3-bedrooms/"
    URL4 = "https://www.apartments.com/ithaca-ny/4-bedrooms/"

    URLS = [URL1, URL2, URL3, URL4]

    # For each bed size in apartments.com, go to each of its pages and process its listings
    for URL in URLS:
        for page in range(1, getNumPages(URL) + 1):
            url = URL + str(page) + '/'
            processApartmentsHelper(url)

# Get the total number of pages of listings for each bed size


def getNumPages(url):
    URL = url

    # Use a header to allow the client to pass in additional information while trying to get HTML content from specified URL (avoiding a timeout error)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1",
               "DNT": "1", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

    # Get HTML content from specified URL
    r = requests.get(URL, headers=headers)

    # Create Beautiful Soup object with HTML content
    soup = BeautifulSoup(r.content, 'html5lib')

    # Get the total number of pages
    pageRange = soup.find('div', attrs={'id': 'placardContainer'}).find(
        'span', attrs={'class': 'pageRange'}).text
    index = pageRange.find('of')
    totalNumPages = pageRange[index+2:].strip()

    return int(totalNumPages)


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
            # Get the address
            try:
                address = row.find(
                    'div', attrs={'class': 'property-address js-url'}).text
                if (address.find('Ithaca') == 0):
                    address = row.find(
                        'span', attrs={'class': 'js-placardTitle title'}).text + " " + address
            except:
                address = row.find(
                    'p', attrs={'class': 'property-address js-url'}).text
                if (address.find('NY') < 0):
                    address = address + " " + \
                        row.find(
                            'p', attrs={'class': 'property-address js-url'}).find_next_sibling().text
            streetAddress = address[:address.find('Ithaca')-1]
            if streetAddress.find(',') >= 0:
                streetAddress = streetAddress[:streetAddress.find(',')].strip()

            # Get the price
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

            # Get the number of beds and baths
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

            # Get the URL of listing
            linkContainer = row.find('section', attrs={
                'class': 'placard-content'}).find('a', attrs={'class': 'property-link'})
            link = linkContainer['href']

            # Get pictures of listing
            pictures = []
            pictureContainer = row.find(
                'div', attrs={'class': 'carouselInner'}).findChild()
            try:
                pic = pictureContainer['style']
                indexQuotes1 = pic.find('\"')
                pic = pic[indexQuotes1+1:]
                indexQuotes2 = pic.find('\"')
                pic = pic[:indexQuotes2]
            except:
                pic = pictureContainer['data-image']
            pictures.append(pic)

            # Create empty listing
            listing = {}

            # Get the price in integer form
            price = getPriceApartmentsHelper(priceText)

            # Get the number of beds in the form '# Bed(s)'
            if (bedbathText.find(',') >= 0):
                index = bedbathText.find(',')
                bed = bedbathText[:index]
            else:
                bed = bedbathText

            # Get additional info: the number of bathrooms, if utilities are included, if the listing is furnished, etc.
            additionalInfo = getApartmentsAdditional(link, price)

            # Check if listing falls under fair market price
            if filterListing(price, getBed(bed)):
                # Add listing information
                listing['webScraped'] = True
                listing['streetAddress'] = streetAddress
                listing['city'] = "Ithaca"
                listing['state'] = "NY"
                listing['country'] = "U.S."
                listing['zipCode'] = 14850
                listing['pictures'] = pictures
                listing['price'] = price
                listing['size'] = bed
                listing.update(additionalInfo)

                # Print statements for debugging
                print(listing['webScraped'])
                print(listing['streetAddress'])
                print(listing['city'])
                print(listing['state'])
                print(listing['country'])
                print(listing['zipCode'])
                print(listing['pictures'])
                print(listing['price'])
                print(listing['size'])
                print(listing['numBath'])
                print(listing['schoolDistrict'])
                print(listing['pets'])
                print(listing['utilities'])
                print(listing['furnished'])
                print(listing['distTransportation'])
                print(listing['landlord'])
                print(listing['landlordEmail'])
                print(listing['landlordPhone'])
                print(listing['linkApp'])
                print()

                listings.append(listing)
        except:
            continue

    return listings

# Get the price in integer form


def getPriceApartmentsHelper(priceText):
    priceText = priceText.strip()
    if (priceText.find(" ") >= 0):
        index = priceText.find(' ')
        price = priceText[:index].replace('$', '').replace(',', '').strip()
    else:
        price = priceText.replace('$', '').replace(',', '').strip()
    return int(price)

# Get additional information from apartments.com such as number of bathrooms, whether the listing includes utilities, etc.


def getApartmentsAdditional(link, price):
    URL = link

    # Use a header to allow the client to pass in additional information while trying to get HTML content from specified URL (avoiding a timeout error)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1",
               "DNT": "1", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

    # Get HTML content from specified URL
    r = requests.get(URL, headers=headers)

    # Create Beautiful Soup object with HTML content
    soup = BeautifulSoup(r.content, 'html5lib')

    # Create a new listing
    listing = {}

    # Get the number of bathrooms in the listing
    try:
        table = soup.find('div', attrs={'class': 'sectionContainer'})
        pricingGridItemExists = table.find(
            'div', attrs={'class': 'pricingGridItem'})
        if pricingGridItemExists == None:
            raise Exception
        for row in table.findAll('div', attrs={'class': 'pricingGridItem'}):
            rowPriceText = row.find(
                'span', attrs={'class': 'rentLabel'}).text.strip()
            rowPrice = getPriceApartmentsHelper(rowPriceText)

            if (rowPrice == price):
                container = row.find(
                    'span', attrs={'class': 'detailsTextWrapper'})
                firstChild = container.findChild()
                bath = firstChild.find_next_sibling().text.strip()
                bath = bath[:bath.find(" ")]
    except:
        info = soup.find('ul', attrs={'class': 'priceBedRangeInfo'}).findChild(
        ).find_next_sibling().find_next_sibling()
        bath = info.find('p', attrs={'class': 'rentInfoDetail'}).text.strip()
        bath = bath[:bath.find(" ")]

    try:
        bath = int(bath)
    except:
        bath = float(bath)

    # Get whether or not the listing includes utilities
    utilities = False
    for column in soup.findAll('h4', attrs={'class': 'header-column'}):
        if column.text.find("Utilities Included") >= 0:
            utilities = True

    # Get whether or not the listing is furnished
    furnished = False
    for list in soup.findAll('ul', attrs={'class': 'combinedAmenitiesList'}):
        for amenities in list.findAll('li', attrs={'class': 'specInfo'}):
            if amenities.span.text == 'Furnished':
                furnished = True

    # Get distance to transportation (airports), no info about distance to buses on apartments.com
    distTransportation = ""
    for info in soup.findAll('h2', attrs={'class': 'sectionTitle'}):
        try:
            if info.text == "Transportation":
                for list in info.find_parent('section').findAll('div', attrs={'class': 'transportationName airport'}):
                    airport = list.text
                    dist = list.find_parent('tr').find(
                        'td', attrs={'class': 'right-align-data'}).text
                    distAirport = airport + " Airport: " + dist + ", "
                    distTransportation += distAirport
        except:
            continue
    distTransportation = distTransportation[:len(distTransportation)-2]

    # Get the landlord's number
    phoneContainer = soup.find('p', attrs={'class': 'phoneLabel'}).a
    landlordPhone = phoneContainer['href']
    landlordPhone = landlordPhone[landlordPhone.find(':')+1:]

    # Add listing information
    listing['numBath'] = bath
    listing['schoolDistrict'] = None
    listing['pets'] = None
    listing['utilities'] = utilities
    listing['furnished'] = furnished
    listing['distTransportation'] = distTransportation
    listing['landlord'] = "Apartments.com"
    listing['landlordEmail'] = None
    listing['landlordPhone'] = landlordPhone
    listing['linkApp'] = None

    return listing


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
    elif bed == "4":
        return fmrFour
    elif bed == "5":
        return fmrFive
    elif bed == "6":
        return fmrSix


# Returns true if price of listing is under fair market price for listing type
def filterListing(price, beds):
    return price <= getFMR(beds)

# def main():

# processCSP()
# sys.stdout.flush()


# processCertified()
# processCraigslist()
processApartments()
# getIthacaRentingHelper('http://ithacarenting.com/downtown-rentals/')

# if __name__ == '__main__':
#     main()
