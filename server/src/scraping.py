from audioop import add
from cgi import print_exception
from re import S
import requests
from bs4 import BeautifulSoup
import sys
import json


#  Fair market rates
fmrStudio = 980
fmrOne = 1048
fmrTwo = 1269
fmrThree = 1619
fmrFour = 1812
fmrFive = 2083.8
fmrSix = 2396.37


def webScraping():
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
                print('here')
                info = row.find('div', attrs={'class': 'featured-listing__content'}).find(
                    'div', attrs={'class': 'featured-listing__description-container'})
                title = info.find(
                    'h3', attrs={'class': "featured-listing__title"}).text
                beds = row['data-bedrooms']
                baths = row['data-bathrooms']
                # bedbath = info.find(
                #     'p', attrs={'class': 'featured-listing__features'})
                # address = info.find(
                #     'p', attrs={'class': 'featured-listing__address'})
                # image = row.find(
                #     'div', attrs={'class': 'featured-listing__image-container'})

                price = int(row['data-rent'])

                # Check if listing falls under fair market price
                # 260 is price of parking
                if (int(price) < filterListing(int(price), beds) and int(price) > 260):
                    # int(price) < 200 andfilterListing(int(price), beds)
                    # Create empty listing
                    listing = {}
                    listing['streetAddress'] = title
                    listing['webScraped'] = True
                    listing['city'] = 'Ithaca'
                    listing['state'] = 'NY'
                    listing['country'] = 'US'
                    listing['zipcode'] = 14850
                    listing['pictures'] = []
                    listing['price'] = price
                    listing['size'] = beds
                    listing['unitType'] = None
                    listing['numBath'] = baths
                    listing['schoolDistrict'] = None
                    listing['pets'] = False
                    listing['utilities'] = False
                    listing['furnished'] = False
                    listing['distTransportation'] = None
                    listing['landlord'] = "CSP Management"
                    listing['landlordEmail'] = 'info@cspmanagement.com'
                    listing['landlordPhone'] = '6072776961'
                    listing['linkOrig'] = "https://cspmgmt.managebuilding.com/" + row['href']
                    listing['description'] = 0

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

        return listings

    # Returns an array of listings from apartments.com under fair market prices

    def processApartments():
        # These are the urls of each bed size
        URL1 = "https://www.apartments.com/ithaca-ny/1-bedrooms/"
        URL2 = "https://www.apartments.com/ithaca-ny/2-bedrooms/"
        URL3 = "https://www.apartments.com/ithaca-ny/3-bedrooms/"
        URL4 = "https://www.apartments.com/ithaca-ny/4-bedrooms/"

        URLS = [URL1, URL2, URL3, URL4]
        final_listing = []
        # For each bed size in apartments.com, go to each of its pages and process its listings
        for URL in URLS:
            for page in range(1, getNumPages(URL) + 1):
                url = URL + str(page) + '/'
                final_listing.append(processApartmentsHelper(url))
        return final_listing
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
        tries = 0
        failed = 0
        # Get each listing and add to array of listings
        for row in table.findAll('li', attrs={'mortar-wrapper'}):
            try:
                tries += 1
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
                    streetAddress = streetAddress[:streetAddress.find(
                        ',')].strip()

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
                print('ehre')
                linkContainer = row.find('section', attrs={
                    'class': 'placard-content'}).find('a', attrs={'class': 'property-link'})
                print('cnt')
                link = linkContainer['href']
                print(link)
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
                    listing['link'] = link
                    listing.update(additionalInfo)

                    # Print statements for debugging
                    # print(listing['webScraped'])
                    # print(listing['streetAddress'])
                    # print(listing['city'])
                    # print(listing['state'])
                    # print(listing['country'])
                    # print(listing['zipCode'])
                    # print(listing['pictures'])
                    # print(listing['price'])
                    # print(listing['size'])
                    # print(listing['numBath'])
                    # print(listing['schoolDistrict'])
                    # print(listing['pets'])
                    # print(listing['utilities'])
                    # print(listing['furnished'])
                    # print(listing['distTransportation'])
                    # print(listing['landlord'])
                    # print(listing['landlordEmail'])
                    # print(listing['landlordPhone'])
                    # print(listing['linkApp'])
                    # print()

                    listings.append(listing)
            except:
                failed += 1
                continue

        print('num tries' + str(tries))
        print('num hit' + str(len(listings)))
        print('num fails' + str(failed))
        print("")
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
            bath = info.find(
                'p', attrs={'class': 'rentInfoDetail'}).text.strip()
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

    def getNumBeds(bed):
        if bed == "Studio":
            return 1
        else:
            return int(bed)

    # Returns true if price of listing is under fair market price for listing type

    def filterListing(price, beds):
        return price*getNumBeds(beds) <= getFMR(beds)

    # def main():

    a = processApartments()
    c = processCSP()
    out = a.extend(c)
    json_data = [json.dumps(d) for d in out]
    return json_data

    # if __name__ == '__main__':
    #     main()
