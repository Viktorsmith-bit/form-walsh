'use client';
import { Fragment, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import Registro from './registro';

export default function Home(props) {
  const [cor, setCor] = useState('')
  const [con, setCon] = useState('')
  const [vis, setVis] = useState(true)
  const [email, setEmail] = useState('');
  const [not, setNot] = useState('');

  const router = useRouter();

  async function Login(e){
      e.preventDefault();
      await signInWithEmailAndPassword(auth, cor, con)
      .then((userCredential) => {
          setEmail(userCredential.user.email)
      })
      .catch((error) => {
        setNot('El usuario no se encuentra registrado. Por favor, verifique sus datos.')
        setTimeout(()=>{
          setNot('')
        }, 4000)
          const errorCode = error.code;
          const errorMessage = error.message;
      });
  }

  function captarCambiosCor(e){
      e.preventDefault();
      setCor(e.target.value)
  }

  function captarCambiosCon(e){
      e.preventDefault();
      setCon(e.target.value)
  }

  function visualizar(e){
      e.preventDefault();
      setVis(false)
  }

  function ocultar(e){
      e.preventDefault();
      setVis(true)
  }

  function limpiar(e){
      e.preventDefault();
      setCor('')
  }

  function cerrarSesion(e){
    e.preventDefault();
    setEmail('');
  }
  
  return (
    <Fragment>
      {
        email === '' &&  <div className='flex items-center justify-center h-screen px-4 lg:px-0' >
          <div className='flex-1 max-w-xl border border-gray-200 rounded-md p-4 shadow-md bg-white'>
            <div className='flex justify-center w-full'>
              <Image src='/Logo_Walsh_Version_Corporativa.png' className='image' width={230} height={100} alt='Walsh Perú' priority/>
            </div>
            <h1 className='text-center'>REGISTRO DE HORAS DE INGRESO Y SALIDA</h1>
            <h1 className='text-center'>BAJO LA MODALIDAD DEL TELETRABAJO</h1>
            <form className='mt-5'>
              <div className='w-full lg:flex-1'>
                <label className='text-start w-full text-sm'>Correo electrónico</label>
                <div className='flex gap-1 items-center mt-1'>
                  <div className='flex items-center border border-gray-300 px-2 h-10 back-color'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                  </div>
                  <input value={cor} onChange={captarCambiosCor} type='email' className='text-sm w-full h-10 border border-gray-300 px-3 rounded-md-r back-color' placeholder='Ingrese su usuario' />
                  <div onClick={limpiar} className='flex items-center border border-gray-300 px-2 h-10 back-color cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='w-full lg:flex-1 mt-3'>
                <label className='text-start w-full text-sm'>Contraseña</label>
                <div className='flex gap-1 items-center mt-1'>
                  <div className='flex items-center border border-gray-300 px-2 h-10 back-color'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                  </div>
                  <input onChange={captarCambiosCon} type={`${vis?'password':'text'}`} className='text-sm w-full h-10 border border-gray-300 px-3 rounded-md-r back-color' placeholder='Ingrese su contraseña' />
                  {
                    vis?<div onClick={visualizar} className='flex items-center border border-gray-300 px-2 h-10 back-color cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                    </div>:<div onClick={ocultar} className='flex items-center border border-gray-300 px-2 h-10 back-color cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    </div>
                  }
                </div>
              </div>
              <h1 className='mt-2 h-6 text-xs text-gray-500'>{not}</h1>
              <button onClick={Login} className='py-2 mt-5 w-full text-white rounded-md text-sm' style={{backgroundColor:'rgb(69, 128, 94)'}}>Iniciar sesión</button>
            </form>
            <Link href={"/restablecer"}>
                <button className='py-2 back-color mt-2 w-full border border-gray-300 rounded-md text-sm'>Restablecer contraseña</button>
              </Link>
            <h1 className='text-xs mt-4 text-gray-400 text-center'>ReGIS v.2.0 </h1>
            <h1 className='text-xs text-gray-400 text-center'>Web application developed by Gerencia de SIG e Innovación - Walsh Perú - 2023</h1>
          </div>
        </div>
      }
      
      {
        email !== '' && <Registro email={email} cerrarSesion={cerrarSesion} />
      }
    </Fragment>
  )
}
