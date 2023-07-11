export default async function salida(e){
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