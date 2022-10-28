const AdminDetails = ({ Admin }: { Admin: any }) => {
  return (
    <div className="User-Details">
      <p><strong>Username:</strong>{Admin.username}</p>
      <p><strong>Password:</strong>{Admin.password}</p>
      <p><strong>First Name:</strong>{Admin.fName}</p>
      <p><strong>Last Name:</strong>{Admin.lName}</p>
      <p><strong>Middle Initial:</strong>{Admin.mInitial}</p>
      <p><strong>Preferred Name:</strong>{Admin.prefName}</p>
      <p><strong>Gender:</strong>{Admin.gender}</p>
      <p><strong>Race:</strong>{Admin.race}</p>
      <p><strong>Email:</strong>{Admin.email}</p>
      <p><strong>Phone:</strong>{Admin.phone}</p>
      <p><strong>Contact Preference:</strong>{Admin.contactPref}</p>
      <p><strong>Date Created:</strong>{Admin.dateCreated}</p>
      <p><strong>Supervisor:</strong>{Admin.supervisor}</p>
      <p><strong>Birthdate:</strong>{Admin.birthDate}</p>
      <p><strong>Ethnicity:</strong>{Admin.ethnicity}</p>
      <p><strong>Company:</strong>{Admin.company}</p>
      <p>{Admin.createdAt}</p>
    </div>
  )
}

export default AdminDetails