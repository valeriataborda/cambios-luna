import { Request, Response } from "express";
import ApartamentsModel from "../models/apartaments.model";

import { resStatus } from "../helpers/resStatus";
import ApiResponses from "../helpers/apiResponse";
import MissingData from "../helpers/missingData";

import { TypeApartaments } from '../interfaces/apartaments';

class ApartamentsController {
  static table: string = "";
  static pktable: string = "";

  // GET ALL ITEMS
  static async getAllApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'trae tod@s l@s apartaments segun parametros' */
    const iduser = req.params.id;
    
    try {
      const allData = await ApartamentsModel.getAllApartaments( iduser );
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
      return res.status(resStatus.success).json(ApiResponses.success(allData));
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // COUNT ALL ITEMS
  static async countApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'cuenta tod@s l@s apartaments' */
    try {
      const count = await ApartamentsModel.countApartaments( ApartamentsController.table );
      return count
        ? res.status(resStatus.success).json(ApiResponses.success( count, "cantidad recuperada" ))
        : res.status(resStatus.noContent).json(ApiResponses.errorMessage( "datos no encontrados" ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/countSuccess' }} */
        /* #swagger.responses[400] = { description: 'noContent', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // GET ITEM BY ID
  static async getApartamentsById(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'trae el/la apartaments segun id' */
    /*  #swagger.parameters['id'] = { description: 'id de apartaments a buscar' } */
    try {
      const dataById = await ApartamentsModel.getApartamentsById( ApartamentsController.table, ApartamentsController.pktable, req.params.id );
      return dataById.data
        ? res.status(resStatus.success).json(ApiResponses.success( dataById.data, dataById.message ))
        : res.status(resStatus.noContent).json(ApiResponses.errorMessage( dataById.message! ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
        /* #swagger.responses[400] = { description: 'noContent', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // CREATE ITEM
  static async postApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'crea un nuevo apartaments segun el body' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ apartaments', schema: { $ref: '#/definitions/apartaments' }} */
    const {  } = req.body;
    const validate: TypeApartaments = {  };
    const data: TypeApartaments = {  };
    
    try {
      const missing = MissingData.missingData(validate);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));
      
      const postData = await ApartamentsModel.postApartaments( ApartamentsController.table, data );
      const idData = postData.data.insertId
      return postData.data
        ? res.status(resStatus.success).json( ApiResponses.success({ idData, ...data }, postData.message ))
        : res.status(resStatus.unCompleted).json( ApiResponses.errorMessage( postData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // CREATE BULK ITEMS
  static async bulkApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'crea uno o muchos apartaments segun el body' */
    /* #swagger.parameters['body'] = { in: 'body', description: 'datos para crear uno o muchos apartaments', schema: { $ref: '#/definitions/apartaments' }} */
    const { bulkDataInsert } = req.body;

    try {
      const missing = MissingData.missingDataBulk( bulkDataInsert );
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted( missing.missing ));

      const bulkData = await ApartamentsModel.bulkApartaments( ApartamentsController.table, bulkDataInsert );
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
  static async insertOrUpdateBulkApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'crea uno o muchos apartaments segun el body' */
    /* #swagger.parameters['body'] = { in: 'body', description: 'datos para crear o actualizar uno o muchos apartaments', schema: { $ref: '#/definitions/apartaments' }} */
    const { bulkDataInsert, excludeFields } = req.body;

    try {
      const missing = MissingData.missingDataBulk( bulkDataInsert );
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted( missing.missing ));
      
      const bulkData = await ApartamentsModel.insertOrUpdateBulkApartaments( ApartamentsController.table, bulkDataInsert, excludeFields );
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
  static async putApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'actualiza toda la informacion de un apartaments segun body' */
    /*  #swagger.parameters['id'] = { description: 'id de apartaments a modificar' } */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'todos los datos necesarios para modificar un@ apartaments', schema: { $ref: '#/definitions/apartaments' }} */
    const {  } = req.body;
    const idapartaments = req.params.id;
    const data: TypeApartaments = {  };
    
    try {
      const missing = MissingData.missingData({...data, idapartaments });
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const putData = await ApartamentsModel.putApartaments( ApartamentsController.table, ApartamentsController.pktable, data, idapartaments );
      return putData.data
        ? res.status(resStatus.success).json(ApiResponses.success( putData.data, putData.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( putData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // UPDATE ITEM
  static async patchApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'actualiza la informacion de un apartaments segun lo que reciba en el body' */
    /*  #swagger.parameters['id'] = { description: 'id de apartaments a modificar' } */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'todos los datos posibles para modificar un@ apartaments', schema: { $ref: '#/definitions/apartaments' }} */
    const {  } = req.body;
    const idapartaments = req.params.id;
    const data = MissingData.notEmptyToObjet({  });

    try {
      const missing = MissingData.missingData({ idapartaments });
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const patchData = await ApartamentsModel.patchApartaments( ApartamentsController.table, ApartamentsController.pktable, data, idapartaments );
      return patchData.data
        ? res.status(resStatus.success).json(ApiResponses.success( patchData.data, patchData.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( patchData.message ))
        /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
        /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
        /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };

  // DELETE ITEM
  static async deleteApartaments(req: Request, res: Response) {
    /* #swagger.tags = ['apartaments'] #swagger.description = 'elimina el/la apartaments con el id que llega por parametros' */
    /*  #swagger.parameters['id'] = { description: 'id de apartaments a eliminar' } */
    try {
      const dataById = await ApartamentsModel.deleteApartaments( ApartamentsController.table, ApartamentsController.pktable, req.params.id );
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/apartamentsRes' }} */
      return res.status(resStatus.success).json(ApiResponses.success( null, dataById.message ))
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  };
}

export default ApartamentsController;
