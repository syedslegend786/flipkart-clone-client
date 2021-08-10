import React from 'react'
const Section = (props) => {
    return (
        <div className='section'>
            <div onClick={props.setHandleAddNewUser ? () => props.setHandleAddNewUser(!props.handleAddNewUser) : ''} className='section__header' style={{
                cursor: props.sectionNumber == '+' ? 'pointer' : '',
            }}>
                {props.sectionNumber && <span className='section__step'>{props.sectionNumber}</span>}
                <span className='section__operatin'>{props.sectionName}</span>
            </div>
            <div className='section__childrens'>
                {props.children}
            </div>
        </div>
    )
}

export default Section
