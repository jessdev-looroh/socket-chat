
interface Usuario {
  id: string;
  nombre: string;
  sala:string;
}

class Usuarios {
  personas: Usuario[];
  constructor() {
    this.personas = [];
  }

  agregarPersona(id: string, nombre: string ,sala:string) {
    let persona: Usuario = { id, nombre,sala };
    this.personas.push(persona);
    return this.personas.filter(persona=>persona.sala===sala);
  }

  getPersona(id: string) {
    let persona = this.personas.filter((persona) => persona.id === id)[0];
    return persona;
  }
  getPersonas() {
    return this.personas;
  }
  getPersonasPorSala(sala:string) {
    let personasEnSala = this.personas.filter(persona => persona.sala ===sala);
    return personasEnSala;
  }
  borrarPersona(id: string) {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter((persona) => persona.id != id);
    return personaBorrada;
  }
}

let usuario = new Usuarios();
export =  usuario;
