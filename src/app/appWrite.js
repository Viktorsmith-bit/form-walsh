async function entrada(e){
    e.preventDefault();
    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    let hora = hoy.getMinutes() >= 10? hoy.getHours() + ':' + hoy.getMinutes():hoy.getHours() + ':' + '0' + hoy.getMinutes()
    
    const querySnapshot = await getDocs(collection(db, "Entrada"));
    if(querySnapshot.empty){
        addDoc(collection(db, "Entrada"), {
            Nombres: nom,
            Apellidos: ape,
            Fecha: fecha,
            Hora: hora,
            Dni: dni,
            Cargo: car,
            Area: ar,
            Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,1))*60 + parseInt(ent.toString().slice(2,4)))? 'Si':'No'
            });
        setNot('Su hora de ingreso al teletrabajo se registró correctamente a las:')
        setGa('¡Gracias!')
        setHor(hora)
    }else{
        const citiesRef = collection(db, "Entrada");
        const q = query(citiesRef, where("Dni", "==", dni));
        const Snapshot = await getDocs(q);
        Snapshot.forEach((doc) => {
            if(doc.data().Fecha !== fecha){
                console.log('acceso autorizado')
                addDoc(collection(db, "Entrada"), {
                    Nombres: nom,
                    Apellidos: ape,
                    Fecha: fecha,
                    Hora: hora,
                    Dni: dni,
                    Cargo: car,
                    Area: ar,
                    Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,1))*60 + parseInt(ent.toString().slice(2,4)))? 'Si':'No'
                    });
                setNot('Su hora de ingreso al teletrabajo se registró correctamente a las:')
                setGa('¡Gracias!')
                setHor(hora)
                
            }else {
                console.log('acceso dengado')
            }
        });
    }
}