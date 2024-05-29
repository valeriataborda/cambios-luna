import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";

import { connection } from "../config/database/mysql";


class CreatedModel {

  static async getConstructoras(){
    const [query] = await connection.query(`SELECT * FROM CONSTRUCTORAS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay constructoras creadas" };
    }

    return { data: query };
  }

  static async createConstructora(data: any) {
    const [query] = await connection.query(`INSERT INTO CONSTRUCTORAS
        (NOMBRE_COMERCIAL, RAZON_SOCIAL, NIT_CONSTRUCTORA)
      VALUES 
        (?, ?, ?)`, [ 
        data.NOMBRE_COMERCIAL.toUpperCase(), data.RAZON_SOCIAL.toUpperCase(), 
        data.NIT_CONSTRUCTORA.toUpperCase()
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Constructora no creada" };
    }

    return { message: "Constructora creada con éxito", data: query };
  }



  static async getProyectos(){
    const [query] = await connection.query(`SELECT * FROM PROYECTOS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay proyectos creados" };
    }

    return { data: query };
  }

  static async createProyecto(data: any) {
    const [query] = await connection.query(`INSERT INTO PROYECTOS
        (ID_CONSTRUCTORA, NOMBRE_PROYECTO, UBICACION_PROYECTO, DIRECCION_PROYECTO)
      VALUES 
        (?, ?, ?, ?)`, [
        data.ID_CONSTRUCTORA, data.NOMBRE_PROYECTO.toUpperCase(),
        data.UBICACION_PROYECTO.toUpperCase(), data.DIRECCION_PROYECTO.toUpperCase()
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Proyecto no creado" };
    }

    return { message: "Proyecto creado con éxito", data: query };
  }



  static async createTracking(data: any) {
    const [query] = await connection.query(`INSERT INTO TRACKING
        (ID_PROYECTO, IMAGEN_TRACKING, OBSERVACION_TRACKING)
      VALUES 
        (?, ?, ?)`, [
        data.ID_PROYECTO, data.IMAGEN_TRACKING, data.OBSERVACION_TRACKING
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Tracking no creado" };
    }

    return { message: "Tracking creado con éxito", data: query };
  }

  static async getUsers(){
    const [query] = await connection.query(`SELECT * FROM USUARIOS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay usuarios creados" };
    }

    return { data: query };
  }



  static async createApartament(data: any) {
    const [query] = await connection.query(`INSERT INTO APARTAMENTOS
        (ID_COMPRADOR, ID_PROYECTO, METRAJE_APARTAMENTO, PISO_APARTAMENTO, TIPO_APARTAMENTO, PRECIO_APARTAMENTO)
      VALUES 
        (?, ?, ?, ?, ?, ?)`, [
        data.ID_COMPRADOR, data.ID_PROYECTO, data.METRAJE_APARTAMENTO,
        data.PISO_APARTAMENTO, data.TIPO_APARTAMENTO, data.PRECIO_APARTAMENTO
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Apartamento no creado" };
    }

    return { message: "Apartamento creado con éxito", data: query };
  }











  static async getAllCreated( table: string, offset:number, limit:number, orderBy:string, sort:string ) {
    return await SqlCrud.getTable( table, offset, limit, orderBy, sort );
  }

  static async countCreated( table:string, attribute?: string, value?: string | number ) {
    return await SqlCrud.countRows( table, attribute, value );
  };

  static async getCreatedById( table:string, attribute: string, value: string | number ) {
    return await SqlCrud.getRowByAttribute( table, attribute, value );
  };

  static async postCreated( table:string, data:{} ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.insertToObject( table, data );
    
    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron ingresar correctamente" };
    }
    return { message: "Datos ingresados correctamente", data: res };

  };

  static async bulkCreated( table:string, bulkDataInsert: {}[] ) {
    const res: SQLResponse = await SqlCrud.insertBulk( table, bulkDataInsert );

    return { message: "Datos ingresados correctamente", data: res };
  };

  static async insertOrUpdateBulkCreated(table:string, bulkDataIsert: Record<string, any>[] , excludeFields: string[] = [] ) {
    const res: SQLResponse = await SqlCrud.insertOrUpdateBulk( table, bulkDataIsert, excludeFields );

    return { message: "Datos ingresados y actualizados correctamente", data: res };
  }

  static async putCreated( table:string, attribute:string, data:{}, idcompanys: string ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.updateRow( table, attribute, idcompanys, data );

    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron actualizar correctamente" };
    }
    
    const dataUpddate = await SqlCrud.getRowByAttribute( table, attribute, idcompanys );

    return { message: "datos actualizados con exito", data: dataUpddate }
  };

  static async patchCreated( table:string, attribute:string, data:{}, idcompanys: string ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.updateRow( table, attribute, idcompanys, data );

    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron actualizar correctamente" };
    }
    
    const dataUpddate = await SqlCrud.getRowByAttribute( table, attribute, idcompanys );

    return { message: "datos actualizados con exito", data: dataUpddate }
  };

  static async deleteCreated( table:string, attribute:string, value: string | number ){
    const res: SQLResponse =  await SqlCrud.deleteRowTable( table, attribute, value );

    if(res.affectedRows == 0){
      return { message: "No se pudo eliminar la fila correctamente" };
    }

    return { message: `${attribute}: ${value}, eliminado con éxito de la tabla: ${table}` }
  };
}

export default CreatedModel;
