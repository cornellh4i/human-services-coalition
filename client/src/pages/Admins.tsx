import { useEffect, useState } from 'react'
import AdminDetails from '../components/AdminDetails'
import AdminForm from "../forms/AdminForm"

const Admins = () => {
  const [Admins, setAdmins] = useState<any[]>([])

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admins')
      const json = await response.json()

      if (response.ok) {
        setAdmins(json)
      }
    }

    fetchAdmins()
  }, [])

  return (
    <div className="Admins">
      <div className="admins">
        {Admins && Admins.map((Admin) => (
          <AdminDetails key={Admin._id} Admin={Admin} />
        ))}
        <AdminForm />
      </div>
    </div>
  )
}

export default Admins