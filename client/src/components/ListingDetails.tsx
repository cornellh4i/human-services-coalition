import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

const ListingDetails = ({ Listing }: { Listing: any }) => {
  return (
    <div className="Listing-Details">
      <h4>{Listing.title}</h4>
      <p><strong>Listing Price:</strong>{Listing.price}</p>
      <p><strong>Web Scraped:</strong>{Listing.webScraped}</p>
      <p><strong>Pictures:</strong>{Listing.pictures}</p>
      <p><strong>Size:</strong>{Listing.size}</p>
      <p><strong>Bathrooms:</strong>{Listing.numBath}</p>
      <p><strong>School District:</strong>{Listing.schoolDistrict}</p>
      <p><strong>Pet Policy:</strong>{Listing.petsAllowed}</p>
      <p><strong>Utilities:</strong>{Listing.utilities}</p>
      <p><strong>Furnished:</strong>{Listing.furnished}</p>
      <p><strong>Distance from Transportation:</strong>{
        Listing.DistTransportation}</p>
      <p><strong>Landlord:</strong>{Listing.landlord}</p>
      <p><strong>Landlord Email:</strong>{Listing.landlordEmail}</p>
      <p><strong>Landlord Phone:</strong>{Listing.landlordPhone}</p>
      <p><strong>Original Listing Link:</strong>{Listing.linkOrig}</p>
      <p><strong>Link to Listing Application:</strong>{Listing.linkApp}</p>
      <p>{Listing.createdAt}</p>
    </div>

  )
}

export default ListingDetails