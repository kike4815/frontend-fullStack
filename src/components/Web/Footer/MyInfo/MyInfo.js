import React from 'react'
import Espartano from '../../../../assets/img/jpg/espartano.jpg'
import SocialLinks from '../../SocialLinks'

import './MyInfo.scss'

export default function MyInfo() {
    return (
        <div className='my-info'>
            <img src={Espartano} alt='Enric Pedrós Sanchez'/>
            <h4>Entra en el mundo del desarrollo web pero no te creas que encontraras empleo al 100%</h4>
            <SocialLinks />
        </div>
    )
}
