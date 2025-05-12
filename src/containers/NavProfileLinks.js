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
            <span className="text-xs font-medium text-primary">
                File GST
            </span>
            <span className="text-xs font-medium text-outline">
                File ITR
            </span>
        </div>
    );
}

export default NavProfileLinks;