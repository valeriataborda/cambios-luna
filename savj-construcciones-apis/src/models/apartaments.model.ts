import { connection } from "../config/database/mysql";
import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";


class ApartamentsModel {

  static async getAllApartaments( iduser: string | number ) {
    const [apts] = await connection.query(`SELECT pr.NOMBRE_PROYECTO, pr.UBICACION_PROYECTO, 
        ap.METRAJE_APARTAMENTO, ap.PISO_APARTAMENTO, ap.TIPO_APARTAMENTO, ap.PRECIO_APARTAMENTO 
      FROM APARTAMENTOS ap
      LEFT JOIN PROYECTOS pr 
        ON ap.ID_PROYECTO = pr.ID_PROYECTO
      WHERE ap.ID_COMPRADOR = ?;`, [iduser]
  );

    return { message: "success", data: apts };
  }

  static async countApartaments( table:string, attribute?: string, value?: string | number ) {
    return await SqlCrud.countRows( table, attribute, value );
  };

  static async getApartamentsById( table:string, attribute: string, value: string | number ) {
    return await SqlCrud.getRowByAttribute( table, attribute, value );
  };

  static async postApartaments( table:string, data:{} ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.insertToObject( table, data );
    
    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron ingresar correctamente" };
    }
    return { message: "Datos ingresados correctamente", data: res };

  };

  static async bulkApartaments( table:string, bulkDataInsert: {}[] ) {
    const res: SQLResponse = await SqlCrud.insertBulk( table, bulkDataInsert );

    return { message: "Datos ingresados correctamente", data: res };
  };

  static async insertOrUpdateBulkApartaments(table:string, bulkDataIsert: Record<string, any>[] , excludeFields: string[] = [] ) {
    const res: SQLResponse = await SqlCrud.insertOrUpdateBulk( table, bulkDataIsert, excludeFields );

    return { message: "Datos ingresados y actualizados correctamente", data: res };
  }

  static async putApartaments( table:string, attribute:string, data:{}, idcompanys: string ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.updateRow( table, attribute, idcompanys, data );

    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron actualizar correctamente" };
    }
    
    const dataUpddate = await SqlCrud.getRowByAttribute( table, attribute, idcompanys );

    return { message: "datos actualizados con exito", data: dataUpddate }
  };

  static async patchApartaments( table:string, attribute:string, data:{}, idcompanys: string ): Promise<{ message: string; data?: SQLResponse }> {
    const res: SQLResponse = await SqlCrud.updateRow( table, attribute, idcompanys, data );

    if(res.affectedRows == 0){
      return { message: "los datos no se pudieron actualizar correctamente" };
    }
    
    const dataUpddate = await SqlCrud.getRowByAttribute( table, attribute, idcompanys );

    return { message: "datos actualizados con exito", data: dataUpddate }
  };

  static async deleteApartaments( table:string, attribute:string, value: string | number ){
    const res: SQLResponse =  await SqlCrud.deleteRowTable( table, attribute, value );

    if(res.affectedRows == 0){
      return { message: "No se pudo eliminar la fila correctamente" };
    }

    return { message: `${attribute}: ${value}, eliminado con éxito de la tabla: ${table}` }
  };
}

export default ApartamentsModel;
