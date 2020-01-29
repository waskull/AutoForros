import nodemailer from 'nodemailer';

export default class NodeMailer{
    private contentHTML?:string;
    constructor(
        private mensaje?:string,
        private nombre?:string,
        private apellido?:string,
        private solicitud?:number,
        private destino?:string
        ){
        this.mensaje = "Puedes pasar cuando quieras, recuerda trabajamos de Lunes a Sabados en horario de Oficina.";
        this.contentHTML = `
        <h1>AutoForros</h1>
        <ul>
            <li>Hola ${this.nombre+" "+this.apellido}</li>
        </ul>
        <p>${"La Solicitud #"+this.solicitud+" ha sido completada"}</p>
        <br>
        <p>${this.mensaje}</p>
    `;
    }
    private transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,
            secure:false,
            auth:{
                user: "forrosauto@gmail.com",
                pass: "autofdb00"
            },
            tls: {
                rejectUnauthorized: false
            }
        
    });
    public async enviarCorreo(){
        let opciones = {
            from: "forrosauto@gmail.com",
            to: this.destino,
            subject: 'Tu Solicitud se ha Completado',
            html: this.contentHTML
        }
        await this.transporter.sendMail(opciones,function(error,info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                console.log(info.response);
                console.log("E-mail enviado con Exito");
                return "E-mail enviado con Exito";
            }
        });   
    }
    
}