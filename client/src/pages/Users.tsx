import { useEffect, useState } from "react"

//components
import UserDetails from '../components/UserDetails'

const Users = () => {
  const [Users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="Users">
      <div className="users">
        {Users && Users.map((User) => (
          <UserDetails key={User._id} User={User} />
        ))}

      </div>
    </div>

  )
}

export default Users