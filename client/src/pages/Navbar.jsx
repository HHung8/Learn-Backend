import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async() => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout');
      console.log(res)
      if(res.data.success) {
        toast.success(res.data.message)
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-gray-600'>
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-bold text-lg'>{"YushingDev Learning English alone"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar