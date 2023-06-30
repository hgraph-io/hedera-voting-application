//@ts-nocheck
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useUser} from '../contexts/UserContext'
import {supabase} from '../supabaseClient' // make sure to import supabase client

export default function withAuth (Component) {
  return function WrappedComponent(props) {
    const Router = useRouter()
    const user = useUser()
    console.log(user)

    useEffect(() => {
      const checkUserSession = async () => {
        const {
          data: {session: _session},
        } = await supabase.auth.getSession()

        if (!_session) {
          Router.replace('/login')
        } else {
          user.setSupabaseSession(_session)
        }
      }

      checkUserSession()
    }, [])

    return <div>{user && <Component {...props} />}</div>
  }
}
