
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"



const AuthRedirect = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
          navigate('/user/login');
        }
      }, [user, navigate]);
    
      return  children
    
}

export default AuthRedirect