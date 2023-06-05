'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../../firebase';

export default function ResetPassword() {
  const [cor, setCor] = useState('');
  const [not, setNot] = useState('');
  const [alert, setAlert] = useState(true)

  async function Reset(e){
      e.preventDefault();
      await sendPasswordResetEmail(auth,cor)
      .then(() => {
        setAlert(false)
      })
      .catch((error) => {
        setNot('El correo ingresado no se encuentra registrado.')
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

  function limpiar(e){
      e.preventDefault();
      setCor('')
  }

  function closeAlert(e){
    e.preventDefault();
    setAlert(true)
  }

  return (
        <div className='flex items-center justify-center h-screen px-4 lg:px-0' >
          <div className='flex-1 max-w-lg border border-gray-200 rounded-md p-4 shadow-md bg-white'>
            <div className='flex justify-center w-full'>
              <Image src='/Logo_Walsh_Version_Corporativa.png' className='image' width={230} height={100} alt='Walsh Perú' priority/>
            </div>
            <h1 className='text-center'>RESTABLECER LA CONTRASEÑA</h1>
            <form className='mt-5'>
              <div className='w-full lg:flex-1'>
                <label className='text-start w-full text-sm'>Correo electrónico</label>
                <div className='flex gap-1 items-center mt-1'>
                  <div className='flex items-center border border-gray-300 px-2 h-10 back-color'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                  </div>
                  <input value={cor} onChange={captarCambiosCor} type='email' className='text-sm w-full h-10 border border-gray-300 px-3 rounded-md-r back-color' placeholder='Ingrese su correo' />
                  <div onClick={limpiar} className='flex items-center border border-gray-300 px-2 h-10 back-color cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className='mt-2 h-6 text-xs text-gray-500'>{not}</h1>
              <button onClick={Reset} className='py-2 mt-2 w-full text-white rounded-md text-sm' style={{backgroundColor:'rgb(69, 128, 94)'}}>Enviar enlace</button>
            </form>
            <Link href={"/"}>
                <button className='back-color py-2 mt-2 w-full rounded-md text-sm'>Volver</button>
              </Link>
            <h1 className='text-xs mt-4 text-gray-400 text-center'>ReGIS v.2.0 </h1>
            <h1 className='text-xs text-gray-400 text-center'>Web application developed by Gerencia de SIG e Innovación - Walsh Perú - 2023</h1>
          </div>
          {
            alert?null:<Alert closeAlert={closeAlert} />
          }
        </div>
  )
}

function Alert(props){
  return(
    <div className='absolute top-0 left-0 flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
      <div className='flex flex-col items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
        <div className='flex items-center gap-5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#45805E" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
          <h1 className='text-sm lg:text-base'>Se ha enviado con éxito el enlace a su correo para restablecer su contraseña.</h1>
        </div>
        <button onClick={props.closeAlert} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base'>Aceptar</button>
      </div>
    </div>
  );
}