import { openModal } from "@/store/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import { MODAL_BODY_TYPES } from '@/utils/globalConstantUtil'
import Link from "next/link"
import { fetchUserDetail, setLoggedIn } from "@/store/userSlice"
import { useEffect } from "react"
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'


function NavProfileLinks() {
    return (
        <div className="flex items-center space-x-4">
            <button className="btn btn-sm text-xs btn-primary normal-case">
                File GST
            </button>
            <button className="btn btn-sm text-xs btn-outline normal-case">
                File ITR
            </button>
        </div>
    );
}

export default NavProfileLinks;