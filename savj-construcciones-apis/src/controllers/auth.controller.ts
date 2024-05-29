import { Request, Response } from "express";

import { AuthContext, SignEmail, SignFacebook, SignGithub, SignGoogle } from "../class/auth.strategy";
import { Strategy } from "../interfaces/authContext";
import { resStatus } from "../helpers/resStatus";
import ApiResponses from "../helpers/apiResponse";
import MissingData from "../helpers/missingData";
import AuthModel from "../models/auth.model";

const optionsMethodSign = {
  "email": new SignEmail(),
  "google": new SignGoogle(),
  "facebook": new SignFacebook(),
  "github": new SignGithub(),
}
type MethodType = keyof typeof optionsMethodSign;

class AuthController {

  static async signup(req: Request, res: Response) {
    /* #swagger.tags = ['auth'] 
      #swagger.description = 'Endpoint to sign in a specific user' */
    try {
      const data = { ...req.body };
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const signupRes = await AuthModel.signup(data);
      
      return res
        .status(resStatus.success)
        .json( ...signupRes )
    } catch (error){
      console.log('error: ', error);
      return res
        .status(resStatus.serverError)
        .json(ApiResponses.unsuccessfully(error))
    }
  }

  static async signin(req: Request, res: Response) {
    /* #swagger.tags = ['auth'] 
      #swagger.description = 'Endpoint to sign in a specific user' */
    try {
      const data = { ...req.body };
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const signRes = await AuthModel.signin(data);

      signRes.data 
        ? res.status(resStatus.success).json(ApiResponses.success(signRes.data))
        : res.status(resStatus.unauthorized)

      res.status(resStatus.success).json({...signRes});
    } catch (error) {
      console.log('error: ', error);
    }
  }
}

export default AuthController;

