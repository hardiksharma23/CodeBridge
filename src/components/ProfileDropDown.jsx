import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../hook/useOnclickOutside";
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "./ConfirmationModal";

const ProfileDropDown = ({}) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div className="relative">
      {/* Profile Image Button */}
      <button
        className="flex items-center gap-x-2 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-500 hover:border-gray-300 transition"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={ref}
          className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-600 shadow-lg z-50 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dashboard Link */}
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="block border-b-2 border-gray-600 items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg"
          >
            Dashboard
          </Link>

          {/* Logout Button */}
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
            className="w-full px-4 py-3 text-sm text-red-500 hover:bg-gray-700 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default ProfileDropDown;
