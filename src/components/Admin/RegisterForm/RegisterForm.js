import React,{useState} from 'react'
import {Form,Input,notification,Button,Checkbox} from 'antd'
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import { emailValidation, minLengthValidation } from '../../../utils/formValidations'
import { signUpAPI } from '../../../api/user'

import './RegisterForm.scss'

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        email:'',
        password:'',
        repeatPassword:'',
        privacyPolicy: false
    })

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    const changeForm = e => {
        if(e.target.name === 'privacyPolicy'){
            setInputs({
                ...inputs,
                [e.target.name] : e.target.checked
            })
        }else {
            setInputs({
               ...inputs,
               [e.target.name]: e.target.value 
            })
        }
    }

    const inputValidation = e => {
        
        const {type, name} = e.target;
        if(type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }   
        if(type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target,6)
            })
        }    
        if (type === "checkbox"){
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
            
        
    }   

    const  register = async () => {
        
        const emailVal = inputs.email
        const passwordVal = inputs.password
        const passworRepeatdVal = inputs.repeatPassword
        const privacyPolicyVal = inputs.privacyPolicy

        if(!emailVal || !passwordVal || !passworRepeatdVal || !privacyPolicyVal) {
            notification['error']({
                message:'Todos los campos son obligatorios'
            })
        }
        else if(passwordVal !== passworRepeatdVal){
            notification['error']({
                message:'Las contraseñas deben ser iguales'
            })
        }
        else {
            const result = await signUpAPI(inputs)
            if(!result.ok) {
                notification['error']({
                    message:result.message
                })
            }else {
                notification['success']({
                    message: result.message
                })
                resetForm()
            }

        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input')
        for(let i=0; i < inputs.length; i++){
            inputs[i].classList.remove('success')
            inputs[i].classList.remove('error')
        }

        setInputs({
            email:'',
            password:'',
            repeatPassword:'',
            privacyPolicy: false
        })

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false 
        })
    }
    return (
        <Form className='register-form' onChange={changeForm} onFinish={register}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                    type='email'
                    name='email'
                    placeholder='Correo electrónico'
                    className='register-form__input'
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                prefix={<LockOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                type='password'
                name='password'
                placeholder='Escriba la contraseña'
                className='register-form__input'
                onChange={inputValidation}
                value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                prefix={<LockOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                type='password'
                name='repeatPassword'
                placeholder='Repita la contraseña'
                className='register-form__input'
                onChange={inputValidation}
                value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name='privacyPolicy'onChange={inputValidation} checked={inputs.privacyPolicy}>
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button  htmlType='submit' className='register-form__button'>
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    )
}
