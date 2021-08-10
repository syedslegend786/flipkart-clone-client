import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { MaterialInput, MaterialButton } from './../../MeterialUi/MeterialUiComponents'
import { createUserAddressAction, updateExistingAddressAction } from '../../../actions/address.actions'
const AddNewAddress = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [province, setprovince] = useState('')
    const [city, setcity] = useState('')
    const [mobileNumber, setmobileNumber] = useState('')
    const [emailAddress, setemailAddress] = useState('')
    const handleCreateNewAddress = () => {
        if (props.updating && props.idOfUpdatingAddress) {
            if (name && mobileNumber && city && province) {
                const payload = {
                    addressId: props.idOfUpdatingAddress,
                    payload: {
                        name: name,
                        province: province,
                        city: city,
                        mobileNumber: mobileNumber,
                        emailAddress: emailAddress
                    }
                }
                dispatch(updateExistingAddressAction(payload))
                props.setUpdatingControl(false)
            } else {
                alert('kindly fill the data')
            }

        } else if (props.adding) {
            if (name && mobileNumber && city && province) {
                const payload = {
                    name,
                    province,
                    city,
                    mobileNumber,
                }
                if (emailAddress) {
                    payload.emailAddress = emailAddress
                }
                dispatch(createUserAddressAction(payload))
            } else {
                alert('kindly fill the missing detail')
            }
        }
    }
    return (
        <div>
            <MaterialInput
                type="text"
                label="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MaterialInput
                type="text"
                label="Enter Province"
                value={province}
                onChange={(e) => setprovince(e.target.value)}
            />
            <MaterialInput
                type="text"
                label="Enter City"
                value={city}
                onChange={(e) => setcity(e.target.value)}
            />
            <MaterialInput
                type="text"
                label="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setmobileNumber(e.target.value)}
            />
            <MaterialInput
                type="text"
                label="Enter Email (optional)"
                value={emailAddress}
                onChange={(e) => setemailAddress(e.target.value)}
            />
            <MaterialButton
                title={props.updating ? `Update` : `Add New Address`}
                onClick={handleCreateNewAddress}
            />
        </div>
    )
}

export default AddNewAddress
