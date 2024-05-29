import { Request, Response } from "express";
import CreatedModel from "../models/created.model";

import { resStatus } from "../helpers/resStatus";
import ApiResponses from "../helpers/apiResponse";
import MissingData from "../helpers/missingData";

import { TypeCreated } from '../interfaces/created';

class CreatedController {
  static table: string = "";
  static pktable: string = "";

  static async getConstructoras(req: Request, res: Response) {
    try {
      const constructoras = await CreatedModel.getConstructoras();
      return constructoras.data
        ? res.status(resStatus.success).json(ApiResponses.success( constructoras, "Constructoras encontradas" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Constructoras no encontradas" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
  static async createConstructora(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newConstructora = await CreatedModel.createConstructora( data );
      return newConstructora.data
        ? res.status(resStatus.success).json(ApiResponses.success( newConstructora.data, newConstructora.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newConstructora.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }



  static async getProyectos(req: Request, res: Response) {
    try {
      const proyects = await CreatedModel.getProyectos();
      return proyects.data
        ? res.status(resStatus.success).json(ApiResponses.success( proyects, "Proyectos encontrados" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Proyectos no encontrados" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
  static async createProyecto(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newProyecto = await CreatedModel.createProyecto( data );
      return newProyecto.data
        ? res.status(resStatus.success).json(ApiResponses.success( newProyecto.data, newProyecto.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newProyecto.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createTracking(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newTracking = await CreatedModel.createTracking( data );
      return newTracking.data
        ? res.status(resStatus.success).json(ApiResponses.success( newTracking.data, newTracking.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newTracking.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await CreatedModel.getUsers();
      return users.data
        ? res.status(resStatus.success).json(ApiResponses.success( users, "Usuarios encontrados" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Usuarios no encontrados" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createApartament(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newApartament = await CreatedModel.createApartament( data );
      return newApartament.data
        ? res.status(resStatus.success).json(ApiResponses.success( newApartament.data, newApartament.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newApartament.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createVenta(req: Request, res: Response) {}
  static async createRol(req: Request, res: Response) {}
  static async createCartera(req: Request, res: Response) {}
  static async createCuota(req: Request, res: Response) {}

  // CREATE ITEM
  static async postCreated(req: Request, res: Response) {
    const {  } = req.body;
    const validate: TypeCreated = {  };
    const data: TypeCreated = {  };
    
    try {
      const missing = MissingData.missingData(validate);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));
      
      const postData = await CreatedModel.postCreated( CreatedController.table, data );
      const idData = postData.data.insertId
      return postData.data
        ? res.status(resStatus.success).json( ApiResponses.success({ idData, ...data }, postData.message ))
        : res.status(resStatus.unCompleted).json( ApiResponses.errorMessage( postData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // CREATE BULK ITEMS
  static async bulkCreated(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'crea uno o muchos created segun el body' */
    /* #swagger.parameters['body'] = { in: 'body', description: 'datos para crear uno o muchos created', schema: { $ref: '#/definitions/created' }} */
    const { bulkDataInsert } = req.body;

    try {
      const missing = MissingData.missingDataBulk( bulkDataInsert );
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted( missing.missing ));

      const bulkData = await CreatedModel.bulkCreated( CreatedController.table, bulkDataInsert );
      return bulkData.data
        ? res.status(resStatus.success).json(ApiResponses.success(bulkData.data, bulkData.message))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( bulkData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/bulkSuccess' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    }  catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }

  // Insert or Update bulk
  static async insertOrUpdateBulkCreated(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'crea uno o muchos created segun el body' */
    /* #swagger.parameters['body'] = { in: 'body', description: 'datos para crear o actualizar uno o muchos created', schema: { $ref: '#/definitions/created' }} */
    const { bulkDataInsert, excludeFields } = req.body;

    try {
      const missing = MissingData.missingDataBulk( bulkDataInsert );
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted( missing.missing ));
      
      const bulkData = await CreatedModel.insertOrUpdateBulkCreated( CreatedController.table, bulkDataInsert, excludeFields );
      return bulkData.data
        ? res.status(resStatus.success).json(ApiResponses.success(bulkData.data, bulkData.message))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( bulkData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/bulkSuccess' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }

  }

  // UPDATE ITEM
  static async putCreated(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'actualiza toda la informacion de un created segun body' */
    /*  #swagger.parameters['id'] = { description: 'id de created a modificar' } */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'todos los datos necesarios para modificar un@ created', schema: { $ref: '#/definitions/created' }} */
    const {  } = req.body;
    const idcreated = req.params.id;
    const data: TypeCreated = {  };
    
    try {
      const missing = MissingData.missingData({...data, idcreated });
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const putData = await CreatedModel.putCreated( CreatedController.table, CreatedController.pktable, data, idcreated );
      return putData.data
        ? res.status(resStatus.success).json(ApiResponses.success( putData.data, putData.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( putData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // UPDATE ITEM
  static async patchCreated(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'actualiza la informacion de un created segun lo que reciba en el body' */
    /*  #swagger.parameters['id'] = { description: 'id de created a modificar' } */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'todos los datos posibles para modificar un@ created', schema: { $ref: '#/definitions/created' }} */
    const {  } = req.body;
    const idcreated = req.params.id;
    const data = MissingData.notEmptyToObjet({  });

    try {
      const missing = MissingData.missingData({ idcreated });
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const patchData = await CreatedModel.patchCreated( CreatedController.table, CreatedController.pktable, data, idcreated );
      return patchData.data
        ? res.status(resStatus.success).json(ApiResponses.success( patchData.data, patchData.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( patchData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // DELETE ITEM
  static async deleteCreated(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'elimina el/la created con el id que llega por parametros' */
    /*  #swagger.parameters['id'] = { description: 'id de created a eliminar' } */
    try {
      const dataById = await CreatedModel.deleteCreated( CreatedController.table, CreatedController.pktable, req.params.id );
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      return res.status(resStatus.success).json(ApiResponses.success( null, dataById.message ))
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };
}

export default CreatedController;
