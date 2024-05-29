import { AuthContext, SignEmail, SignGithub, SignGoogle } from "../class/auth.strategy";
import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";
import { connection } from "../config/database/mysql";
import bcrypt from "bcryptjs";

interface SignProps {
  email?: string;
  password?: string;
  method: 'email' | 'google' | 'github';
}
interface SignUpProps {
  fullname: string;
  cellphone: string;
  rol: string | number;
  email: string;
  password: string;
}

class AuthModel {

  static async signin({ method, email, password }:SignProps) {

    const methodLogin = {
      email: new SignEmail(),
      google: new SignGoogle,
      github: new SignGithub
    };

    if (!method) return { message: "No se asigno metodo de login" };
    const authService = new AuthContext(methodLogin[method]);

    // validar en base de datos si usuario existe
    const [result] = await connection.query(`SELECT * FROM USUARIOS WHERE CORREO = ?`, [email?.toUpperCase()]);
    // @ts-ignore
    const user = result[0];
    // comparar contraseña
    const passwordMatch = await bcrypt.compare(password!, user.CONTRASEÑA);
    if (!passwordMatch) return { message: "Invalid credentials" };

    // si existe entonces devolvemos token
    const token = authService.signin({ email });
    if (!token) return { message: "sin token" }

    return { 
      message: "succes generate token", 
      data: {
        token,
        user,
      }
    };
  }

  static async signup({ fullname, cellphone, rol, email, password }:SignUpProps) {

    const hash = await bcrypt.hash(password, 10);
    const data = {
      ID_ROL: rol,
      NOMBRE_COMPLETO: fullname.toUpperCase(),
      TELEFONO: cellphone,
      CORREO: email.toUpperCase(),
      CONTRASEÑA: hash
    };

    const [result] = await connection.query(`INSERT INTO USUARIOS SET ?`, data);

    const response: SQLResponse = {
      message: 'Usuario creado con exito',
    };

    return response;
  }
}

export default AuthModel;
