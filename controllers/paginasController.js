import { Viajes } from "../models/Viaje.js";
//import { Testimonial } from "../models/Testimoniales.js";



const paginaInicio = async (req, res) => {         // req : Lo que enviamos,  res : Lo que express nos responde

    // Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push(Viajes.findAll({ limit: 3}));
    //promiseDB.push(Testimonial.findAll({ limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            //testimoniales: resultado[1]
        }); 
    } catch (error) {
        console.log(error)
    }

    
};

const paginaNosotros = (req, res) => {         // req : Lo que enviamos,  res : Lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {         // req : Lo que enviamos,  res : Lo que express nos responde
    // Consultar BD
    const viajes = await Viajes.findAll();

    

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {         // req : Lo que enviamos,  res : Lo que express nos responde
    
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }); 
    } catch (error) {
        console.log(error);
    }
    
   
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    //console.log(req.params)
    const {slug} = req.params;

    try {
       const viaje = await Viajes.findOne({ where : { slug }});

       res.render('viaje', {
        pagina: 'Información Viaje',
        viaje
       })
    } catch (error) {
        console.log(error)
    }
}


export {
    paginaInicio, 
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}