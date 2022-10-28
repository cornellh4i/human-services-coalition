const ListingDetails = ({ Listing }: { Listing: any }) => {
  return (
    <div className="Listing-Details">
      <p><strong>Web Scraped:</strong>{Listing.webScraped}</p>
      <p><strong>Street Address:</strong>{Listing.streetAddress}</p>
      <p><strong>City:</strong>{Listing.city}</p>
      <p><strong>State:</strong>{Listing.state}</p>
      <p><strong>Country:</strong>{Listing.country}</p>
      <p><strong>Zip Code:</strong>{Listing.zipCode}</p>
      <p><strong>Pictures:</strong>{Listing.pictures}</p>
      <p><strong>Listing Price:</strong>{Listing.price}</p>
      <p><strong>Size:</strong>{Listing.size}</p>
      <p><strong>Unit Type:</strong>{Listing.unitType}</p>
      <p><strong>Bathrooms:</strong>{Listing.numBath}</p>
      <p><strong>School District:</strong>{Listing.schoolDistrict}</p>
      <p><strong>Pet Policy:</strong>{Listing.pets}</p>
      <p><strong>Utilities:</strong>{Listing.utilities}</p>
      <p><strong>Furnished:</strong>{Listing.furnished}</p>
      <p><strong>Distance from Transportation:</strong>{Listing.distTransportation}</p>
      <p><strong>Landlord:</strong>{Listing.landlord}</p>
      <p><strong>Landlord Email:</strong>{Listing.landlordEmail}</p>
      <p><strong>Landlord Phone:</strong>{Listing.landlordPhone}</p>
      <p><strong>Original Listing Link:</strong>{Listing.linkOrig}</p>
      <p><strong>Link to Listing Application:</strong>{Listing.linkApp}</p>
      <p><strong>Date Available:</strong>{Listing.dateAvailable}</p>
      <p>{Listing.createdAt}</p>
    </div>

  )
}

export default ListingDetails