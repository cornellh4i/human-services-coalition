import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"


const UserDetails = ({ User }: { User: any }) => {
  return (
    <div className="User-Details">
      <p><strong>Username:</strong>{User.username}</p>
      <p><strong>Password:</strong>{User.password}</p>
      <p><strong>First Name:</strong>{User.fName}</p>
      <p><strong>Last Name:</strong>{User.lName}</p>
      <p><strong>Date Created:</strong>{User.dateCreated}</p>
      <p><strong>Supervisor:</strong>{User.supervisor}</p>
      <p><strong>Middle Initial:</strong>{User.mInitial}</p>
      <p><strong>Birthdate:</strong>{User.birthDate}</p>
      <p><strong>Email:</strong>{User.email}</p>
      <p><strong>Phone:</strong>{User.phone}</p>
      <p><strong>Preferred Name:</strong>{User.prefName}</p>
      <p><strong>Gender:</strong>{User.gender}</p>
      <p><strong>Race:</strong>{User.race}</p>
      <p><strong>Ethnicity:</strong>{User.ethnicity}</p>
      <p><strong>Contact Preference:</strong>{User.contactPref}</p>
      <p><strong>Recently Viewed:</strong>{User.recentlyViewed}</p>
      <p>{User.createdAt}</p>
    </div>
  )
}

export default UserDetails