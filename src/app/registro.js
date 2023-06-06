'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {app} from '../../firebase';
import { ref, set, onValue} from "firebase/database";

export default function Registro(props) {
    const router = useRouter();
    const [alert, setAlert] = useState(true)
    const [state, setState] = useState('');
    const [nom, setNom] = useState('');
    const [ape, setApe] = useState('');
    const [ent, setEnt] = useState('');
    const [sad, setSad] = useState('');
    const [ar, setAr] = useState('');
    const [car, setCar] = useState('');
    const [dni, setDni] = useState('');
    const [not, setNot] = useState('');
    const [ga, setGa] = useState('');
    const [hor, setHor] = useState('');
    const [cor, setCor] = useState('');

    function captarCambios(e){
        e.preventDefault();
        setState(e.target.value)
    }

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            const starCountRef = ref(app, `Staff/${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setNom(snapshot.val().Nombres)
                    setApe(snapshot.val().Apellidos)
                    setEnt(snapshot.val().HoraE)
                    setSad(snapshot.val().HoraS)
                    setAr(snapshot.val().Area)
                    setCar(snapshot.val().Cargo)
                    setDni(snapshot.val().Dni)
                    setCor(correo)
              } else {
                console.log("No data available");
              }
            });
          }
        return GetDatos();
    }, [])

    function closeAlert(e){
        e.preventDefault();
        setAlert(true)
      }

    return (
        <div className='flex  items-center justify-center py-10 lg:py-20 2xl:h-screen'>
            <div className='flex-1 max-w-lg px-4 lg:px-0'>
                <form className='p-4 shadow-md border border-gray-300 bg-white rounded-md'>
                    <div className='flex justify-center w-full'>
                        <Image src='/Logo_Walsh_Version_Corporativa.png' className='image' width={230} height={100} alt='Walsh Perú' priority/>
                    </div>
                    <select onChange={captarCambios} name="select" className='w-full lg:flex-1 text-sm px-2 h-10 w-full back-color border border-gray-300 rounded-md mt-6 cursor-pointer'>
                        <option value="seleccion" defaultValue>Seleccione una opción</option>
                        <option value="entrada">1. Entrada al teletrabajo</option>
                        <option value="horaA">2. Salida al refrigerio</option>
                        <option value="retornoA">3. Retorno del refrigerio</option>
                        <option value="salida">4. Salida del teletrabajo</option>
                    </select>
                    <h1 className='flex gap-1 text-sm h-6 mt-2'><span className='flex items-center'>*</span>Por favor, verifique sus datos antes de registrar su hora.</h1>
                    <div className='flex flex-wrap gap-3 mt-10'>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Nombres</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full back-color' placeholder={nom} disabled/>
                        </div>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Apellidos</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full back-color' placeholder={ape} disabled/>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 mt-3 lg:mt-5 '>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>DNI</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full back-color' placeholder={dni} disabled/>
                        </div>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Área</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full back-color' placeholder={ar} disabled/>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 mt-3 lg:mt-5 '>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Cargo</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full back-color' placeholder={car} disabled/>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center w-full mt-10'>
                        {
                            state === 'entrada'?<button onClick={entrada} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar entrada al teletrabajo</button>:
                            state === 'horaA'?<button onClick={salidaA} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar salida al refrigerio</button>:
                            state === 'retornoA'?<button onClick={retornoA} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar retorno del refrigerio</button>:
                            state === 'salida'?<button onClick={salida} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar salida del teletrabajo</button>:
                            <div className='flex w-full items-center justify-center text-sm back-color h-10 rounded-md text-gray-400 cursor-pointer w-full border border-gray-300 cursor-not-allowed'>Seleccione una opción</div>
                        }
                        <button onClick={router.reload} className='text-sm h-10 rounded-md text-center cursor-pointer w-full back-color'>Cerrar sesión</button>
                    </div>
                </form>
                {
                    alert?null:<Alert not={not} ga={ga} hor={hor} closeAlert={closeAlert} />
                }
            </div>
        </div>
    )

    async function entrada(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getDate().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getFullYear().toString();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        let hora = hoy.getHours() >= 12? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        console.log(ent.toString().slice(0,2))
        set(ref(app, 'Entrada/' + id + '-' +  cor + '-' + Math.random().toString(30).substring(2)), {
            Nombres: nom,
            Apellidos: ape,
            Fecha: fecha,
            Hora: printHora,
            Dni: dni,
            Cargo: car,
            Area: ar,
            Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,2))*60 + parseInt(ent.toString().slice(3,5)) + 10)? 'Si':'No'
        });
        setNot('Su hora de entrada al teletrabajo se registró correctamente a las:')
        setGa('¡Gracias!')
        setHor(printHora)
        setAlert(false)
    }

    async function salida(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getDate().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getFullYear().toString();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        let hora = hoy.getHours() >= 12? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        set(ref(app, 'Salida/' + id + '-' + cor + '-' + Math.random().toString(30).substring(2)), {
            Nombres: nom,
            Apellidos: ape,
            Fecha: fecha,
            Hora: printHora,
            Dni: dni,
            Cargo: car,
            Area: ar,
            Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(sad.toString().slice(0,2))*60 + parseInt(sad.toString().slice(3,5)))? 'Si':'No'
            });
        setNot('Su hora de salida del teletrabajo se registró correctamente a las:')
        setGa('¡Gracias!')
        setHor(printHora)
        setAlert(false)
    }

    async function salidaA(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getDate().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getFullYear().toString();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        let hora = hoy.getHours() >= 12? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        set(ref(app, 'SalidaA/' + id + '-' + cor + '-' + Math.random().toString(30).substring(2)), {
            Nombres: nom,
            Apellidos: ape,
            Fecha: fecha,
            Hora: printHora,
            Dni: dni,
            Cargo: car,
            Area: ar,
            Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > 780? 'Si':'No'
            });
        setNot('Su hora de salida al refrigerio se registró correctamente a las:')
        setGa('¡Gracias!')
        setHor(printHora)
        setAlert(false)
    }

    async function retornoA(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getDate().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getFullYear().toString();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        let hora = hoy.getHours() >= 12? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        set(ref(app, 'RetornoA/' + id + '-' + cor + '-' + Math.random().toString(30).substring(2)), {
            Nombres: nom,
            Apellidos: ape,
            Fecha: fecha,
            Hora: printHora,
            Dni: dni,
            Cargo: car,
            Area: ar,
            Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > 840? 'Si':'No'
            });
        setNot('Su hora de retorno del refrigerio se registró correctamente a las:')
        setGa('¡Gracias!')
        setHor(printHora)
        setAlert(false)
    }
}

function Alert(props){
    return(
      <div className='absolute top-0 left-0 h-screen '>
        <div className='fixed flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
            <div className='flex flex-col items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
            <div className='flex items-center gap-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#45805E" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div className='section'>
                    <h1 className='text-sm lg:text-base text-center'>{props.ga}</h1>
                    <h1 className='text-sm lg:text-base text-center'>{props.not}</h1>
                    <h1 className='text-sm lg:text-base text-center'>{props.hor}</h1>
                </div>
            </div>
                <button onClick={props.closeAlert} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base mt-2'>Aceptar</button>
            </div>
        </div>
      </div>
    );
}