import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Attendance from '../../features/attendance'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Attendance"}))
      }, [])


    return(
        <Attendance />
    )
}

export default InternalPage