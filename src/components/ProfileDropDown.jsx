import React from 'react'
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


import useOnClickOutside from '../hook/useOnclickOutside'
import { logout } from '../services/operations/authAPI'
import ConfirmationModal from './ConfirmationModal'




const ProfileDropDown = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[130%] right-0 z-[1000] divide-y-[1px] divide-gray-500 overflow-hidden rounded-md border-[1px] border-gray-500 bg-gray-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex justify-center w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-emerald-300 text-center">
              Dashboard
            </div>
          </Link>
          <button
            onClick={() =>
            setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
            })
            }
            className="px-8 py-2 text-sm font-medium"
          >
            <div className="flex items-center gap-x-2 text-red-500">
                <span>Logout</span>
            </div>
          </button>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
      )}
    </button>
  )
}

export default ProfileDropDown