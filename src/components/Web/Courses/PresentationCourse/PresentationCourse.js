import React from 'react'
import AcademyLogo from '../../../../assets/img/png/academy-logo.png'

import './PresentationCourse.scss'

export default function PresentationCourse() {
    return (
        <div className='presentation-course'>
            <img src={AcademyLogo} alt='Enric Pedrós'/>
            <p>En Udemy vas a encontrar los mejores cursos online que he hecho de desarrollo web español. Unete a Udemy y empieza tu camino como Desarrollador. Son cursos para principiantes muy buenos pero cuidado! los profesores no son todos buenos del todo</p>
            <p>Echales un vistazo que muchos siempre estan a 9,90 Euros</p>
        </div>
    )
}
